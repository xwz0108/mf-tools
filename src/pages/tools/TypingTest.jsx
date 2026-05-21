import { useState, useEffect, useRef, useCallback } from 'react'
import { Typography, Box, Paper, Button, LinearProgress, Chip, Stack } from '@mui/material'
import KeyboardIcon from '@mui/icons-material/Keyboard'
import SpeedIcon from '@mui/icons-material/Speed'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ToolLayout from '../../components/ToolLayout'
import { motion, AnimatePresence } from 'framer-motion'

const TEXTS = [
  'The quick brown fox jumps over the lazy dog near the river bank',
  'Technology is best when it brings people together in meaningful ways',
  'Success is not final failure is not fatal it is the courage to continue',
  'The only way to do great work is to love what you do every single day',
  'Innovation distinguishes between a leader and a follower in any field',
]

export default function TypingTest() {
  const [text, setText] = useState('')
  const [input, setInput] = useState('')
  const [started, setStarted] = useState(false)
  const [finished, setFinished] = useState(false)
  const [startTime, setStartTime] = useState(null)
  const [wpm, setWpm] = useState(0)
  const [accuracy, setAccuracy] = useState(100)
  const [correctChars, setCorrectChars] = useState(0)
  const [totalChars, setTotalChars] = useState(0)
  const inputRef = useRef(null)

  useEffect(() => {
    setText(TEXTS[Math.floor(Math.random() * TEXTS.length)])
  }, [])

  const startTest = () => {
    setInput('')
    setStarted(true)
    setFinished(false)
    setStartTime(Date.now())
    setWpm(0)
    setAccuracy(100)
    setCorrectChars(0)
    setTotalChars(0)
    setText(TEXTS[Math.floor(Math.random() * TEXTS.length)])
    setTimeout(() => inputRef.current?.focus(), 100)
  }

  const handleInput = useCallback((e) => {
    const val = e.target.value
    if (!started && !finished) {
      setStarted(true)
      setStartTime(Date.now())
    }
    setInput(val)
    let correct = 0
    for (let i = 0; i < val.length; i++) {
      if (val[i] === text[i]) correct++
    }
    setCorrectChars(correct)
    setTotalChars(val.length)

    // Check if finished
    if (val.length >= text.length) {
      setFinished(true)
      const elapsed = (Date.now() - startTime) / 1000 / 60
      const words = text.split(' ').length
      setWpm(Math.round(words / Math.max(elapsed, 0.01)))
      const acc = Math.round((correct / text.length) * 100)
      setAccuracy(acc)
    } else if (startTime) {
      const elapsed = (Date.now() - startTime) / 1000 / 60
      const wordsTyped = val.trim().split(/\s+/).length
      setWpm(Math.round(wordsTyped / Math.max(elapsed, 0.01)))
    }
  }, [started, finished, text, startTime])

  return (
    <ToolLayout title="Typing Speed Test" description="Test your typing speed and accuracy. Race against the clock and track your WPM." category="Mini Games">
      <Paper sx={{ p: 4, borderRadius: 4 }}>
        {/* Stats Bar */}
        <Stack direction="row" spacing={3} justifyContent="center" sx={{ mb: 4 }}>
          <Box textAlign="center">
            <Typography variant="h3" fontWeight={800} color="primary.main">{wpm}</Typography>
            <Typography variant="caption" color="text.secondary">WPM</Typography>
          </Box>
          <Box textAlign="center">
            <Typography variant="h3" fontWeight={800} color={accuracy >= 90 ? '#2ecc71' : accuracy >= 70 ? '#f39c12' : '#e74c3c'}>{accuracy}%</Typography>
            <Typography variant="caption" color="text.secondary">Accuracy</Typography>
          </Box>
          <Box textAlign="center">
            <Typography variant="h3" fontWeight={800} color="text.primary">{correctChars}/{text.length}</Typography>
            <Typography variant="caption" color="text.secondary">Characters</Typography>
          </Box>
        </Stack>

        {/* Text Display */}
        <Paper variant="outlined" sx={{ p: 3, mb: 3, borderRadius: 3, bgcolor: '#fafbfc', fontFamily: 'monospace', fontSize: '1.2rem', lineHeight: 2, minHeight: 120 }}>
          {text.split('').map((char, i) => {
            let color = '#94a3b8'
            if (i < input.length) {
              color = input[i] === char ? '#2ecc71' : '#e74c3c'
            }
            if (i === input.length && started && !finished) color = '#4361ee'
            return (
              <span key={i} style={{ color, backgroundColor: i === input.length ? 'rgba(67,97,238,0.1)' : 'transparent', borderRadius: 2, padding: '0 1px' }}>
                {char}
              </span>
            )
          })}
        </Paper>

        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <input
            ref={inputRef}
            value={input}
            onChange={handleInput}
            disabled={finished}
            placeholder={started ? 'Start typing...' : 'Click Start to begin'}
            style={{
              flex: 1, padding: '14px 18px', borderRadius: 12, border: '2px solid #e2e8f0',
              fontSize: '1.1rem', fontFamily: 'monospace', outline: 'none',
              borderColor: finished ? '#2ecc71' : started ? '#4361ee' : '#e2e8f0',
            }}
          />
          <Button variant="contained" onClick={startTest} sx={{ px: 3, py: 1.5 }}>
            {finished ? 'Retry' : 'Start'}
          </Button>
        </Box>
      </Paper>
    </ToolLayout>
  )
}
