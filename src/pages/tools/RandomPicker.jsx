import { useState } from 'react'
import { TextField, Button, Box, Typography, Paper, Chip, IconButton } from '@mui/material'
import ShuffleIcon from '@mui/icons-material/Shuffle'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import ToolLayout from '../../components/ToolLayout'
import { motion, AnimatePresence } from 'framer-motion'

export default function RandomPicker() {
  const [items, setItems] = useState(['Alice', 'Bob', 'Charlie', 'Diana', 'Eve'])
  const [newItem, setNewItem] = useState('')
  const [result, setResult] = useState(null)
  const [animating, setAnimating] = useState(false)
  const [shuffled, setShuffled] = useState([])

  const addItem = () => {
    if (newItem.trim() && items.length < 30) {
      setItems([...items, newItem.trim()])
      setNewItem('')
    }
  }

  const removeItem = (idx) => {
    if (items.length > 2) setItems(items.filter((_, i) => i !== idx))
  }

  const pick = () => {
    if (items.length < 2) return
    setResult(null)
    setAnimating(true)
    const shuffledList = [...items].sort(() => Math.random() - 0.5)
    setShuffled(shuffledList)
    setTimeout(() => {
      const winner = items[Math.floor(Math.random() * items.length)]
      setResult(winner)
      setAnimating(false)
    }, 2000)
  }

  return (
    <ToolLayout title="Random Picker" description="Enter a list and randomly pick one item. Perfect for raffles, decisions, and team assignments." category="Decision & Random">
      <Paper sx={{ p: 4, borderRadius: 4, textAlign: 'center' }}>
        {/* Animation Area */}
        <Box sx={{ minHeight: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 4 }}>
          <AnimatePresence mode="wait">
            {animating ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
                  {shuffled.map((item, i) => (
                    <motion.div
                      key={item + i}
                      initial={{ scale: 0, rotate: -20 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 20 }}
                      transition={{ delay: i * 0.08 }}
                    >
                      <Chip label={item} variant="outlined" sx={{ fontSize: '1rem' }} />
                    </motion.div>
                  ))}
                </Box>
              </motion.div>
            ) : result ? (
              <motion.div initial={{ scale: 0 }} animate={{ scale: [0, 1.2, 1] }} transition={{ type: 'spring', stiffness: 300 }}>
                <Chip label={`${result} !`} color="primary" sx={{ fontSize: '1.5rem', px: 4, py: 4 }} />
              </motion.div>
            ) : (
              <Typography color="text.secondary">Add items and click "Pick One"</Typography>
            )}
          </AnimatePresence>
        </Box>

        <Button
          variant="contained"
          size="large"
          onClick={pick}
          disabled={animating || items.length < 2}
          startIcon={<ShuffleIcon />}
          sx={{ px: 5, py: 1.5, fontSize: '1.1rem' }}
        >
          {animating ? 'Picking...' : 'Pick One!'}
        </Button>
      </Paper>

      {/* Item Editor */}
      <Paper sx={{ p: 3, mt: 3, borderRadius: 4 }}>
        <Typography variant="h6" fontWeight={700} mb={2}>Your List</Typography>
        <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
          <TextField
            value={newItem}
            onChange={e => setNewItem(e.target.value)}
            placeholder="Add a name or item..."
            size="small"
            onKeyDown={e => e.key === 'Enter' && addItem()}
            sx={{ flex: 1 }}
          />
          <IconButton onClick={addItem} color="primary" disabled={!newItem.trim()}><AddIcon /></IconButton>
        </Box>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {items.map((item, i) => (
            <Chip key={i} label={item} onDelete={items.length > 2 ? () => removeItem(i) : undefined} variant="outlined" />
          ))}
        </Box>
      </Paper>
    </ToolLayout>
  )
}
