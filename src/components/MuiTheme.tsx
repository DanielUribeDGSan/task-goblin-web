import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import type { ReactNode } from 'react';
import { useTheme } from '../contexts/ThemeContext';

// Paleta TaskGoblin: tema oscuro #2B2A2D, superficie #3B3746, acento morado
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#8B5CF6' },
    secondary: { main: '#A78BFA' },
    background: {
      default: '#2B2A2D',
      paper: '#3B3746',
    },
  },
  shape: { borderRadius: 12 },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#7C3AED' },
    secondary: { main: '#6D28D9' },
    background: {
      default: '#F5F3FF',
      paper: '#FFFFFF',
    },
  },
  shape: { borderRadius: 12 },
});

interface MuiThemeProps {
  readonly children: ReactNode;
}

export default function MuiTheme({ children }: MuiThemeProps) {
  const { mode } = useTheme();
  const theme = mode === 'dark' ? darkTheme : lightTheme;

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
