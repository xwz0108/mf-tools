import { useState } from 'react'
import { Typography, Box, Paper, Button, IconButton, Snackbar } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import ToolLayout from '../../components/ToolLayout'
import { motion, AnimatePresence } from 'framer-motion'

const FORTUNES = [
  { text: 'A beautiful journey awaits you around the next corner.', emoji: '🌸' },
  { text: 'Your kindness will lead you to unexpected treasures.', emoji: '💎' },
  { text: 'The stars are aligning in your favor today.', emoji: '✨' },
  { text: 'Someone you miss is thinking of you right now.', emoji: '💭' },
  { text: 'A surprising opportunity will present itself soon.', emoji: '🚪' },
  { text: 'Your creativity will bring you great success this week.', emoji: '🎨' },
  { text: 'An old friend will reach out with wonderful news.', emoji: '📬' },
  { text: 'Trust your intuition — it knows the way.', emoji: '🧭' },
  { text: 'The best is yet to come. Stay patient and hopeful.', emoji: '🌅' },
  { text: 'Laughter is the shortest distance between two people.', emoji: '😊' },
  { text: 'A small act of kindness will change someone\'s day.', emoji: '🌻' },
  { text: 'Your perseverance will pay off in unexpected ways.', emoji: '🏔️' },
  { text: 'Today is full of possibilities. Seize one.', emoji: '⚡' },
  { text: 'The answer you seek is closer than you think.', emoji: '🔍' },
  { text: 'Great things never come from comfort zones.', emoji: '🦋' },
]

export default function FortuneCookie() {
  const [stage, setStage] = useState('idle') // idle | opening | open
  const [fortune, setFortune] = useState(null)
  const [snack, setSnack] = useState(false)

  const crack = () => {
    setStage('opening')
    setTimeout(() => {
      setFortune(FORTUNES[Math.floor(Math.random() * FORTUNES.length)])
      setStage('open')
    }, 1500)
  }

  return (
    <ToolLayout title="Fortune Cookie" description="Crack open a virtual fortune cookie and discover your destiny. Shareable fortunes inspired by ancient wisdom." category="Fun Generators">
      <Paper sx={{ p: 4, borderRadius: 4, textAlign: 'center', minHeight: 400, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <AnimatePresence mode="wait">
          {stage === 'idle' && (
            <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Typography sx={{ fontSize: '6rem', mb: 3, cursor: 'pointer' }}>🥠</Typography>
              <Typography variant="h5" fontWeight={700} mb={1}>Your Fortune Awaits</Typography>
              <Typography color="text.secondary" mb={4}>What does the universe have in store for you?</Typography>
              <Button variant="contained" size="large" onClick={crack} sx={{ px: 5, py: 1.5, fontSize: '1.1rem' }}>
                Crack It Open
              </Button>
            </motion.div>
          )}

          {stage === 'opening' && (
            <motion.div key="opening" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1, rotate: [0, 15, -15, 0] }} transition={{ type: 'spring' }}>
              <Typography sx={{ fontSize: '4rem' }}>💥</Typography>
              <Typography variant="h6" color="text.secondary">Cracking open...</Typography>
            </motion.div>
          )}

          {stage === 'open' && fortune && (
            <motion.div key="open" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 150 }}>
              <Paper variant="outlined" sx={{ p: 4, borderRadius: 3, bgcolor: 'rgba(67,97,238,0.03)', maxWidth: 400, mx: 'auto', mb: 3 }}>
                <Typography sx={{ fontSize: '3rem', mb: 2 }}>{fortune.emoji}</Typography>
                <Typography variant="h6" sx={{ fontWeight: 500, fontStyle: 'italic', lineHeight: 1.8, mb: 2 }}>
                  "{fortune.text}"
                </Typography>
                <Box sx={{ width: 60, height: 1, bgcolor: 'primary.main', mx: 'auto', opacity: 0.3 }} />
              </Paper>

              <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                <IconButton onClick={() => { navigator.clipboard.writeText(`🥠 ${fortune.text}`); setSnack(true) }} color="primary">
                  <ContentCopyIcon />
                </IconButton>
                <Button variant="outlined" onClick={() => setStage('idle')} sx={{ px: 4 }}>
                  Another One
                </Button>
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
      </Paper>
      <Snackbar open={snack} autoHideDuration={1500} onClose={() => setSnack(false)} message="Fortune copied!" />
    </ToolLayout>
  )
}
