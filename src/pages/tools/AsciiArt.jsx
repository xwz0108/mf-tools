import { useState, useRef, useCallback } from 'react'
import { Typography, Box, Paper, Button, TextField, Select, MenuItem, Stack } from '@mui/material'
import UploadIcon from '@mui/icons-material/Upload'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import ToolLayout from '../../components/ToolLayout'

const CHARSETS = {
  standard: '@%#*+=-:. ',
  detailed: '$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,"^\'. ',
  blocks: '█▓▒░ ',
  simple: '#+-. ',
  binary: '10 ',
}

export default function AsciiArt() {
  const [image, setImage] = useState(null)
  const [ascii, setAscii] = useState('')
  const [charset, setCharset] = useState('standard')
  const [snack, setSnack] = useState(false)
  const canvasRef = useRef(null)

  const convertToAscii = useCallback((img, chars) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const w = 80; const h = Math.round(w * img.height / img.width * 0.5)
    canvas.width = w; canvas.height = h
    ctx.drawImage(img, 0, 0, w, h)
    const data = ctx.getImageData(0, 0, w, h).data
    let result = ''
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const idx = (y * w + x) * 4
        const gray = (data[idx] + data[idx+1] + data[idx+2]) / 3
        const charIdx = Math.floor(gray / 255 * (chars.length - 1))
        result += chars[charIdx]
      }
      result += '\n'
    }
    return result
  }, [])

  const handleUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const img = new Image()
      img.onload = () => {
        setImage(ev.target.result)
        const chars = CHARSETS[charset]
        const text = convertToAscii(img, chars)
        setAscii(text)
      }
      img.src = ev.target.result
    }
    reader.readAsDataURL(file)
  }

  const handleCharsetChange = (e) => {
    const val = e.target.value
    setCharset(val)
    if (image) {
      const img = new Image()
      img.onload = () => { const text = convertToAscii(img, CHARSETS[val]); setAscii(text) }
      img.src = image
    }
  }

  return (
    <ToolLayout title="ASCII Art Generator" description="Convert any image into ASCII art. Adjust character sets for unique results." category="Creative">
      <Paper sx={{ p: 4, borderRadius: 4 }}>
        {!image ? (
          <Box textAlign="center" py={6}>
            <UploadIcon sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
            <Typography variant="h5" fontWeight={700} mb={3}>Upload Image to Convert</Typography>
            <Button variant="contained" component="label">
              Choose Image
              <input type="file" accept="image/*" hidden onChange={handleUpload} />
            </Button>
          </Box>
        ) : (
          <>
            <Box sx={{ mb: 3 }}>
              <img src={image} alt="preview" style={{ maxWidth: 200, borderRadius: 12 }} />
            </Box>
            <Stack direction="row" spacing={2} mb={2} alignItems="center">
              <Typography fontWeight={600}>Style:</Typography>
              <Select value={charset} onChange={handleCharsetChange} size="small">
                {Object.keys(CHARSETS).map(k => <MenuItem key={k} value={k}>{k}</MenuItem>)}
              </Select>
            </Stack>
            <Paper variant="outlined" sx={{ p: 2, borderRadius: 3, bgcolor: '#1a1a2e', color: '#e2e8f0', fontSize: '0.35rem', fontFamily: 'monospace', lineHeight: 1, overflow: 'auto', maxHeight: 400, mb: 2 }}>
              <pre style={{ margin: 0 }}>{ascii}</pre>
            </Paper>
            <Button startIcon={<ContentCopyIcon />} variant="contained" onClick={() => { navigator.clipboard.writeText(ascii); setSnack(true) }}>
              Copy ASCII Art
            </Button>
          </>
        )}
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </Paper>
      <Snackbar open={snack} autoHideDuration={1500} onClose={() => setSnack(false)} message="Copied!" />
    </ToolLayout>
  )
}
