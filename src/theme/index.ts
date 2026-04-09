export const Colors = {
  primary: '#1A1A1A',     // Sombre
  text: '#F0F0F0',        // Clair
  accent: '#FF4500',      // Orange Focus
  neutralDark: '#4A4A4A', // Gris Foncé
  neutralLight: '#CCCCCC',// Gris Clair
  background: '#1A1A1A',
  card: '#2A2A2A',
  error: '#FF3B30',
};

export const Spacing = {
  xs: 4,
  s: 8,
  m: 16,
  l: 24,
  xl: 32,
  xxl: 48,
};

export const Typography = {
  h1: {
    fontSize: 32,
    fontWeight: '800' as const,
    color: Colors.text,
  },
  h2: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: Colors.text,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    color: Colors.text,
  },
  button: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: Colors.text,
  },
};
