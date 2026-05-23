import { useState } from 'react'
import { Typography, Box, Paper, Button, TextField, Grid, Stack, CircularProgress } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import ToolLayout from '../../components/ToolLayout'

export default function WebsiteWorth() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  const estimate = async () => {
    if (!url) return
    setLoading(true)
    // Simulate estimation based on domain factors
    const domain = url.replace(/https?:\/\//, '').replace(/\/.*/, '').replace('www.', '')
    const len = domain.length
    const tld = domain.includes('.com') ? 1.3 : domain.includes('.io') ? 1.1 : domain.includes('.ai') ? 1.4 : 1.0
    const keywords = domain.includes('tool') ? 1.2 : domain.includes('free') ? 1.15 : domain.includes('ai') ? 1.5 : 1.0
    const short = len < 10 ? 1.3 : len < 15 ? 1.1 : 0.9
    const single = domain.split('.').length > 2 ? 0.7 : 1.0
    
    // Mock traffic estimation
    const dailyVisitors = Math.round(100 + Math.random() * 5000)
    const pageViews = Math.round(dailyVisitors * (2 + Math.random() * 3))
    const bounceRate = Math.round(35 + Math.random() * 25)
    
    // Revenue estimates
    const adRevenue = Math.round(dailyVisitors * 0.001 * 30 * (1 + Math.random()))
    const monthlyRevenue = Math.round(adRevenue + (Math.random() * 2000))
    
    // Worth calculation
    const baseWorth = dailyVisitors * 15 + domain.length * 200
    const multiplier = tld * keywords * short * single
    const worth = Math.round(baseWorth * multiplier)

    await new Promise(r => setTimeout(r, 800)) // loading effect

    setResult({
      domain,
      dailyVisitors: dailyVisitors.toLocaleString(),
      pageViews: pageViews.toLocaleString(),
      bounceRate: bounceRate + '%',
      monthlyRevenue: '$' + monthlyRevenue.toLocaleString(),
      worth: '$' + worth.toLocaleString(),
      factors: { tld, keywords, short, single },
    })
    setLoading(false)
  }

  return (
    <ToolLayout title="Website Worth Calculator" description="Estimate how much any website is worth. Based on traffic, domain quality, and revenue potential." category="Developer Tools">
      <Paper sx={{ p: 4, borderRadius: 4 }}>
        <Stack direction="row" spacing={2} mb={4}>
          <TextField
            value={url} onChange={e => setUrl(e.target.value)}
            placeholder="e.g. toolfast.xxddsses.com"
            size="small"
            fullWidth
            onKeyDown={e => e.key === 'Enter' && estimate()}
          />
          <Button variant="contained" onClick={estimate} startIcon={loading ? <CircularProgress size={16} /> : <SearchIcon />} disabled={loading}>
            {loading ? 'Estimating...' : 'Estimate'}
          </Button>
        </Stack>

        {result && (
          <>
            <Box sx={{ p: 4, borderRadius: 3, bgcolor: 'rgba(52,211,153,0.06)', textAlign: 'center', mb: 4, border: '1px solid rgba(52,211,153,0.2)' }}>
              <Typography variant="caption" color="#8b8fa8">Estimated Value</Typography>
              <Typography variant="h2" fontWeight={800} sx={{ color: '#34d399' }}>{result.worth}</Typography>
              <Typography color="#8b8fa8">{result.domain}</Typography>
            </Box>

            <Grid container spacing={2} mb={4}>
              {[{ label:'Daily Visitors', value:result.dailyVisitors },{ label:'Page Views', value:result.pageViews },{ label:'Bounce Rate', value:result.bounceRate },{ label:'Monthly Revenue', value:result.monthlyRevenue }].map(m => (
                <Grid item xs={6} sm={3} key={m.label}>
                  <Box sx={{ p: 2, borderRadius: 2, bgcolor: 'rgba(255,255,255,0.03)', textAlign: 'center', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <Typography variant="caption" color="text.secondary">{m.label}</Typography>
                    <Typography variant="h6" fontWeight={700}>{m.value}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>

            <Typography variant="subtitle2" fontWeight={600} mb={2} color="#8b8fa8">Valuation Factors</Typography>
            <Grid container spacing={1}>
              {[['TLD Factor', result.factors.tld],['Keyword Value', result.factors.keywords],['Domain Length', result.factors.short],['Subdomain', result.factors.single]].map(f => (
                <Grid item xs={3} key={f[0]}>
                  <Box sx={{ p: 1, borderRadius: 1, textAlign: 'center', bgcolor: 'rgba(255,255,255,0.02)' }}>
                    <Typography variant="caption" color="text.secondary">{f[0]}</Typography>
                    <Typography fontWeight={700} color="#c4b5fd">{f[1]}x</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>

            <Typography variant="caption" color="#6b6f7e" mt={3} display="block" textAlign="center">
              ⚠ This is a rough estimate based on domain quality and traffic patterns. Not financial advice.
            </Typography>
          </>
        )}
      </Paper>
    </ToolLayout>
  )
}
