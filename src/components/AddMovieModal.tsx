import { useDispatch } from 'react-redux';
import { addMovie } from '../store/moviesSlice';
import type { AddMovieForm } from "../types"
import type { AppDispatch } from '../store/store';
import '../styles/AddMovieModal.css'
import { useForm } from 'react-hook-form'

interface Props {
  onClose: () => void;
}

const AddMovieModal: React.FC<Props> = ({ onClose }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<AddMovieForm>();
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = async (data: AddMovieForm) => {
    try {
      const actorsArray = data.actors.split(',').map(actor => actor.trim());
      const movieData = { ...data, actors: actorsArray };

      await dispatch(addMovie(movieData));
      reset();
      onClose();
    } catch (error) {
      console.error('Failed to add movie:', error);
    }
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit(onSubmit)} className="modal__content">
        <h3>Add New Movie</h3>
        <input
          {...register("title", {
            required: "Title is required",
            minLength: { value: 1, message: "Title must be at least 1 character" }
          })}
          type="text"
          placeholder="Title"
        />
        {errors.title && <span className="error">{errors.title.message}</span>}

        <input
          {...register("year", {
            required: "Year is required",
            valueAsNumber: true,
            min: { value: 1900, message: "Too low" },
            max: { value: new Date().getFullYear(), message: "Too high" }
          })}
          type="number"
          placeholder="Year"
        />
        {errors.year && <span className="error">{errors.year.message}</span>}

        <select
          {...register("format", {
            required: "Format is required"
          })}
        >
          <option value="VHS">VHS</option>
          <option value="DVD">DVD</option>
          <option value="Blu-ray">Blu-ray</option>
        </select>
        {errors.format && <span className="error">{errors.format.message}</span>}

        <textarea
          {...register("actors", {
            required: "Actors are required",
            validate: value => value.split(',').length > 0 || "Please enter at least one actor"
          })}
          placeholder="Actors (comma separated: Tom Hanks, Emma Watson)"
        />
        {errors.actors && <span className="error">{errors.actors.message}</span>}

        <button className="button greenBtn" type="submit">Submit</button>
        <button className="button redBtn" type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default AddMovieModal;
