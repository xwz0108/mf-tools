import { useState, useRef } from 'react'
import { Typography, Box, Paper, Button, TextField, Stack, Select, MenuItem } from '@mui/material'
import html2canvas from 'html-to-image'
import DownloadIcon from '@mui/icons-material/Download'
import ToolLayout from '../../components/ToolLayout'

export default function FakeReceipt() {
  const [store, setStore] = useState('FreshMart')
  const [items, setItems] = useState([{name:'Organic Milk',price:4.99},{name:'Whole Wheat Bread',price:3.49},{name:'Bananas (6)',price:2.99}])
  const [newName, setNewName] = useState(''); const [newPrice, setNewPrice] = useState('')
  const receiptRef = useRef(null)

  const addItem = () => { if (newName && newPrice) { setItems([...items, {name:newName,price:Number(newPrice)}]); setNewName(''); setNewPrice('') } }
  const total = items.reduce((sum,i)=>sum+i.price,0).toFixed(2)

  const download = async () => {
    if (receiptRef.current) {
      const dataUrl = await html2canvas(receiptRef.current).then(c=>c.toDataURL())
      const a = document.createElement('a'); a.href=dataUrl; a.download='receipt.png'; a.click()
    }
  }

  return (
    <ToolLayout title="Fake Receipt Generator" description="Create custom fake receipts for pranks and fun." category="Fun Generators">
      <Paper sx={{ p: 4, borderRadius: 4 }}>
        <Stack direction={{ xs:'column',md:'row' }} spacing={4}>
          <Box flex={1}>
            <Typography variant="h6" fontWeight={700} mb={2}>Customize</Typography>
            <TextField label="Store Name" value={store} onChange={e=>setStore(e.target.value)} size="small" fullWidth sx={{mb:2}} />
            <Stack direction="row" spacing={1} mb={2}>
              <TextField label="Item" value={newName} onChange={e=>setNewName(e.target.value)} size="small" sx={{flex:1}} />
              <TextField label="Price" value={newPrice} onChange={e=>setNewPrice(e.target.value)} type="number" size="small" sx={{width:100}} />
              <Button variant="contained" onClick={addItem}>Add</Button>
            </Stack>
            {items.map((item,i) => (
              <Stack key={i} direction="row" justifyContent="space-between" sx={{p:1,borderBottom:'1px solid #eee'}}>
                <Typography>{item.name}</Typography>
                <Typography>${item.price.toFixed(2)}</Typography>
              </Stack>
            ))}
            <Button variant="contained" startIcon={<DownloadIcon />} onClick={download} sx={{mt:3}} fullWidth>Download as Image</Button>
          </Box>
          <Box flex={1} ref={receiptRef} sx={{ bgcolor:'#fff', p:4, borderRadius:2, border:'2px dashed #ddd', fontFamily:'monospace', minWidth:260 }}>
            <Typography variant="h6" fontWeight={700} textAlign="center" mb={2}>{store}</Typography>
            <Typography variant="caption" textAlign="center" display="block" mb={2}>{new Date().toLocaleDateString()}</Typography>
            <Box sx={{borderTop:'2px dashed #000',pt:2}}>
              {items.map((item,i) => (
                <Stack key={i} direction="row" justifyContent="space-between" mb={0.5}>
                  <Typography variant="body2">{item.name}</Typography>
                  <Typography variant="body2">${item.price.toFixed(2)}</Typography>
                </Stack>
              ))}
            </Box>
            <Box sx={{borderTop:'2px solid #000',mt:2,pt:2}}>
              <Stack direction="row" justifyContent="space-between">
                <Typography fontWeight={700}>TOTAL</Typography>
                <Typography fontWeight={700}>${total}</Typography>
              </Stack>
            </Box>
            <Typography variant="caption" textAlign="center" display="block" mt={3}>Thank you for shopping!</Typography>
          </Box>
        </Stack>
      </Paper>
    </ToolLayout>
  )
}
