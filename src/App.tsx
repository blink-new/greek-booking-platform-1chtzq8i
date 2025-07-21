import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import HomePage from './pages/HomePage'
import SearchResultsPage from './pages/SearchResultsPage'
import PropertyDetailsPage from './pages/PropertyDetailsPage'
import BookingPage from './pages/BookingPage'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/property/:id" element={<PropertyDetailsPage />} />
          <Route path="/booking/:id" element={<BookingPage />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  )
}

export default App