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

const categories = ['All', 'Decision & Random', 'Creative', 'Mini Games', 'Life Calculators', 'Text Fun', 'Fun Generators']

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
        t.tags.some(tag => tag.includes(searchQuery.toLowerCase())) ||
        t.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 8)
    : []

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh' }}>
      {/* Navbar */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
        }}
      >
        <Toolbar sx={{ minHeight: { xs: 56, md: 64 } }}>
          <Container maxWidth="xl" sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* Logo */}
            <Box
              component={Link}
              to="/"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                textDecoration: 'none',
                color: 'primary.main',
              }}
            >
              <BoltIcon sx={{ fontSize: 28 }} />
              <Typography variant="h6" sx={{ fontWeight: 800, color: 'text.primary', fontSize: { xs: '1.1rem', md: '1.3rem' } }}>
                ToolFast
              </Typography>
            </Box>

            <Box sx={{ flex: 1 }} />

            {/* Desktop Nav */}
            {!isMobile && (
              <Stack direction="row" spacing={0.5}>
                {categories.slice(1, 6).map(cat => (
                  <Chip
                    key={cat}
                    label={cat}
                    component={Link}
                    to="/"
                    variant="outlined"
                    size="small"
                    clickable
                    sx={{
                      borderColor: 'transparent',
                      color: 'text.secondary',
                      fontSize: '0.8rem',
                      '&:hover': { bgcolor: 'rgba(67,97,238,0.06)', color: 'primary.main' },
                    }}
                  />
                ))}
              </Stack>
            )}

            {/* Search */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                bgcolor: 'rgba(0,0,0,0.04)',
                borderRadius: 3,
                px: 2,
                py: 0.5,
                minWidth: searchOpen ? 240 : 40,
                transition: 'all 0.3s ease',
                cursor: 'pointer',
              }}
              onClick={() => setSearchOpen(true)}
            >
              <SearchIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
              {searchOpen && (
                <InputBase
                  placeholder="Search 31 tools..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    if (e.target.value && !isHome) navigate('/')
                  }}
                  autoFocus
                  size="small"
                  sx={{ ml: 1, fontSize: '0.9rem', width: '100%' }}
                  onBlur={(e) => {
                    if (!e.target.value) setTimeout(() => setSearchOpen(false), 200)
                  }}
                />
              )}
              {searchOpen && searchQuery && (
                <IconButton size="small" onClick={(e) => { e.stopPropagation(); setSearchQuery(''); setSearchOpen(false) }}>
                  <CloseIcon sx={{ fontSize: 16 }} />
                </IconButton>
              )}
            </Box>

            {/* Mobile menu */}
            {isMobile && (
              <IconButton onClick={() => setDrawerOpen(true)}>
                <MenuIcon />
              </IconButton>
            )}
          </Container>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 260, pt: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 2, mb: 1 }}>
            <IconButton onClick={() => setDrawerOpen(false)}><CloseIcon /></IconButton>
          </Box>
          <List>
            {categories.slice(1).map(cat => (
              <ListItem key={cat} disablePadding>
                <ListItemButton
                  component={Link}
                  to="/"
                  onClick={() => setDrawerOpen(false)}
                  sx={{ borderRadius: 2, mx: 1 }}
                >
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
          sx={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            bgcolor: 'rgba(0,0,0,0.3)',
            backdropFilter: 'blur(4px)',
            zIndex: 1100,
            display: 'flex',
            justifyContent: 'center',
            pt: 12,
          }}
          onClick={() => { setSearchQuery(''); setSearchOpen(false) }}
        >
          <Box
            sx={{
              bgcolor: 'white',
              borderRadius: 4,
              p: 3,
              width: '90%',
              maxWidth: 500,
              maxHeight: '70vh',
              overflow: 'auto',
              boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
            }}
            onClick={e => e.stopPropagation()}
          >
            <Typography variant="subtitle2" sx={{ color: 'text.secondary', mb: 2 }}>
              {filteredTools.length} tools found for "{searchQuery}"
            </Typography>
            {filteredTools.length === 0 && (
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>No matching tools. Try a different keyword.</Typography>
            )}
            {filteredTools.map(tool => (
              <Box
                key={tool.id}
                component={Link}
                to={`/tools/${tool.id}`}
                onClick={() => { setSearchQuery(''); setSearchOpen(false) }}
                sx={{
                  display: 'block',
                  p: 1.5,
                  borderRadius: 2,
                  textDecoration: 'none',
                  color: 'text.primary',
                  '&:hover': { bgcolor: 'rgba(67,97,238,0.06)' },
                }}
              >
                <Typography variant="body1" fontWeight={600}>{tool.name}</Typography>
                <Typography variant="caption" color="text.secondary">{tool.category} - {tool.description.slice(0, 80)}...</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      )}

      {/* Main Content */}
      <Box component="main" sx={{ flex: 1 }}>
        {children}
      </Box>

      {/* Footer */}
      <Box component="footer" sx={{ borderTop: '1px solid #e2e8f0', py: 4, px: 4, mt: 6 }}>
        <Container maxWidth="xl">
          <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems="center" spacing={2}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <BoltIcon sx={{ fontSize: 20, color: 'primary.main' }} />
              <Typography variant="body2" fontWeight={700} color="text.primary">ToolFast</Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Free Tools &middot; No Sign-Up &middot; Instant Access
            </Typography>
            <Typography variant="caption" color="text.secondary">
              &copy; {new Date().getFullYear()} ToolFast. All processing happens locally in your browser.
            </Typography>
          </Stack>
        </Container>
      </Box>
    </Box>
  )
}
