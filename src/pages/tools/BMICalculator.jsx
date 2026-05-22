import { useState } from 'react'
import { Typography, Box, Paper, Slider, TextField, Select, MenuItem, FormControl, InputLabel, Stack } from '@mui/material'
import ToolLayout from '../../components/ToolLayout'
import { motion } from 'framer-motion'

export default function BMICalculator() {
  const [unit, setUnit] = useState('metric')
  const [weight, setWeight] = useState(70)
  const [height, setHeight] = useState(170)
  const [ft, setFt] = useState(5)
  const [inch, setInch] = useState(7)

  const bmi = unit === 'metric'
    ? weight / ((height / 100) ** 2)
    : (weight * 0.453592) / (((ft * 30.48 + inch * 2.54) / 100) ** 2)

  const bmiRounded = Math.round(bmi * 10) / 10
  const category = bmiRounded < 18.5 ? 'Underweight' : bmiRounded < 25 ? 'Normal' : bmiRounded < 30 ? 'Overweight' : 'Obese'
  const colors = { 'Underweight': '#4cc9f0', 'Normal': '#2ecc71', 'Overweight': '#f39c12', 'Obese': '#e74c3c' }

  return (
    <ToolLayout title="BMI Calculator" description="Calculate your Body Mass Index. Switch between metric and imperial units instantly." category="Life Calculators">
      <Paper sx={{ p: 4, borderRadius: 4 }}>
        <FormControl size="small" sx={{ mb: 3, minWidth: 180 }}>
          <InputLabel>Unit</InputLabel>
          <Select value={unit} onChange={e => setUnit(e.target.value)} label="Unit">
            <MenuItem value="metric">Metric (kg, cm)</MenuItem>
            <MenuItem value="imperial">Imperial (lbs, ft)</MenuItem>
          </Select>
        </FormControl>

        <Stack spacing={3} mb={4}>
          <Box>
            <Typography gutterBottom fontWeight={600}>Weight ({unit === 'metric' ? 'kg' : 'lbs'})</Typography>
            <TextField
              value={weight}
              onChange={e => setWeight(Number(e.target.value) || 0)}
              type="number"
              size="small"
              sx={{ width: 160 }}
            />
            <Slider
              value={weight}
              onChange={(_, v) => setWeight(v)}
              min={unit === 'metric' ? 30 : 66}
              max={unit === 'metric' ? 200 : 440}
              sx={{ mt: 1 }}
            />
          </Box>
          <Box>
            <Typography gutterBottom fontWeight={600}>Height ({unit === 'metric' ? 'cm' : 'ft/in'})</Typography>
            {unit === 'metric' ? (
              <>
                <TextField value={height} onChange={e => setHeight(Number(e.target.value) || 0)} type="number" size="small" sx={{ width: 160 }} />
                <Slider value={height} onChange={(_, v) => setHeight(v)} min={100} max={250} sx={{ mt: 1 }} />
              </>
            ) : (
              <Stack direction="row" spacing={2}>
                <Box flex={1}>
                  <Typography variant="caption">Feet</Typography>
                  <TextField value={ft} onChange={e => setFt(Number(e.target.value) || 0)} type="number" size="small" fullWidth />
                </Box>
                <Box flex={1}>
                  <Typography variant="caption">Inches</Typography>
                  <TextField value={inch} onChange={e => setInch(Math.min(Number(e.target.value) || 0, 11))} type="number" size="small" fullWidth />
                </Box>
              </Stack>
            )}
          </Box>
        </Stack>

        {/* BMI Result */}
        <motion.div key={bmiRounded} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
          <Paper variant="outlined" sx={{ p: 4, borderRadius: 3, textAlign: 'center', bgcolor: 'rgba(0,0,0,0.01)' }}>
            <Typography variant="h2" fontWeight={800} sx={{ color: colors[category] }}>{bmiRounded}</Typography>
            <Typography variant="h6" sx={{ color: colors[category] }} fontWeight={700}>{category}</Typography>
            {/* Scale Bar */}
            <Box sx={{ mt: 3, height: 24, borderRadius: 12, background: 'linear-gradient(to right, #4cc9f0, #2ecc71, #f39c12, #e74c3c)', position: 'relative', overflow: 'hidden' }}>
              <Box sx={{ position: 'absolute', top: 0, bottom: 0, width: 3, bgcolor: '#1a1a2e', left: `${Math.min(Math.max((bmiRounded - 15) / (40 - 15) * 100, 0), 100)}%`, borderRadius: 2 }} />
            </Box>
            <Stack direction="row" justifyContent="space-between" mt={0.5}>
              <Typography variant="caption">15</Typography>
              <Typography variant="caption">25</Typography>
              <Typography variant="caption">35</Typography>
              <Typography variant="caption">40+</Typography>
            </Stack>
          </Paper>
        </motion.div>
      </Paper>
    </ToolLayout>
  )
}
