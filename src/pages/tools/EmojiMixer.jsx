import { useState } from 'react'
import { Typography, Box, Paper, Button, Chip, IconButton, Snackbar } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import ShuffleIcon from '@mui/icons-material/Shuffle'
import ToolLayout from '../../components/ToolLayout'
import { motion, AnimatePresence } from 'framer-motion'

const EMOJIS = ['😀','😂','🤣','😍','🥰','😎','🤩','😇','🤔','😴','🥳','😤','🤯','🥶','😱','🤗','🫡','🥹','🫠','😈','👻','💀','👽','🤖','🎃','🦄','🐶','🐱','🦊','🐼','🐨','🐸','🦉','🦋','🌺','🌸','🍕','🍔','🌮','🍩','🎂','🍿','⚽','🎸','🎮','🚀','🌈','💎','🔥','💯','✨','🎉','🎊','💡','🔮','🎯','🧲','📌','💊']

function mixEmojis(e1, e2) {
  // Simple emoji mixing: create a visual combination
  const combos = [
    `${e1}${e2}`, `${e2}${e1}`,
    `${e1} ✨ ${e2}`, `${e1} + ${e2} = 💥`,
  ]
  return combos
}

export default function EmojiMixer() {
  const [emoji1, setEmoji1] = useState('😀')
  const [emoji2, setEmoji2] = useState('🐶')
  const [results, setResults] = useState([])
  const [snack, setSnack] = useState(false)

  const randomize = (setter) => {
    setter(EMOJIS[Math.floor(Math.random() * EMOJIS.length)])
  }

  const mix = () => {
    setResults(mixEmojis(emoji1, emoji2))
  }

  return (
    <ToolLayout title="Emoji Mixer" description="Combine two emojis to create fun mashups. A free alternative to Google Emoji Kitchen with unique combinations." category="Creative">
      <Paper sx={{ p: 4, borderRadius: 4, textAlign: 'center' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 3, mb: 4 }}>
          <Box textAlign="center">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} style={{ cursor: 'pointer' }} onClick={() => randomize(setEmoji1)}>
              <Typography variant="h1" sx={{ fontSize: '5rem', cursor: 'pointer', userSelect: 'none' }}>{emoji1}</Typography>
            </motion.div>
            <Typography variant="caption" color="text.secondary">Tap to change</Typography>
          </Box>

          <Typography variant="h3" color="text.secondary">+</Typography>

          <Box textAlign="center">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} style={{ cursor: 'pointer' }} onClick={() => randomize(setEmoji2)}>
              <Typography variant="h1" sx={{ fontSize: '5rem', cursor: 'pointer', userSelect: 'none' }}>{emoji2}</Typography>
            </motion.div>
            <Typography variant="caption" color="text.secondary">Tap to change</Typography>
          </Box>
        </Box>

        <Button variant="contained" size="large" onClick={mix} startIcon={<ShuffleIcon />} sx={{ px: 4, py: 1.5, mb: 4 }}>
          Mix Emojis!
        </Button>

        <AnimatePresence>
          {results.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Typography variant="h6" gutterBottom>Results:</Typography>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                {results.map((r, i) => (
                  <Paper key={i} variant="outlined" sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1, borderRadius: 3 }}>
                    <Typography variant="h5">{r}</Typography>
                    <IconButton size="small" onClick={() => { navigator.clipboard.writeText(r); setSnack(true) }}>
                      <ContentCopyIcon fontSize="small" />
                    </IconButton>
                  </Paper>
                ))}
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
      </Paper>

      {/* Emoji Grid */}
      <Paper sx={{ p: 3, mt: 3, borderRadius: 4 }}>
        <Typography variant="h6" fontWeight={700} mb={2}>Quick Pick</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {EMOJIS.map((e, i) => (
            <Chip
              key={i}
              label={e}
              onClick={() => { setEmoji1(e); mix() }}
              variant="outlined"
              sx={{ fontSize: '1.5rem', px: 1, '&:hover': { bgcolor: 'rgba(67,97,238,0.06)' } }}
            />
          ))}
        </Box>
      </Paper>

      <Snackbar open={snack} autoHideDuration={1500} onClose={() => setSnack(false)} message="Copied!" />
    </ToolLayout>
  )
}
