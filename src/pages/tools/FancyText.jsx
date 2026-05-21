import { useState } from 'react'
import { TextField, Button, Box, Typography, Paper, Chip, IconButton, Snackbar } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import ToolLayout from '../../components/ToolLayout'

const FONT_MAPS = {
  'Bold': '𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇𝟬𝟭𝟮𝟯𝟰𝟱𝟲𝟳𝟴𝟵',
  'Italic': '𝘈𝘉𝘊𝘋𝘌𝘍𝘎𝘏𝘐𝘑𝘒𝘓𝘔𝘕𝘖𝘗𝘘𝘙𝘚𝘛𝘜𝘝𝘞𝘟𝘠𝘡𝘢𝘣𝘤𝘥𝘦𝘧𝘨𝘩𝘪𝘫𝘬𝘭𝘮𝘯𝘰𝘱𝘲𝘳𝘴𝘵𝘶𝘷𝘸𝘹𝘺𝘻',
  'Bold Italic': '𝘼𝘽𝘾𝘿𝙀𝙁𝙂𝙃𝙄𝙅𝙆𝙇𝙈𝙉𝙊𝙋𝙌𝙍𝙎𝙏𝙐𝙑𝙒𝙓𝙔𝙕𝙖𝙗𝙘𝙙𝙚𝙛𝙜𝙝𝙞𝙟𝙠𝙡𝙢𝙣𝙤𝙥𝙦𝙧𝙨𝙩𝙪𝙫𝙬𝙭𝙮𝙯',
  'Script': '𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃',
  'Double Struck': '𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫',
  'Fraktur': '𝕬𝕭𝕮𝕯𝕰𝕱𝕲𝕳𝕴𝕵𝕶𝕷𝕸𝕹𝕺𝕻𝕼𝕽𝕾𝕿𝖀𝖁𝖂𝖃𝖄𝖅𝖆𝖇𝖈𝖉𝖊𝖋𝖌𝖍𝖎𝖏𝖐𝖑𝖒𝖓𝖔𝖕𝖖𝖗𝖘𝖙𝖚𝖛𝖜𝖝𝖞𝖟',
  'Monospace': '𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣',
  'Sans-Serif': '𝖠𝖡𝖢𝖣𝖤𝖥𝖦𝖧𝖨𝖩𝖪𝖫𝖬𝖭𝖮𝖯𝖰𝖱𝖲𝖳𝖴𝖵𝖶𝖷𝖸𝖹𝖺𝖻𝖼𝖽𝖾𝖿𝗀𝗁𝗂𝗃𝗄𝗅𝗆𝗇𝗈𝗉𝗊𝗋𝗌𝗍𝗎𝗏𝗐𝗑𝗒𝗓',
  'Circled': '🅐🅑🅒🅓🅔🅕🅖🅗🅘🅙🅚🅛🅜🅝🅞🅟🅠🅡🅢🅣🅤🅥🅦🅧🅨🅩ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ',
}

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

function applyFont(text, fontName) {
  const map = FONT_MAPS[fontName]
  if (!map) return text
  let result = ''
  for (const char of text) {
    const idx = CHARS.indexOf(char)
    result += idx >= 0 ? map[idx] : char
  }
  return result
}

export default function FancyText() {
  const [input, setInput] = useState('Hello World')
  const [active, setActive] = useState('Bold')
  const [snack, setSnack] = useState(false)

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    setSnack(true)
  }

  return (
    <ToolLayout title="Fancy Text Generator" description="Transform plain text into stylish Unicode fonts. Copy and paste anywhere — Instagram, Twitter, TikTok bios." category="Text Fun">
      <Paper sx={{ p: 4, mb: 4, borderRadius: 4 }}>
        <TextField
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type something..."
          fullWidth
          multiline
          rows={3}
          variant="outlined"
          sx={{ mb: 3 }}
          InputProps={{
            sx: { fontSize: '1.1rem', borderRadius: 3 },
          }}
        />

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
          {Object.keys(FONT_MAPS).map(font => (
            <Chip
              key={font}
              label={font}
              onClick={() => setActive(font)}
              color={active === font ? 'primary' : 'default'}
              variant={active === font ? 'filled' : 'outlined'}
              sx={{ fontWeight: 600 }}
            />
          ))}
        </Box>

        <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, bgcolor: '#f8fafc', position: 'relative' }}>
          <Typography variant="h4" sx={{ fontWeight: 400, wordBreak: 'break-all', mb: 1 }}>
            {applyFont(input, active) || 'Your text will appear here'}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="caption" color="text.secondary">{active} style</Typography>
            <IconButton onClick={() => copyToClipboard(applyFont(input, active))} color="primary" size="small">
              <ContentCopyIcon />
            </IconButton>
          </Box>
        </Paper>
      </Paper>

      <Snackbar open={snack} autoHideDuration={2000} onClose={() => setSnack(false)} message="Copied to clipboard!" />
    </ToolLayout>
  )
}
