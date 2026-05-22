import { useState } from 'react'
import { Typography, Box, Paper, Button, Chip, Stack, IconButton } from '@mui/material'
import ShuffleIcon from '@mui/icons-material/Shuffle'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import ToolLayout from '../../components/ToolLayout'
import { motion, AnimatePresence } from 'framer-motion'

const QUESTIONS = {
  mild: [
    { type: 'Truth', q: 'What is the most embarrassing song you listen to?' },
    { type: 'Truth', q: 'What is the silliest thing you have an emotional attachment to?' },
    { type: 'Truth', q: 'If you could switch lives with someone for a day, who would it be?' },
    { type: 'Dare', q: 'Do your best impression of a celebrity for 30 seconds' },
    { type: 'Dare', q: 'Speak in an accent for the next 3 rounds' },
    { type: 'Dare', q: 'Do 10 push-ups right now' },
    { type: 'Truth', q: 'What is your guilty pleasure TV show?' },
    { type: 'Truth', q: 'What is the weirdest food combination you enjoy?' },
    { type: 'Dare', q: 'Sing the chorus of your favorite song' },
    { type: 'Dare', q: 'Talk without closing your mouth for 30 seconds' },
  ],
  medium: [
    { type: 'Truth', q: 'What is the worst date you have ever been on?' },
    { type: 'Truth', q: 'Have you ever lied to get out of a social event?' },
    { type: 'Truth', q: 'What is the most trouble you have ever been in?' },
    { type: 'Truth', q: 'What is something you have done that you would judge someone else for?' },
    { type: 'Dare', q: 'Post a funny selfie on your social media story right now' },
    { type: 'Dare', q: 'Let someone in the group style your hair' },
    { type: 'Dare', q: 'Do your best dance moves for 30 seconds' },
    { type: 'Dare', q: 'Text a random contact "I knew you were trouble when you walked in"' },
    { type: 'Truth', q: 'What is the most awkward moment you have ever experienced?' },
    { type: 'Dare', q: 'Hold an ice cube in your hand until it melts' },
  ],
  spicy: [
    { type: 'Truth', q: 'Have you ever sent a text to the wrong person? What did it say?' },
    { type: 'Truth', q: 'What is the biggest secret you have kept from your parents?' },
    { type: 'Truth', q: 'What is something you have searched on incognito mode?' },
    { type: 'Truth', q: 'If you could date anyone in this room, who would it be?' },
    { type: 'Dare', q: 'Prank call a friend and keep them on the line for 2 minutes' },
    { type: 'Dare', q: 'Let the group scroll through your phone gallery for 30 seconds' },
    { type: 'Dare', q: 'Post "I think I am in love" on your social media and don not explain for 10 minutes' },
    { type: 'Dare', q: 'Show the last 5 people you DMd on any platform' },
    { type: 'Truth', q: 'What is the most embarrassing thing in your search history?' },
    { type: 'Dare', q: 'Eat a spoonful of a condiment of the group choice' },
  ],
}

export default function TruthOrDare() {
  const [level, setLevel] = useState('mild')
  const [current, setCurrent] = useState(null)

  const generate = () => {
    const pool = QUESTIONS[level]
    const picked = pool[Math.floor(Math.random() * pool.length)]
    setCurrent(picked)
  }

  return (
    <ToolLayout title="Truth or Dare" description="The classic party game with hundreds of questions. Choose mild, medium, or spicy difficulty." category="Decision & Random">
      <Paper sx={{ p: 4, borderRadius: 4, textAlign: 'center' }}>
        {/* Level Selector */}
        <Typography variant="h6" fontWeight={700} mb={2}>Choose Difficulty</Typography>
        <Stack direction="row" spacing={1} justifyContent="center" mb={4}>
          {['mild', 'medium', 'spicy'].map(l => (
            <Chip
              key={l}
              label={l.charAt(0).toUpperCase() + l.slice(1)}
              onClick={() => { setLevel(l); setCurrent(null) }}
              color={level === l ? 'primary' : 'default'}
              variant={level === l ? 'filled' : 'outlined'}
              sx={{ fontWeight: 600, px: 2 }}
            />
          ))}
        </Stack>

        <Button variant="contained" size="large" onClick={generate} startIcon={<ShuffleIcon />} sx={{ px: 5, py: 1.5, mb: 4, fontSize: '1.1rem' }}>
          Generate Question
        </Button>

        <AnimatePresence mode="wait">
          {current && (
            <motion.div key={current.q} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ type: 'spring' }}>
              <Paper variant="outlined" sx={{ p: 4, borderRadius: 3, bgcolor: current.type === 'Truth' ? 'rgba(67,97,238,0.04)' : 'rgba(247,37,133,0.04)', borderColor: current.type === 'Truth' ? '#4361ee' : '#f72585' }}>
                <Chip label={current.type} color={current.type === 'Truth' ? 'primary' : 'secondary'} sx={{ mb: 2, fontWeight: 700 }} />
                <Typography variant="h5" fontWeight={700} sx={{ fontSize: { xs: '1.2rem', md: '1.5rem' } }}>
                  {current.q}
                </Typography>
              </Paper>
            </motion.div>
          )}
        </AnimatePresence>
      </Paper>
    </ToolLayout>
  )
}
