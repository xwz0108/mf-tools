import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import {
  Container, Typography, Box, Card, CardContent, Grid, Chip, TextField,
  InputAdornment, Tabs, Tab, Fade,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import BoltIcon from '@mui/icons-material/Bolt'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import SpeedIcon from '@mui/icons-material/Speed'
import tools from '../data/tools.json'

const categories = ['All', 'Decision & Random', 'Creative', 'Mini Games', 'Life Calculators', 'Text Fun', 'Fun Generators']

const categoryIcons = {
  'Decision & Random': '🎲',
  'Creative': '🎨',
  'Mini Games': '🎮',
  'Life Calculators': '🧮',
  'Text Fun': '📝',
  'Fun Generators': '🎁',
}

function ToolCard({ tool }) {
  return (
    <Fade in timeout={600}>
      <Card
        component={Link}
        to={`/tools/${tool.id}`}
        sx={{
          textDecoration: 'none',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'all 0.2s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 40px rgba(67,97,238,0.12)',
            borderColor: '#4361ee',
          },
        }}
      >
        <CardContent sx={{ flex: 1, p: 3 }}>
          <Typography variant="h3" sx={{ fontSize: '2rem', mb: 1.5, lineHeight: 1 }}>
            {categoryIcons[tool.category]}
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5, fontSize: '1rem' }}>
            {tool.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem', lineHeight: 1.5, mb: 1.5 }}>
            {tool.description.slice(0, 100)}...
          </Typography>
          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
            {tool.tags.slice(0, 3).map(tag => (
              <Chip key={tag} label={tag} size="small" sx={{ fontSize: '0.7rem', height: 22, bgcolor: 'rgba(67,97,238,0.06)', color: 'primary.main' }} />
            ))}
          </Box>
        </CardContent>
      </Card>
    </Fade>
  )
}

export default function Home() {
  const [tab, setTab] = useState(0)
  const [search, setSearch] = useState('')

  const filtered = tools.filter(t => {
    if (tab !== 0 && t.category !== categories[tab]) return false
    if (search && !t.name.toLowerCase().includes(search.toLowerCase()) && !t.description.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const featured = tools.filter(t => t.featured).slice(0, 6)

  return (
    <>
      <Helmet>
        <title>ToolFast — Free Online Tools, No Sign-Up Required</title>
        <meta name="description" content="31 free online tools for creativity, decision-making, games, and calculations. No registration needed. Everything works in your browser." />
      </Helmet>

      {/* Hero */}
      <Box sx={{ textAlign: 'center', pt: { xs: 6, md: 10 }, pb: { xs: 4, md: 6 }, px: 2 }}>
        <Container maxWidth="md">
          <Typography variant="h1" sx={{ fontSize: { xs: '2.2rem', md: '3.5rem' }, mb: 2 }}>
            Free Online Tools
          </Typography>
          <Typography variant="body1" sx={{ fontSize: { xs: '1rem', md: '1.2rem' }, color: 'text.secondary', mb: 4, maxWidth: 600, mx: 'auto' }}>
            Everything you need — decision makers, creative generators, mini games, and life calculators. All free, no sign-up required.
          </Typography>

          {/* Value Props */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: { xs: 2, md: 4 }, mb: 5, flexWrap: 'wrap' }}>
            {[
              { icon: <BoltIcon />, label: '31 Free Tools' },
              { icon: <LockOpenIcon />, label: 'No Registration' },
              { icon: <SpeedIcon />, label: 'Instant Access' },
            ].map((item, i) => (
              <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ color: 'primary.main' }}>{item.icon}</Box>
                <Typography variant="body2" fontWeight={600}>{item.label}</Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Search & Filter */}
      <Container maxWidth="xl">
        <Box sx={{ mb: 3, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, alignItems: { md: 'center' } }}>
          <TextField
            placeholder="Search 31 tools..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            size="small"
            sx={{ maxWidth: 360 }}
            InputProps={{
              startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: 'text.secondary' }} /></InputAdornment>,
              sx: { borderRadius: 3, bgcolor: 'white' },
            }}
          />
          <Tabs
            value={tab}
            onChange={(_, v) => setTab(v)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ minHeight: 40, '& .MuiTab-root': { minHeight: 40, py: 0.5, textTransform: 'none', fontWeight: 600 } }}
          >
            {categories.map(cat => <Tab key={cat} label={cat} />)}
          </Tabs>
        </Box>

        {filtered.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">No tools found matching your search.</Typography>
            <Typography variant="body2" color="text.secondary">Try a different keyword or category.</Typography>
          </Box>
        )}

        {/* Tool Grid */}
        <Grid container spacing={2.5}>
          {filtered.map(tool => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={tool.id}>
              <ToolCard tool={tool} />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Stats / About */}
      <Container maxWidth="md" sx={{ mt: 10, mb: 6, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ mb: 1, fontWeight: 700 }}>Why ToolFast?</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 540, mx: 'auto' }}>
          We believe useful tools should be free, fast, and private. No accounts, no tracking, no ads — just tools that work.
        </Typography>
        <Grid container spacing={3}>
          {[
            { title: '100% Free', desc: 'Every tool is completely free. No hidden costs, no premium tiers.' },
            { title: 'Privacy First', desc: 'All data stays in your browser. Nothing is ever sent to our servers.' },
            { title: 'Lightning Fast', desc: 'Built with modern tech. Tools load instantly, work offline.' },
          ].map((item, i) => (
            <Grid item xs={12} md={4} key={i}>
              <Box sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={700} gutterBottom>{item.title}</Typography>
                <Typography variant="body2" color="text.secondary">{item.desc}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  )
}
