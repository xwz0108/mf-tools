import { useState } from 'react'
import { Typography, Box, Paper, Button, Chip, Stack, LinearProgress } from '@mui/material'
import TimerIcon from '@mui/icons-material/Timer'
import ToolLayout from '../../components/ToolLayout'

const QUESTIONS = [
  { q: 'What comes next? 2, 4, 8, 16, ?', options: ['24', '32', '30', '28'], answer: 1 },
  { q: 'If you rearrange "CINEMA", you get the name of an...', options: ['Animal', 'City', 'Ice Cream', 'Planet'], answer: 1 },
  { q: 'How many months have 28 days?', options: ['1', '2', '12', '0'], answer: 2 },
  { q: 'What is 15% of 200?', options: ['15', '20', '30', '35'], answer: 2 },
  { q: 'Which word is spelled incorrectly in the dictionary?', options: ['Incorrectly', 'Dictionary', 'Spelled', 'All are correct'], answer: 0 },
  { q: 'If a doctor gives you 3 pills and tells you to take one every half hour, how long will they last?', options: ['1 hour', '1.5 hours', '2 hours', '30 minutes'], answer: 0 },
  { q: 'What weighs more: a ton of feathers or a ton of bricks?', options: ['Feathers', 'Bricks', 'Same', 'Depends'], answer: 2 },
  { q: 'Mary father has 5 daughters: Nana, Nene, Nini, Nono. What is the fifth name?', options: ['Nunu', 'Mary', 'Nana', 'Nunu?'], answer: 1 },
  { q: 'Which number is missing? 1, 1, 2, 3, 5, ?, 13', options: ['6', '7', '8', '9'], answer: 2 },
  { q: 'Before Mt. Everest was discovered, what was the highest mountain?', options: ['K2', 'Mt. Everest', 'Kilimanjaro', 'Unknown'], answer: 1 },
]

export default function IQTest() {
  const [started, setStarted] = useState(false)
  const [current, setCurrent] = useState(0)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState(null)
  const [finished, setFinished] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)
  const [timer, setTimer] = useState(null)

  const begin = () => {
    setStarted(true)
    setCurrent(0)
    setScore(0)
    setFinished(false)
    setTimeLeft(30)
    const t = setInterval(() => setTimeLeft(t => { if (t <= 1) { clearInterval(t); return 0 } return t - 1 }), 1000)
    setTimer(t)
  }

  const answer = (idx) => {
    if (selected !== null) return
    setSelected(idx)
    if (idx === QUESTIONS[current].answer) setScore(s => s + 1)
    setTimeout(() => {
      clearInterval(timer)
      if (current + 1 < QUESTIONS.length) {
        setCurrent(c => c + 1)
        setSelected(null)
        setTimeLeft(30)
        const t = setInterval(() => setTimeLeft(tt => { if (tt <= 1) { clearInterval(t); return 0 } return tt - 1 }), 1000)
        setTimer(t)
      } else {
        setFinished(true)
      }
    }, 1000)
  }

  if (finished) {
    const iq = Math.min(160, Math.max(70, score * 10 + 70))
    return (
      <ToolLayout title="Fun IQ Quiz" description="A light-hearted intelligence quiz. Get your fun IQ score instantly." category="Mini Games">
        <Paper sx={{ p: 6, borderRadius: 4, textAlign: 'center' }}>
          <Typography variant="h1" fontWeight={800} color="primary.main" sx={{ fontSize: '5rem' }}>{iq}</Typography>
          <Typography variant="h5" gutterBottom>Your Fun IQ Score</Typography>
          <Typography color="text.secondary" mb={4}>{score}/{QUESTIONS.length} correct</Typography>
          <Chip label={iq >= 130 ? 'Genius! 🧠' : iq >= 110 ? 'Above Average' : 'Keep Training!'} color="primary" sx={{ mb: 3, py: 1, fontSize: '1rem' }} />
          <Box><Button variant="contained" onClick={begin}>Try Again</Button></Box>
        </Paper>
      </ToolLayout>
    )
  }

  return (
    <ToolLayout title="Fun IQ Quiz" description="A light-hearted intelligence quiz with pattern recognition and logic puzzles." category="Mini Games">
      {!started ? (
        <Paper sx={{ p: 6, borderRadius: 4, textAlign: 'center' }}>
          <TimerIcon sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
          <Typography variant="h5" fontWeight={700} mb={1}>10 Tricky Questions</Typography>
          <Typography color="text.secondary" mb={4}>30 seconds per question. Get your fun IQ score at the end.</Typography>
          <Button variant="contained" size="large" onClick={begin} sx={{ px: 5 }}>Start Quiz</Button>
        </Paper>
      ) : (
        <Paper sx={{ p: 4, borderRadius: 4 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
            <Chip label={`${current + 1}/${QUESTIONS.length}`} color="primary" size="small" />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <TimerIcon fontSize="small" color={timeLeft < 10 ? 'error' : 'action'} />
              <Typography fontWeight={700} color={timeLeft < 10 ? 'error.main' : 'text.primary'}>{timeLeft}s</Typography>
            </Box>
            <Chip label={`Score: ${score}`} variant="outlined" size="small" />
          </Stack>
          <LinearProgress variant="determinate" value={(timeLeft/30)*100} sx={{ mb: 4, height: 6, borderRadius: 3, bgcolor: '#f1f5f9', '& .MuiLinearProgress-bar': { borderRadius: 3, bgcolor: timeLeft < 10 ? '#e74c3c' : '#4361ee' } }} />

          <Typography variant="h5" fontWeight={700} mb={3}>{QUESTIONS[current].q}</Typography>

          <Stack spacing={1.5}>
            {QUESTIONS[current].options.map((opt, i) => (
              <Box
                key={i}
                onClick={() => answer(i)}
                sx={{
                  p: 2, borderRadius: 3, border: '2px solid',
                  borderColor: selected === null ? '#e2e8f0' : selected === i ? (i === QUESTIONS[current].answer ? '#2ecc71' : '#e74c3c') : (i === QUESTIONS[current].answer && selected !== null ? '#2ecc71' : '#e2e8f0'),
                  bgcolor: selected === null ? '#fff' : selected === i ? (i === QUESTIONS[current].answer ? 'rgba(46,204,113,0.08)' : 'rgba(231,76,60,0.08)') : (i === QUESTIONS[current].answer && selected !== null ? 'rgba(46,204,113,0.08)' : '#fff'),
                  cursor: selected === null ? 'pointer' : 'default',
                  '&:hover': selected === null ? { borderColor: '#4361ee', bgcolor: 'rgba(67,97,238,0.04)' } : {},
                  transition: 'all 0.2s',
                }}
              >
                <Typography fontWeight={600}>{opt}</Typography>
              </Box>
            ))}
          </Stack>
        </Paper>
      )}
    </ToolLayout>
  )
}
