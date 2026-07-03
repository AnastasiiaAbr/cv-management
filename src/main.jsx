import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { PositionProvider } from './context/PositionContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PositionProvider>
      <App />
    </PositionProvider>
  </StrictMode>,
)
