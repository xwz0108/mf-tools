import { useState } from 'react'
import { Typography, Box, Paper, TextField, Chip, IconButton, Snackbar, Stack } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import ToolLayout from '../../components/ToolLayout'

const VAPORWAVE = 'ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ'
const TYPEWRITER = '𝑨𝑩𝑪𝑫𝑬𝑭𝑮𝑯𝑰𝑱𝑲𝑳𝑴𝑵𝑶𝑷𝑸𝑹𝑺𝑻𝑼𝑽𝑾𝑿𝒀𝒁𝒂𝒃𝒄𝒅𝒆𝒇𝒈𝒉𝒊𝒋𝒌𝒍𝒎𝒏𝒐𝒑𝒒𝒓𝒔𝒕𝒖𝒗𝒘𝒙𝒚𝒛'
const NEON_BOX = '🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉'
const STRIKETHROUGH = 'A̶B̶C̶D̶E̶F̶G̶H̶I̶J̶K̶L̶M̶N̶O̶P̶Q̶R̶S̶T̶U̶V̶W̶X̶Y̶Z̶a̶b̶c̶d̶e̶f̶g̶h̶i̶j̶k̶l̶m̶n̶o̶p̶q̶r̶s̶t̶u̶v̶w̶x̶y̶z̶'
const SMALL_CAPS = 'ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘQʀꜱᴛᴜᴠᴡxʏᴢ'

const FONTS = { 'Vaporwave': VAPORWAVE, 'Neon Box': NEON_BOX, 'Typewriter': TYPEWRITER, 'Small Caps': SMALL_CAPS, 'Strikethrough': STRIKETHROUGH }
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

function applyStyle(text, style) {
  const chars = FONTS[style]
  if (!chars) return text
  let result = ''
  for (const c of text) {
    const idx = CHARS.indexOf(c)
    result += idx >= 0 ? chars[idx] : c
  }
  return result
}

export default function RetroText() {
  const [input, setInput] = useState('Hello World')
  const [style, setStyle] = useState('Vaporwave')
  const [snack, setSnack] = useState(false)

  const output = applyStyle(input, style)

  return (
    <ToolLayout title="Retro Text Generator" description="Create vaporwave, typewriter, neon, and other retro text effects with Unicode decorative characters." category="Creative">
      <Paper sx={{ p: 4, borderRadius: 4 }}>
        <TextField
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type something..."
          fullWidth
          multiline
          rows={3}
          sx={{ mb: 3 }}
          InputProps={{ sx: { fontSize: '1.1rem', borderRadius: 3 } }}
        />

        <Typography variant="subtitle2" fontWeight={600} mb={1}>Choose Style</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 4 }}>
          {Object.keys(FONTS).map(s => (
            <Chip
              key={s}
              label={s}
              onClick={() => setStyle(s)}
              color={style === s ? 'primary' : 'default'}
              variant={style === s ? 'filled' : 'outlined'}
              sx={{ fontWeight: 600 }}
            />
          ))}
        </Box>

        <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, position: 'relative', bgcolor: '#f8fafc' }}>
          <Typography variant="h5" sx={{ wordBreak: 'break-all', mb: 1, fontWeight: 400 }}>
            {output || 'Your retro text will appear here'}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="caption" color="text.secondary">{style} style</Typography>
            <IconButton onClick={() => { navigator.clipboard.writeText(output); setSnack(true) }} color="primary" size="small">
              <ContentCopyIcon />
            </IconButton>
          </Box>
        </Paper>

        {/* Style Preview */}
        <Box sx={{ mt: 4, display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
          {Object.entries(FONTS).map(([name, map]) => (
            <Chip
              key={name}
              label={applyStyle('Preview', name)}
              onClick={() => setStyle(name)}
              variant="outlined"
              sx={{
                fontSize: '0.9rem', py: 2,
                borderColor: style === name ? 'primary.main' : '#e2e8f0',
                bgcolor: style === name ? 'rgba(67,97,238,0.06)' : 'transparent',
              }}
            />
          ))}
        </Box>
      </Paper>

      <Snackbar open={snack} autoHideDuration={1500} onClose={() => setSnack(false)} message="Copied to clipboard!" />
    </ToolLayout>
  )
}
