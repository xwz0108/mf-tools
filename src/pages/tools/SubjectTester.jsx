import { useState, useMemo } from 'react'
import { Typography, Box, Paper, TextField, Chip, Stack, Grid, LinearProgress } from '@mui/material'
import ToolLayout from '../../components/ToolLayout'

const SPAM_WORDS = ['free', 'act now', 'limited time', 'click here', 'urgent', 'offer expires', 'bargain', '100% free', 'money', 'cash', 'cheap', 'viagra', 'weight loss', 'guaranteed', 'winner', 'prize', 'selected', 'congratulations', 'exclusive deal', 'no cost', 'no obligation', 'order now', 'special promotion', 'this won\'t last','why pay more','save big','extra income','be your own boss','fast cash','earn extra cash','additional income']
const SUBJECT_EMOJI = ['🎁','🔥','💡','💰','⚡','✅','📢','🎯','📊','🏆','🌟','💪']

function testLine(subject, preview) {
  const len = subject.length
  const words = subject.split(/\s+/).filter(w => w.length > 0)
  const wordCount = words.length
  const hasEmoji = /[\u{1F300}-\u{1F9FF}]/u.test(subject)
  const hasNumber = /\d/.test(subject)
  const hasPersonal = /\byou\b|\byour\b|\byou're\b/i.test(subject)
  const hasCuriosity = /\?$|why|how|what|discover|secret/i.test(subject)
  const spamCount = SPAM_WORDS.filter(w => subject.toLowerCase().includes(w)).length
  
  // Scoring
  const lengthScore = len >= 30 && len <= 60 ? 25 : len >= 20 && len <= 70 ? 15 : 5
  const wordScore = wordCount >= 4 && wordCount <= 9 ? 20 : 10
  const emojiScore = hasEmoji ? 10 : 0
  const numberScore = hasNumber ? 10 : 0
  const personalScore = hasPersonal ? 12 : 0
  const curiosityScore = hasCuriosity ? 8 : 0
  const spamPenalty = spamCount * -8
  const previewScore = preview.length >= 30 && preview.length <= 140 ? 10 : 3
  
  const total = Math.max(0, Math.min(100, lengthScore + wordScore + emojiScore + numberScore + personalScore + curiosityScore + spamPenalty + previewScore))
  
  return {
    len, wordCount, hasEmoji, hasNumber, hasPersonal, hasCuriosity, spamCount,
    total,
    grade: total >= 80 ? 'A+' : total >= 65 ? 'A' : total >= 50 ? 'B' : 'C',
    gradeColor: total >= 65 ? '#34d399' : total >= 50 ? '#f59e0b' : '#ef4444',
    tips: [
      len < 30 ? 'Too short — aim for 30-60 chars for mobile visibility' : len > 70 ? 'Too long — will be cut off on mobile. Keep under 60 chars' : null,
      wordCount < 4 ? 'Add more context — 4-9 words work best' : wordCount > 12 ? 'Too wordy — trim to 9 words or less' : null,
      !hasEmoji ? '📱 Try adding one relevant emoji for +15-25% open rate' : null,
      !hasNumber ? '🔢 Numbers increase open rates by 20% (e.g. "5 Ways to...")' : null,
      !hasPersonal ? '👤 Use "you" or "your" to make it personal' : null,
      !hasCuriosity ? '❓ Add a question or tease to spark curiosity' : null,
      spamCount > 0 && '⚠ Contains words that may trigger spam filters',
    ].filter(Boolean),
  }
}

export default function SubjectTester() {
  const [subject, setSubject] = useState('5 Proven Ways to Double Your Email Open Rate in 2025 📈')
  const [preview, setPreview] = useState('Discover the email subject line strategies that top marketers use to get more opens, clicks, and conversions.')
  
  const result = useMemo(() => testLine(subject, preview), [subject, preview])

  return (
    <ToolLayout title="Email Subject Line Tester" description="Test your email subject lines for open rates. Get scores, spam check, and tips." category="Developer Tools">
      <Paper sx={{ p: 4, borderRadius: 4 }}>
        <Stack spacing={3} mb={4}>
          <Box>
            <Typography variant="subtitle2" fontWeight={600} mb={1} color="#8b8fa8">Subject Line</Typography>
            <TextField value={subject} onChange={e => setSubject(e.target.value)} size="small" fullWidth helperText={result.len + '/60 chars optimal'} />
          </Box>
          <Box>
            <Typography variant="subtitle2" fontWeight={600} mb={1} color="#8b8fa8">Preview Text</Typography>
            <TextField value={preview} onChange={e => setPreview(e.target.value)} size="small" fullWidth multiline rows={2} />
          </Box>
        </Stack>

        <Box sx={{ mb: 4, p: 4, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.03)', textAlign: 'center', border: `2px solid ${result.gradeColor}33` }}>
          <Typography variant="h2" fontWeight={800} sx={{ color: result.gradeColor }}>{result.total}/100</Typography>
          <Typography variant="h5" fontWeight={700} sx={{ color: result.gradeColor }}>Grade: {result.grade}</Typography>
          <LinearProgress variant="determinate" value={result.total} sx={{ mt: 2, height: 8, borderRadius: 4, '& .MuiLinearProgress-bar': { bgcolor: result.gradeColor } }} />
        </Box>

        {/* Email Preview */}
        <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, mb: 4, bgcolor: '#1e1e2e', maxWidth: 360 }}>
          <Typography variant="body2" fontWeight={700} sx={{ color: '#fff', mb: 0.5 }}>{subject}</Typography>
          <Typography variant="caption" sx={{ color: '#9aa0a6' }}>{preview.slice(0, 90)}</Typography>
        </Paper>

        <Grid container spacing={2} mb={3}>
          {[
            { label:'Length', value:result.len+' ch' },
            { label:'Words', value:result.wordCount },
            { label:'Emoji', value:result.hasEmoji ? 'Yes ✓' : 'No' },
            { label:'Number', value:result.hasNumber ? 'Yes ✓' : 'No' },
            { label:'Personal', value:result.hasPersonal ? 'Yes ✓' : 'No' },
            { label:'Curiosity', value:result.hasCuriosity ? 'Yes ✓' : 'No' },
            { label:'Spam Triggers', value:result.spamCount },
          ].map(m => (
            <Grid item xs={6} sm={3} key={m.label}>
              <Box sx={{ p: 2, borderRadius: 2, bgcolor: 'rgba(255,255,255,0.03)', textAlign: 'center', border: '1px solid rgba(255,255,255,0.06)' }}>
                <Typography variant="caption" color="text.secondary">{m.label}</Typography>
                <Typography variant="body1" fontWeight={700} color={m.value.includes('✓') ? '#34d399' : '#cdd6f4'}>{m.value}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Typography variant="subtitle2" fontWeight={600} mb={2} color="#8b8fa8">Tips to Improve</Typography>
        <Stack spacing={1}>
          {result.tips.map((t, i) => (
            <Paper key={i} variant="outlined" sx={{ p: 1.5, borderRadius: 2, borderColor: 'rgba(255,255,255,0.06)', bgcolor: t.includes('⚠') ? 'rgba(239,68,68,0.05)' : 'transparent' }}>
              <Typography variant="body2" color={t.includes('⚠') ? '#fca5a5' : '#cdd6f4'}>{t.includes('⚠') ? t : '💡 ' + t}</Typography>
            </Paper>
          ))}
        </Stack>
      </Paper>
    </ToolLayout>
  )
}
