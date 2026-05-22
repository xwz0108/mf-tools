import { useState, useRef } from 'react'
import { Typography, Box, Paper, Button, TextField, Chip, Stack, IconButton } from '@mui/material'
import DownloadIcon from '@mui/icons-material/Download'
import ShuffleIcon from '@mui/icons-material/Shuffle'
import ToolLayout from '../../components/ToolLayout'

const TEMPLATES = [
  { name: 'Drake', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)' },
  { name: 'Distracted BF', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
  { name: 'Two Buttons', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
  { name: 'Change My Mind', gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
  { name: 'One Does Not', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
  { name: 'This Is Fine', gradient: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)' },
  { name: 'Flex Tape', gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)' },
  { name: 'Surprised Pikachu', gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)' },
]

export default function MemeMaker() {
  const [template, setTemplate] = useState(TEMPLATES[0])
  const [topText, setTopText] = useState('TOP TEXT')
  const [bottomText, setBottomText] = useState('BOTTOM TEXT')
  const canvasRef = useRef(null)
  const containerRef = useRef(null)

  const exportMeme = () => {
    const container = containerRef.current
    if (!container) return
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    canvas.width = 500
    canvas.height = 500
    ctx.fillStyle = '#1a1a2e'
    ctx.fillRect(0, 0, 500, 500)
    ctx.font = 'bold 36px Impact, sans-serif'
    ctx.fillStyle = '#fff'
    ctx.strokeStyle = '#000'
    ctx.lineWidth = 3
    ctx.textAlign = 'center'

    ctx.strokeText(topText.toUpperCase(), 250, 80)
    ctx.fillText(topText.toUpperCase(), 250, 80)

    ctx.strokeText(bottomText.toUpperCase(), 250, 440)
    ctx.fillText(bottomText.toUpperCase(), 250, 440)

    const link = document.createElement('a')
    link.download = 'meme.png'
    link.href = canvas.toDataURL()
    link.click()
  }

  return (
    <ToolLayout title="Meme Maker" description="Create custom memes with popular templates. Add top and bottom text and download instantly." category="Creative">
      <Paper sx={{ p: 4, borderRadius: 4 }}>
        <Typography variant="subtitle2" fontWeight={600} mb={1}>Choose Template</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
          {TEMPLATES.map(t => (
            <Chip key={t.name} label={t.name} onClick={() => setTemplate(t)} color={template.name === t.name ? 'primary' : 'default'} variant={template.name === t.name ? 'filled' : 'outlined'} sx={{ fontWeight: 600 }} />
          ))}
        </Box>

        {/* Preview */}
        <Box ref={containerRef} sx={{ width: '100%', maxWidth: 500, mx: 'auto', mb: 3, aspectRatio: '1', background: template.gradient, borderRadius: 3, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 4, border: '3px solid #1a1a2e' }}>
          <Typography variant="h4" sx={{ fontFamily: 'Impact, sans-serif', color: '#fff', textAlign: 'center', textShadow: '2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000' }}>
            {topText.toUpperCase()}
          </Typography>
          <Typography variant="h4" sx={{ fontFamily: 'Impact, sans-serif', color: '#fff', textAlign: 'center', textShadow: '2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000' }}>
            {bottomText.toUpperCase()}
          </Typography>
        </Box>

        <Stack spacing={2} mb={3}>
          <TextField value={topText} onChange={e => setTopText(e.target.value)} label="Top Text" fullWidth />
          <TextField value={bottomText} onChange={e => setBottomText(e.target.value)} label="Bottom Text" fullWidth />
        </Stack>

        <Button variant="contained" onClick={exportMeme} startIcon={<DownloadIcon />} fullWidth sx={{ py: 1.5 }}>
          Download Meme
        </Button>
      </Paper>
    </ToolLayout>
  )
}
