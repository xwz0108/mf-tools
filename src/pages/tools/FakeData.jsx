import { useState } from 'react'
import { Typography, Box, Paper, Button, Chip, Stack, IconButton, Snackbar, Select, MenuItem, FormControl, InputLabel } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import DownloadIcon from '@mui/icons-material/Download'
import ToolLayout from '../../components/ToolLayout'

const FIRST_NAMES = ['Emma','Liam','Olivia','Noah','Ava','James','Sophia','William','Isabella','Oliver','Mia','Benjamin','Charlotte','Elijah','Amelia','Lucas','Harper','Mason','Evelyn','Logan']
const LAST_NAMES = ['Smith','Johnson','Williams','Brown','Jones','Garcia','Miller','Davis','Rodriguez','Martinez','Anderson','Taylor','Thomas','Moore','Jackson','Martin','Lee','Thompson','White','Clark']
const STREETS = ['Oak St','Maple Ave','Cedar Ln','Pine Rd','Elm Dr','Birch Ct','Walnut Way','Spruce Pl','Ash Blvd','Willow Cir']
const CITIES = ['New York','Los Angeles','Chicago','Houston','Phoenix','Philadelphia','San Antonio','San Diego','Dallas','Austin']
const DOMAINS = ['gmail.com','yahoo.com','outlook.com','hotmail.com','icloud.com','proton.me']

function random(arr) { return arr[Math.floor(Math.random() * arr.length)] }
function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min }

function generatePerson() { const fn=random(FIRST_NAMES); const ln=random(LAST_NAMES); return { type:'Person', data: { firstName:fn, lastName:ln, fullName:`${fn} ${ln}`, email:`${fn.toLowerCase()}.${ln.toLowerCase()}${randInt(1,999)}@${random(DOMAINS)}`, phone:`+1 (${randInt(200,999)}) ${randInt(100,999)}-${randInt(1000,9999)}`, age:randInt(18,75) } } }
function generateAddress() { return { type:'Address', data: { street:`${randInt(100,9999)} ${random(STREETS)}`, city:random(CITIES), state:random(['CA','TX','NY','FL','IL','PA','OH','GA','NC','MI']), zip:randInt(10000,99999).toString(), country:'United States' } } }
function generateInternet() { const fn=random(FIRST_NAMES).toLowerCase(); return { type:'Internet', data: { username:`${fn}${random(['_','.',''])}${random(['42','007','x','pro','_dev'])}`, email:`${fn}${randInt(1,999)}@${random(DOMAINS)}`, password:`${random(['Password','Welcome','Hello'])}${randInt(1,999)}!`, ip:`${randInt(1,255)}.${randInt(1,255)}.${randInt(1,255)}.${randInt(1,255)}`, userAgent:'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } } }
function generateCompany() { const names=['Acme','Globex','Initech','Umbrella','Soylent','Cyberdyne','Wonka','Stark','Wayne','Oscorp']; return { type:'Company', data: { name:`${random(names)} ${random(['Corp','Inc','LLC','Industries','Group'])}`, catchPhrase:`${random(['Revolutionary','Innovative','Next-gen','Disruptive'])} ${random(['solutions','platforms','systems','services'])}`, bs:`${random(['synergize','leverage','optimize','scale'])} ${random(['B2B','B2C','cross-platform','end-to-end'])} ${random(['synergies','ROI','solutions','deliverables'])}` } } }

const generators = { Person: generatePerson, Address: generateAddress, Internet: generateInternet, Company: generateCompany }

export default function FakeData() {
  const [category, setCategory] = useState('Person')
  const [count, setCount] = useState(5)
  const [results, setResults] = useState([])
  const [snack, setSnack] = useState(false)

  const generate = () => {
    const gen = generators[category]
    const data = Array.from({ length: count }, () => gen().data)
    setResults(data)
  }

  const exportCSV = () => {
    if (results.length === 0) return
    const keys = Object.keys(results[0])
    const csv = [keys.join(','), ...results.map(r => keys.map(k => JSON.stringify(r[k] || '')).join(','))].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = 'fake-data.csv'; a.click()
  }

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(results, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = 'fake-data.json'; a.click()
  }

  return (
    <ToolLayout title="Fake Data Generator" description="Generate realistic fake data for testing and development. Export as JSON or CSV." category="Text Fun">
      <Paper sx={{ p: 4, borderRadius: 4 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={3} alignItems="center">
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Category</InputLabel>
            <Select value={category} onChange={e => { setCategory(e.target.value); setResults([]) }} label="Category">
              {Object.keys(generators).map(k => <MenuItem key={k} value={k}>{k}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Count</InputLabel>
            <Select value={count} onChange={e => { setCount(e.target.value); setResults([]) }} label="Count">
              {[1,5,10,20,50].map(n => <MenuItem key={n} value={n}>{n}</MenuItem>)}
            </Select>
          </FormControl>
          <Button variant="contained" onClick={generate} sx={{ px: 4 }}>Generate</Button>
        </Stack>

        {results.length > 0 && (
          <>
            <Box sx={{ mb: 2, display: 'flex', gap: 1 }}>
              <Button variant="outlined" size="small" startIcon={<DownloadIcon />} onClick={exportJSON}>JSON</Button>
              <Button variant="outlined" size="small" startIcon={<DownloadIcon />} onClick={exportCSV}>CSV</Button>
            </Box>
            <Paper variant="outlined" sx={{ borderRadius: 3, overflow: 'auto', maxHeight: 500 }}>
              <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                <Box component="thead">
                  <Box component="tr" sx={{ bgcolor: '#f8fafc' }}>
                    {Object.keys(results[0]).map(k => (
                      <Box key={k} component="th" sx={{ p: 1.5, textAlign: 'left', borderBottom: '2px solid #e2e8f0', fontWeight: 700, color: 'text.secondary' }}>
                        {k}
                      </Box>
                    ))}
                  </Box>
                </Box>
                <Box component="tbody">
                  {results.map((row, i) => (
                    <Box key={i} component="tr" sx={{ '&:hover': { bgcolor: 'rgba(67,97,238,0.02)' } }}>
                      {Object.values(row).map((val, j) => (
                        <Box key={j} component="td" sx={{ p: 1.5, borderBottom: '1px solid #f1f5f9' }}>
                          {typeof val === 'string' ? val : JSON.stringify(val)}
                        </Box>
                      ))}
                    </Box>
                  ))}
                </Box>
              </Box>
            </Paper>
          </>
        )}
      </Paper>
    </ToolLayout>
  )
}
