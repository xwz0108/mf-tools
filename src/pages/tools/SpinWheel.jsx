import { useState, useRef, useCallback } from 'react'
import { TextField, Button, Box, Typography, Paper, Chip, IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import RefreshIcon from '@mui/icons-material/Refresh'
import { motion, AnimatePresence } from 'framer-motion'
import ToolLayout from '../../components/ToolLayout'

const COLORS = ['#4361ee', '#f72585', '#7209b7', '#3a0ca3', '#4cc9f0', '#2ec4b6', '#e9c46a', '#f4a261', '#e76f51', '#264653', '#2a9d8f', '#e9d8a6']

export default function SpinWheel() {
  const [items, setItems] = useState(['Pizza', 'Burger', 'Salad', 'Sushi', 'Taco', 'Pasta'])
  const [newItem, setNewItem] = useState('')
  const [result, setResult] = useState(null)
  const [spinning, setSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)

  const addItem = () => {
    if (newItem.trim() && items.length < 20) {
      setItems([...items, newItem.trim()])
      setNewItem('')
    }
  }

  const removeItem = (idx) => {
    if (items.length > 2) setItems(items.filter((_, i) => i !== idx))
  }

  const spin = useCallback(() => {
    if (spinning || items.length < 2) return
    setSpinning(true)
    setResult(null)
    const spins = 5 + Math.floor(Math.random() * 5)
    const randomIndex = Math.floor(Math.random() * items.length)
    const segmentAngle = 360 / items.length
    const targetAngle = 360 * spins - (randomIndex * segmentAngle + Math.random() * segmentAngle)
    setRotation(prev => prev + targetAngle)
    setTimeout(() => {
      setResult(items[randomIndex])
      setSpinning(false)
    }, 4000)
  }, [spinning, items])

  return (
    <ToolLayout title="Spin the Wheel" description="Add your options and let the wheel decide. Perfect for decisions, games, and giveaways." category="Decision & Random">
      <Paper sx={{ p: 4, mb: 4, textAlign: 'center', borderRadius: 4 }}>
        {/* Wheel */}
        <Box sx={{ position: 'relative', width: 300, height: 300, mx: 'auto', mb: 4 }}>
          {/* Pointer */}
          <Box sx={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', zIndex: 2, width: 0, height: 0, borderLeft: '12px solid transparent', borderRight: '12px solid transparent', borderTop: '24px solid #1a1a2e' }} />
          {/* SVG Wheel */}
          <svg width="300" height="300" viewBox="0 0 300 300">
            <motion.g
              animate={{ rotate: rotation }}
              transition={{ duration: 4, ease: [0.15, 0.85, 0.25, 1] }}
              style={{ transformOrigin: '150px 150px' }}
            >
              {items.map((item, i) => {
                const angle = (360 / items.length) * i
                const startAngle = angle - (360 / items.length) / 2
                const endAngle = startAngle + (360 / items.length)
                const startRad = (startAngle - 90) * Math.PI / 180
                const endRad = (endAngle - 90) * Math.PI / 180
                const x1 = 150 + 140 * Math.cos(startRad)
                const y1 = 150 + 140 * Math.sin(startRad)
                const x2 = 150 + 140 * Math.cos(endRad)
                const y2 = 150 + 140 * Math.sin(endRad)
                const midAngle = (startAngle + endAngle) / 2
                const midRad = (midAngle - 90) * Math.PI / 180
                const textX = 150 + 95 * Math.cos(midRad)
                const textY = 150 + 95 * Math.sin(midRad)
                const color = COLORS[i % COLORS.length]
                return (
                  <g key={i}>
                    <path d={`M150,150 L${x1},${y1} A140,140 0 0,1 ${x2},${y2} Z`} fill={color} stroke="#fff" strokeWidth="2" />
                    <text x={textX} y={textY} textAnchor="middle" dominantBaseline="middle" fill="#fff" fontSize="13" fontWeight="700" transform={`rotate(${midAngle},${textX},${textY})`}>
                      {item.length > 10 ? item.slice(0, 10) + '...' : item}
                    </text>
                  </g>
                )
              })}
              <circle cx="150" cy="150" r="20" fill="#1a1a2e" />
              <circle cx="150" cy="150" r="12" fill="#fff" />
            </motion.g>
          </svg>
        </Box>

        <AnimatePresence>
          {result && (
            <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 300 }}>
              <Chip label={`Result: ${result}`} color="primary" sx={{ fontSize: '1.2rem', px: 3, py: 3, mb: 3 }} />
            </motion.div>
          )}
        </AnimatePresence>

        <Button
          variant="contained"
          size="large"
          onClick={spin}
          disabled={spinning || items.length < 2}
          startIcon={<RefreshIcon />}
          sx={{ px: 5, py: 1.5, fontSize: '1.1rem' }}
        >
          {spinning ? 'Spinning...' : 'Spin It!'}
        </Button>
      </Paper>

      {/* Item Editor */}
      <Paper sx={{ p: 3, borderRadius: 4 }}>
        <Typography variant="h6" fontWeight={700} mb={2}>Customize Options</Typography>
        <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
          <TextField
            value={newItem}
            onChange={e => setNewItem(e.target.value)}
            placeholder="Add an option..."
            size="small"
            onKeyDown={e => e.key === 'Enter' && addItem()}
            sx={{ flex: 1 }}
          />
          <IconButton onClick={addItem} color="primary" disabled={!newItem.trim() || items.length >= 20}><AddIcon /></IconButton>
        </Box>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {items.map((item, i) => (
            <Chip
              key={i}
              label={item}
              onDelete={items.length > 2 ? () => removeItem(i) : undefined}
              sx={{ bgcolor: COLORS[i % COLORS.length] + '22', color: COLORS[i % COLORS.length], fontWeight: 600 }}
            />
          ))}
        </Box>
      </Paper>
    </ToolLayout>
  )
}
