import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import router from './routes/Routes.jsx'
import { RouterProvider } from 'react-router'
import AuthProvider from './Pages/AuthProvider/AuthProvider.jsx'
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>

        <Toaster position="top-center" 
    reverseOrder={false}
    toastOptions={{
    duration: 2500,
    style: {
      background: 'white',
      color: 'orange',
      border: '2px solid orange',
      padding: '16px 24px',
      borderRadius: '10px',
      fontSize: '18px',
    }}} />
  </StrictMode>,
)
