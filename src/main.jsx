import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
createRoot(document.getElementById('root')).render(
  <StrictMode>
      <GoogleOAuthProvider clientId="612651483215-e44j1cm38pd5focclktvonseo5lnlmec.apps.googleusercontent.com">
          <App />
      </GoogleOAuthProvider>

  </StrictMode>,
)
