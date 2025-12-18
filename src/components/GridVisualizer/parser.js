export function parsePlacement(input) {
  if (typeof input !== 'string') {
    return { error: 'Input must be a string' };
  }

  const normalized = input.trim().toUpperCase();
  const regex = /^(\d)\s*,\s*(\d)\s+\b(NORTH|EAST|SOUTH|WEST)\b$/i;
  const m = normalized.match(regex);
  if (!m) {
    return { error: 'Invalid format. Expected: "x,y DIRECTION"' };
  }

  const x = Number(m[1]);
  const y = Number(m[2]);
  const direction = m[3].toUpperCase();

  if (Number.isNaN(x) || Number.isNaN(y)) {
    return { error: 'x and y must be numbers' };
  }

  if (x < 0 || x > 4 || y < 0 || y > 4) {
    return { error: 'x and y must be between 0 and 4' };
  }

  return { x, y, direction };
}
