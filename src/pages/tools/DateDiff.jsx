import { useState, useEffect } from 'react'
import { Typography, Box, Paper, TextField } from '@mui/material'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import ToolLayout from '../../components/ToolLayout'

function diffText(diff) {
  const parts = []
  if (diff.years) parts.push(`${diff.years} year${diff.years !== 1 ? 's' : ''}`)
  if (diff.months) parts.push(`${diff.months} month${diff.months !== 1 ? 's' : ''}`)
  if (diff.days) parts.push(`${diff.days} day${diff.days !== 1 ? 's' : ''}`)
  return parts.join(', ')
}

function totalDays(d1, d2) { return Math.abs(Math.round((d2 - d1) / (1000 * 60 * 60 * 24))) }

function getDiff(d1, d2) {
  if (d1 > d2) [d1, d2] = [d2, d1]
  let years = d2.getFullYear() - d1.getFullYear()
  let months = d2.getMonth() - d1.getMonth()
  let days = d2.getDate() - d1.getDate()
  if (days < 0) { months--; const prevMonth = new Date(d2.getFullYear(), d2.getMonth(), 0); days += prevMonth.getDate() }
  if (months < 0) { years--; months += 12 }
  return { years, months, days }
}

export default function DateDiff() {
  const today = new Date().toISOString().split('T')[0]
  const [start, setStart] = useState('2020-01-01')
  const [end, setEnd] = useState(today)

  const s = new Date(start + 'T00:00:00')
  const e = new Date(end + 'T00:00:00')
  const diff = getDiff(s, e)
  const days = totalDays(s, e)

  return (
    <ToolLayout title="Date Difference Calculator" description="Find the exact time between two dates in years, months, and days." category="Life Calculators">
      <Paper sx={{ p: 4, borderRadius: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, mb: 4, alignItems: 'center' }}>
          <TextField value={start} onChange={e => setStart(e.target.value)} type="date" label="Start Date" size="small" InputLabelProps={{ shrink: true }} fullWidth />
          <Typography variant="h5" color="text.secondary">to</Typography>
          <TextField value={end} onChange={e => setEnd(e.target.value)} type="date" label="End Date" size="small" InputLabelProps={{ shrink: true }} fullWidth />
        </Box>

        <Paper variant="outlined" sx={{ p: 4, borderRadius: 3, textAlign: 'center', bgcolor: 'rgba(67,97,238,0.02)' }}>
          <Typography variant="h2" fontWeight={800} color="primary.main">{days.toLocaleString()}</Typography>
          <Typography variant="body1" color="text.secondary" mb={3}>Total Days</Typography>
          <Typography variant="h4" fontWeight={700}>{diffText(diff)}</Typography>
          <Typography variant="body2" color="text.secondary">{diff.years}y {diff.months}m {diff.days}d</Typography>
        </Paper>
      </Paper>
    </ToolLayout>
  )
}
