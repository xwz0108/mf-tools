import { useState, useMemo } from 'react'
import { Typography, Box, Paper, TextField, Chip, Stack, Grid, LinearProgress } from '@mui/material'
import ToolLayout from '../../components/ToolLayout'

function analyze(text, minLen = 2) {
  const words = text.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/).filter(w => w.length >= minLen)
  const total = words.length
  const counts = {}
  words.forEach(w => { counts[w] = (counts[w] || 0) + 1 })
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 20)
  return { total, words: sorted.map(([w, c]) => ({ word: w, count: c, pct: ((c / total) * 100).toFixed(1) })) }
}

export default function KeywordDensity() {
  const [text, setText] = useState(`SEO meta tags are essential for on-page optimization. This SEO tool helps you generate perfect meta tags for your website. Meta tags improve SEO and social sharing. Use this SEO tool to preview how your page looks on Google and social media. Good SEO practices include proper meta descriptions, title tags, and Open Graph tags.`)
  const [stopWords, setStopWords] = useState('the,a,an,is,are,was,were,be,been,being,have,has,had,do,does,did,will,would,could,should,may,might,must,shall,can,need,dare,ought,used,to,of,in,for,on,with,at,by,from,as,into,through,during,before,after,above,below,between,under,again,further,then,once,here,there,when,where,why,how,all,each,few,more,most,other,some,such,no,nor,not,only,own,same,so,than,too,very,just,and,but,if,or,because,until,while,what,which,who,whom,this,that,these,those,am,it,its,itself,they,them,their,theirs,themselves,you,your,yours,yourself,yourselves,he,him,his,himself,she,her,hers,herself,itself,we,us,our,ours,ourselves')

  const result = useMemo(() => analyze(text), [text])

  return (
    <ToolLayout title="Keyword Density Checker" description="Analyze keyword density for SEO. Find the most frequent words and optimize your content." category="Developer Tools">
      <Paper sx={{ p: 4, borderRadius: 4 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
          <Box flex={1}>
            <Typography variant="subtitle2" fontWeight={600} mb={1} color="#8b8fa8">Paste your content</Typography>
            <TextField value={text} onChange={e => setText(e.target.value)} fullWidth multiline rows={10} sx={{ mb: 2 }} />
            <Typography variant="caption" color="text.secondary">{result.total} words analyzed</Typography>
          </Box>
          <Box flex={1}>
            <Typography variant="subtitle2" fontWeight={600} mb={1} color="#8b8fa8">Keyword Density</Typography>
            <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, maxHeight: 320, overflow: 'auto' }}>
              {result.words.map((w, i) => (
                <Box key={w.word} sx={{ mb: 1.5 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" mb={0.5}>
                    <Typography fontWeight={600} fontSize="0.9rem">{w.word}</Typography>
                    <Typography variant="caption" color="text.secondary">{w.count} × ({w.pct}%)</Typography>
                  </Stack>
                  <LinearProgress variant="determinate" value={Math.min(parseFloat(w.pct) * 5, 100)} sx={{ height: 6, borderRadius: 3, '& .MuiLinearProgress-bar': { bgcolor: parseFloat(w.pct) > 5 ? '#34d399' : parseFloat(w.pct) > 2 ? '#a78bfa' : '#6b6f7e' } }} />
                </Box>
              ))}
            </Paper>
          </Box>
        </Stack>
        <Typography variant="caption" color="#6b6f7e" mt={3} display="block">
          💡 SEO Tip: Keep your target keyword density between 1-3%. Over-optimization can hurt rankings.
        </Typography>
      </Paper>
    </ToolLayout>
  )
}
