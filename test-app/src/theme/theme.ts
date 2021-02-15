export type Theme = typeof theme;

const colors = {
  white: '#ffffff',
  yellow: '#fff5bb',
  violet: '#4552c4',
};

const theme = {
  colors,
} as const;

export default theme;
