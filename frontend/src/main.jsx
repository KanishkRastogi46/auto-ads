import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router'
import SigninWithGoogle from './components/signin/page.jsx'
import Chatbot from './components/chatbot/page.jsx'
import CreateAdCampaign from './components/createAd/page.jsx'
import TrackCampaigns from './components/tracking/page.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/auth" element={<SigninWithGoogle />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/create-ad" element={<CreateAdCampaign />} />
        <Route path="/tracking" element={<TrackCampaigns />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
