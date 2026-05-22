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
const TruthOrDare = lazy(() => import('./pages/tools/TruthOrDare'))
const WouldYouRather = lazy(() => import('./pages/tools/WouldYouRather'))
const BMICalculator = lazy(() => import('./pages/tools/BMICalculator'))
const TipCalculator = lazy(() => import('./pages/tools/TipCalculator'))
const DateDiff = lazy(() => import('./pages/tools/DateDiff'))
const WaterTracker = lazy(() => import('./pages/tools/WaterTracker'))
const RetroText = lazy(() => import('./pages/tools/RetroText'))
const AsciiArt = lazy(() => import('./pages/tools/AsciiArt'))
const PasswordChecker = lazy(() => import('./pages/tools/PasswordChecker'))
const UpsideDownText = lazy(() => import('./pages/tools/UpsideDownText'))
const MorseCode = lazy(() => import('./pages/tools/MorseCode'))
const JokeGenerator = lazy(() => import('./pages/tools/JokeGenerator'))
const FortuneCookie = lazy(() => import('./pages/tools/FortuneCookie'))
const FakeData = lazy(() => import('./pages/tools/FakeData'))
const ReactionTest = lazy(() => import('./pages/tools/ReactionTest'))
const MemoryGame = lazy(() => import('./pages/tools/MemoryGame'))
const IQQuiz = lazy(() => import('./pages/tools/IQQuiz'))
const Game2048 = lazy(() => import('./pages/tools/2048'))
const MemeMaker = lazy(() => import('./pages/tools/MemeMaker'))
const FakeChat = lazy(() => import('./pages/tools/FakeChat'))
const FakeReceipt = lazy(() => import('./pages/tools/FakeReceipt'))
const EmojiRiddles = lazy(() => import('./pages/tools/EmojiRiddles'))
const PeriodTracker = lazy(() => import('./pages/tools/PeriodTracker'))
const ColorPalette = lazy(() => import('./pages/tools/ColorPalette'))
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
                <Route path="/tools/truth-or-dare" element={<TruthOrDare />} />
                <Route path="/tools/would-you-rather" element={<WouldYouRather />} />
                <Route path="/tools/bmi-calculator" element={<BMICalculator />} />
                <Route path="/tools/tip-calculator" element={<TipCalculator />} />
                <Route path="/tools/date-diff" element={<DateDiff />} />
                <Route path="/tools/water-tracker" element={<WaterTracker />} />
                <Route path="/tools/retro-text" element={<RetroText />} />
                <Route path="/tools/ascii-art" element={<AsciiArt />} />
                <Route path="/tools/color-palette" element={<ColorPalette />} />
                <Route path="/tools/password-checker" element={<PasswordChecker />} />
                <Route path="/tools/upside-down-text" element={<UpsideDownText />} />
                <Route path="/tools/morse-code" element={<MorseCode />} />
                <Route path="/tools/joke-generator" element={<JokeGenerator />} />
                <Route path="/tools/fortune-cookie" element={<FortuneCookie />} />
                <Route path="/tools/fake-data" element={<FakeData />} />
                <Route path="/tools/reaction-test" element={<ReactionTest />} />
                <Route path="/tools/memory-game" element={<MemoryGame />} />
                <Route path="/tools/iq-quiz" element={<IQQuiz />} />
                <Route path="/tools/2048" element={<Game2048 />} />
                <Route path="/tools/meme-maker" element={<MemeMaker />} />
                <Route path="/tools/fake-chat" element={<FakeChat />} />
                <Route path="/tools/fake-receipt" element={<FakeReceipt />} />
                <Route path="/tools/emoji-riddles" element={<EmojiRiddles />} />
                <Route path="/tools/period-tracker" element={<PeriodTracker />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </Layout>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  )
}
