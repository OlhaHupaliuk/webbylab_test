import { useSelector, useDispatch } from 'react-redux';
import { deleteMovie, getMovie } from '../store/moviesSlice';
import type { RootState, AppDispatch } from '../store/store';
import { useEffect } from 'react';

interface Props {
  id: number;
  onClose: () => void;
}

const MovieDetailsModal: React.FC<Props> = ({ id, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const movie = useSelector((state: RootState) => state.movies.currentMovie);
  const status = useSelector((state: RootState) => state.movies.status);

  useEffect(() => {
      dispatch(getMovie(id));
  }, [dispatch, id]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!movie) {
    return <div className='text-center'>Movie not found</div>;
  }

  const handleDelete = () => {
    dispatch(deleteMovie(id));
    onClose();
  };

  return (
    <div className="modal movieDetailsModal">
      <div className="modal__content">
        <h3>Title: {movie.title}</h3>
        <p>Year: {movie.year}</p>
        <p>Format: {movie.format}</p>
        <p>Actors: {movie.actors.map((actor) => actor.name).join(', ')}</p>
        <button className="button redBtn" onClick={handleDelete}>
          Delete
        </button>
        <button className="button blueBtn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default MovieDetailsModal;