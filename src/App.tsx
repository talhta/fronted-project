import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router'
import NavBar from './components/NavBar'
import ListPage from './pages/ListPage'
import DetailsPage from './pages/DetailsPage'
import FavoritesPage from './pages/FavoritesPage'
import ComparePage from './pages/ComparePage'
import { loadFavorites, saveFavorites, toggleFavorite } from './utils/favorites'
import './App.css'

function App() {
  // The favorites live here, above all the pages, so every page sees the same list.
  // The function form reads localStorage only once, on the first render.
  const [favorites, setFavorites] = useState<number[]>(() => loadFavorites())

  // Save to localStorage every time the favorites change.
  useEffect(() => {
    saveFavorites(favorites)
  }, [favorites])

  function handleToggleFavorite(id: number) {
    setFavorites((current) => toggleFavorite(current, id))
  }

  return (
    <>
      <NavBar />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <ListPage
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
              />
            }
          />
          <Route
            path="/items/:id"
            element={
              <DetailsPage
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
              />
            }
          />
          <Route
            path="/favorites"
            element={
              <FavoritesPage
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
              />
            }
          />
          <Route path="/compare" element={<ComparePage />} />
        </Routes>
      </main>
    </>
  )
}

export default App
