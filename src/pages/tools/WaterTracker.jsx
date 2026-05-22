import { useState, useEffect } from 'react'
import { Typography, Box, Paper, TextField, Slider, LinearProgress, Stack, IconButton, Snackbar } from '@mui/material'
import WaterDropIcon from '@mui/icons-material/WaterDrop'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import ToolLayout from '../../components/ToolLayout'
import { motion } from 'framer-motion'

export default function WaterTracker() {
  const [weight, setWeight] = useState(70)
  const [unit, setUnit] = useState('kg')
  const [glasses, setGlasses] = useState(0)
  const [customGoal, setCustomGoal] = useState(null)

  const weightKg = unit === 'kg' ? weight : weight * 0.453592
  const dailyGoal = customGoal || Math.round(weightKg * 33) // ml
  const glassSize = 250
  const totalGlasses = Math.ceil(dailyGoal / glassSize)
  const percent = Math.min(Math.round((glasses / Math.max(totalGlasses, 1)) * 100), 100)
  const remaining = Math.max(dailyGoal - glasses * glassSize, 0)

  useEffect(() => {
    const saved = localStorage.getItem('waterGlasses')
    const today = localStorage.getItem('waterDate')
    const todayStr = new Date().toDateString()
    if (today === todayStr && saved) {
      setGlasses(parseInt(saved) || 0)
    } else {
      setGlasses(0)
      localStorage.setItem('waterDate', todayStr)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('waterGlasses', glasses)
  }, [glasses])

  const add = () => setGlasses(g => Math.min(g + 1, 50))
  const sub = () => setGlasses(g => Math.max(g - 1, 0))
  const reset = () => setGlasses(0)

  return (
    <ToolLayout title="Water Intake Calculator" description="Calculate your daily water needs and track your hydration with visual progress." category="Life Calculators">
      <Paper sx={{ p: 4, borderRadius: 4 }}>
        <Stack spacing={3} mb={4}>
          <Box>
            <Typography gutterBottom fontWeight={600}>Your Weight</Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <TextField
                value={weight}
                onChange={e => setWeight(Number(e.target.value) || 0)}
                type="number"
                size="small"
                sx={{ width: 120 }}
              />
              <Stack direction="row" spacing={1}>
                {['kg', 'lbs'].map(u => (
                  <Box
                    key={u}
                    onClick={() => setUnit(u)}
                    sx={{
                      px: 2, py: 0.5, borderRadius: 2, cursor: 'pointer', fontWeight: 600,
                      bgcolor: unit === u ? 'primary.main' : 'transparent',
                      color: unit === u ? '#fff' : 'text.primary',
                      border: unit === u ? 'none' : '1px solid #e2e8f0',
                    }}
                  >
                    {u}
                  </Box>
                ))}
              </Stack>
            </Stack>
          </Box>
          <Box>
            <Typography gutterBottom fontWeight={600}>Daily Goal: <strong>{dailyGoal} ml</strong> ({totalGlasses} glasses of {glassSize}ml)</Typography>
            <Slider value={dailyGoal} onChange={(_, v) => setCustomGoal(v)} min={1000} max={5000} step={250} valueLabelDisplay="auto" valueLabelFormat={v => `${v}ml`} sx={{ maxWidth: 400 }} />
          </Box>
        </Stack>

        {/* Progress Visualization */}
        <Paper variant="outlined" sx={{ p: 4, borderRadius: 3, textAlign: 'center', bgcolor: 'rgba(67,97,238,0.02)', mb: 4 }}>
          <motion.div
            animate={{ scale: percent === 100 ? [1, 1.05, 1] : 1 }}
            transition={{ repeat: percent === 100 ? Infinity : 0, duration: 1.5 }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 1, mb: 3, maxWidth: 400, mx: 'auto' }}>
              {Array.from({ length: totalGlasses }).map((_, i) => (
                <WaterDropIcon
                  key={i}
                  sx={{
                    fontSize: 36,
                    color: i < glasses ? '#4361ee' : '#e2e8f0',
                    transition: 'color 0.3s, transform 0.3s',
                    filter: i < glasses ? 'drop-shadow(0 2px 4px rgba(67,97,238,0.3))' : 'none',
                  }}
                />
              ))}
            </Box>
          </motion.div>

          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, mb: 2 }}>
            <IconButton onClick={sub} disabled={glasses <= 0} color="primary" size="large"><RemoveIcon /></IconButton>
            <Typography variant="h3" fontWeight={800} color="primary.main">{glasses}</Typography>
            <IconButton onClick={add} color="primary" size="large"><AddIcon /></IconButton>
          </Box>

          <LinearProgress
            variant="determinate"
            value={percent}
            sx={{ height: 12, borderRadius: 6, mb: 1, bgcolor: '#f1f5f9', '& .MuiLinearProgress-bar': { borderRadius: 6, bgcolor: percent === 100 ? '#2ecc71' : '#4361ee' } }}
          />
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" fontWeight={700}>{percent}%</Typography>
            <Typography variant="body2" color="text.secondary">{remaining > 0 ? `${remaining}ml remaining` : 'Goal reached!'}</Typography>
          </Stack>
        </Paper>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Box onClick={reset} sx={{ cursor: 'pointer', color: 'primary.main', fontWeight: 600, fontSize: '0.9rem', '&:hover': { textDecoration: 'underline' } }}>
            Reset Today
          </Box>
        </Box>
      </Paper>
    </ToolLayout>
  )
}
