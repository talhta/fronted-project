import { Route, Routes } from 'react-router'
import NavBar from './components/NavBar'
import ListPage from './pages/ListPage'
import DetailsPage from './pages/DetailsPage'
import FavoritesPage from './pages/FavoritesPage'
import ComparePage from './pages/ComparePage'
import './App.css'

function App() {
  return (
    <>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<ListPage />} />
          <Route path="/items/:id" element={<DetailsPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/compare" element={<ComparePage />} />
        </Routes>
      </main>
    </>
  )
}

export default App
