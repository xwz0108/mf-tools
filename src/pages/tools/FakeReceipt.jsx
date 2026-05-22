import { useState, useRef, useEffect } from 'react'
import { Typography, Box, Paper, Button, TextField, Stack, IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import DownloadIcon from '@mui/icons-material/Download'
import ToolLayout from '../../components/ToolLayout'

export default function FakeReceipt() {
  const [store, setStore] = useState('Super Mart')
  const [date, setDate] = useState(new Date().toLocaleDateString())
  const [items, setItems] = useState([
    { name: 'Organic Milk', price: 4.99 },
    { name: 'Sourdough Bread', price: 5.49 },
    { name: 'Avocados (3 pack)', price: 6.99 },
  ])
  const [newItem, setNewItem] = useState({ name: '', price: '' })
  const canvasRef = useRef(null)

  const subtotal = items.reduce((s, i) => s + i.price, 0)
  const tax = Math.round(subtotal * 0.08 * 100) / 100
  const total = subtotal + tax

  const addItem = () => {
    if (newItem.name && newItem.price) {
      setItems([...items, { name: newItem.name, price: Number(newItem.price) }])
      setNewItem({ name: '', price: '' })
    }
  }
  const removeItem = (idx) => setItems(items.filter((_, i) => i !== idx))

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const W = 360, H = 200 + items.length * 28
    canvas.width = W; canvas.height = H
    ctx.fillStyle = '#fffef9'
    ctx.fillRect(0, 0, W, H)
    ctx.font = 'bold 18px "Courier New", monospace'
    ctx.fillStyle = '#1a1a2e'
    ctx.textAlign = 'center'
    ctx.fillText(store.toUpperCase(), W / 2, 30)
    ctx.font = '12px "Courier New", monospace'
    ctx.fillStyle = '#64748b'
    ctx.fillText(date, W / 2, 50)
    ctx.fillText('─'.repeat(35), W / 2, 65)
    ctx.textAlign = 'left'
    ctx.fillStyle = '#1a1a2e'
    ctx.font = '13px "Courier New", monospace'
    items.forEach((item, i) => {
      const y = 85 + i * 25
      ctx.fillText(item.name, 20, y)
      ctx.textAlign = 'right'
      ctx.fillText(`$${item.price.toFixed(2)}`, W - 20, y)
      ctx.textAlign = 'left'
    })
    const lineY = 85 + items.length * 25 + 5
    ctx.textAlign = 'center'
    ctx.fillText('─'.repeat(35), W / 2, lineY)
    ctx.textAlign = 'left'
    ctx.fillText('Subtotal', 20, lineY + 22)
    ctx.textAlign = 'right'
    ctx.fillText(`$${subtotal.toFixed(2)}`, W - 20, lineY + 22)
    ctx.textAlign = 'left'
    ctx.fillText('Tax (8%)', 20, lineY + 42)
    ctx.textAlign = 'right'
    ctx.fillText(`$${tax.toFixed(2)}`, W - 20, lineY + 42)
    ctx.fillStyle = '#000'
    ctx.font = 'bold 15px "Courier New", monospace'
    ctx.textAlign = 'left'
    ctx.fillText('TOTAL', 20, lineY + 70)
    ctx.textAlign = 'right'
    ctx.fillText(`$${total.toFixed(2)}`, W - 20, lineY + 70)
    ctx.textAlign = 'center'
    ctx.font = '11px "Courier New", monospace'
    ctx.fillStyle = '#64748b'
    ctx.fillText('Thank you for shopping!', W / 2, lineY + 95)
  }, [items, store, date])

  const download = () => {
    const link = document.createElement('a')
    link.download = 'receipt.png'
    link.href = canvasRef.current.toDataURL()
    link.click()
  }

  return (
    <ToolLayout title="Fake Receipt Generator" description="Generate custom fake receipts for fun. Customize store name, items, and download as image." category="Fun Generators">
      <Paper sx={{ p: 4, borderRadius: 4 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
          <Box flex={1}>
            <canvas ref={canvasRef} style={{ width: '100%', borderRadius: 12, border: '1px solid #e2e8f0' }} />
            <Button variant="contained" onClick={download} startIcon={<DownloadIcon />} fullWidth sx={{ mt: 2 }}>Download Receipt</Button>
          </Box>

          <Box flex={1}>
            <Typography variant="h6" fontWeight={700} mb={2}>Customize</Typography>
            <Stack spacing={2} mb={3}>
              <TextField label="Store Name" value={store} onChange={e => setStore(e.target.value)} size="small" />
              <TextField label="Date" value={date} onChange={e => setDate(e.target.value)} size="small" />
            </Stack>

            {items.map((item, i) => (
              <Stack key={i} direction="row" spacing={1} mb={1} alignItems="center">
                <Typography sx={{ flex: 1 }}>{item.name}</Typography>
                <Typography fontWeight={600}>${item.price.toFixed(2)}</Typography>
                <IconButton size="small" onClick={() => removeItem(i)}><DeleteIcon fontSize="small" /></IconButton>
              </Stack>
            ))}

            <Stack direction="row" spacing={1} mt={2}>
              <TextField value={newItem.name} onChange={e => setNewItem({ ...newItem, name: e.target.value })} placeholder="Item name" size="small" sx={{ flex: 2 }} />
              <TextField value={newItem.price} onChange={e => setNewItem({ ...newItem, price: e.target.value })} placeholder="Price" type="number" size="small" sx={{ flex: 1 }} />
              <IconButton onClick={addItem} color="primary" disabled={!newItem.name || !newItem.price}><AddIcon /></IconButton>
            </Stack>

            <Paper variant="outlined" sx={{ p: 2, mt: 3, borderRadius: 2 }}>
              <Stack direction="row" justifyContent="space-between">
                <Typography>Subtotal</Typography><Typography>${subtotal.toFixed(2)}</Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography>Tax (8%)</Typography><Typography>${tax.toFixed(2)}</Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between" sx={{ mt: 1, fontWeight: 800 }}>
                <Typography fontWeight={800}>Total</Typography><Typography fontWeight={800}>${total.toFixed(2)}</Typography>
              </Stack>
            </Paper>
          </Box>
        </Stack>
      </Paper>
    </ToolLayout>
  )
}
