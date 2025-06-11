import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchMoviesByTitle, searchMoviesByActor, getMovies } from '../store/moviesSlice';
import type { AppDispatch } from '../store/store';
const SearchBar: React.FC = () => {
  const [searchType, setSearchType] = useState<'title' | 'actor'>('title');
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const handleSearch = () => {
    if (searchTerm) {
      dispatch(searchType === 'title' ? searchMoviesByTitle(searchTerm) : searchMoviesByActor(searchTerm));
    } else {
      dispatch(getMovies());
    }
  };

  return (
    <div className="searchBar m-4">
      <div className="d-flex gap-3">
        <select className='p-2 rounded' onChange={(e) => setSearchType(e.target.value as 'title' | 'actor')}>
          <option value="title">Search by Title</option>
          <option value="actor">Search by Actor</option>
        </select>
      </div>
      <div className="d-flex justify-content-between align-items-center gap-2">
        <div className="searchBar__inputWrap my-4 d-flex align-items-center gap-2 col-10">
          <img src="/search.svg" alt="Search icon" className="searchBar__icon" />
          <input
            className="searchBar__input col-12"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter your search"
          />
        </div>
        <button className="submit button col-2 greenBtn" onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;