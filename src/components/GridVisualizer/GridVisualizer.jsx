import React from 'react';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { parsePlacement } from './parser';
import './styles.css';

/**
 * GridVisualizer
 * Props:
 * - placement: string like "1,1 NORTH"
 */
export default function GridVisualizer({ placement }) {
  const parsed = parsePlacement(placement);

  if (parsed.error) {
    return (
      <Box>
        <Alert severity="error" className="error-box">{parsed.error}</Alert>
        <Table className="grid-table">
          <TableBody>
            {Array.from({ length: 5 }).reverse().map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {Array.from({ length: 5 }).map((__, colIndex) => (
                  <TableCell key={colIndex} className="grid-cell" />
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    );
  }

  const { x, y, direction } = parsed;

  function getRotation(dir) {
    switch (dir) {
      case 'NORTH':
        return 0;
      case 'EAST':
        return 90;
      case 'SOUTH':
        return 180;
      case 'WEST':
        return 270;
      default:
        return 0;
    }
  }

  return (
    <Table className="grid-table" aria-label="grid-visualizer">
      <TableBody>
        {Array.from({ length: 5 })
          .map((_, idx) => 4 - idx) // render rows from y=4 (top) down to 0
          .map((rowY) => (
            <TableRow key={rowY}>
              {Array.from({ length: 5 }).map((__, colX) => {
                const isMarker = colX === x && rowY === y;
                return (
                  <TableCell
                    key={`${colX}-${rowY}`}
                    className="grid-cell"
                    data-testid={`cell-${colX}-${rowY}`}
                  >
                    {isMarker && (
                      <ArrowUpwardIcon
                        className="cell-marker"
                        style={{ transform: `rotate(${getRotation(direction)}deg)` }}
                        data-testid="placement-marker"
                        aria-label={`marker-${x}-${y}-${direction}`}
                      />
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}

GridVisualizer.propTypes = {
  placement: PropTypes.string.isRequired,
};
