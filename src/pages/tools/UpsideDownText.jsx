import { useState } from 'react'
import { Typography, Box, Paper, TextField, Button, Stack, IconButton, Snackbar } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import ToolLayout from '../../components/ToolLayout'

export default function UpsideDownText() {
  const [input, setInput] = useState('Hello World')
  const [snack, setSnack] = useState(false)

  const flipMap = {}
  const normal = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,?!\'"()[]{}<>'
  const flipped = 'ɐqɔpǝɟƃɥᴉɾʞlɯuodbɹsʇnʌʍxʎzⱯᗺƆᗡƎᖵ⅁HIᒋꓘ⅂WNOԀᴚS⊥∩ΛMX⅄Z0ᛖ↊↋ↆↃↇↈ၊။,,¿¡,„)(][}{><'
  for (let i = 0; i < normal.length; i++) flipMap[normal[i]] = flipped[i]

  const flip = (text) => text.split('').reverse().map(c => flipMap[c] || c).join('')

  return (
    <ToolLayout title="Upside Down Text" description="Flip your text upside down with Unicode characters. Copy and paste to prank friends." category="Text Fun">
      <Paper sx={{ p: 4, borderRadius: 4 }}>
        <TextField
          value={input}
          onChange={e => setInput(e.target.value)}
          label="Your Text"
          fullWidth
          multiline
          rows={3}
          sx={{ mb: 3 }}
          InputProps={{ sx: { fontSize: '1.1rem', borderRadius: 3 } }}
        />

        <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, bgcolor: '#f8fafc', textAlign: 'center', mb: 2, transform: 'rotate(180deg)' }}>
          <Typography variant="h4" sx={{ wordBreak: 'break-all', fontWeight: 400 }}>
            {flip(input) || 'oןןǝɥ'}
          </Typography>
        </Paper>

        <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, bgcolor: '#f8fafc', mb: 2 }}>
          <Typography variant="h5" sx={{ wordBreak: 'break-all', fontWeight: 400, fontFamily: 'monospace' }}>
            {flip(input) || 'oןןǝɥ'}
          </Typography>
        </Paper>

        <Button
          variant="contained"
          startIcon={<ContentCopyIcon />}
          onClick={() => { navigator.clipboard.writeText(flip(input)); setSnack(true) }}
          size="large"
          fullWidth
        >
          Copy Upside Down Text
        </Button>
      </Paper>
      <Snackbar open={snack} autoHideDuration={1500} onClose={() => setSnack(false)} message="Copied!" />
    </ToolLayout>
  )
}
