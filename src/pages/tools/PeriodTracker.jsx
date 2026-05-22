import { useState, useEffect } from 'react'
import { Typography, Box, Paper, Button, Chip, Stack, IconButton } from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import ToolLayout from '../../components/ToolLayout'

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export default function PeriodTracker() {
  const today = new Date()
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [markedDays, setMarkedDays] = useState(() => {
    try { return JSON.parse(localStorage.getItem('periodDays') || '{}') } catch { return {} }
  })
  const [lastStart, setLastStart] = useState(() => {
    try { return localStorage.getItem('periodLastStart') || null } catch { return null }
  })

  useEffect(() => {
    localStorage.setItem('periodDays', JSON.stringify(markedDays))
  }, [markedDays])

  const avgCycle = 28
  const avgLength = 5

  const predictedDays = []
  if (lastStart) {
    const start = new Date(lastStart + 'T00:00:00')
    for (let i = 0; i < 6; i++) {
      const next = new Date(start.getTime() + (avgCycle * (i + 1)) * 24 * 60 * 60 * 1000)
      for (let d = 0; d < avgLength; d++) {
        const day = new Date(next.getTime() + d * 24 * 60 * 60 * 1000)
        predictedDays.push(day.toISOString().split('T')[0])
      }
    }
  }

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
  const firstDay = new Date(viewYear, viewMonth, 1).getDay()

  const toggleDay = (day) => {
    const key = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    const newMarked = { ...markedDays }
    if (newMarked[key]) {
      delete newMarked[key]
    } else {
      newMarked[key] = true
      if (!lastStart || new Date(key) < new Date(lastStart)) {
        setLastStart(key)
        localStorage.setItem('periodLastStart', key)
      }
    }
    setMarkedDays(newMarked)
  }

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1) }
    else setViewMonth(m => m - 1)
  }
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1) }
    else setViewMonth(m => m + 1)
  }

  const markedCount = Object.keys(markedDays).length

  return (
    <ToolLayout title="Period Tracker" description="Track and predict your cycle. All data stays private in your browser." category="Life Calculators">
      <Paper sx={{ p: 4, borderRadius: 4 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
          <IconButton onClick={prevMonth}><ArrowBackIosIcon /></IconButton>
          <Typography variant="h6" fontWeight={700}>{MONTHS[viewMonth]} {viewYear}</Typography>
          <IconButton onClick={nextMonth}><ArrowForwardIosIcon /></IconButton>
        </Stack>

        {/* Day headers */}
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 0.5, mb: 1, textAlign: 'center' }}>
          {DAYS.map(d => (
            <Typography key={d} variant="caption" fontWeight={600} color="text.secondary">{d}</Typography>
          ))}
        </Box>

        {/* Calendar grid */}
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 0.5 }}>
          {Array.from({ length: firstDay }).map((_, i) => <Box key={`empty-${i}`} />)}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1
            const key = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
            const isMarked = markedDays[key]
            const isPredicted = predictedDays.includes(key) && !isMarked
            const isToday = key === today.toISOString().split('T')[0]

            return (
              <Box
                key={day}
                onClick={() => toggleDay(day)}
                sx={{
                  aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderRadius: 2, cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem',
                  bgcolor: isMarked ? '#f72585' : isPredicted ? 'rgba(247,37,133,0.15)' : 'transparent',
                  color: isMarked ? '#fff' : 'text.primary',
                  border: isToday ? '2px solid #4361ee' : isMarked || isPredicted ? 'none' : '1px solid transparent',
                  transition: 'all 0.15s',
                  '&:hover': { bgcolor: isMarked ? '#d81e68' : isPredicted ? 'rgba(247,37,133,0.25)' : 'rgba(67,97,238,0.06)' },
                }}
              >
                {day}
              </Box>
            )
          })}
        </Box>

        <Stack direction="row" spacing={1} mt={3} alignItems="center">
          <Box sx={{ width: 16, height: 16, borderRadius: 1, bgcolor: '#f72585' }} />
          <Typography variant="caption" color="text.secondary">Marked days</Typography>
          <Box sx={{ width: 16, height: 16, borderRadius: 1, bgcolor: 'rgba(247,37,133,0.2)', ml: 2 }} />
          <Typography variant="caption" color="text.secondary">Predicted</Typography>
          <Box sx={{ flex: 1 }} />
          <Chip label={`${markedCount} days tracked`} size="small" variant="outlined" />
        </Stack>
      </Paper>
    </ToolLayout>
  )
}
