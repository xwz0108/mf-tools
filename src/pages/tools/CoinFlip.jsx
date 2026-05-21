import { useState } from 'react'
import { Typography, Box, Paper, Button, Stack, Chip } from '@mui/material'
import ToolLayout from '../../components/ToolLayout'
import { motion } from 'framer-motion'

export default function CoinFlip() {
  const [coinResult, setCoinResult] = useState(null)
  const [flipping, setFlipping] = useState(false)
  const [history, setHistory] = useState([])
  const [diceResult, setDiceResult] = useState(null)

  const flipCoin = () => {
    setFlipping(true)
    setCoinResult(null)
    setTimeout(() => {
      const result = Math.random() > 0.5 ? 'Heads' : 'Tails'
      setCoinResult(result)
      setFlipping(false)
      setHistory(h => [...h.slice(-9), result])
    }, 1500)
  }

  const rollDice = () => {
    const result = Math.floor(Math.random() * 6) + 1
    setDiceResult(result)
  }

  return (
    <ToolLayout title="Coin Flip & Dice Roll" description="Make quick decisions with our virtual coin and dice. Realistic physics-like animations for better randomness." category="Decision & Random">
      {/* Coin Flip */}
      <Paper sx={{ p: 4, borderRadius: 4, textAlign: 'center', mb: 3 }}>
        <Typography variant="h5" fontWeight={700} mb={3}>Coin Flip</Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <motion.div
            animate={flipping ? { rotateY: [0, 720, 1440, 1800] } : {}}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            style={{ width: 120, height: 120, borderRadius: '50%', background: 'linear-gradient(135deg, #f7b731 0%, #fc5c65 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', color: '#fff' }}
          >
            🪙
          </motion.div>
        </Box>

        <Button variant="contained" size="large" onClick={flipCoin} disabled={flipping} sx={{ px: 4, py: 1.5, mb: 3 }}>
          {flipping ? 'Flipping...' : 'Flip It!'}
        </Button>

        {coinResult && (
          <Typography variant="h4" fontWeight={800} color={coinResult === 'Heads' ? 'primary.main' : 'secondary.main'}>
            {coinResult.toUpperCase()}!
          </Typography>
        )}

        {history.length > 0 && (
          <Box sx={{ mt: 2, display: 'flex', gap: 1, justifyContent: 'center' }}>
            {history.map((h, i) => (
              <Chip key={i} label={h[0]} size="small" color={h === 'Heads' ? 'primary' : 'secondary'} variant="outlined" />
            ))}
          </Box>
        )}
      </Paper>

      {/* Dice Roll */}
      <Paper sx={{ p: 4, borderRadius: 4, textAlign: 'center' }}>
        <Typography variant="h5" fontWeight={700} mb={3}>Dice Roll</Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <motion.div
            animate={diceResult ? { rotate: 360 } : {}}
            transition={{ duration: 0.5 }}
            style={{ width: 100, height: 100, borderRadius: 20, background: '#fff', border: '3px solid #1a1a2e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}
          >
            {diceResult ? ['', '⚀', '⚁', '⚂', '⚃', '⚄', '⚅'][diceResult] : '🎲'}
          </motion.div>
        </Box>

        <Button variant="outlined" size="large" onClick={rollDice} sx={{ px: 4 }}>
          Roll the Dice
        </Button>

        {diceResult && (
          <Typography variant="h4" fontWeight={800} mt={2}>
            You rolled a {diceResult}!
          </Typography>
        )}
      </Paper>
    </ToolLayout>
  )
}
