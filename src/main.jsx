import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { PositionProvider } from './context/PositionContext.jsx'
import { ThemeProvider } from '@mui/material';
import theme from './theme/theme.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
    <PositionProvider>
      <App />
    </PositionProvider>
    </ThemeProvider>
  </StrictMode>,
)
