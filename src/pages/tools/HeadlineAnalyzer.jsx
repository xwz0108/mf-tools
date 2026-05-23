import { useState, useMemo } from 'react'
import { Typography, Box, Paper, TextField, LinearProgress, Chip, Stack, Grid } from '@mui/material'
import ToolLayout from '../../components/ToolLayout'

const POWER_WORDS = ['free','instant','proven','secret','amazing','ultimate','essential','powerful','simple','guaranteed','exclusive','shocking','surprising','complete','easy','fast','best','new','now','discover']
const EMOTION_WORDS = ['love','hate','angry','happy','sad','fear','shocked','amazed','inspired','excited','worried','frustrated','confused','relieved','grateful']

function analyze(text) {
  if (!text.trim()) return null
  const chars = text.length
  const words = text.split(/\s+/).filter(w => w.length > 0)
  const wordCount = words.length
  const avgWordLen = Math.round(chars / Math.max(1, words.length))
  
  const powerCount = words.filter(w => POWER_WORDS.includes(w.toLowerCase())).length
  const emotionCount = words.filter(w => EMOTION_WORDS.includes(w.toLowerCase())).length
  const hasNumber = /\d/.test(text)
  const hasParentheses = /[()]/.test(text)
  const hasQuestion = /\?/.test(text)
  const hasExclamation = /!/.test(text)
  const type = hasQuestion ? 'Question' : hasExclamation ? 'Exclamation' : 'Statement'

  // Score (0-100)
  const lengthScore = wordCount >= 6 && wordCount <= 15 ? 25 : wordCount >= 4 ? 18 : 8
  const powerScore = Math.min(powerCount * 6, 18)
  const emotionScore = Math.min(emotionCount * 5, 12)
  const varietyScore = (hasNumber ? 8 : 0) + (hasParentheses ? 5 : 0) + (hasQuestion ? 5 : 0) + (hasExclamation ? 5 : 0)
  const formatScore = wordCount <= 12 ? 10 : wordCount <= 20 ? 5 : 0
  const wordLenScore = avgWordLen >= 4 && avgWordLen <= 7 ? 10 : 5

  const score = Math.min(lengthScore + powerScore + emotionScore + varietyScore + formatScore + wordLenScore, 100)
  const grade = score >= 80 ? 'A+' : score >= 70 ? 'A' : score >= 60 ? 'B' : score >= 50 ? 'C' : 'D'
  const gradeColor = score >= 70 ? '#34d399' : score >= 50 ? '#f59e0b' : '#ef4444'

  return { chars, wordCount, avgWordLen, powerCount, emotionCount, hasNumber, type, score, grade, gradeColor,
    tips: [
      wordCount < 6 && 'Too short — aim for 6-15 words for SEO headlines',
      wordCount > 15 && 'A bit long — consider trimming to under 15 words',
      powerCount === 0 && 'Try adding power words like "free", "ultimate", or "proven"',
      !hasNumber && 'Odd-numbered lists (7, 9, 11) get more clicks',
      type === 'Question' && 'Questions can work well but statements often convert better',
      avgWordLen > 7 && 'Some words are complex — simpler words work better',
    ].filter(Boolean)
  }
}

export default function HeadlineAnalyzer() {
  const [text, setText] = useState('10 Proven Ways to Get Free Traffic to Your Website in 2025')
  const result = useMemo(() => analyze(text), [text])

  return (
    <ToolLayout title="Headline Analyzer" description="Score your headlines for SEO and engagement. Get tips to boost click-through rates." category="Developer Tools">
      <Paper sx={{ p: 4, borderRadius: 4 }}>
        <Typography variant="subtitle2" fontWeight={600} mb={1} color="#8b8fa8">Your Headline</Typography>
        <TextField value={text} onChange={e => setText(e.target.value)} placeholder="Type your headline here..." fullWidth size="small" sx={{ mb: 3 }} />
        
        {result && (
          <>
            <Box sx={{ mb: 4, p: 4, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.03)', textAlign: 'center', border: `2px solid ${result.gradeColor}33` }}>
              <Typography variant="h2" fontWeight={800} sx={{ color: result.gradeColor }}>{result.score}/100</Typography>
              <Typography variant="h5" fontWeight={700} sx={{ color: result.gradeColor }}>Grade: {result.grade}</Typography>
              <LinearProgress variant="determinate" value={result.score} sx={{ mt: 2, height: 8, borderRadius: 4, '& .MuiLinearProgress-bar': { bgcolor: result.gradeColor } }} />
            </Box>

            <Grid container spacing={2} mb={4}>
              {[{ label:'Words', value:result.wordCount },{ label:'Characters', value:result.chars },{ label:'Avg Word Len', value:result.avgWordLen+' ch' },{ label:'Type', value:result.type },{ label:'Power Words', value:result.powerCount },{ label:'Emotion Words', value:result.emotionCount }].map(m => (
                <Grid item xs={4} sm={2} key={m.label}>
                  <Box sx={{ p: 2, borderRadius: 2, bgcolor: 'rgba(255,255,255,0.03)', textAlign: 'center', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <Typography variant="caption" color="text.secondary">{m.label}</Typography>
                    <Typography variant="h6" fontWeight={700}>{m.value}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>

            <Typography variant="subtitle2" fontWeight={600} mb={2} color="#8b8fa8">Tips to Improve</Typography>
            <Stack spacing={1}>
              {result.tips.map((tip, i) => (
                <Paper key={i} variant="outlined" sx={{ p: 1.5, borderRadius: 2, borderColor: 'rgba(255,255,255,0.06)' }}>
                  <Typography variant="body2" color="#cdd6f4">💡 {tip}</Typography>
                </Paper>
              ))}
            </Stack>
          </>
        )}
      </Paper>
    </ToolLayout>
  )
}
