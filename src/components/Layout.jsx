import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  AppBar, Toolbar, Container, Box, Typography, IconButton, Drawer, List, ListItem,
  ListItemButton, ListItemText, InputBase, Chip, Stack, useMediaQuery, useTheme,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import BoltIcon from '@mui/icons-material/Bolt'
import tools from '../data/tools.json'

const categories = ['All', 'Decision & Random', 'Creative', 'Mini Games', 'Life Calculators', 'Text Fun', 'Fun Generators', 'Developer Tools']

export default function Layout({ children }) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'

  const filteredTools = searchQuery
    ? tools.filter(t =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.tags.some(tag => tag.includes(searchQuery.toLowerCase()))
      ).slice(0, 8)
    : []

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh', position: 'relative' }}>
      {/* Dotted background */}
      <div className="bg-dots" />

      {/* Navbar */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: 'rgba(10,10,20,0.75)',
          backdropFilter: 'blur(24px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          zIndex: 1200,
        }}
      >
        <Toolbar sx={{ minHeight: { xs: 56, md: 68 } }}>
          <Container maxWidth="xl" sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* Logo */}
            <Box
              component={Link}
              to="/"
              sx={{ display: 'flex', alignItems: 'center', gap: 1.2, textDecoration: 'none' }}
            >
              <Box sx={{
                width: 36, height: 36, borderRadius: 2,
                background: 'linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 16px rgba(124,58,237,0.3)',
              }}>
                <BoltIcon sx={{ fontSize: 20, color: '#fff' }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#e8e6f0', fontSize: { xs: '1.1rem', md: '1.3rem' }, letterSpacing: '-0.02em' }}>
                ToolFast
              </Typography>
            </Box>

            <Box sx={{ flex: 1 }} />

            {/* Desktop Nav */}
            {!isMobile && (
              <Stack direction="row" spacing={0.5}>
                {categories.slice(1).map(cat => (
                  <Chip
                    key={cat}
                    label={cat}
                    component={Link}
                    to={'/?category=' + encodeURIComponent(cat)}
                    variant="outlined"
                    size="small"
                    clickable
                    sx={{
                      borderColor: 'rgba(255,255,255,0.06)',
                      color: '#8b8fa8',
                      fontSize: '0.78rem',
                      fontWeight: 500,
                      bgcolor: 'transparent',
                      '&:hover': { bgcolor: 'rgba(167,139,250,0.08)', color: '#c4b5fd', borderColor: 'rgba(167,139,250,0.2)' },
                    }}
                  />
                ))}
              </Stack>
            )}

            {/* Search */}
            <Box
              sx={{
                display: 'flex', alignItems: 'center',
                bgcolor: 'rgba(255,255,255,0.04)',
                borderRadius: 3,
                px: 2, py: 0.6,
                minWidth: searchOpen ? 240 : 44,
                transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
                cursor: 'pointer',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
              onClick={() => setSearchOpen(true)}
            >
              <SearchIcon sx={{ color: '#8b8fa8', fontSize: 20 }} />
              {searchOpen && (
                <InputBase
                  placeholder={`Search ${tools.length} tools...`}
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    if (e.target.value && !isHome) navigate('/')
                  }}
                  autoFocus
                  sx={{ ml: 1, fontSize: '0.9rem', width: '100%', color: '#e8e6f0', '& input::placeholder': { color: '#5a5f6e' } }}
                  onBlur={(e) => { if (!e.target.value) setTimeout(() => setSearchOpen(false), 200) }}
                />
              )}
              {searchOpen && searchQuery && (
                <IconButton size="small" onClick={(e) => { e.stopPropagation(); setSearchQuery(''); setSearchOpen(false) }} sx={{ color: '#8b8fa8' }}>
                  <CloseIcon sx={{ fontSize: 16 }} />
                </IconButton>
              )}
            </Box>

            {isMobile && (
              <IconButton onClick={() => setDrawerOpen(true)} sx={{ color: '#8b8fa8' }}><MenuIcon /></IconButton>
            )}
          </Container>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)} PaperProps={{ sx: { bgcolor: '#0a0a14', borderLeft: '1px solid rgba(255,255,255,0.06)' } }}>
        <Box sx={{ width: 260, pt: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 2, mb: 1 }}>
            <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: '#8b8fa8' }}><CloseIcon /></IconButton>
          </Box>
          <List>
            {categories.slice(1).map(cat => (
              <ListItem key={cat} disablePadding>
                <ListItemButton component={Link} to="/" onClick={() => setDrawerOpen(false)} sx={{ borderRadius: 2, mx: 1, color: '#8b8fa8', '&:hover': { color: '#c4b5fd' } }}>
                  <ListItemText primary={cat} primaryTypographyProps={{ fontSize: '0.95rem', fontWeight: 500 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Search Overlay */}
      {searchQuery && (
        <Box
          sx={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, bgcolor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', zIndex: 1300, display: 'flex', justifyContent: 'center', pt: 12 }}
          onClick={() => { setSearchQuery(''); setSearchOpen(false) }}
        >
          <Box
            sx={{ bgcolor: '#14141f', borderRadius: 4, p: 3, width: '90%', maxWidth: 500, maxHeight: '70vh', overflow: 'auto', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 24px 64px rgba(0,0,0,0.4)' }}
            onClick={e => e.stopPropagation()}
          >
            <Typography variant="subtitle2" sx={{ color: '#8b8fa8', mb: 2, fontWeight: 500 }}>
              {filteredTools.length} tools found for "{searchQuery}"
            </Typography>
            {filteredTools.map(tool => (
              <Box key={tool.id} component={Link} to={`/tools/${tool.id}`} onClick={() => { setSearchQuery(''); setSearchOpen(false) }}
                sx={{ display: 'block', p: 1.5, borderRadius: 2, textDecoration: 'none', color: '#e8e6f0', '&:hover': { bgcolor: 'rgba(167,139,250,0.08)' } }}>
                <Typography variant="body1" fontWeight={600}>{tool.name}</Typography>
                <Typography variant="caption" sx={{ color: '#5a5f6e' }}>{tool.category}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      )}

      {/* Main */}
      <Box component="main" sx={{ flex: 1, position: 'relative', zIndex: 1 }}>
        {children}
      </Box>

      {/* Footer */}
      <Box component="footer" sx={{ borderTop: '1px solid rgba(255,255,255,0.06)', py: 4, px: 4, position: 'relative', zIndex: 1 }}>
        <Container maxWidth="xl">
          <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems="center" spacing={2}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ width: 24, height: 24, borderRadius: 1.5, background: 'linear-gradient(135deg, #7c3aed, #a78bfa)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <BoltIcon sx={{ fontSize: 14, color: '#fff' }} />
              </Box>
              <Typography variant="body2" fontWeight={700} color="#e8e6f0">ToolFast</Typography>
            </Box>
            <Typography variant="body2" color="#5a5f6e">
              Free Tools · No Sign-Up · Instant Access
            </Typography>
            <Typography variant="caption" color="#5a5f6e">
              &copy; {new Date().getFullYear()} ToolFast. Data stays in your browser.
            </Typography>
          </Stack>
        </Container>
      </Box>
    </Box>
  )
}
