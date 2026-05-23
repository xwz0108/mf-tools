import { useState, useEffect, useRef } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import {
  Container, Typography, Box, Card, CardContent, Grid, Chip, TextField,
  InputAdornment, Tabs, Tab, Fade, Stack,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import BoltIcon from '@mui/icons-material/Bolt'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import SpeedIcon from '@mui/icons-material/Speed'
import { motion, AnimatePresence } from 'framer-motion'
import tools from '../data/tools.json'

const categories = ['All', 'Decision & Random', 'Creative', 'Mini Games', 'Life Calculators', 'Text Fun', 'Fun Generators', 'Developer Tools']

const categoryColors = {
  'Decision & Random': { gradient: 'linear-gradient(135deg, #7c3aed, #a78bfa)', glow: 'rgba(124,58,237,0.15)', icon: '🎲' },
  'Creative': { gradient: 'linear-gradient(135deg, #ea580c, #fb923c)', glow: 'rgba(251,146,60,0.15)', icon: '🎨' },
  'Mini Games': { gradient: 'linear-gradient(135deg, #059669, #34d399)', glow: 'rgba(52,211,153,0.15)', icon: '🎮' },
  'Life Calculators': { gradient: 'linear-gradient(135deg, #2563eb, #60a5fa)', glow: 'rgba(96,165,250,0.15)', icon: '🧮' },
  'Text Fun': { gradient: 'linear-gradient(135deg, #db2777, #f472b6)', glow: 'rgba(244,114,182,0.15)', icon: '📝' },
  'Fun Generators': { gradient: 'linear-gradient(135deg, #ca8a04, #eab308)', glow: 'rgba(234,179,8,0.15)', icon: '🎁' },
  'Developer Tools': { gradient: 'linear-gradient(135deg, #00d2ff, #3a7bd5)', glow: 'rgba(0,210,255,0.15)', icon: '🛠️' },
}

const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-50px' }, transition: { duration: 0.5 } }

function ToolCard({ tool, index }) {
  const cc = categoryColors[tool.category] || categoryColors['Creative']
  return (
    <motion.div {...fadeUp} transition={{ duration: 0.5, delay: index * 0.05 }}>
      <Card
        component={Link}
        to={`/tools/${tool.id}`}
        sx={{
          textDecoration: 'none', height: '100%', display: 'flex', flexDirection: 'column',
          transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
          position: 'relative', overflow: 'visible',
          '&:hover': {
            transform: 'translateY(-6px)',
            borderColor: 'rgba(167,139,250,0.3)',
            boxShadow: `0 16px 48px ${cc.glow}`,
            '& .card-icon': { transform: 'scale(1.1) rotate(6deg)' },
            '& .card-arrow': { opacity: 1, transform: 'translateX(0)' },
          },
        }}
      >
        <CardContent sx={{ flex: 1, p: 3, pb: 2 }}>
          {/* Icon with gradient bg */}
          <Box className="card-icon" sx={{
            width: 48, height: 48, borderRadius: 3, mb: 2,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.4rem', background: cc.gradient,
            transition: 'transform 0.3s ease',
          }}>
            {cc.icon}
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5, fontSize: '1rem', color: '#e8e6f0' }}>
            {tool.name}
          </Typography>
          <Typography variant="body2" sx={{ fontSize: '0.82rem', lineHeight: 1.5, mb: 1.5, color: '#6b6f7e' }}>
            {tool.description.slice(0, 90)}...
          </Typography>
          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
            {tool.tags.slice(0, 3).map(tag => (
              <Chip key={tag} label={tag} size="small"
                sx={{ fontSize: '0.68rem', height: 22, bgcolor: 'rgba(167,139,250,0.08)', color: '#a78bfa', borderRadius: 1.5 }} />
            ))}
          </Box>
          {/* Arrow indicator */}
          <Typography className="card-arrow" sx={{
            position: 'absolute', bottom: 16, right: 20, opacity: 0.4,
            transform: 'translateX(-4px)', transition: 'all 0.3s ease',
            fontSize: '1.2rem', color: '#a78bfa',
          }}>→</Typography>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function CategoryBento({ category, tools, innerRef }) {
  const cc = categoryColors[category] || categoryColors['Creative']
  return (
    <motion.div {...fadeUp} ref={innerRef} style={{ scrollMarginTop: 80 }}>
      <Box sx={{ mb: 5 }}>
        {/* Category header */}
        <Stack direction="row" alignItems="center" spacing={1.5} mb={3}>
          <Box sx={{ width: 10, height: 10, borderRadius: '50%', background: cc.gradient }} />
          <Typography variant="h5" fontWeight={700} sx={{ color: '#e8e6f0', letterSpacing: '-0.02em' }}>
            {category}
          </Typography>
          <Typography variant="body2" sx={{ color: '#5a5f6e' }}>({tools.length} tools)</Typography>
        </Stack>

        <Grid container spacing={2}>
          {tools.map((tool, i) => (
            <Grid item xs={6} md={3} key={tool.id}>
              <ToolCard tool={tool} index={i} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </motion.div>
  )
}

export default function Home() {
  const [search, setSearch] = useState('')
  const [searchParams] = useSearchParams()
  const categoryRefs = useRef({})

  useEffect(() => {
    const cat = searchParams.get('category')
    if (cat && categoryRefs.current[cat]) {
      setTimeout(() => {
        categoryRefs.current[cat].scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 300)
    }
  }, [searchParams])
  const filtered = tools.filter(t =>
    !search || t.name.toLowerCase().includes(search.toLowerCase()) || t.description.toLowerCase().includes(search.toLowerCase())
  )

  const categoriesWithTools = categories.slice(1).map(cat => ({
    name: cat, tools: tools.filter(t => t.category === cat)
  }))

  return (
    <>
      <Helmet>
        <title>{'ToolFast — ' + tools.length + ' Free Online Tools, No Sign-Up'}</title>
        <meta name="description" content={tools.length + ' free online tools for creativity, decision-making, games, and calculations. No registration. No tracking. Just tools.'} />
        <link rel="canonical" href="https://toolfast.xxddsses.com/" />
        <meta property="og:title" content={'ToolFast — ' + tools.length + ' Free Online Tools'} />
        <meta property="og:description" content="All free. No sign-up required. Instant access from your browser." />
        <meta property="og:url" content="https://toolfast.xxddsses.com/" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "ToolFast",
          "url": "https://toolfast.xxddsses.com",
          "description": `${tools.length} free online tools. No sign-up required.`,
          "potentialAction": { "@type": "SearchAction", "target": "https://toolfast.xxddsses.com/?search={search_term}", "query-input": "required name=search_term" }
        })}</script>
      </Helmet>

      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', pt: { xs: 8, md: 14 }, pb: { xs: 6, md: 10 }, px: 2, position: 'relative' }}>
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16,1,0.3,1] }}>
            {/* Badge */}
            <Chip
              label={`${tools.length} Tools · 100% Free`}
              size="small"
              sx={{
                mb: 3, bgcolor: 'rgba(167,139,250,0.08)', color: '#c4b5fd',
                border: '1px solid rgba(167,139,250,0.2)', fontWeight: 600,
                fontSize: '0.8rem', px: 1,
              }}
            />

            <Typography variant="h1" sx={{ fontSize: { xs: '2rem', md: '4rem' }, mb: 2, lineHeight: 1.1 }}>
              Tools that <span className="gradient-text">just work</span>.<br />
              No sign-up. No popup ads. No nonsense.
            </Typography>

            <Typography variant="body1" sx={{ fontSize: { xs: '1rem', md: '1.2rem' }, color: '#6b6f7e', mb: 5, maxWidth: 560, mx: 'auto', lineHeight: 1.6 }}>
              Spin wheels, generate text, test your skills, calculate anything — all in your browser, all instantly available.
            </Typography>

            {/* Value Props */}
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: { xs: 2, md: 5 }, mb: 6, flexWrap: 'wrap' }}>
              {[
                { icon: <BoltIcon />, label: `${tools.length} Free Tools`, color: '#a78bfa' },
                { icon: <LockOpenIcon />, label: 'No Registration', color: '#fb923c' },
                { icon: <SpeedIcon />, label: 'Instant Access', color: '#34d399' },
              ].map((item, i) => (
                <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                  <Box sx={{
                    width: 36, height: 36, borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: `rgba(255,255,255,0.04)`, color: item.color,
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}>{item.icon}</Box>
                  <Typography variant="body2" fontWeight={600} color="#a0a4b8">{item.label}</Typography>
                </Box>
              ))}
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* Search & Filter */}
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ mb: 5, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, alignItems: 'center' }}>
          <TextField
            placeholder={`Search ${tools.length} tools...`}
            value={search}
            onChange={e => setSearch(e.target.value)}
            size="small"
            sx={{ maxWidth: 340 }}
            InputProps={{
              startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: '#5a5f6e' }} /></InputAdornment>,
              sx: { borderRadius: 3, bgcolor: 'rgba(255,255,255,0.03)', color: '#e8e6f0' },
            }}
          />
        </Box>

        {search ? (
          /* Search Results in Grid */
          <Box>
            <Typography variant="h6" sx={{ color: '#8b8fa8', mb: 3, fontWeight: 500 }}>
              {filtered.length} results for "{search}"
            </Typography>
            <Grid container spacing={2}>
              {filtered.map((tool, i) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={tool.id}>
                  <ToolCard tool={tool} index={i} />
                </Grid>
              ))}
            </Grid>
          </Box>
        ) : (
          /* Bento Grid by Category */
          categoriesWithTools.map(cat => (
            <CategoryBento key={cat.name} category={cat.name} tools={cat.tools} innerRef={el => { categoryRefs.current[cat.name] = el }} />
          ))
        )}
      </Container>

      {/* Why ToolFast */}
      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, mt: 10, mb: 8, textAlign: 'center' }}>
        <motion.div {...fadeUp}>
          <Typography variant="h3" className="gradient-text" sx={{ mb: 1, fontWeight: 700, fontSize: { xs: '1.8rem', md: '2.2rem' } }}>
            Why ToolFast?
          </Typography>
          <Typography variant="body1" sx={{ color: '#6b6f7e', mb: 5, maxWidth: 520, mx: 'auto' }}>
            Useful tools should be free, fast, and private. No accounts, no tracking, no annoying ads — just tools that work.
          </Typography>
          <Grid container spacing={4}>
            {[
              { title: '100% Free', desc: 'Every tool is completely free. No hidden costs or premium tiers. Ever.' },
              { title: 'Privacy First', desc: 'All data stays in your browser. Nothing is sent to our servers.' },
              { title: 'Lightning Fast', desc: 'Built with modern tech. Tools load instantly and work offline.' },
            ].map((item, i) => (
              <Grid item xs={12} md={4} key={i}>
                <Box sx={{
                  p: 4, borderRadius: 4,
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))',
                  border: '1px solid rgba(255,255,255,0.06)',
                  height: '100%',
                }}>
                  <Typography variant="h6" fontWeight={700} gutterBottom color="#e8e6f0">{item.title}</Typography>
                  <Typography variant="body2" color="#6b6f7e" lineHeight={1.6}>{item.desc}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </>
  )
}
