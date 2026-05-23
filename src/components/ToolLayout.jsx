import { useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Container, Typography, Box, Chip } from '@mui/material'
import { motion } from 'framer-motion'

export default function ToolLayout({ title, description, category, children }) {
  const location = useLocation()
  const url = `https://toolfast.xxddsses.com${location.pathname}`

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: title,
    description: description?.slice(0, 200),
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
    url,
    offers: { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' },
    browserRequirements: 'Requires JavaScript',
  }

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://toolfast.xxddsses.com/' },
      { '@type': 'ListItem', position: 2, name: title, item: url },
    ],
  }

  return (
    <>
      <Helmet>
        <title>{title} — Free Online Tool | ToolFast</title>
        <meta name="description" content={description?.slice(0, 160)} />
        <link rel="canonical" href={url} />

        {/* Open Graph */}
        <meta property="og:title" content={`${title} — Free Online Tool | ToolFast`} />
        <meta property="og:description" content={description?.slice(0, 200)} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />

        {/* Structured Data */}
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
      </Helmet>

      <Container maxWidth="md" sx={{ pt: { xs: 4, md: 6 }, pb: 8, position: 'relative', zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <Box sx={{ mb: 4 }}>
            {category && (
              <Chip label={category} size="small"
                sx={{ mb: 1.5, bgcolor: 'rgba(167,139,250,0.08)', color: '#c4b5fd', fontWeight: 600, borderRadius: 1.5 }} />
            )}
            <Typography variant="h2" sx={{ fontSize: { xs: '1.8rem', md: '2.2rem' }, fontWeight: 700, color: '#e8e6f0', letterSpacing: '-0.03em' }}>
              {title}
            </Typography>
            {description && (
              <Typography variant="body1" sx={{ mt: 1, maxWidth: 540, color: '#6b6f7e', lineHeight: 1.6 }}>
                {description}
              </Typography>
            )}
          </Box>
        </motion.div>
        <Box sx={{
          '& .MuiPaper-root': {
            backgroundColor: 'rgba(255,255,255,0.03) !important',
            backgroundImage: 'none !important',
            border: '1px solid rgba(255,255,255,0.06) !important',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: 'rgba(255,255,255,0.08)' },
            '&:hover fieldset': { borderColor: 'rgba(167,139,250,0.3)' },
            '&.Mui-focused fieldset': { borderColor: '#a78bfa' },
          },
          '& .MuiInputBase-input': { color: '#e8e6f0' },
          '& .MuiInputLabel-root': { color: '#8b8fa8' },
          '& .MuiTypography-root': { color: '#e8e6f0' },
          '& .MuiTypography-colorTextSecondary': { color: '#6b6f7e !important' },
        }}>
          {children}
        </Box>
      </Container>
    </>
  )
}
