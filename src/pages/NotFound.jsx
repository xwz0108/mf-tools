import { Link } from 'react-router-dom'
import { Container, Typography, Box, Button } from '@mui/material'
import { Helmet } from 'react-helmet-async'
import HomeIcon from '@mui/icons-material/Home'

export default function NotFound() {
  return (
    <>
      <Helmet><title>404 — Page Not Found | ToolFast</title></Helmet>
      <Container maxWidth="sm" sx={{ textAlign: 'center', pt: { xs: 10, md: 16 }, pb: 10 }}>
        <Typography variant="h1" sx={{ fontSize: { xs: '4rem', md: '6rem' }, fontWeight: 800, color: 'primary.main' }}>
          404
        </Typography>
        <Typography variant="h5" gutterBottom fontWeight={700}>
          Page Not Found
        </Typography>
        <Typography color="text.secondary" mb={4}>
          The page you're looking for doesn't exist or has been moved.
        </Typography>
        <Button
          component={Link}
          to="/"
          variant="contained"
          startIcon={<HomeIcon />}
          size="large"
          sx={{ px: 4 }}
        >
          Back to Home
        </Button>
      </Container>
    </>
  )
}
