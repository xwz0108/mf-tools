import { useState, useMemo } from 'react'
import { Typography, Box, Paper, TextField, Chip, Stack, Grid, LinearProgress } from '@mui/material'
import ToolLayout from '../../components/ToolLayout'

// Z-score for common confidence levels
const CONFIDENCE = { 80: 1.28, 90: 1.645, 95: 1.96, 99: 2.576 }

export default function ABTestCalculator() {
  const [controlVisitors, setControlVisitors] = useState(1000)
  const [controlConversions, setControlConversions] = useState(50)
  const [variantVisitors, setVariantVisitors] = useState(1000)
  const [variantConversions, setVariantConversions] = useState(65)

  const result = useMemo(() => {
    const crA = controlConversions / controlVisitors
    const crB = variantConversions / variantVisitors
    const lift = crA > 0 ? ((crB - crA) / crA * 100) : 0
    
    const pPool = (controlConversions + variantConversions) / (controlVisitors + variantVisitors)
    const se = Math.sqrt(pPool * (1 - pPool) * (1/controlVisitors + 1/variantVisitors))
    const z = se > 0 ? Math.abs(crB - crA) / se : 0

    // Find confidence level
    let conf = 0
    for (const [k, v] of Object.entries(CONFIDENCE)) { if (z >= v) conf = parseInt(k) }
    
    const significant = z >= 1.96

    return {
      crA: (crA * 100).toFixed(2), crB: (crB * 100).toFixed(2),
      lift: lift.toFixed(1),
      z: z.toFixed(2),
      confidence: conf,
      significant,
      winner: lift > 0 ? 'Variant B wins!' : lift < 0 ? 'Control A wins!' : 'No clear winner',
      needsVisitors: !significant && conf > 0 ? `Need ~${Math.round(controlVisitors * ((1.96/Math.max(z,0.1))**2) - controlVisitors)} more visitors for 95% confidence` : null,
    }
  }, [controlVisitors, controlConversions, variantVisitors, variantConversions])

  return (
    <ToolLayout title="A/B Test Calculator" description="Calculate statistical significance for A/B tests. Know when your results are real, not lucky." category="Developer Tools">
      <Paper sx={{ p: 4, borderRadius: 4 }}>
        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" fontWeight={600} mb={2} color="#8b8fa8">Control (A)</Typography>
            <Stack spacing={2}>
              <TextField label="Visitors" value={controlVisitors} onChange={e => setControlVisitors(Number(e.target.value) || 0)} type="number" size="small" />
              <TextField label="Conversions" value={controlConversions} onChange={e => setControlConversions(Number(e.target.value) || 0)} type="number" size="small" />
              <Typography variant="caption" color="text.secondary">CR: {result.crA}%</Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" fontWeight={600} mb={2} color="#34d399">Variant (B)</Typography>
            <Stack spacing={2}>
              <TextField label="Visitors" value={variantVisitors} onChange={e => setVariantVisitors(Number(e.target.value) || 0)} type="number" size="small" />
              <TextField label="Conversions" value={variantConversions} onChange={e => setVariantConversions(Number(e.target.value) || 0)} type="number" size="small" />
              <Typography variant="caption" color="text.secondary">CR: {result.crB}%</Typography>
            </Stack>
          </Grid>
        </Grid>

        <Box sx={{ p: 4, borderRadius: 3, bgcolor: result.significant ? 'rgba(52,211,153,0.06)' : 'rgba(251,146,60,0.06)', textAlign: 'center', mb: 4, border: `1px solid ${result.significant ? 'rgba(52,211,153,0.2)' : 'rgba(251,146,60,0.2)'}` }}>
          <Typography variant="caption" color="text.secondary">Confidence Level</Typography>
          <Typography variant="h3" fontWeight={800} sx={{ color: result.significant ? '#34d399' : '#fb923c' }}>{result.confidence}%</Typography>
          <Chip label={result.significant ? 'Statistically Significant ✓' : 'Not Significant Yet'} color={result.significant ? 'success' : 'warning'} sx={{ mt: 1 }} />
        </Box>

        <Grid container spacing={2}>
          {[
            { label: 'Z-Score', value: result.z },
            { label: 'Lift', value: result.lift + '%' },
            { label: 'B Conversion Rate', value: result.crB + '%' },
            { label: 'Result', value: result.winner },
          ].map(m => (
            <Grid item xs={6} sm={3} key={m.label}>
              <Box sx={{ p: 2, borderRadius: 2, bgcolor: 'rgba(255,255,255,0.03)', textAlign: 'center', border: '1px solid rgba(255,255,255,0.06)' }}>
                <Typography variant="caption" color="text.secondary">{m.label}</Typography>
                <Typography variant="h6" fontWeight={700}>{m.value}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        {result.needsVisitors && (
          <Typography variant="body2" color="#fb923c" mt={3} textAlign="center">💡 {result.needsVisitors}</Typography>
        )}
      </Paper>
    </ToolLayout>
  )
}
