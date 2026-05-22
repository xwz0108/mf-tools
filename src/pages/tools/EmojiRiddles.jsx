import { useState, useEffect } from 'react'
import { Typography, Box, Paper, Button, TextField, Chip, LinearProgress } from '@mui/material'
import LightbulbIcon from '@mui/icons-material/Lightbulb'
import ReplayIcon from '@mui/icons-material/Replay'
import ToolLayout from '../../components/ToolLayout'
import { motion, AnimatePresence } from 'framer-motion'

const RIDDLES = [
  { emoji: '☀️👀😎', answer: 'sun glasses', hint: 'Eye protection from bright light' },
  { emoji: '🔥🚗', answer: 'hot wheels', hint: 'Toy cars or an overheated vehicle' },
  { emoji: '⏰🔙', answer: 'time travel', hint: 'Going back in time' },
  { emoji: '🏠💔😢', answer: 'home alone', hint: 'Classic Christmas movie' },
  { emoji: '🌧️🐱🐶', answer: 'raining cats and dogs', hint: 'Heavy rainfall idiom' },
  { emoji: '🍎📅', answer: 'apple a day', hint: 'Keeps the doctor away' },
  { emoji: '👑🦁', answer: 'lion king', hint: 'Disney animated classic' },
  { emoji: '🕷️👨', answer: 'spider man', hint: 'Marvel superhero' },
  { emoji: '🧊🧊👶', answer: 'ice ice baby', hint: 'Vanilla Ice song' },
  { emoji: '💡💡💡', answer: 'bright idea', hint: 'Moment of inspiration' },
  { emoji: '🎂🕯️', answer: 'birthday cake', hint: 'Celebration with candles and frosting' },
  { emoji: '📚🐛', answer: 'bookworm', hint: 'Someone who reads a lot' },
  { emoji: '🌙✨', answer: 'starry night', hint: 'Famous painting or nighttime sky' },
  { emoji: '🐝🍯', answer: 'honeybee', hint: 'Busy insect producing sweet stuff' },
  { emoji: '🌊🏄', answer: 'surfing', hint: 'Riding waves on a board' },
]

export default function EmojiRiddles() {
  const [riddle, setRiddle] = useState(null)
  const [guess, setGuess] = useState('')
  const [score, setScore] = useState(0)
  const [round, setRound] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [gameState, setGameState] = useState('idle') // idle | playing | correct | timeup
  const [hintUsed, setHintUsed] = useState(false)
  const [used, setUsed] = useState([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (gameState !== 'playing') return
    if (timeLeft <= 0) { setGameState('timeup'); return }
    const t = setTimeout(() => setTimeLeft(t => t - 1), 1000)
    return () => clearTimeout(t)
  }, [timeLeft, gameState])

  const startGame = () => {
    setScore(0); setRound(1); setGameState('playing'); setTimeLeft(30); setUsed([]);
    pickRiddle([])
  }

  const pickRiddle = (already) => {
    const pool = RIDDLES.filter(r => !already.includes(r))
    if (pool.length === 0) { setMessage('All riddles completed!'); setGameState('idle'); return }
    const r = pool[Math.floor(Math.random() * pool.length)]
    setRiddle(r); setGuess(''); setHintUsed(false); setTimeLeft(30)
  }

  const handleGuess = () => {
    if (!riddle || gameState !== 'playing') return
    if (guess.toLowerCase().trim() === riddle.answer) {
      setScore(s => s + (hintUsed ? 5 : 10))
      setGameState('correct')
      setMessage('Correct!')
    } else {
      setMessage('Wrong! Try again.')
    }
  }

  const nextRound = () => {
    const newUsed = [...used, riddle]
    setUsed(newUsed); setRound(r => r + 1); setGameState('playing')
    pickRiddle(newUsed); setMessage('')
  }

  const showHint = () => { setHintUsed(true); setMessage(riddle.hint) }

  if (!riddle && gameState === 'idle') {
    return (
      <ToolLayout title="Emoji Riddles" description="Guess the phrase from emoji clues. Timed rounds and increasing difficulty." category="Fun Generators">
        <Paper sx={{ p: 6, borderRadius: 4, textAlign: 'center' }}>
          <Typography variant="h1" sx={{ fontSize: '4rem', mb: 3 }}>🤔</Typography>
          <Typography variant="h5" fontWeight={700} mb={2}>Guess the Phrase!</Typography>
          <Typography color="text.secondary" mb={4}>Decode emoji riddles before time runs out.</Typography>
          <Button variant="contained" size="large" onClick={startGame} sx={{ px: 5, py: 1.5 }}>Start</Button>
        </Paper>
      </ToolLayout>
    )
  }

  return (
    <ToolLayout title="Emoji Riddles" description="Guess the phrase from emoji clues. Timed rounds and increasing difficulty." category="Fun Generators">
      <Paper sx={{ p: 4, borderRadius: 4, textAlign: 'center' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Chip label={`Score: ${score}`} color="primary" />
          <Chip label={`Round ${round}`} variant="outlined" />
          <Chip label={`${timeLeft}s`} color={timeLeft < 10 ? 'error' : 'default'} />
        </Box>

        <LinearProgress variant="determinate" value={(timeLeft / 30) * 100} sx={{ height: 6, borderRadius: 3, mb: 4 }} />

        <AnimatePresence mode="wait">
          {riddle && (
            <motion.div key={riddle.emoji} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0 }} transition={{ type: 'spring' }}>
              <Typography variant="h1" sx={{ fontSize: '4rem', mb: 4, userSelect: 'none' }}>
                {riddle.emoji}
              </Typography>
            </motion.div>
          )}
        </AnimatePresence>

        {gameState === 'playing' && (
          <>
            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', mb: 2 }}>
              <TextField value={guess} onChange={e => setGuess(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleGuess()} placeholder="Your guess..." size="small" sx={{ maxWidth: 300 }} />
              <Button variant="contained" onClick={handleGuess}>Guess</Button>
            </Box>
            <Button startIcon={<LightbulbIcon />} onClick={showHint} disabled={hintUsed} size="small" color="warning">
              {hintUsed ? 'Hint Used' : 'Hint (-5 pts)'}
            </Button>
          </>
        )}

        {message && <Chip label={message} color={message === 'Correct!' ? 'success' : 'warning'} sx={{ mb: 2 }} />}

        {(gameState === 'correct' || gameState === 'timeup') && (
          <Box mt={3}>
            {gameState === 'timeup' && <Typography color="error">Time is up! Answer: <strong>{riddle.answer}</strong></Typography>}
            <Button variant="contained" onClick={nextRound} startIcon={<ReplayIcon />} sx={{ mt: 2 }}>
              Next Riddle
            </Button>
          </Box>
        )}
      </Paper>
    </ToolLayout>
  )
}
