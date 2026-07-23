import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { PositionProvider } from './context/PositionContext.jsx'
import { ThemeProvider } from '@mui/material';
import theme from './theme/theme.js';
import { AttributeProvider } from './context/AttributeContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx';
import { CategoryProvider } from './context/CategoryContext.jsx'
import { CVProvider } from './context/CVContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <CategoryProvider>
          <AttributeProvider>
            <PositionProvider>
              <CVProvider>
              <App />
              </CVProvider>
            </PositionProvider>
          </AttributeProvider>
        </CategoryProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
)
