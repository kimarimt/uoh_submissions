import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import App from './components/App'
import { AlertContextProvider } from './components/AlertContext'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AlertContextProvider>
      <App />
    </AlertContextProvider>
  </StrictMode>
)
