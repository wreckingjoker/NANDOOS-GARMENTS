import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/ui/TubelightNavbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import { FavoritesProvider } from './context/FavoritesContext'
import { StockProvider } from './context/StockContext'
import Home from './pages/Home'
import KidsWear from './pages/KidsWear'
import LadiesWear from './pages/LadiesWear'
import TraditionalWear from './pages/TraditionalWear'
import MensWear from './pages/MensWear'
import About from './pages/About'
import Contact from './pages/Contact'
import Favorites from './pages/Favorites'
import Admin from './pages/Admin'

export default function App() {
  return (
    <BrowserRouter>
      <StockProvider>
        <FavoritesProvider>
          <ScrollToTop />
          <Navbar />
          <div className="pt-16 pb-24 lg:pb-0">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/kids-wear" element={<KidsWear />} />
              <Route path="/ladies-wear" element={<LadiesWear />} />
              <Route path="/traditional-wear" element={<TraditionalWear />} />
              <Route path="/mens-wear" element={<MensWear />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </div>
          <Footer />
        </FavoritesProvider>
      </StockProvider>
    </BrowserRouter>
  )
}
