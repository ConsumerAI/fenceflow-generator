
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Toaster } from './components/ui/toaster'
import HomePage from './pages/home'
import NearMePage from './pages/fence-companies-near-me'
import AutomaticGatesPage from './pages/automatic-gates'
import ServicePage from './pages/[service]'
import NotFound from './pages/not-found'
import JsonLd from './components/JsonLd'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <Router>
      <JsonLd />
      <ScrollToTop />
      <Navbar />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/fence-companies-near-me" element={<NearMePage />} />
          <Route path="/automatic-gates" element={<AutomaticGatesPage />} />
          <Route path="/:service" element={<ServicePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <Toaster />
    </Router>
  )
}

export default App
