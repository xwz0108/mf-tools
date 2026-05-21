import { Helmet } from 'react-helmet-async'
import { Container, Typography, Box, Chip } from '@mui/material'
import { motion } from 'framer-motion'

export default function ToolLayout({ title, description, category, children }) {
  return (
    <>
      <Helmet>
        <title>{title} — Free Online Tool | ToolFast</title>
        <meta name="description" content={description?.slice(0, 160)} />
      </Helmet>
      <Container maxWidth="md" sx={{ pt: { xs: 4, md: 6 }, pb: 8 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <Box sx={{ mb: 4 }}>
            {category && (
              <Chip label={category} size="small" sx={{ mb: 1.5, bgcolor: 'rgba(67,97,238,0.08)', color: 'primary.main', fontWeight: 600 }} />
            )}
            <Typography variant="h2" sx={{ fontSize: { xs: '1.8rem', md: '2.2rem' }, fontWeight: 800 }}>
              {title}
            </Typography>
            {description && (
              <Typography variant="body1" color="text.secondary" sx={{ mt: 1, maxWidth: 540 }}>
                {description}
              </Typography>
            )}
          </Box>
        </motion.div>
        {children}
      </Container>
    </>
  )
}
