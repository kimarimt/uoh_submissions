import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AlertContextProvider } from './components/contexts/AlertContext'
import { UserContextProvider } from './components/contexts/UserContext'
import App from './components/app/App'
import './index.css'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AlertContextProvider>
        <UserContextProvider>
          <Router>
            <App />
          </Router>
        </UserContextProvider>
      </AlertContextProvider>
    </QueryClientProvider>
  </StrictMode>
)
