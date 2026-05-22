import { useState, useEffect, useCallback } from 'react'
import { Typography, Box, Paper, Button, Stack, Chip } from '@mui/material'
import MemoryIcon from '@mui/icons-material/Memory'
import ToolLayout from '../../components/ToolLayout'

export default function MemoryGame() {
  const [sequence, setSequence] = useState([])
  const [playerSeq, setPlayerSeq] = useState([])
  const [phase, setPhase] = useState('intro') // intro | showing | input | win | lost
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [level, setLevel] = useState(1)
  const [best, setBest] = useState(() => parseInt(localStorage.getItem('memoryBest')) || 0)

  const startGame = useCallback(() => {
    const seq = Array.from({ length: level + 2 }, () => Math.floor(Math.random() * 10).toString())
    setSequence(seq)
    setPlayerSeq([])
    setPhase('showing')
    setCurrentIndex(-1)
  }, [level])

  useEffect(() => {
    if (phase === 'showing') {
      if (currentIndex < sequence.length - 1) {
        const timer = setTimeout(() => setCurrentIndex(i => i + 1), 800)
        return () => clearTimeout(timer)
      } else {
        setTimeout(() => setPhase('input'), 500)
      }
    }
  }, [phase, currentIndex, sequence.length])

  const pressDigit = (d) => {
    if (phase !== 'input') return
    const newSeq = [...playerSeq, d]
    setPlayerSeq(newSeq)
    const idx = newSeq.length - 1
    if (d !== sequence[idx]) {
      setPhase('lost')
      return
    }
    if (newSeq.length === sequence.length) {
      const newLevel = level + 1
      setLevel(newLevel)
      if (newLevel > best) { setBest(newLevel); localStorage.setItem('memoryBest', newLevel) }
      setPhase('win')
    }
  }

  return (
    <ToolLayout title="Memory Challenge" description="Remember increasingly longer sequences of numbers. Train your short-term memory." category="Mini Games">
      <Paper sx={{ p: 4, borderRadius: 4, textAlign: 'center' }}>
        <Stack direction="row" spacing={3} justifyContent="center" mb={4}>
          <Box>
            <Typography variant="h4" fontWeight={800} color="primary.main">{level}</Typography>
            <Typography variant="caption" color="text.secondary">Level</Typography>
          </Box>
          <Box>
            <Typography variant="h4" fontWeight={800} sx={{ color: '#2ecc71' }}>{best}</Typography>
            <Typography variant="caption" color="text.secondary">Best</Typography>
          </Box>
        </Stack>

        {/* Display */}
        <Box sx={{ minHeight: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 4 }}>
          {phase === 'showing' && (
            <Typography variant="h1" fontWeight={800} color="primary.main" sx={{ fontSize: '5rem' }}>
              {sequence[currentIndex]}
            </Typography>
          )}
          {phase === 'input' && (
            <Typography variant="h2" fontWeight={700} color="text.secondary">
              Your turn! ({playerSeq.length}/{sequence.length})
            </Typography>
          )}
          {phase === 'win' && (
            <Typography variant="h3" fontWeight={800} color="#2ecc71">Correct! Level {level}</Typography>
          )}
          {phase === 'lost' && (
            <Typography variant="h3" fontWeight={800} color="#e74c3c">Game Over! Level {level}</Typography>
          )}
          {phase === 'intro' && (
            <Typography variant="h5" color="text.secondary" fontWeight={700}>Ready to train your memory?</Typography>
          )}
        </Box>

        {/* Numpad */}
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1.5, maxWidth: 300, mx: 'auto', mb: 4 }}>
          {[1,2,3,4,5,6,7,8,9,'',0,''].map((d, i) => (
            d === '' ? <Box key={i} /> : (
              <Box
                key={i}
                onClick={() => pressDigit(String(d))}
                sx={{
                  aspectRatio: '1', borderRadius: 3, bgcolor: phase === 'input' ? 'rgba(67,97,238,0.06)' : '#f1f5f9',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: phase === 'input' ? 'pointer' : 'default',
                  fontSize: '1.5rem', fontWeight: 700, userSelect: 'none',
                  '&:hover': phase === 'input' ? { bgcolor: 'rgba(67,97,238,0.15)' } : {},
                  '&:active': phase === 'input' ? { transform: 'scale(0.95)' } : {},
                  transition: 'all 0.1s',
                }}
              >
                {d}
              </Box>
            )
          ))}
        </Box>

        {(phase === 'win' || phase === 'lost' || phase === 'intro') && (
          <Button variant="contained" size="large" onClick={startGame} sx={{ px: 5 }}>
            {phase === 'intro' ? 'Start Game' : phase === 'win' ? 'Next Round' : 'Try Again'}
          </Button>
        )}
      </Paper>
    </ToolLayout>
  )
}
