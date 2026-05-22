import { useState } from 'react'
import { Typography, Box, Paper, Button, IconButton, Snackbar } from '@mui/material'
import ShuffleIcon from '@mui/icons-material/Shuffle'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt'
import ToolLayout from '../../components/ToolLayout'
import { motion, AnimatePresence } from 'framer-motion'

const JOKES = [
  "Why don't skeletons fight each other? They don't have the guts.",
  "I told my wife she was drawing her eyebrows too high. She looked surprised.",
  "What do you call a fish with no eyes? A fsh.",
  "I'm reading a book on anti-gravity. It's impossible to put down.",
  "Why did the scarecrow win an award? Because he was outstanding in his field.",
  "Did you hear about the mathematician who's afraid of negative numbers? He'll stop at nothing to avoid them.",
  "Why don't scientists trust atoms? Because they make up everything.",
  "I used to play piano by ear, but now I use my hands.",
  "What do you call a bear with no teeth? A gummy bear.",
  "Why did the cookie go to the doctor? It was feeling crumbly.",
  "Want to hear a construction joke? Sorry, I'm still working on it.",
  "I'm on a seafood diet. I see food and I eat it.",
  "Why do melons have weddings? Because they cantaloupe.",
  "Parallel lines have so much in common. It's a shame they'll never meet.",
  "I asked the librarian if the library had books on paranoia. She whispered, 'They're right behind you.'",
  "What did the janitor say when he jumped out of the closet? 'Supplies!'",
  "Why did the bicycle fall over? It was two tired.",
  "A man walked into a bar... and said 'ouch'.",
  "What do you call fake spaghetti? An impasta.",
  "I would tell you a pizza joke, but it's too cheesy.",
  "Why don't eggs tell jokes? They'd crack each other up.",
  "I don't trust stairs. They're always up to something.",
  "What's brown and sticky? A stick.",
  "Why did the golfer bring two pairs of pants? In case he got a hole in one.",
  "I told my computer I needed a break, and now it won't stop sending me Kit-Kats.",
]

export default function JokeGenerator() {
  const [joke, setJoke] = useState(null)
  const [snack, setSnack] = useState(false)

  const generate = () => {
    const pool = JOKES.filter(j => j !== joke)
    setJoke(pool[Math.floor(Math.random() * pool.length)])
  }

  return (
    <ToolLayout title="Dad Joke Generator" description="Get an endless supply of dad jokes. One-click copy, and discover new groan-worthy puns." category="Text Fun">
      <Paper sx={{ p: 4, borderRadius: 4, textAlign: 'center' }}>
        {!joke ? (
          <Box>
            <SentimentSatisfiedAltIcon sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
            <Typography variant="h5" fontWeight={700} mb={1}>Ready for some dad-level humor?</Typography>
            <Typography color="text.secondary" mb={4}>Warning: may cause eye-rolling and involuntary facepalming.</Typography>
            <Button variant="contained" size="large" onClick={generate} startIcon={<ShuffleIcon />} sx={{ px: 4, py: 1.5 }}>
              Generate a Dad Joke
            </Button>
          </Box>
        ) : (
          <Box>
            <AnimatePresence mode="wait">
              <motion.div key={joke} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
                <Paper variant="outlined" sx={{ p: 4, borderRadius: 3, bgcolor: 'rgba(247,37,133,0.04)', borderColor: 'rgba(247,37,133,0.2)', mb: 3 }}>
                  <Typography variant="h5" sx={{ fontStyle: 'italic', fontSize: { xs: '1.1rem', md: '1.4rem' }, lineHeight: 1.8 }}>
                    "{joke}"
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                    (🥁 badum-tss)
                  </Typography>
                </Paper>
              </motion.div>
            </AnimatePresence>

            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
              <IconButton onClick={() => { navigator.clipboard.writeText(joke); setSnack(true) }} color="primary">
                <ContentCopyIcon />
              </IconButton>
              <Button variant="contained" onClick={generate} startIcon={<ShuffleIcon />} sx={{ px: 4 }}>
                Another One!
              </Button>
            </Box>
          </Box>
        )}
      </Paper>
      <Snackbar open={snack} autoHideDuration={1500} onClose={() => setSnack(false)} message="Copied to clipboard!" />
    </ToolLayout>
  )
}
