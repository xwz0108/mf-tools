import { useState, useEffect } from 'react'
import { Typography, Box, Paper, Button, LinearProgress, Chip, Stack, Radio, RadioGroup, FormControlLabel } from '@mui/material'
import TimerIcon from '@mui/icons-material/Timer'
import ToolLayout from '../../components/ToolLayout'

const QUESTIONS = [
  { q: 'What comes next in the sequence: 2, 6, 12, 20, ?', opts: ['28', '30', '32', '24'], correct: 1 },
  { q: 'If you rearrange the letters "CIFAIPC" you get the name of a:', opts: ['City', 'Animal', 'Ocean', 'Planet'], correct: 2 },
  { q: 'Which number is the odd one out: 16, 25, 36, 49, 64?', opts: ['16', '25', '36', '49'], correct: 0 },
  { q: 'How many days are there in 4 years including one leap year?', opts: ['1460', '1461', '1459', '1462'], correct: 1 },
  { q: 'If RED is coded as 27-5-4, how is BLUE coded?', opts: ['2-12-21-5', '3-13-22-6', '2-11-20-4', '1-10-19-3'], correct: 0 },
  { q: 'A train travels 180 km in 3 hours. What is its speed?', opts: ['50 km/h', '55 km/h', '60 km/h', '65 km/h'], correct: 2 },
  { q: 'Which shape has exactly 4 equal sides and 4 right angles?', opts: ['Rhombus', 'Trapezoid', 'Square', 'Parallelogram'], correct: 2 },
  { q: 'If 5 cats catch 5 mice in 5 minutes, how many cats are needed to catch 100 mice in 100 minutes?', opts: ['20', '100', '5', '50'], correct: 2 },
  { q: 'What is the next prime number after 31?', opts: ['33', '35', '37', '39'], correct: 2 },
  { q: 'Complete the pattern: 1, 1, 2, 3, 5, 8, ?', opts: ['11', '12', '13', '14'], correct: 2 },
]

const CATEGORIES = [
  { min: 0, label: 'Creative Genius', emoji: '🎨', desc: 'You think outside every box' },
  { min: 4, label: 'Sharp Thinker', emoji: '🧠', desc: 'Solid logical reasoning skills' },
  { min: 7, label: 'Average Joe', emoji: '😊', desc: 'Nothing wrong with being normal' },
  { min: 9, label: 'Galaxy Brain', emoji: '🌌', desc: 'Off the charts intelligence' },
]

export default function IQQuiz() {
  const [started, setStarted] = useState(false)
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState({})
  const [timeLeft, setTimeLeft] = useState(20)
  const [finished, setFinished] = useState(false)
  const shuffled = useState(() => [...QUESTIONS].sort(() => Math.random() - 0.5))[0]

  useEffect(() => {
    if (!started || finished || timeLeft <= 0) return
    const t = setInterval(() => setTimeLeft(t => {
      if (t <= 1) { nextQuestion(); return 20 }
      return t - 1
    }), 1000)
    return () => clearInterval(t)
  }, [started, finished, current])

  const nextQuestion = () => {
    if (current >= shuffled.length - 1) setFinished(true)
    else { setCurrent(c => c + 1); setTimeLeft(20) }
  }

  const answer = (i) => {
    setAnswers(a => ({ ...a, [current]: i }))
    if (Object.keys(answers).length < shuffled.length - 1) setTimeout(nextQuestion, 600)
    else setTimeout(() => setFinished(true), 600)
  }

  const score = Object.entries(answers).filter(([q, a]) => a === shuffled[parseInt(q)].correct).length
  const category = CATEGORIES.slice().reverse().find(c => score >= c.min) || CATEGORIES[0]

  if (!started) {
    return (
      <ToolLayout title="Fun IQ Quiz" description="A light-hearted intelligence quiz. 10 logic questions with instant results." category="Mini Games">
        <Paper sx={{ p: 6, borderRadius: 4, textAlign: 'center' }}>
          <Typography variant="h3" mb={1}>{'🧩'}</Typography>
          <Typography variant="h5" fontWeight={700} mb={1}>10 Logic Questions</Typography>
          <Typography color="text.secondary" mb={4}>Patterns, sequences, and word play. Nothing too serious!</Typography>
          <Button variant="contained" size="large" onClick={() => setStarted(true)} sx={{ px: 5 }}>Start Quiz</Button>
        </Paper>
      </ToolLayout>
    )
  }

  if (finished) {
    return (
      <ToolLayout title="Fun IQ Quiz" description="A light-hearted intelligence quiz with instant fun results." category="Mini Games">
        <Paper sx={{ p: 4, borderRadius: 4, textAlign: 'center' }}>
          <Typography variant="h2" mb={2}>{category.emoji}</Typography>
          <Typography variant="h4" fontWeight={800} color="primary.main">{score}/{shuffled.length}</Typography>
          <Chip label={category.label} color="primary" size="medium" sx={{ my: 2, fontWeight: 700 }} />
          <Typography color="text.secondary" mb={3}>{category.desc}</Typography>
          <Button variant="contained" onClick={() => { setStarted(false); setCurrent(0); setAnswers({}); setFinished(false) }}>Try Again</Button>
        </Paper>
      </ToolLayout>
    )
  }

  return (
    <ToolLayout title="Fun IQ Quiz" description={`Question ${current + 1} of ${shuffled.length}`} category="Mini Games">
      <Paper sx={{ p: 4, borderRadius: 4 }}>
        <Stack direction="row" justifyContent="space-between" mb={3}>
          <Chip label={`${current + 1}/${shuffled.length}`} color="primary" />
          <Chip icon={<TimerIcon />} label={`${timeLeft}s`} color={timeLeft < 8 ? 'error' : 'default'} />
        </Stack>
        <LinearProgress variant="determinate" value={((current + 1) / shuffled.length) * 100} sx={{ mb: 3, height: 6, borderRadius: 3 }} />

        <Typography variant="h6" fontWeight={700} mb={3}>{shuffled[current].q}</Typography>

        <Box>
          {shuffled[current].opts.map((opt, i) => (
            <Paper
              key={i}
              onClick={() => answer(i)}
              sx={{
                p: 2, mb: 1.5, borderRadius: 2, cursor: 'pointer',
                border: `2px solid ${answers[current] === i ? '#4361ee' : '#e2e8f0'}`,
                bgcolor: answers[current] === i ? 'rgba(67,97,238,0.06)' : 'white',
                transition: 'all 0.15s',
                '&:hover': { borderColor: '#4361ee', bgcolor: 'rgba(67,97,238,0.03)' },
              }}
            >
              <Typography fontWeight={600}>{opt}</Typography>
            </Paper>
          ))}
        </Box>
      </Paper>
    </ToolLayout>
  )
}
