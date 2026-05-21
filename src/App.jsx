import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'
import { HelmetProvider } from 'react-helmet-async'
import Layout from './components/Layout'

// Route-level code splitting
const Home = lazy(() => import('./pages/Home'))
const SpinWheel = lazy(() => import('./pages/tools/SpinWheel'))
const FancyText = lazy(() => import('./pages/tools/FancyText'))
const TypingTest = lazy(() => import('./pages/tools/TypingTest'))
const ColorBlindTest = lazy(() => import('./pages/tools/ColorBlindTest'))
const EmojiMixer = lazy(() => import('./pages/tools/EmojiMixer'))
const RandomPicker = lazy(() => import('./pages/tools/RandomPicker'))
const CoinFlip = lazy(() => import('./pages/tools/CoinFlip'))
const NotFound = lazy(() => import('./pages/NotFound'))

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#4361ee' },
    secondary: { main: '#f72585' },
    background: { default: '#fafbfc', paper: '#ffffff' },
    text: { primary: '#1a1a2e', secondary: '#64748b' },
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", "Segoe UI", system-ui, sans-serif',
    h1: { fontWeight: 800, letterSpacing: '-0.03em' },
    h2: { fontWeight: 700, letterSpacing: '-0.02em' },
    h3: { fontWeight: 700, letterSpacing: '-0.01em' },
    h4: { fontWeight: 600 },
    body1: { lineHeight: 1.7, color: '#475569' },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: { borderRadius: 16 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 12, padding: '10px 24px', fontSize: '0.95rem' },
        contained: { boxShadow: 'none', '&:hover': { boxShadow: '0 4px 20px rgba(67,97,238,0.3)' } },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: { borderRadius: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0' },
      },
    },
  },
})

function ToolSkeleton() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
      <div style={{ width: 40, height: 40, borderRadius: '50%', border: '3px solid #e2e8f0', borderTopColor: '#4361ee', animation: 'spin 0.8s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

export default function App() {
  return (
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Layout>
            <Suspense fallback={<ToolSkeleton />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tools/spin-wheel" element={<SpinWheel />} />
                <Route path="/tools/fancy-text" element={<FancyText />} />
                <Route path="/tools/typing-test" element={<TypingTest />} />
                <Route path="/tools/color-blind-test" element={<ColorBlindTest />} />
                <Route path="/tools/emoji-mixer" element={<EmojiMixer />} />
                <Route path="/tools/random-picker" element={<RandomPicker />} />
                <Route path="/tools/coin-flip" element={<CoinFlip />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </Layout>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  )
}
