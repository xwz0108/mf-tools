import { useState } from 'react'
import { Typography, Box, Paper, TextField, LinearProgress, Chip, Stack } from '@mui/material'
import LockIcon from '@mui/icons-material/Lock'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import ToolLayout from '../../components/ToolLayout'

function estimateStrength(password) {
  if (!password) return { score: 0, label: 'None', color: '#94a3b8', crackTime: 'N/A', tips: ['Enter a password to check'] }

  let entropy = 0
  const length = password.length
  let poolSize = 0
  if (/[a-z]/.test(password)) poolSize += 26
  if (/[A-Z]/.test(password)) poolSize += 26
  if (/[0-9]/.test(password)) poolSize += 10
  if (/[^a-zA-Z0-9]/.test(password)) poolSize += 33
  entropy = length * Math.log2(Math.max(poolSize, 1))

  let score, label, color, crackTime
  if (entropy < 28) { score = 20; label = 'Very Weak'; color = '#e74c3c'; crackTime = 'Instantly' }
  else if (entropy < 36) { score = 40; label = 'Weak'; color = '#f39c12'; crackTime = 'Seconds' }
  else if (entropy < 50) { score = 60; label = 'Fair'; color = '#f7b731'; crackTime = 'Hours' }
  else if (entropy < 64) { score = 80; label = 'Strong'; color = '#2ecc71'; crackTime = 'Months' }
  else { score = 100; label = 'Very Strong'; color = '#2ecc71'; crackTime = 'Centuries' }

  const tips = []
  if (length < 8) tips.push('Use at least 8 characters')
  else if (length < 12) tips.push('Longer passwords are stronger (12+ recommended)')
  if (!/[A-Z]/.test(password)) tips.push('Add uppercase letters')
  if (!/[0-9]/.test(password)) tips.push('Add numbers')
  if (!/[^a-zA-Z0-9]/.test(password)) tips.push('Add special characters (!@#$%)')
  if (/^[a-zA-Z]+$/.test(password)) tips.push('Mix letters, numbers, and symbols')
  if (entropy >= 64) tips.push('Excellent! This password is very secure.')
  return { score, label, color, crackTime, tips }
}

export default function PasswordChecker() {
  const [password, setPassword] = useState('')
  const strength = estimateStrength(password)

  return (
    <ToolLayout title="Password Strength Checker" description="Check how strong your password really is. Get crack time estimates and improvement tips." category="Text Fun">
      <Paper sx={{ p: 4, borderRadius: 4 }}>
        <TextField
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Type or paste a password..."
          fullWidth
          type="text"
          sx={{ mb: 3 }}
          InputProps={{
            startAdornment: strength.score > 60 ? <LockIcon sx={{ mr: 1, color: 'text.secondary' }} /> : <LockOpenIcon sx={{ mr: 1, color: 'text.secondary' }} />,
            sx: { fontSize: '1.2rem', borderRadius: 3 },
          }}
        />

        {/* Strength Bar */}
        <LinearProgress
          variant="determinate"
          value={strength.score}
          sx={{ height: 10, borderRadius: 5, mb: 2, bgcolor: '#f1f5f9', '& .MuiLinearProgress-bar': { borderRadius: 5, bgcolor: strength.color } }}
        />

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="space-between" alignItems={{ sm: 'center' }} mb={3}>
          <Box>
            <Typography variant="h4" fontWeight={800} sx={{ color: strength.color }}>{strength.label}</Typography>
            <Typography variant="body2" color="text.secondary">Crack time: {strength.crackTime}</Typography>
          </Box>
          <Box textAlign="right">
            <Typography variant="body2" color="text.secondary">Entropy</Typography>
            <Typography variant="h5" fontWeight={700}>
              {password ? (() => {
                let poolSize = 0
                if (/[a-z]/.test(password)) poolSize += 26
                if (/[A-Z]/.test(password)) poolSize += 26
                if (/[0-9]/.test(password)) poolSize += 10
                if (/[^a-zA-Z0-9]/.test(password)) poolSize += 33
                return Math.round(Math.log2(Math.max(poolSize, 1)) * password.length)
              })() : 0} bits
            </Typography>
          </Box>
        </Stack>

        {/* Tips */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {strength.tips.map((tip, i) => (
            <Chip key={i} label={tip} size="small" variant="outlined" sx={{ bgcolor: 'rgba(67,97,238,0.04)', borderColor: 'transparent' }} />
          ))}
        </Box>
      </Paper>
    </ToolLayout>
  )
}
