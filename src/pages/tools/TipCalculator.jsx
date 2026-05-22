import { useState } from 'react'
import { Typography, Box, Paper, TextField, Slider, Chip, Stack } from '@mui/material'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import GroupIcon from '@mui/icons-material/Group'
import ToolLayout from '../../components/ToolLayout'

export default function TipCalculator() {
  const [bill, setBill] = useState(50)
  const [tipPercent, setTipPercent] = useState(15)
  const [people, setPeople] = useState(2)
  const [country, setCountry] = useState('us')

  const tips = { us: { name: 'USA', default: 18 }, jp: { name: 'Japan', default: 0 }, uk: { name: 'UK', default: 12 }, fr: { name: 'France', default: 15 }, br: { name: 'Brazil', default: 10 } }

  const tipAmount = (bill * tipPercent) / 100
  const total = bill + tipAmount
  const perPerson = total / people

  return (
    <ToolLayout title="Tip Calculator" description="Calculate tips and split bills easily. Preset percentages for different countries." category="Life Calculators">
      <Paper sx={{ p: 4, borderRadius: 4 }}>
        <Stack direction="row" spacing={1} mb={3} flexWrap="wrap">
          {Object.entries(tips).map(([key, val]) => (
            <Chip
              key={key}
              label={`${val.name} (${val.default}%)`}
              onClick={() => { setCountry(key); setTipPercent(val.default) }}
              color={country === key ? 'primary' : 'default'}
              variant={country === key ? 'filled' : 'outlined'}
              sx={{ fontWeight: 600 }}
            />
          ))}
        </Stack>

        <Stack spacing={3} mb={4}>
          <Box>
            <Typography gutterBottom fontWeight={600}>Bill Amount ($)</Typography>
            <TextField value={bill} onChange={e => setBill(Number(e.target.value) || 0)} type="number" size="small" sx={{ width: 200 }} />
          </Box>
          <Box>
            <Typography gutterBottom fontWeight={600}>Tip ({tipPercent}%)</Typography>
            <Slider value={tipPercent} onChange={(_, v) => setTipPercent(v)} min={0} max={40} step={1} valueLabelDisplay="auto" sx={{ maxWidth: 300 }} />
          </Box>
          <Box>
            <Typography gutterBottom fontWeight={600}>Split Between</Typography>
            <TextField value={people} onChange={e => setPeople(Math.max(1, Number(e.target.value) || 1))} type="number" size="small" sx={{ width: 120 }} />
          </Box>
        </Stack>

        <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, bgcolor: 'rgba(67,97,238,0.02)' }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} justifyContent="center">
            <Box textAlign="center">
              <Typography variant="caption" color="text.secondary">Tip</Typography>
              <Typography variant="h4" fontWeight={800} color="primary.main">${tipAmount.toFixed(2)}</Typography>
            </Box>
            <Box textAlign="center">
              <Typography variant="caption" color="text.secondary">Total</Typography>
              <Typography variant="h4" fontWeight={800}>${total.toFixed(2)}</Typography>
            </Box>
            <Box textAlign="center">
              <Typography variant="caption" color="text.secondary">Per Person ({people})</Typography>
              <Typography variant="h4" fontWeight={800} color="secondary.main">${perPerson.toFixed(2)}</Typography>
            </Box>
          </Stack>
        </Paper>
      </Paper>
    </ToolLayout>
  )
}
