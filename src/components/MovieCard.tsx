import type { Movie } from '../types';
interface Props {
  movie: Movie;
  showDetails: () => void
}

const MovieCard: React.FC<Props> = ({ movie, showDetails }) => {

  return (
    <div onClick={showDetails}  className="movieCard m-4">
      <div className="movieCard__content p-4">
        <h2>{movie.title}</h2>
        <p>Year: {movie.year}</p>
      </div>
    </div>

  );
};

export default MovieCard;
