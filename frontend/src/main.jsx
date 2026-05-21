import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthProvider } from './context/authContext.jsx'

const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
  
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
      <App />
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>,
  
)
