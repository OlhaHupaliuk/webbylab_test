import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMovies } from '../store/moviesSlice';
import MovieCard from './MovieCard';
import type { RootState, AppDispatch } from '../store/store';

type Props = {
  showDetails: (id: number) => void;
};

const MovieList: React.FC<Props> = ({ showDetails }) => {
  const dispatch = useDispatch<AppDispatch>();
  const movies = useSelector((state: RootState) => state.movies.movies);
  const status = useSelector((state: RootState) => state.movies.status);
  const error = useSelector((state: RootState) => state.movies.error);
  const sortedMovies = [...movies].sort((a, b) => a.title.localeCompare(b.title));
  useEffect(() => {
    if (status === 'idle') {
      dispatch(getMovies());
    }
    
      console.log(movies);
  }, [dispatch, status]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error || 'Failed to load movies'}</div>;
  }

  if (movies.length === 0) {
    return <div>No movies found</div>;
  }

  return (
    <div>
      {
      sortedMovies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} showDetails={() => showDetails(movie.id)} />
      ))}
    </div>
  );
};

export default MovieList;