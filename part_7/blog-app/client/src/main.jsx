import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AlertContextProvider } from './components/AlertContext'
import App from './components/App'
import './index.css'
import { UserContextProvider } from './components/UserContext'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AlertContextProvider>
        <UserContextProvider>
          <App />
        </UserContextProvider>
      </AlertContextProvider>
    </QueryClientProvider>
  </StrictMode>
)
