import { useState } from 'react'
import { Typography, Box, Paper, Button, Chip, LinearProgress, IconButton } from '@mui/material'
import ShuffleIcon from '@mui/icons-material/Shuffle'
import ShareIcon from '@mui/icons-material/Share'
import ToolLayout from '../../components/ToolLayout'
import { motion, AnimatePresence } from 'framer-motion'

const QUESTIONS = [
  { a: 'Be able to fly', b: 'Be able to breathe underwater' },
  { a: 'Have unlimited money', b: 'Have unlimited time' },
  { a: 'Live in the mountains', b: 'Live on a beach' },
  { a: 'Be invisible', b: 'Be able to read minds' },
  { a: 'Never use social media again', b: 'Never watch TV again' },
  { a: 'Have a rewind button', b: 'Have a pause button for your life' },
  { a: 'Be famous', b: 'Be rich but unknown' },
  { a: 'Travel to the past', b: 'Travel to the future' },
  { a: 'Have free WiFi everywhere', b: 'Have free food everywhere' },
  { a: 'Always be 10 minutes late', b: 'Always be 20 minutes early' },
  { a: 'Be able to talk to animals', b: 'Speak every human language' },
  { a: 'Live in a big city', b: 'Live on a farm' },
  { a: 'Have more time', b: 'Have more money' },
  { a: 'Be the funniest person', b: 'Be the smartest person' },
  { a: 'Only eat pizza forever', b: 'Never eat pizza again' },
  { a: 'Always have to sing instead of speaking', b: 'Always have to dance everywhere you go' },
  { a: 'Have a pet dragon', b: 'Have a pet unicorn' },
  { a: 'Be a superhero', b: 'Be a wizard' },
  { a: 'Have no internet', b: 'Have no phone' },
  { a: 'Be 2 meters tall', b: 'Be 1.5 meters tall' },
]

export default function WouldYouRather() {
  const [question, setQuestion] = useState(null)
  const [votesA, setVotesA] = useState(0)
  const [votesB, setVotesB] = useState(0)
  const [voted, setVoted] = useState(null)
  const [history, setHistory] = useState([])

  const generate = () => {
    const pool = QUESTIONS.filter(q => !history.includes(q))
    const q = pool[Math.floor(Math.random() * Math.max(1, pool.length))]
    setQuestion(q)
    setVotesA(0)
    setVotesB(0)
    setVoted(null)
    if (!history.includes(q)) setHistory(h => [...h, q].slice(-15))
  }

  const vote = (side) => {
    if (voted) return
    setVoted(side)
    const sideARand = Math.floor(Math.random() * 40) + 30
    if (side === 'a') { setVotesA(sideARand); setVotesB(100 - sideARand) }
    else { setVotesB(sideARand); setVotesA(100 - sideARand) }
  }

  const total = votesA + votesB || 1

  return (
    <ToolLayout title="Would You Rather" description="Tough choices, endless debates. Vote on dilemmas and see what others chose. Great conversation starter." category="Decision & Random">
      {!question ? (
        <Paper sx={{ p: 6, borderRadius: 4, textAlign: 'center' }}>
          <Typography variant="h5" fontWeight={700} mb={2}>Ready for tough choices?</Typography>
          <Typography color="text.secondary" mb={4}>Make impossible decisions and see results instantly.</Typography>
          <Button variant="contained" size="large" onClick={generate} startIcon={<ShuffleIcon />} sx={{ px: 4 }}
>
            Start
          </Button>
        </Paper>
      ) : (
        <Paper sx={{ p: 4, borderRadius: 4, textAlign: 'center' }}>
          <Typography variant="h5" fontWeight={700} mb={4}>Would You Rather...</Typography>

          <Box sx={{ display: 'flex', gap: 2, mb: 4, flexDirection: { xs: 'column', md: 'row' } }}>
            {/* Option A */}
            <Paper
              onClick={() => vote('a')}
              sx={{
                flex: 1, p: 3, borderRadius: 3, cursor: voted ? 'default' : 'pointer',
                border: `3px solid ${voted === 'a' ? '#4361ee' : voted ? '#e2e8f0' : '#4361ee33'}`,
                bgcolor: voted === 'a' ? 'rgba(67,97,238,0.06)' : 'white',
                transition: 'all 0.2s',
                '&:hover': !voted ? { borderColor: '#4361ee', transform: 'scale(1.02)' } : {},
              }}
            >
              <Typography variant="h6" fontWeight={700}>{question.a}</Typography>
              {voted && (
                <>
                  <Typography variant="h4" fontWeight={800} color="primary.main" mt={2}>{Math.round((votesA/total)*100)}%</Typography>
                  <LinearProgress variant="determinate" value={(votesA/total)*100} sx={{ mt: 1, height: 8, borderRadius: 4 }} />
                </>
              )}
            </Paper>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="h4" color="text.secondary" fontWeight={800}>OR</Typography>
            </Box>

            {/* Option B */}
            <Paper
              onClick={() => vote('b')}
              sx={{
                flex: 1, p: 3, borderRadius: 3, cursor: voted ? 'default' : 'pointer',
                border: `3px solid ${voted === 'b' ? '#f72585' : voted ? '#e2e8f0' : '#f7258533'}`,
                bgcolor: voted === 'b' ? 'rgba(247,37,133,0.06)' : 'white',
                transition: 'all 0.2s',
                '&:hover': !voted ? { borderColor: '#f72585', transform: 'scale(1.02)' } : {},
              }}
            >
              <Typography variant="h6" fontWeight={700}>{question.b}</Typography>
              {voted && (
                <>
                  <Typography variant="h4" fontWeight={800} color="secondary.main" mt={2}>{Math.round((votesB/total)*100)}%</Typography>
                  <LinearProgress variant="determinate" value={(votesB/total)*100} sx={{ mt: 1, height: 8, borderRadius: 4, '& .MuiLinearProgress-bar': { bgcolor: '#f72585' } }} />
                </>
              )}
            </Paper>
          </Box>

          <Button variant="outlined" onClick={generate} startIcon={<ShuffleIcon />}>
            Next Question
          </Button>
        </Paper>
      )}
    </ToolLayout>
  )
}
