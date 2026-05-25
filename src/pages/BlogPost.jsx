import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Container, Typography, Box, Paper, Chip, Stack, Button, Breadcrumbs } from '@mui/material'
import ReactMarkdown from 'react-markdown'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

const toolLinks = {
  'sql-formatter': '/tools/sql-formatter',
  'jwt-decoder': '/tools/jwt-decoder',
  'cron-visualizer': '/tools/cron-visualizer',
  'mermaid-editor': '/tools/mermaid-editor',
  'regex-visualizer': '/tools/regex-visualizer',
  'http-headers': '/tools/http-headers',
  'browser-fingerprint': '/tools/browser-fingerprint',
  'ip-calculator': '/tools/ip-calculator',
  'timestamp-converter': '/tools/timestamp-converter',
  'base64-encoder': '/tools/base64-encoder',
  'url-encoder': '/tools/url-encoder',
  'qr-generator': '/tools/qr-generator',
  'uuid-generator': '/tools/uuid-generator',
  'json-formatter': '/tools/json-formatter',
  'markdown-previewer': '/tools/markdown-previewer',
  'ai-tool-comparator': '/tools/ai-tool-comparator',
  'color-blind-challenge': '/tools/color-blind-challenge',
}

const toolNames = {
  'timestamp-converter': 'Timestamp Converter',
  'base64-encoder': 'Base64 Encoder',
  'url-encoder': 'URL Encoder',
  'qr-generator': 'QR Code Generator',
  'uuid-generator': 'UUID Generator',
  'json-formatter': 'JSON Formatter',
  'markdown-previewer': 'Markdown Previewer',
  'ai-tool-comparator': 'AI Tool Comparator',
  'color-blind-challenge': 'Color Blind Challenge',
  'jwt-decoder': 'JWT Decoder',
  'cron-visualizer': 'Cron Visualizer',
  'mermaid-editor': 'Mermaid Editor',
  'regex-visualizer': 'Regex Visualizer',
  'http-headers': 'HTTP Headers Parser',
  'browser-fingerprint': 'Browser Fingerprint Checker',
  'ip-calculator': 'IP/CIDR Calculator',
}

const metaData = {
  'sql-explain-plan-guide': { title: 'How to Read SQL Execution Plans — A Visual Guide', desc: 'Learn to interpret SQL execution plans with visual examples. Stop guessing and start optimizing your queries.', tool: 'sql-formatter' },
  'jwt-tokens-explained': { title: 'JWT Tokens Explained: Header, Payload, Signature', desc: 'Understand JSON Web Tokens from the ground up. Visual guide with real token examples and interactive decoding.', tool: 'jwt-decoder' },
  'cron-jobs-explained': { title: 'Cron Jobs Explained: A Visual Guide to Cron Syntax', desc: 'Master cron scheduling with interactive examples. Never misconfigure a cron job again.', tool: 'cron-visualizer' },
  'mermaid-diagrams-guide': { title: 'Mermaid Diagrams: The Complete Beginner Guide', desc: 'Create flowcharts, sequence diagrams, and more with Mermaid.js. Full syntax reference with live editor.', tool: 'mermaid-editor' },
  'regex-cheat-sheet': { title: 'Regex Cheat Sheet with Interactive Examples', desc: 'Master regular expressions with this visual guide. Common patterns, flags, and interactive testing.', tool: 'regex-visualizer' },
  'http-headers-explained': { title: 'HTTP Headers Explained: A Complete Reference', desc: 'Every HTTP header you need to know. Security, caching, CORS, and more explained with interactive parsing.', tool: 'http-headers' },
  'browser-fingerprint-guide': { title: 'Understanding Browser Fingerprints — How to Check Yours', desc: 'What browser fingerprinting is, how it works, and how to see your own unique fingerprint.', tool: 'browser-fingerprint' },
  'ip-subnetting-guide': { title: 'IP Subnetting Made Simple — CIDR Calculator Guide', desc: 'Learn subnetting the easy way. Visual CIDR guide with interactive calculator examples.', tool: 'ip-calculator' },
  'unix-timestamp-explained': { title: 'Unix Timestamps Explained — Epoch Time Guide', desc: 'What is epoch time, why 1970, and how to convert timestamps to human dates.', tool: 'timestamp-converter' },
  'base64-encoding-explained': { title: 'Base64 Encoding Explained — Encode & Decode Guide', desc: 'Learn how Base64 works, when to use it, and why it is not encryption.', tool: 'base64-encoder' },
  'url-encoding-explained': { title: 'URL Encoding Explained — Why Spaces Become %20', desc: 'What is percent-encoding and when to use URL encode/decode in your code.', tool: 'url-encoder' },
  'qr-codes-explained': { title: 'How QR Codes Work — A Visual Explanation', desc: 'Anatomy of QR codes, error correction levels, and what data they can store.', tool: 'qr-generator' },
  'uuid-guid-explained': { title: 'UUID vs GUID Explained — Which Version to Use', desc: 'UUID versions compared. When to use v4 vs v7 for database primary keys.', tool: 'uuid-generator' },
  'json-explained': { title: 'JSON Explained for Beginners — Format & Validate', desc: 'Complete JSON syntax guide with common mistakes and formatting tips.', tool: 'json-formatter' },
  'markdown-cheat-sheet': { title: 'Markdown Cheat Sheet — Syntax & Live Preview', desc: 'Every Markdown syntax you need. Headings, lists, code blocks, tables, and more.', tool: 'markdown-previewer' },
  'ai-tool-selection-guide': { title: 'How to Choose the Right AI Tool — A Framework', desc: 'Step-by-step guide to evaluating and comparing AI tools for your needs.', tool: 'ai-tool-comparator' },
  'color-blindness-guide': { title: 'Understanding Color Blindness — Types & Design Tips', desc: 'Learn the 3 main types of color blindness and how to design for accessibility.', tool: 'color-blind-challenge' },
}

export default function BlogPost() {
  const { slug } = useParams()
  const [content, setContent] = useState('')
  const meta = metaData[slug] || { title: 'Tutorial', desc: '', tool: null }

  useEffect(() => {
    import(`../content/blog/${slug}.md?raw`)
      .then(m => setContent(m.default))
      .catch(() => setContent('Article coming soon.'))
  }, [slug])

  return (
    <>
      <Helmet>
        <title>{meta.title + ' | ToolFast Blog'}</title>
        <meta name="description" content={meta.desc} />
      </Helmet>
      <Container maxWidth="md" sx={{ pt: 6, pb: 10, position: 'relative', zIndex: 1 }}>
        <Breadcrumbs sx={{ mb: 3, '& a': { color: '#6b6f7e', textDecoration: 'none', '&:hover': { color: '#a78bfa' } } }}>
          <Link to="/">Home</Link>
          <Link to="/blog">Blog</Link>
          <Typography variant="body2" color="#a78bfa">{meta.title}</Typography>
        </Breadcrumbs>

        <Typography variant="h2" fontWeight={700} mb={1} fontSize={{ xs: '1.4rem', md: '2rem' }}>{meta.title}</Typography>
        <Typography variant="body1" color="text.secondary" mb={4}>{meta.desc}</Typography>

        <Paper variant="outlined" sx={{ p: { xs: 3, md: 5 }, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.02)', lineHeight: 1.9,
          '& h2': { color: '#e8e6f0', mt: 5, mb: 2, fontSize: '1.5rem', fontWeight: 700 },
          '& h3': { color: '#cdd6f4', mt: 3, mb: 1, fontWeight: 700 },
          '& p': { color: '#a0a4b8', mb: 2, lineHeight: 1.9 },
          '& code': { bgcolor: 'rgba(167,139,250,0.1)', color: '#c4b5fd', px: 1, py: 0.3, borderRadius: 1, fontSize: '0.88em' },
          '& pre': { bgcolor: '#1a1a2e', p: 3, borderRadius: 3, overflow: 'auto', mb: 2, fontSize: '0.85rem' },
          '& ul, & ol': { color: '#a0a4b8', pl: 3, mb: 2 },
          '& li': { mb: 0.5 },
          '& blockquote': { borderLeft: '3px solid rgba(167,139,250,0.3)', pl: 3, py: 1, color: '#8b8fa8', bgcolor: 'rgba(167,139,250,0.04)', borderRadius: 2, mb: 2 },
          '& a': { color: '#a78bfa', textDecoration: 'underline' },
          '& table': { width: '100%', borderCollapse: 'collapse', mb: 2 },
          '& th': { borderBottom: '2px solid rgba(255,255,255,0.1)', p: 1.5, textAlign: 'left', color: '#a78bfa' },
          '& td': { borderBottom: '1px solid rgba(255,255,255,0.06)', p: 1.5, color: '#a0a4b8' },
        }}>
          <ReactMarkdown>{content || '*Loading...*'}</ReactMarkdown>
        </Paper>

        {meta.tool && (
          <Box sx={{ mt: 5, textAlign: 'center' }}>
            <Paper sx={{ p: 5, borderRadius: 4, background: 'linear-gradient(135deg, rgba(167,139,250,0.08), rgba(5,150,105,0.08))', border: '1px solid rgba(167,139,250,0.15)' }}>
              <Typography variant="h5" fontWeight={700} mb={1}>Try {toolNames[meta.tool]}</Typography>
              <Typography variant="body2" color="text.secondary" mb={3}>Use the interactive tool while following this guide</Typography>
              <Stack direction="row" spacing={2} justifyContent="center">
                <Button variant="contained" component={Link} to={toolLinks[meta.tool]} endIcon={<ArrowForwardIcon />}>Open {toolNames[meta.tool]} →</Button>
                <Button variant="outlined" component={Link} to="/blog">More Tutorials</Button>
              </Stack>
            </Paper>
          </Box>
        )}

        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Typography variant="body2" color="#5a5f6e" mb={2}>More developer tools</Typography>
          <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap" useFlexGap>
            {Object.entries(toolNames).map(([id, name]) => (
              <Chip key={id} label={name} component={Link} to={toolLinks[id]} size="small" variant="outlined" clickable sx={{ borderColor: 'rgba(255,255,255,0.06)' }} />
            ))}
          </Stack>
        </Box>
      </Container>
    </>
  )
}
