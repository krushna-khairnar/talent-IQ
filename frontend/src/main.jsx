import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ClerkProvider, useAuth } from '@clerk/clerk-react'
import { dark } from '@clerk/themes'
import { BrowserRouter } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { setupAxiosInterceptors } from './lib/axios'

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

const queryClient = new QueryClient()

// Inner component so it can access Clerk's useAuth hook
function ClerkAxiosBridge({ children }) {
  const { getToken } = useAuth()
  setupAxiosInterceptors(getToken)
  return children
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <QueryClientProvider client={queryClient}>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}
        appearance={{
        theme: dark,
        }}>
            <ClerkAxiosBridge>
              <App />
            </ClerkAxiosBridge>
        </ClerkProvider>
    </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
)
