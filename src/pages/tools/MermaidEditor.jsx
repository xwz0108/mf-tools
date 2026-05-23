import { useState, useEffect, useRef } from 'react'
import { Typography, Box, Paper, Button, TextField, Stack, Snackbar, Chip } from '@mui/material'
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import DownloadIcon from '@mui/icons-material/Download'
import ToolLayout from '../../components/ToolLayout'
import { motion } from 'framer-motion'

const TEMPLATES = {
  flowchart: `graph TD
    A[Start] --> B{Is it working?}
    B -->|Yes| C[Keep going]
    B -->|No| D{Did you touch it?}
    D -->|Yes| E[You broke it!]
    D -->|No| F[Try turning it on]
    E --> G[Debug]
    F --> C`,
  sequence: `sequenceDiagram
    Alice->>Bob: Hello Bob, how are you?
    Bob-->>Alice: Great! How about you?
    Alice->>Bob: Want to grab lunch?
    Bob-->>Alice: Sure! Let's go.
    Note right of Bob: Bob is hungry`,
  gantt: `gantt
    title Project Timeline
    dateFormat  YYYY-MM-DD
    section Design
    Wireframes     :done, 2024-01-01, 2024-01-07
    Mockups        :active, 2024-01-08, 2024-01-14
    section Development
    Backend        :2024-01-15, 2024-02-01
    Frontend       :2024-01-20, 2024-02-10`,
};

export default function MermaidEditor() {
  const [code, setCode] = useState(TEMPLATES.flowchart)
  const [template, setTemplate] = useState('flowchart')
  const [error, setError] = useState('')
  const [snack, setSnack] = useState(false)
  const containerRef = useRef(null)
  const mermaidRef = useRef(null)

  useEffect(() => {
    if (!window.mermaid) {
      const script = document.createElement('script')
      script.src = 'https://unpkg.com/mermaid@10/dist/mermaid.min.js'
      script.onload = () => {
        window.mermaid.initialize({ startOnLoad: false, theme: 'dark', securityLevel: 'loose' })
        renderDiagram(code)
      }
      document.head.appendChild(script)
    } else {
      renderDiagram(code)
    }
  }, [])

  const renderDiagram = async (diagramCode) => {
    if (!window.mermaid) return
    if (!containerRef.current) return
    try {
      setError('')
      const id = 'mermaid-' + Date.now()
      const { svg } = await window.mermaid.render(id, diagramCode)
      containerRef.current.innerHTML = svg
    } catch (e) {
      setError(e.message || 'Invalid diagram syntax')
      containerRef.current.innerHTML = ''
    }
  }

  const handleChange = (e) => {
    const val = e.target.value
    setCode(val)
    if (window.mermaid) renderDiagram(val)
  }

  const download = () => {
    const svg = containerRef.current?.innerHTML
    if (!svg) return
    const blob = new Blob([svg], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = 'diagram.svg'; a.click()
  }

  return (
    <ToolLayout title="Mermaid Diagram Editor" description="Live-preview Mermaid.js diagrams directly in the browser. Flowcharts, sequence diagrams, and more." category="Developer Tools">
      <Paper sx={{ p: 4, borderRadius: 4 }}>
        <Stack direction="row" spacing={1} mb={3} flexWrap="wrap" useFlexGap>
          {Object.entries(TEMPLATES).map(([key, val]) => (
            <Chip key={key} label={key} onClick={() => { setTemplate(key); setCode(val); setTimeout(() => renderDiagram(val), 100) }}
              variant={template === key ? 'filled' : 'outlined'}
              color={template === key ? 'primary' : 'default'}
              size="small" sx={{ fontWeight: 600, textTransform: 'capitalize' }} />
          ))}
        </Stack>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
          <Box flex={1}>
            <Typography fontWeight={600} mb={1} color="text.secondary" variant="body2">Mermaid Code</Typography>
            <TextField value={code} onChange={handleChange} fullWidth multiline rows={12}
              InputProps={{ sx: { fontFamily: 'monospace', fontSize: '0.85rem' } }}
              sx={{ mb: 2 }}
            />
            <Stack direction="row" spacing={1}>
              <Button variant="outlined" size="small" startIcon={<ContentCopyIcon />}
                onClick={() => { navigator.clipboard.writeText(code); setSnack(true) }}>Copy Code</Button>
              <Button variant="outlined" size="small" startIcon={<DownloadIcon />} onClick={download}>Download SVG</Button>
            </Stack>
          </Box>
          <Box flex={1}>
            <Typography fontWeight={600} mb={1} color="text.secondary" variant="body2">Preview</Typography>
            <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, minHeight: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto' }}>
              {error ? (
                <Typography color="error" variant="body2">{error}</Typography>
              ) : (
                <Box ref={containerRef} sx={{ '& svg': { maxWidth: '100%', height: 'auto' } }} />
              )}
            </Paper>
          </Box>
        </Stack>
      </Paper>
      <Snackbar open={snack} autoHideDuration={1500} onClose={() => setSnack(false)} message="Copied!" />
    </ToolLayout>
  )
}
