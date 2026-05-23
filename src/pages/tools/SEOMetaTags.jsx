import { useState, useMemo } from 'react'
import { Typography, Box, Paper, Button, TextField, Snackbar, Stack } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh'
import ToolLayout from '../../components/ToolLayout'

export default function SEOMetaTags() {
  const [title, setTitle] = useState('10 Free Online Tools for Web Developers in 2025')
  const [desc, setDesc] = useState('Discover the best free online tools for web development. Save time, work faster, and build better websites.')
  const [slug, setSlug] = useState('free-online-tools-web-developers')
  const [siteName, setSiteName] = useState('ToolFast')
  const [siteUrl, setSiteUrl] = useState('https://toolfast.xxddsses.com')
  const [snack, setSnack] = useState(false)

  const result = useMemo(() => {
    const titleTag = `<title>${title}</title>`
    const descTag = `<meta name="description" content="${desc.slice(0, 160)}" />`
    const og = [
      `<meta property="og:title" content="${title}" />`,
      `<meta property="og:description" content="${desc.slice(0, 200)}" />`,
      `<meta property="og:type" content="website" />`,
      `<meta property="og:url" content="${siteUrl}/${slug}" />`,
      `<meta property="og:site_name" content="${siteName}" />`,
      `<meta property="og:image" content="${siteUrl}/og-image.png" />`,
    ].join('\n')
    const twitter = [
      `<meta name="twitter:card" content="summary_large_image" />`,
      `<meta name="twitter:title" content="${title}" />`,
      `<meta name="twitter:description" content="${desc.slice(0, 200)}" />`,
    ].join('\n')
    const all = [titleTag, descTag, '', '<!-- Open Graph -->', og, '', '<!-- Twitter Card -->', twitter].join('\n')
    return { titleTag, descTag, og, twitter, all }
  }, [title, desc, slug, siteName, siteUrl])

  const previewUrl = siteUrl + '/' + slug

  return (
    <ToolLayout title="SEO Meta Tag Generator" description="Generate perfect meta tags, Open Graph, and Twitter Cards for any page." category="Developer Tools">
      <Paper sx={{ p: 4, borderRadius: 4 }}>
        <Stack spacing={2} mb={4}>
          <TextField value={title} onChange={e => setTitle(e.target.value)} label="Page Title" size="small" helperText={title.length + '/60 chars'} />
          <TextField value={desc} onChange={e => setDesc(e.target.value)} label="Meta Description" multiline rows={2} size="small" helperText={desc.length + '/160 chars'} error={desc.length > 160} />
          <TextField value={slug} onChange={e => setSlug(e.target.value)} label="URL Slug" size="small" />
          <TextField value={siteName} onChange={e => setSiteName(e.target.value)} label="Site Name" size="small" />
          <TextField value={siteUrl} onChange={e => setSiteUrl(e.target.value)} label="Base URL" size="small" />
        </Stack>

        {/* Google Preview */}
        <Typography variant="subtitle2" fontWeight={600} mb={1} color="#8b8fa8">Google Preview</Typography>
        <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, mb: 4, bgcolor: '#1e1e2e' }}>
          <Typography variant="body1" sx={{ color: '#8ab4f8', fontSize: '1.1rem' }}>{title}</Typography>
          <Typography variant="caption" sx={{ color: '#34d399' }}>{previewUrl}</Typography>
          <Typography variant="body2" sx={{ color: '#9aa0a6', mt: 0.5 }}>{desc.slice(0, 160)}</Typography>
        </Paper>

        {/* Generated Code */}
        <Typography variant="subtitle2" fontWeight={600} mb={1} color="#8b8fa8">Generated HTML</Typography>
        <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, bgcolor: '#1e1e2e', fontFamily: 'monospace', fontSize: '0.8rem', color: '#cdd6f4', whiteSpace: 'pre-wrap', mb: 2, position: 'relative' }}>
          {result.all}
        </Paper>
        
        <Button variant="contained" startIcon={<ContentCopyIcon />} onClick={() => { navigator.clipboard.writeText(result.all); setSnack(true) }}>
          Copy All Tags
        </Button>
      </Paper>
      <Snackbar open={snack} autoHideDuration={1500} onClose={() => setSnack(false)} message="Copied!" />
    </ToolLayout>
  )
}
