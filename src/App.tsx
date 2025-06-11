import './App.css'
import Header from './components/Header'
import MovieList from './components/MovieList'
import SearchBar from './components/SearchBar'
import AddMovieModal from './components/AddMovieModal'
import MovieDetailsModal from './components/MovieDetailsModal';
import { useState } from 'react'

function App() {
  const [showAddModal, setShowAddModal] = useState<boolean>(false)
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);

  return (
    <>
        <Header addMovie={() => setShowAddModal(true)} />
        <SearchBar />
        <MovieList showDetails={(id) => setSelectedMovieId(id)} />

        {showAddModal && <AddMovieModal onClose={() => setShowAddModal(false)} />}
        {selectedMovieId !== null && (
          <MovieDetailsModal
            id={selectedMovieId}
            onClose={() => setSelectedMovieId(null)}
          />
        )}
    </>
  )
}

export default App
