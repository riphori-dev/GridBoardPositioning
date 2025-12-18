import React from 'react';
import { render, screen } from '@testing-library/react';
import GridVisualizer from './GridVisualizer';
import { parsePlacement } from './parser';

describe('parsePlacement', () => {
  test('parses valid input', () => {
    expect(parsePlacement('1,2 NORTH')).toEqual({ x: 1, y: 2, direction: 'NORTH' });
    expect(parsePlacement('0,0 south')).toEqual({ x: 0, y: 0, direction: 'SOUTH' });
  });

  test('returns error for out-of-range', () => {
    expect(parsePlacement('5,0 NORTH').error).toBeDefined();
    expect(parsePlacement('-1,0 NORTH').error).toBeDefined();
  });

  test('returns error for bad format', () => {
    expect(parsePlacement('abc')).toHaveProperty('error');
  });
});

describe('GridVisualizer component', () => {
  test('renders marker in the right cell and orientation', () => {
    render(<GridVisualizer placement="2,3 EAST" />);
    const marker = screen.getByTestId('placement-marker');
    expect(marker).toBeInTheDocument();
    expect(marker).toHaveStyle({ transform: 'rotate(90deg)' });

    // marker should be inside the correct cell
    const cell = screen.getByTestId('cell-2-3');
    expect(cell).toContainElement(marker);
  });

  test('shows error on invalid input', () => {
    render(<GridVisualizer placement="6,6 NORTH" />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });
});
