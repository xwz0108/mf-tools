import { useState, useRef, useCallback } from 'react'
import { Typography, Box, Paper, TextField, Button, IconButton, Snackbar, Stack, ToggleButtonGroup, ToggleButton } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'
import ToolLayout from '../../components/ToolLayout'

const MORSE_TO_TEXT = {
  '.-': 'A', '-...': 'B', '-.-.': 'C', '-..': 'D', '.': 'E', '..-.': 'F', '--.': 'G', '....': 'H',
  '..': 'I', '.---': 'J', '-.-': 'K', '.-..': 'L', '--': 'M', '-.': 'N', '---': 'O', '.--.': 'P',
  '--.-': 'Q', '.-.': 'R', '...': 'S', '-': 'T', '..-': 'U', '...-': 'V', '.--': 'W', '-..-': 'X',
  '-.--': 'Y', '--..': 'Z', '-----': '0', '.----': '1', '..---': '2', '...--': '3', '....-': '4',
  '.....': '5', '-....': '6', '--...': '7', '---..': '8', '----.': '9',
  '.-.-.-': '.', '--..--': ',', '..--..': '?', '.----.': "'", '-.-.--': '!', '-..-.': '/',
  '-.--.': '(', '-.--.-': ')', '.-...': '&', '---...': ':', '-.-.-.': ';', '-...-': '=',
  '.-.-.': '+', '-....-': '-', '..--.-': '_', '.-..-.': '"', '...-..-': '$', '.--.-.': '@',
}

const TEXT_TO_MORSE = {}
for (const [morse, text] of Object.entries(MORSE_TO_TEXT)) {
  TEXT_TO_MORSE[text] = morse
}

export default function MorseCode() {
  const [input, setInput] = useState('SOS')
  const [output, setOutput] = useState('... --- ...')
  const [mode, setMode] = useState('text-to-morse')
  const [snack, setSnack] = useState(false)
  const [playing, setPlaying] = useState(false)
  const audioCtxRef = useRef(null)

  const translate = useCallback(() => {
    if (mode === 'text-to-morse') {
      const result = input.toUpperCase().split('').map(c => TEXT_TO_MORSE[c] || (c === ' ' ? '/' : c)).join(' ')
      setOutput(result)
    } else {
      const words = input.split('/')
      const result = words.map(word =>
        word.trim().split(' ')
          .filter(Boolean)
          .map(code => MORSE_TO_TEXT[code] || '?')
          .join('')
      ).join(' ')
      setOutput(result)
    }
  }, [input, mode])

  const playSound = useCallback(() => {
    if (playing) return
    setPlaying(true)
    const ctx = audioCtxRef.current || new (window.AudioContext || window.webkitAudioContext)()
    audioCtxRef.current = ctx

    const morseStr = mode === 'text-to-morse' ? output : input
    const codes = morseStr.replace(/\s+/g, ' ').trim().split('')
    
    let t = ctx.currentTime
    const dotLen = 0.08
    for (const c of codes) {
      if (c === '.') {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.connect(gain); gain.connect(ctx.destination)
        osc.frequency.value = 700; osc.type = 'sine'
        gain.gain.setValueAtTime(0.3, t)
        gain.gain.setValueAtTime(0, t + dotLen)
        osc.start(t); osc.stop(t + dotLen)
        t += dotLen + 0.08
      } else if (c === '-') {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.connect(gain); gain.connect(ctx.destination)
        osc.frequency.value = 700; osc.type = 'sine'
        gain.gain.setValueAtTime(0.3, t)
        gain.gain.setValueAtTime(0, t + dotLen * 3)
        osc.start(t); osc.stop(t + dotLen * 3)
        t += dotLen * 3 + 0.08
      } else if (c === ' ') {
        t += dotLen * 3
      } else if (c === '/') {
        t += dotLen * 7
      }
    }
    setTimeout(() => setPlaying(false), (t - ctx.currentTime) * 1000 + 500)
  }, [output, input, mode, playing])

  return (
    <ToolLayout title="Morse Code Translator" description="Translate text to Morse code and back. Listen to telegraph sounds with real audio playback." category="Text Fun">
      <Paper sx={{ p: 4, borderRadius: 4 }}>
        <ToggleButtonGroup
          value={mode}
          exclusive
          onChange={(_, v) => v && setMode(v)}
          sx={{ mb: 3 }}
          size="small"
        >
          <ToggleButton value="text-to-morse">Text → Morse</ToggleButton>
          <ToggleButton value="morse-to-text">Morse → Text</ToggleButton>
        </ToggleButtonGroup>

        <TextField
          value={input}
          onChange={e => { setInput(e.target.value); setTimeout(() => translate(), 10) }}
          onBlur={translate}
          placeholder={mode === 'text-to-morse' ? 'Enter text (e.g. SOS)' : 'Enter Morse (e.g. ... --- ...)'}
          fullWidth
          multiline
          rows={3}
          sx={{ mb: 3 }}
          InputProps={{ sx: { fontSize: '1.1rem', borderRadius: 3, fontFamily: mode === 'morse-to-text' ? 'monospace' : 'inherit' } }}
        />

        <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, bgcolor: '#f8fafc', position: 'relative', mb: 2 }}>
          <Typography variant="h5" sx={{ fontFamily: 'monospace', wordBreak: 'break-all', minHeight: 40 }}>
            {output || 'Translation appears here'}
          </Typography>
        </Paper>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <Button startIcon={<VolumeUpIcon />} onClick={playSound} disabled={playing || !output} variant="outlined" size="small">
            {playing ? 'Playing...' : 'Play Sound'}
          </Button>
          <IconButton onClick={() => { navigator.clipboard.writeText(output); setSnack(true) }} color="primary" size="small">
            <ContentCopyIcon />
          </IconButton>
        </Box>
      </Paper>
      <Snackbar open={snack} autoHideDuration={1500} onClose={() => setSnack(false)} message="Copied!" />
    </ToolLayout>
  )
}
