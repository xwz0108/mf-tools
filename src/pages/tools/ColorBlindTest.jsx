import { useState, useCallback } from 'react'
import { Typography, Box, Paper, Button, Stack, Chip } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import ToolLayout from '../../components/ToolLayout'
import { motion, AnimatePresence } from 'framer-motion'

function generateChallenge(difficulty) {
  const gridSize = 3 + difficulty
  const total = gridSize * gridSize
  const baseColor = `hsl(${Math.floor(Math.random() * 360)}, 65%, 55%)`
  const diff = Math.max(3, 25 - difficulty * 3)
  const oddIndex = Math.floor(Math.random() * total)
  return { gridSize, oddIndex, baseColor, diff, total }
}

function GridCell({ color, isOdd, onClick, revealed }) {
  return (
    <Box
      onClick={onClick}
      sx={{
        aspectRatio: '1',
        borderRadius: 2,
        bgcolor: color,
        cursor: 'pointer',
        transition: 'transform 0.15s ease',
        border: revealed ? '3px solid #4361ee' : '3px solid transparent',
        '&:hover': { transform: 'scale(1.05)', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' },
        '&:active': { transform: 'scale(0.95)' },
      }}
    />
  )
}

export default function ColorBlindTest() {
  const [difficulty, setDifficulty] = useState(1)
  const [score, setScore] = useState(0)
  const [round, setRound] = useState(0)
  const [gameState, setGameState] = useState('idle') // idle | playing | won | lost
  const [challenge, setChallenge] = useState(null)
  const [lives, setLives] = useState(3)
  const [message, setMessage] = useState('')

  const startGame = () => {
    setScore(0)
    setRound(1)
    setLives(3)
    setGameState('playing')
    setMessage('')
    const c = generateChallenge(difficulty)
    setChallenge(c)
  }

  const handleCellClick = useCallback((index) => {
    if (gameState !== 'playing' || !challenge) return
    if (index === challenge.oddIndex) {
      setScore(s => s + 1)
      setRound(r => {
        const newRound = r + 1
        if (newRound % 5 === 0) {
          setDifficulty(d => Math.min(d + 1, 6))
          setMessage('Difficulty increased!')
        }
        return newRound
      })
      setChallenge(generateChallenge(difficulty))
      setMessage('Correct! Well spotted.')
    } else {
      setLives(l => {
        const newLives = l - 1
        if (newLives <= 0) {
          setGameState('lost')
          setMessage('Game Over!')
        } else {
          setMessage('Wrong! Try again.')
        }
        return newLives
      })
    }
    setTimeout(() => setMessage(''), 1500)
  }, [gameState, challenge, difficulty])

  if (!challenge && gameState === 'idle') {
    return (
      <ToolLayout title="Color Blind Challenge" description="Can you spot the different color? Test your color perception with increasing difficulty." category="Mini Games">
        <Paper sx={{ p: 6, borderRadius: 4, textAlign: 'center' }}>
          <VisibilityIcon sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
          <Typography variant="h5" fontWeight={700} mb={1}>How good is your color vision?</Typography>
          <Typography color="text.secondary" mb={4}>Find the one square with a different color. Difficulty increases as you progress.</Typography>
          <Button variant="contained" size="large" onClick={startGame} sx={{ px: 5, py: 1.5 }}>
            Start Challenge
          </Button>
        </Paper>
      </ToolLayout>
    )
  }

  return (
    <ToolLayout title="Color Blind Challenge" description="Can you spot the different color? Test your color perception with increasing difficulty." category="Mini Games">
      <Paper sx={{ p: 4, borderRadius: 4 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
          <Box>
            <Typography variant="h4" fontWeight={800} color="primary.main">Score: {score}</Typography>
            <Typography variant="body2" color="text.secondary">Round {round}</Typography>
          </Box>
          <Box>
            <Box sx={{ display: 'flex', gap: 0.5, mb: 0.5, justifyContent: 'flex-end' }}>
              {[...Array(lives)].map((_, i) => (
                <Box key={i} sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#e74c3c' }} />
              ))}
            </Box>
            <Typography variant="caption" color="text.secondary">Lives</Typography>
          </Box>
          <Chip label={`Level ${difficulty}`} color="primary" size="small" />
        </Stack>

        <AnimatePresence>
          {message && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <Chip label={message} color={message.includes('Correct') ? 'success' : message.includes('Wrong') ? 'warning' : 'primary'} sx={{ mb: 2 }} />
            </motion.div>
          )}
        </AnimatePresence>

        {challenge && (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: `repeat(${challenge.gridSize}, 1fr)`,
              gap: 1.5,
              maxWidth: 500,
              mx: 'auto',
              mb: 3,
            }}
          >
            {Array.from({ length: challenge.total }).map((_, i) => {
              const hue = parseInt(challenge.baseColor.match(/\d+/)?.[0] || 0)
              const isOdd = i === challenge.oddIndex
              const color = isOdd
                ? `hsl(${(hue + challenge.diff) % 360}, 65%, 55%)`
                : challenge.baseColor
              return (
                <GridCell
                  key={i}
                  color={color}
                  isOdd={isOdd}
                  onClick={() => handleCellClick(i)}
                  revealed={false}
                />
              )
            })}
          </Box>
        )}

        {gameState === 'lost' && (
          <Box textAlign="center" sx={{ mt: 3 }}>
            <Typography variant="h5" gutterBottom>Final Score: {score}</Typography>
            <Button variant="contained" onClick={startGame}>Play Again</Button>
          </Box>
        )}
      </Paper>
    </ToolLayout>
  )
}
