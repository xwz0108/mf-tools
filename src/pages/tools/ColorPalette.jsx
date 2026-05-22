import { useState, useRef } from 'react'
import { Typography, Box, Paper, Button, IconButton, Snackbar, Stack } from '@mui/material'
import UploadIcon from '@mui/icons-material/Upload'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import ToolLayout from '../../components/ToolLayout'
import { motion } from 'framer-motion'

function extractColors(imageData, count = 6) {
  const pixels = []
  for (let i = 0; i < imageData.length; i += 4) {
    pixels.push([imageData[i], imageData[i + 1], imageData[i + 2]])
  }
  const sample = []
  const step = Math.max(1, Math.floor(pixels.length / 1000))
  for (let i = 0; i < pixels.length; i += step) {
    sample.push(pixels[i])
  }
  const clusters = sample.slice(0, count).map(p => ({ center: [...p], points: [] }))
  for (let iter = 0; iter < 8; iter++) {
    clusters.forEach(c => c.points = [])
    for (const p of sample) {
      let best = 0, bestDist = Infinity
      clusters.forEach((c, i) => {
        const d = (p[0] - c.center[0]) ** 2 + (p[1] - c.center[1]) ** 2 + (p[2] - c.center[2]) ** 2
        if (d < bestDist) { bestDist = d; best = i }
      })
      clusters[best].points.push(p)
    }
    clusters.forEach(c => {
      if (c.points.length > 0) {
        c.center = [
          Math.round(c.points.reduce((s, p) => s + p[0], 0) / c.points.length),
          Math.round(c.points.reduce((s, p) => s + p[1], 0) / c.points.length),
          Math.round(c.points.reduce((s, p) => s + p[2], 0) / c.points.length),
        ]
      }
    })
  }
  return clusters.map(c => {
    const hex = '#' + c.center.map(v => v.toString(16).padStart(2, '0')).join('')
    return hex
  })
}

export default function ColorPalette() {
  const [colors, setColors] = useState([])
  const [preview, setPreview] = useState(null)
  const [snack, setSnack] = useState(false)
  const [snackMsg, setSnackMsg] = useState('')
  const canvasRef = useRef(null)

  const handleUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => {
      const img = new Image()
      img.onload = () => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        const size = Math.min(img.width, img.height, 300)
        canvas.width = size
        canvas.height = size
        ctx.drawImage(img, 0, 0, size, size)
        const imageData = ctx.getImageData(0, 0, size, size).data
        const palette = extractColors(imageData, 6)
        setColors(palette)
        setPreview(event.target.result)
      }
      img.src = event.target.result
    }
    reader.readAsDataURL(file)
  }

  const copy = (hex) => {
    navigator.clipboard.writeText(hex)
    setSnackMsg(`${hex} copied!`)
    setSnack(true)
  }

  const copyAll = () => {
    navigator.clipboard.writeText(colors.join(', '))
    setSnackMsg('All colors copied!')
    setSnack(true)
  }

  return (
    <ToolLayout title="Color Palette Generator" description="Extract beautiful color palettes from any image. Get hex codes for your design projects." category="Creative">
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <Paper sx={{ p: 4, borderRadius: 4 }}>
        {!preview ? (
          <Box textAlign="center" sx={{ py: 6 }}>
            <input type="file" accept="image/*" onChange={handleUpload} id="color-upload" style={{ display: 'none' }} />
            <label htmlFor="color-upload">
              <Button component="span" variant="contained" size="large" startIcon={<UploadIcon />} sx={{ px: 5, py: 1.5 }}>
                Upload Image
              </Button>
            </label>
            <Typography color="text.secondary" mt={2}>Upload a photo or design to extract its colors</Typography>
          </Box>
        ) : (
          <>
            <Box sx={{ display: 'flex', gap: 3, mb: 4, flexDirection: { xs: 'column', md: 'row' } }}>
              <Box sx={{ width: { xs: '100%', md: 200 }, height: 200, borderRadius: 3, overflow: 'hidden', flexShrink: 0 }}>
                <img src={preview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </Box>
              <Box flex={1}>
                <Typography variant="h6" fontWeight={700} mb={2}>Extracted Palette</Typography>
                <Stack direction="row" spacing={1.5} flexWrap="wrap" mb={3}>
                  {colors.map((hex, i) => (
                    <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.08 }}>
                      <Paper
                        variant="outlined"
                        sx={{
                          width: 80, height: 80, borderRadius: 2, overflow: 'hidden',
                          display: 'flex', flexDirection: 'column', cursor: 'pointer',
                        }}
                        onClick={() => copy(hex)}
                      >
                        <Box sx={{ flex: 1, bgcolor: hex }} />
                        <Box sx={{ p: 0.5, textAlign: 'center', bgcolor: '#fff' }}>
                          <Typography variant="caption" fontWeight={700} fontSize="0.65rem">{hex.toUpperCase()}</Typography>
                        </Box>
                      </Paper>
                    </motion.div>
                  ))}
                </Stack>
                <Stack direction="row" spacing={1}>
                  <Button variant="outlined" size="small" onClick={copyAll} startIcon={<ContentCopyIcon />}>Copy All</Button>
                  <label htmlFor="color-upload">
                    <Button component="span" variant="outlined" size="small" startIcon={<UploadIcon />} sx={{ cursor: 'pointer' }}>New Image</Button>
                  </label>
                </Stack>
              </Box>
            </Box>

            {/* Large Swatches */}
            <Box sx={{ display: 'flex', borderRadius: 3, overflow: 'hidden', height: 60 }}>
              {colors.map((hex, i) => (
                <Box key={i} sx={{ flex: 1, bgcolor: hex, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', pb: 1, cursor: 'pointer' }} onClick={() => copy(hex)}>
                  <Typography variant="caption" fontWeight={700} sx={{ color: '#fff', textShadow: '0 1px 3px rgba(0,0,0,0.5)', fontSize: '0.7rem' }}>{hex}</Typography>
                </Box>
              ))}
            </Box>
          </>
        )}
      </Paper>
      <Snackbar open={snack} autoHideDuration={1500} onClose={() => setSnack(false)} message={snackMsg} />
    </ToolLayout>
  )
}
