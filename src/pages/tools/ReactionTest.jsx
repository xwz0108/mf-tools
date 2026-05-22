import { useState, useEffect, useRef } from 'react'
import { Typography, Box, Paper, Button, Chip, Stack } from '@mui/material'
import FlashOnIcon from '@mui/icons-material/FlashOn'
import ToolLayout from '../../components/ToolLayout'
import { motion, AnimatePresence } from 'framer-motion'

export default function ReactionTest() {
  const [state, setState] = useState('waiting') // waiting | ready | clicked | result
  const [bestTime, setBestTime] = useState(() => parseInt(localStorage.getItem('reactionBest')) || 0)
  const [lastTime, setLastTime] = useState(null)
  const [timeoutId, setTimeoutId] = useState(null)
  const [startTime, setStartTime] = useState(null)

  const start = () => {
    setState('waiting')
    const delay = 1000 + Math.random() * 3000
    const id = setTimeout(() => {
      setState('ready')
      setStartTime(Date.now())
    }, delay)
    setTimeoutId(id)
  }

  const click = () => {
    if (state === 'waiting') {
      clearTimeout(timeoutId)
      setState('early')
      return
    }
    if (state === 'ready') {
      const time = Date.now() - startTime
      setLastTime(time)
      if (time < bestTime || bestTime === 0) {
        setBestTime(time)
        localStorage.setItem('reactionBest', time)
      }
      setState('result')
    }
    if (state === 'early') { start() }
    if (state === 'result') { start() }
  }

  useEffect(() => () => clearTimeout(timeoutId), [])

  const colors = { waiting: '#f39c12', ready: '#2ecc71', clicked: '#4361ee', early: '#e74c3c', result: '#4361ee' }

  return (
    <ToolLayout title="Reaction Time Test" description="How fast are your reflexes? Click when the color changes and compare your score." category="Mini Games">
      <Paper sx={{ p: 4, borderRadius: 4 }}>
        <Stack direction="row" justifyContent="space-between" mb={4}>
          <Box><Typography variant="caption" color="text.secondary">Best</Typography><Typography variant="h5" fontWeight={800} color="secondary.main">{bestTime > 0 ? `${bestTime}ms` : '-'}</Typography></Box>
          <Box textAlign="right"><Typography variant="caption" color="text.secondary">Last</Typography><Typography variant="h5" fontWeight={800}>{lastTime !== null ? `${lastTime}ms` : '-'}</Typography></Box>
        </Stack>

        <Box
          onClick={click}
          sx={{
            width: '100%', height: 300, borderRadius: 4, cursor: 'pointer',
            bgcolor: state === 'ready' ? '#2ecc71' : state === 'early' ? '#e74c3c' : '#f39c12',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background-color 0.2s',
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div key={state} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Typography variant="h4" fontWeight={800} color="#fff">
                {state === 'waiting' ? 'Wait for green...' : state === 'ready' ? 'CLICK NOW!' : state === 'early' ? 'Too early! Click to retry' : `${lastTime}ms — Click to retry`}
              </Typography>
            </motion.div>
          </AnimatePresence>
        </Box>

        {state === 'waiting' ? (
          <Button variant="contained" fullWidth size="large" onClick={start} sx={{ mt: 2, py: 1.5 }}>Start</Button>
        ) : (
          <Chip label={state === 'early' ? 'Too early!' : 'In progress...'} color={state === 'early' ? 'error' : 'warning'} sx={{ mt: 2 }} />
        )}
      </Paper>
    </ToolLayout>
  )
}
