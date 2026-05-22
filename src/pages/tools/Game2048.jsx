import { useState, useEffect, useCallback } from 'react'
import { Typography, Box, Paper, Button, Stack } from '@mui/material'
import ReplayIcon from '@mui/icons-material/Replay'
import ToolLayout from '../../components/ToolLayout'
import { motion } from 'framer-motion'

const GRID = 4

function createGame() {
  const board = Array.from({ length: GRID }, () => Array.from({ length: GRID }, () => 0))
  addTile(board); addTile(board)
  return board
}

function addTile(board) {
  const empty = []
  for (let r = 0; r < GRID; r++)
    for (let c = 0; c < GRID; c++)
      if (board[r][c] === 0) empty.push([r, c])
  if (empty.length) {
    const [r, c] = empty[Math.floor(Math.random() * empty.length)]
    board[r][c] = Math.random() < 0.9 ? 2 : 4
  }
}

function slide(row) {
  const filtered = row.filter(v => v !== 0)
  const merged = []
  let score = 0
  for (let i = 0; i < filtered.length; i++) {
    if (i < filtered.length - 1 && filtered[i] === filtered[i + 1]) {
      merged.push(filtered[i] * 2)
      score += filtered[i] * 2
      i++
    } else {
      merged.push(filtered[i])
    }
  }
  while (merged.length < GRID) merged.push(0)
  return { row: merged, score }
}

function moveBoard(board, direction) {
  let newBoard = JSON.parse(JSON.stringify(board))
  let totalScore = 0
  const rotate = (b, times) => {
    for (let n = 0; n < times; n++) b = b[0].map((_, i) => b.map(r => r[i]).reverse())
    return b
  }
  const rotations = { left: 0, right: 2, up: 3, down: 1 }
  newBoard = rotate(newBoard, rotations[direction])
  for (let r = 0; r < GRID; r++) {
    const { row, score } = slide(newBoard[r])
    newBoard[r] = row
    totalScore += score
  }
  newBoard = rotate(newBoard, (4 - rotations[direction]) % 4)
  return { board: newBoard, score: totalScore }
}

function boardEqual(a, b) {
  for (let r = 0; r < GRID; r++)
    for (let c = 0; c < GRID; c++)
      if (a[r][c] !== b[r][c]) return false
  return true
}

const TILE_COLORS = {
  2: '#eee4da', 4: '#ede0c8', 8: '#f2b179', 16: '#f59563',
  32: '#f67c5f', 64: '#f65e3b', 128: '#edcf72', 256: '#edcc61',
  512: '#edc850', 1024: '#edc53f', 2048: '#edc22e',
}

export default function Game2048() {
  const [board, setBoard] = useState(() => createGame())
  const [score, setScore] = useState(() => parseInt(localStorage.getItem('score2048')) || 0)
  const [gameOver, setGameOver] = useState(false)
  const [won, setWon] = useState(false)

  const move = useCallback((dir) => {
    if (gameOver) return
    const { board: newBoard, score: addScore } = moveBoard(board, dir)
    if (boardEqual(board, newBoard)) return false
    addTile(newBoard)
    setBoard(newBoard)
    const newScore = score + addScore
    setScore(newScore)
    if (newScore > (parseInt(localStorage.getItem('score2048')) || 0)) localStorage.setItem('score2048', newScore)
    if (newBoard.flat().some(v => v === 2048) && !won) setWon(true)
    const canMove = (b) => {
      for (let r = 0; r < GRID; r++)
        for (let c = 0; c < GRID; c++) {
          if (b[r][c] === 0) return true
          if (c < GRID - 1 && b[r][c] === b[r][c + 1]) return true
          if (r < GRID - 1 && b[r][c] === b[r + 1][c]) return true
        }
      return false
    }
    if (!canMove(newBoard)) setGameOver(true)
    return true
  }, [board, score, gameOver, won])

  useEffect(() => {
    const handleKey = (e) => {
      const map = { ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right' }
      if (map[e.key]) { e.preventDefault(); move(map[e.key]) }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [move])

  useEffect(() => {
    let startX = 0, startY = 0
    const handleTouchStart = e => { startX = e.touches[0].clientX; startY = e.touches[0].clientY }
    const handleTouchEnd = e => {
      const dx = e.changedTouches[0].clientX - startX
      const dy = e.changedTouches[0].clientY - startY
      if (Math.abs(dx) < 30 && Math.abs(dy) < 30) return
      if (Math.abs(dx) > Math.abs(dy)) move(dx > 0 ? 'right' : 'left')
      else move(dy > 0 ? 'down' : 'up')
    }
    window.addEventListener('touchstart', handleTouchStart)
    window.addEventListener('touchend', handleTouchEnd)
    return () => { window.removeEventListener('touchstart', handleTouchStart); window.removeEventListener('touchend', handleTouchEnd) }
  }, [move])

  const reset = () => { setBoard(createGame()); setScore(0); setGameOver(false); setWon(false) }

  return (
    <ToolLayout title="2048 Game" description="Combine tiles to reach 2048. Use arrow keys or swipe. Saves your best score." category="Mini Games">
      <Paper sx={{ p: 4, borderRadius: 4, textAlign: 'center' }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
          <Box>
            <Typography variant="h4" fontWeight={800} color="primary.main">2048</Typography>
            <Typography variant="caption" color="text.secondary">Use Arrow Keys</Typography>
          </Box>
          <Stack direction="row" spacing={2}>
            <Paper variant="outlined" sx={{ px: 3, py: 1, borderRadius: 2, textAlign: 'center' }}>
              <Typography variant="caption" color="text.secondary">SCORE</Typography>
              <Typography variant="h5" fontWeight={800}>{score}</Typography>
            </Paper>
            <Button onClick={reset} startIcon={<ReplayIcon />} variant="outlined" size="small">New Game</Button>
          </Stack>
        </Stack>

        <Box
          sx={{
            display: 'grid', gridTemplateColumns: `repeat(${GRID}, 1fr)`,
            gap: 1.5, bgcolor: '#bbada0', p: 1.5, borderRadius: 3,
            maxWidth: 400, mx: 'auto', position: 'relative',
          }}
        >
          {board.flat().map((val, i) => (
            <motion.div
              key={i}
              initial={false}
              layout
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              style={{
                aspectRatio: '1', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: val > 512 ? '1.2rem' : '1.8rem', fontWeight: 800,
                background: TILE_COLORS[val] || (val > 0 ? '#3c3a32' : 'rgba(238,228,218,0.35)'),
                color: val <= 4 ? '#776e65' : '#f9f6f2',
              }}
            >
              {val || ''}
            </motion.div>
          ))}
        </Box>

        {(gameOver || won) && (
          <Box sx={{ mt: 3, p: 3, borderRadius: 3, bgcolor: won ? 'rgba(46,204,113,0.1)' : 'rgba(231,76,60,0.1)' }}>
            <Typography variant="h5" fontWeight={700} color={won ? '#2ecc71' : '#e74c3c'}>
              {won ? 'You Won!' : 'Game Over!'}
            </Typography>
            {won && <Typography color="text.secondary" mt={1}>Keep playing to beat your high score!</Typography>}
            <Button onClick={reset} variant="contained" sx={{ mt: 2 }}>Play Again</Button>
          </Box>
        )}
      </Paper>
    </ToolLayout>
  )
}
