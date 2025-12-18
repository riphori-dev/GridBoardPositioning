import { useState } from 'react'
import './App.css'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import GridVisualizer from './components/GridVisualizer/GridVisualizer'
import { parsePlacement } from './components/GridVisualizer/parser'
import Autocomplete from '@mui/material/Autocomplete'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import SaveIcon from '@mui/icons-material/Save'
import Stack from '@mui/material/Stack'

function App() {
  const [placement, setPlacement] = useState('1,1 NORTH')
  const [recent, setRecent] = useState(() => {
    try {
      const raw = localStorage.getItem('grid_recent_placements')
      return raw ? JSON.parse(raw) : []
    } catch (e) {
      return []
    }
  })

  const parsed = parsePlacement(placement)

  const savePlacement = (p) => {
    const parsedP = parsePlacement(p)
    if (parsedP.error) return false
    setRecent((prev) => {
      const list = [p, ...prev.filter((x) => x !== p)].slice(0, 5)
      try {
        localStorage.setItem('grid_recent_placements', JSON.stringify(list))
      } catch (e) {
        // ignore storage issues
      }
      return list
    })
    return true
  }

  return (
    <Container sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        GridVisualizer Demo
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
        <Autocomplete
          freeSolo
          options={recent}
          value={placement}
          onChange={(e, newVal) => newVal !== null && setPlacement(newVal)}
          inputValue={placement}
          onInputChange={(e, v) => setPlacement(v)}
          sx={{ minWidth: 360 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Placement"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  savePlacement(placement)
                }
              }}
              error={!!parsed.error}
              helperText={parsed.error || 'Format: x,y DIRECTION (e.g. 1,1 NORTH)'}
            />
          )}
        />

        <IconButton aria-label="save" onClick={() => savePlacement(placement)}>
          <SaveIcon />
        </IconButton>
      </Box>

      {recent.length > 0 && (
        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          {recent.map((r) => (
            <Chip key={r} label={r} onClick={() => setPlacement(r)} />
          ))}
        </Stack>
      )}

      <Box>
        <GridVisualizer placement={placement} />
      </Box>
    </Container>
  )
}

export default App
