import { useState } from 'react'
import { Typography, Box, Paper, TextField, Button, IconButton, Stack, Chip, Snackbar } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import ToolLayout from '../../components/ToolLayout'

const COLORS = ['#4361ee', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6', '#1abc9c', '#e91e63']

export default function FakeChat() {
  const [userName, setUserName] = useState('You')
  const [otherName, setOtherName] = useState('Friend')
  const [messages, setMessages] = useState([
    { sender: 'other', text: 'Hey! How are you?', time: '10:30 AM' },
    { sender: 'user', text: 'I am doing great! Just using this awesome tool.', time: '10:31 AM' },
    { sender: 'other', text: 'That sounds fun! Can you customize the messages?', time: '10:32 AM' },
    { sender: 'user', text: 'Absolutely! Add, edit, delete any message you want.', time: '10:33 AM' },
  ])
  const [newMsg, setNewMsg] = useState('')
  const [msgSide, setMsgSide] = useState('user')
  const [snack, setSnack] = useState(false)

  const addMessage = () => {
    if (!newMsg.trim()) return
    const now = new Date()
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    setMessages([...messages, { sender: msgSide, text: newMsg.trim(), time }])
    setNewMsg('')
  }

  const removeMsg = (idx) => setMessages(messages.filter((_, i) => i !== idx))

  return (
    <ToolLayout title="Fake Chat Generator" description="Create realistic fake messaging screenshots. Customize names, messages, and share." category="Fun Generators">
      <Paper sx={{ p: 4, borderRadius: 4 }}>
        <Stack direction="row" spacing={2} mb={3}>
          <TextField value={userName} onChange={e => setUserName(e.target.value)} label="Your Name" size="small" sx={{ flex: 1 }} />
          <TextField value={otherName} onChange={e => setOtherName(e.target.value)} label="Other Name" size="small" sx={{ flex: 1 }} />
        </Stack>

        {/* Phone mockup */}
        <Paper variant="outlined" sx={{ p: 2, borderRadius: 4, bgcolor: '#f0f4f8', maxWidth: 360, mx: 'auto', mb: 3, maxHeight: 500, overflow: 'auto' }}>
          {/* Header */}
          <Box sx={{ textAlign: 'center', pb: 2, mb: 2, borderBottom: '1px solid #e2e8f0' }}>
            <Box sx={{ width: 40, height: 40, borderRadius: '50%', bgcolor: COLORS[0], mx: 'auto', mb: 0.5, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700 }}>
              {otherName[0]}
            </Box>
            <Typography variant="subtitle2" fontWeight={700}>{otherName}</Typography>
            <Typography variant="caption" color="text.secondary">Online</Typography>
          </Box>

          {/* Messages */}
          {messages.map((msg, i) => (
            <Box key={i} sx={{ mb: 1.5, display: 'flex', flexDirection: 'column', alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
              <Typography variant="caption" fontWeight={600} sx={{ ml: 1, mr: 1 }}>
                {msg.sender === 'user' ? userName : otherName}
              </Typography>
              <Box sx={{ position: 'relative', display: 'inline-block' }}>
                <Paper
                  sx={{
                    px: 2, py: 1, maxWidth: 240,
                    bgcolor: msg.sender === 'user' ? '#4361ee' : '#fff',
                    color: msg.sender === 'user' ? '#fff' : '#1a1a2e',
                    borderRadius: msg.sender === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  }}
                >
                  <Typography variant="body2">{msg.text}</Typography>
                </Paper>
                <Typography variant="caption" sx={{ display: 'block', mt: 0.3, color: 'text.secondary', textAlign: msg.sender === 'user' ? 'right' : 'left', px: 1 }}>
                  {msg.time}
                </Typography>
                <IconButton size="small" onClick={() => removeMsg(i)} sx={{ position: 'absolute', top: -8, right: -8, bgcolor: '#fff', boxShadow: 1, width: 20, height: 20 }}>
                  <DeleteIcon sx={{ fontSize: 12 }} />
                </IconButton>
              </Box>
            </Box>
          ))}
        </Paper>

        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <Stack direction="row" spacing={0.5}>
            {['user', 'other'].map(s => (
              <Chip key={s} label={s === 'user' ? userName : otherName} onClick={() => setMsgSide(s)} color={msgSide === s ? 'primary' : 'default'} size="small" />
            ))}
          </Stack>
          <TextField value={newMsg} onChange={e => setNewMsg(e.target.value)} placeholder="Type a message..." size="small" sx={{ flex: 1 }} onKeyDown={e => e.key === 'Enter' && addMessage()} />
          <IconButton onClick={addMessage} color="primary"><AddIcon /></IconButton>
        </Box>
      </Paper>
      <Snackbar open={snack} autoHideDuration={1500} onClose={() => setSnack(false)} message="Copied" />
    </ToolLayout>
  )
}
