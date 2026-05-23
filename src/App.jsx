import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'
import { HelmetProvider } from 'react-helmet-async'
import Layout from './components/Layout'

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
const Game2048 = lazy(() => import('./pages/tools/Game2048'))
const ColorPalette = lazy(() => import('./pages/tools/ColorPalette'))
const EmojiRiddles = lazy(() => import('./pages/tools/EmojiRiddles'))
const PeriodTracker = lazy(() => import('./pages/tools/PeriodTracker'))
const MemeMaker = lazy(() => import('./pages/tools/MemeMaker'))
const FakeChat = lazy(() => import('./pages/tools/FakeChat'))
const FakeReceipt = lazy(() => import('./pages/tools/FakeReceipt'))
const SQLFormatter = lazy(() => import('./pages/tools/SQLFormatter'))
const MermaidEditor = lazy(() => import('./pages/tools/MermaidEditor'))
const CronVisualizer = lazy(() => import('./pages/tools/CronVisualizer'))
const JWTDecoder = lazy(() => import('./pages/tools/JWTDecoder'))
const HTTPHeaders = lazy(() => import('./pages/tools/HTTPHeaders'))
const RegexVisualizer = lazy(() => import('./pages/tools/RegexVisualizer'))
const BrowserFingerprint = lazy(() => import('./pages/tools/BrowserFingerprint'))
const IPCalculator = lazy(() => import('./pages/tools/IPCalculator'))
const AIToolComparator = lazy(() => import('./pages/tools/AIToolComparator'))
const CommissionCalculator = lazy(() => import('./pages/tools/CommissionCalculator'))
const HeadlineAnalyzer = lazy(() => import('./pages/tools/HeadlineAnalyzer'))
const SEOMetaTags = lazy(() => import('./pages/tools/SEOMetaTags'))
const WebsiteWorth = lazy(() => import('./pages/tools/WebsiteWorth'))
const KeywordDensity = lazy(() => import('./pages/tools/KeywordDensity'))
const ABTestCalc = lazy(() => import('./pages/tools/ABTestCalc'))
const SubjectTester = lazy(() => import('./pages/tools/SubjectTester'))
const NotFound = lazy(() => import('./pages/NotFound'))

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#a78bfa' },
    secondary: { main: '#fb923c' },
    background: { default: '#0a0a14', paper: '#14141f' },
    text: { primary: '#e8e6f0', secondary: '#8b8fa8' },
  },
  typography: {
    fontFamily: '"Space Grotesk", "Plus Jakarta Sans", system-ui, sans-serif',
    h1: { fontWeight: 700, letterSpacing: '-0.04em', fontSize: '3.5rem' },
    h2: { fontWeight: 700, letterSpacing: '-0.03em' },
    h3: { fontWeight: 700, letterSpacing: '-0.02em' },
    h4: { fontWeight: 600, letterSpacing: '-0.01em' },
    body1: { lineHeight: 1.7, color: '#a0a4b8' },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: { borderRadius: 18 },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');
      `,
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 14, padding: '12px 28px', fontSize: '0.95rem', letterSpacing: '-0.01em' },
        contained: {
          background: 'linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)',
          boxShadow: '0 4px 24px rgba(124,58,237,0.25)',
          '&:hover': { background: 'linear-gradient(135deg, #6d28d9 0%, #8b5cf6 100%)', boxShadow: '0 8px 32px rgba(124,58,237,0.35)' },
        },
        outlined: { borderColor: 'rgba(167,139,250,0.3)', color: '#a78bfa', '&:hover': { borderColor: '#a78bfa', background: 'rgba(167,139,250,0.08)' } },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 22,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.06)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 10 },
        filled: { background: 'rgba(167,139,250,0.12)', color: '#c4b5fd' },
        outlined: { borderColor: 'rgba(255,255,255,0.08)', color: '#8b8fa8' },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 14,
            background: 'rgba(255,255,255,0.04)',
            '& fieldset': { borderColor: 'rgba(255,255,255,0.08)' },
            '&:hover fieldset': { borderColor: 'rgba(167,139,250,0.3)' },
            '&.Mui-focused fieldset': { borderColor: '#a78bfa' },
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: { background: 'linear-gradient(90deg, #7c3aed, #a78bfa)', height: 3, borderRadius: 3 },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: { color: '#8b8fa8', '&.Mui-selected': { color: '#c4b5fd' } },
      },
    },
  },
})

function ToolSkeleton() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', background: '#0a0a14' }}>
      <div style={{ width: 48, height: 48, borderRadius: '50%', border: '3px solid rgba(167,139,250,0.15)', borderTopColor: '#a78bfa', animation: 'spin 0.8s linear infinite' }} />
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
                <Route path="/tools/emoji-riddles" element={<EmojiRiddles />} />
                <Route path="/tools/period-tracker" element={<PeriodTracker />} />
                <Route path="/tools/meme-maker" element={<MemeMaker />} />
                <Route path="/tools/fake-chat" element={<FakeChat />} />
                <Route path="/tools/fake-receipt" element={<FakeReceipt />} />
                <Route path="/tools/sql-formatter" element={<SQLFormatter />} />
                <Route path="/tools/mermaid-editor" element={<MermaidEditor />} />
                <Route path="/tools/cron-visualizer" element={<CronVisualizer />} />
                <Route path="/tools/jwt-decoder" element={<JWTDecoder />} />
                <Route path="/tools/http-headers" element={<HTTPHeaders />} />
                <Route path="/tools/regex-visualizer" element={<RegexVisualizer />} />
                <Route path="/tools/browser-fingerprint" element={<BrowserFingerprint />} />
                <Route path="/tools/ip-calculator" element={<IPCalculator />} />
                <Route path="/tools/ai-tool-comparator" element={<AIToolComparator />} />
                <Route path="/tools/commission-calculator" element={<CommissionCalculator />} />
                <Route path="/tools/headline-analyzer" element={<HeadlineAnalyzer />} />
                <Route path="/tools/seo-meta-tags" element={<SEOMetaTags />} />
                <Route path="/tools/website-worth" element={<WebsiteWorth />} />
                <Route path="/tools/keyword-density" element={<KeywordDensity />} />
                <Route path="/tools/ab-test-calculator" element={<ABTestCalc />} />
                <Route path="/tools/subject-tester" element={<SubjectTester />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </Layout>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  )
}
