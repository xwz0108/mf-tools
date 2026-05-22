import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Replay as RestartIcon,
  Undo as UndoIcon,
} from '@mui/icons-material';
import ToolLayout from '../../components/ToolLayout';

const GRID_SIZE = 4;
const WIN_VALUE = 2048;

const getEmptyCells = (grid) => {
  const empty = [];
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      if (grid[r][c] === 0) empty.push({ r, c });
    }
  }
  return empty;
};

const addRandomTile = (grid) => {
  const empty = getEmptyCells(grid);
  if (empty.length === 0) return grid;
  const { r, c } = empty[Math.floor(Math.random() * empty.length)];
  const newGrid = grid.map((row) => [...row]);
  newGrid[r][c] = Math.random() < 0.9 ? 2 : 4;
  return newGrid;
};

const createEmptyGrid = () =>
  Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(0));

const initGrid = () => {
  let grid = createEmptyGrid();
  grid = addRandomTile(grid);
  grid = addRandomTile(grid);
  return grid;
};

const slideAndMerge = (line) => {
  const filtered = line.filter((v) => v !== 0);
  const result = [];
  let score = 0;
  for (let i = 0; i < filtered.length; i++) {
    if (i + 1 < filtered.length && filtered[i] === filtered[i + 1]) {
      const merged = filtered[i] * 2;
      result.push(merged);
      score += merged;
      i++;
    } else {
      result.push(filtered[i]);
    }
  }
  while (result.length < GRID_SIZE) result.push(0);
  return { line: result, score };
};

const moveGrid = (grid, direction) => {
  let newGrid = createEmptyGrid();
  let totalScore = 0;
  let moved = false;

  for (let i = 0; i < GRID_SIZE; i++) {
    let line = [];
    if (direction === 'left') {
      line = grid[i].slice();
    } else if (direction === 'right') {
      line = grid[i].slice().reverse();
    } else if (direction === 'up') {
      for (let r = 0; r < GRID_SIZE; r++) line.push(grid[r][i]);
    } else if (direction === 'down') {
      for (let r = GRID_SIZE - 1; r >= 0; r--) line.push(grid[r][i]);
    }

    const { line: merged, score } = slideAndMerge(line);
    totalScore += score;

    const originalLine = direction === 'left'
      ? grid[i]
      : direction === 'right'
        ? grid[i].slice().reverse()
        : direction === 'up'
          ? Array.from({ length: GRID_SIZE }, (_, r) => grid[r][i])
          : Array.from({ length: GRID_SIZE }, (_, r) => grid[GRID_SIZE - 1 - r][i]);

    if (merged.join(',') !== originalLine.join(',')) moved = true;

    if (direction === 'left') {
      newGrid[i] = merged;
    } else if (direction === 'right') {
      newGrid[i] = merged.reverse();
    } else if (direction === 'up') {
      for (let r = 0; r < GRID_SIZE; r++) newGrid[r][i] = merged[r];
    } else if (direction === 'down') {
      for (let r = 0; r < GRID_SIZE; r++) newGrid[GRID_SIZE - 1 - r][i] = merged[r];
    }
  }

  return { grid: newGrid, score: totalScore, moved };
};

const canMove = (grid) => {
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      if (grid[r][c] === 0) return true;
      if (c + 1 < GRID_SIZE && grid[r][c] === grid[r][c + 1]) return true;
      if (r + 1 < GRID_SIZE && grid[r][c] === grid[r + 1][c]) return true;
    }
  }
  return false;
};

const hasWon = (grid) => {
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      if (grid[r][c] >= WIN_VALUE) return true;
    }
  }
  return false;
};

const TILE_COLORS = {
  0: { bg: '#cdc1b4', color: 'transparent' },
  2: { bg: '#eee4da', color: '#776e65' },
  4: { bg: '#ede0c8', color: '#776e65' },
  8: { bg: '#f2b179', color: '#f9f6f2' },
  16: { bg: '#f59563', color: '#f9f6f2' },
  32: { bg: '#f67c5f', color: '#f9f6f2' },
  64: { bg: '#f65e3b', color: '#f9f6f2' },
  128: { bg: '#edcf72', color: '#f9f6f2' },
  256: { bg: '#edcc61', color: '#f9f6f2' },
  512: { bg: '#edc850', color: '#f9f6f2' },
  1024: { bg: '#edc53f', color: '#f9f6f2' },
  2048: { bg: '#edc22e', color: '#f9f6f2' },
  4096: { bg: '#3c3a32', color: '#f9f6f2' },
  8192: { bg: '#3c3a32', color: '#f9f6f2' },
};

const getTileStyle = (value) => {
  const colors = TILE_COLORS[value] || { bg: '#3c3a32', color: '#f9f6f2' };
  const fontSize = value < 100 ? '2rem' : value < 1000 ? '1.6rem' : value < 10000 ? '1.2rem' : '0.9rem';
  return {
    width: '100%',
    aspectRatio: '1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.bg,
    color: colors.color,
    borderRadius: 6,
    fontWeight: 'bold',
    fontSize,
    transition: 'all 0.1s ease-in-out',
    userSelect: 'none',
  };
};

const Game2048 = () => {
  const [grid, setGrid] = useState(initGrid);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(() => {
    const saved = localStorage.getItem('game2048_best');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [keepPlaying, setKeepPlaying] = useState(false);
  const [history, setHistory] = useState([]);
  const gridRef = useRef(grid);
  const scoreRef = useRef(score);

  useEffect(() => {
    gridRef.current = grid;
    scoreRef.current = score;
  }, [grid, score]);

  const updateBestScore = useCallback((newScore) => {
    if (newScore > bestScore) {
      setBestScore(newScore);
      localStorage.setItem('game2048_best', String(newScore));
    }
  }, [bestScore]);

  const executeMove = useCallback(
    (direction) => {
      const { grid: newGrid, score: moveScore, moved } = moveGrid(gridRef.current, direction);
      if (!moved) return;

      setHistory((prev) => [...prev, { grid: gridRef.current, score: scoreRef.current }]);

      const gridWithTile = addRandomTile(newGrid);
      const newTotalScore = scoreRef.current + moveScore;

      setGrid(gridWithTile);
      setScore(newTotalScore);
      updateBestScore(newTotalScore);

      if (hasWon(gridWithTile) && !won && !keepPlaying) {
        setWon(true);
      }

      if (!canMove(gridWithTile)) {
        setGameOver(true);
      }
    },
    [won, keepPlaying, updateBestScore]
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameOver) return;
      const keyMap = {
        ArrowUp: 'up',
        ArrowDown: 'down',
        ArrowLeft: 'left',
        ArrowRight: 'right',
        w: 'up',
        s: 'down',
        a: 'left',
        d: 'right',
        W: 'up',
        S: 'down',
        A: 'left',
        D: 'right',
      };
      const direction = keyMap[e.key];
      if (direction) {
        e.preventDefault();
        executeMove(direction);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [executeMove, gameOver]);

  // Touch support
  const touchStart = useRef(null);
  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };
  const handleTouchEnd = (e) => {
    if (!touchStart.current || gameOver) return;
    const touch = e.changedTouches[0];
    const dx = touch.clientX - touchStart.current.x;
    const dy = touch.clientY - touchStart.current.y;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);
    if (Math.max(absDx, absDy) < 30) return;
    if (absDx > absDy) {
      executeMove(dx > 0 ? 'right' : 'left');
    } else {
      executeMove(dy > 0 ? 'down' : 'up');
    }
    touchStart.current = null;
  };

  const handleRestart = () => {
    setGrid(initGrid());
    setScore(0);
    setGameOver(false);
    setWon(false);
    setKeepPlaying(false);
    setHistory([]);
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setHistory((h) => h.slice(0, -1));
    setGrid(prev.grid);
    setScore(prev.score);
  };

  const handleContinue = () => {
    setWon(false);
    setKeepPlaying(true);
  };

  return (
    <>
      <Helmet>
        <title>2048 Game - ToolFast</title>
        <meta name="description" content="Play the classic 2048 puzzle game. Merge tiles to reach 2048!" />
      </Helmet>

      <ToolLayout title="2048 Game" description="经典2048数字合并游戏，使用方向键或滑动来玩">
        <Box sx={{ maxWidth: 500, mx: 'auto' }}>
          {/* Score Header */}
          <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={4}>
                <Paper variant="outlined" sx={{ p: 1, textAlign: 'center' }}>
                  <Typography variant="caption" color="text.secondary">分数</Typography>
                  <Typography variant="h6" fontWeight="bold">{score}</Typography>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper variant="outlined" sx={{ p: 1, textAlign: 'center' }}>
                  <Typography variant="caption" color="text.secondary">最高分</Typography>
                  <Typography variant="h6" fontWeight="bold" color="primary">{bestScore}</Typography>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Button
                  variant="contained"
                  startIcon={<RestartIcon />}
                  onClick={handleRestart}
                  fullWidth
                  size="small"
                >
                  新游戏
                </Button>
              </Grid>
            </Grid>
            <Box sx={{ textAlign: 'right', mt: 1 }}>
              <Button
                size="small"
                startIcon={<UndoIcon />}
                onClick={handleUndo}
                disabled={history.length === 0}
              >
                撤销
              </Button>
            </Box>
          </Paper>

          {/* Game Board */}
          <Paper
            elevation={3}
            sx={{
              p: 2,
              bgcolor: '#bbada0',
              borderRadius: 2,
              touchAction: 'none',
            }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
                gap: 1.5,
              }}
            >
              {grid.map((row, r) =>
                row.map((val, c) => (
                  <Box key={`${r}-${c}`} sx={getTileStyle(val)}>
                    {val !== 0 && val}
                  </Box>
                ))
              )}
            </Box>
          </Paper>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 2, textAlign: 'center' }}>
            使用方向键或 WASD 移动方块 | 也支持触屏滑动
          </Typography>

          {/* Win Dialog */}
          <Dialog open={won} onClose={handleContinue}>
            <DialogTitle>恭喜!</DialogTitle>
            <DialogContent>
              <Typography>你成功合并出了 2048!</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                当前分数: {score}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleRestart}>重新开始</Button>
              <Button onClick={handleContinue} variant="contained">
                继续游戏
              </Button>
            </DialogActions>
          </Dialog>

          {/* Game Over Dialog */}
          <Dialog open={gameOver}>
            <DialogTitle>游戏结束</DialogTitle>
            <DialogContent>
              <Typography>没有可用的移动了!</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                最终分数: {score}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleRestart} variant="contained">
                再来一局
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </ToolLayout>
    </>
  );
};

export default Game2048;
