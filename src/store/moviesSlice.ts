import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { Movie, MovieExtended, AddMovieData } from '../types';

const API_URL = import.meta.env.VITE_API_URL;
const API_TOKEN = import.meta.env.VITE_API_TOKEN;

const headers = { Authorization: `${API_TOKEN}` };

export const addMovie = createAsyncThunk(
  'movies/addMovie',
  async (movieData: AddMovieData, { rejectWithValue }) => {
    console.log(movieData)
    try {
      const response = await axios.post(`${API_URL}/movies`, movieData, { headers });
      console.log('response from backend:', response.data);
      return response.data.data;
    } catch (error:any) {
      return rejectWithValue(error.response?.data || 'Error adding movie');
    }
  }
);

export const deleteMovie = createAsyncThunk(
  'movies/deleteMovie',
  async (id: number, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/movies/${id}`, { headers });
      return id;
    } catch (error:any) {
      return rejectWithValue(error.response?.data || 'Error deleting movie');
    }
  }
);

export const getMovie = createAsyncThunk(
  'movies/getMovie',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/movies/${id}`, { headers });
      return response.data.data;
    } catch (error:any) {
      return rejectWithValue(error.response?.data || 'Error fetching movie');
    }
  }
);

export const getMovies = createAsyncThunk(
  'movies/getMovies',
  async () => {
    try {
      const response = await axios.get(`${API_URL}/movies`, { headers });
      return response.data.data;
    } catch (error:any) {
      return rejectWithValue(error.response?.data || 'Error fetching movies');
    }
  }
);

export const searchMoviesByTitle = createAsyncThunk(
  'movies/searchMoviesByTitle',
  async (title: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/movies?title=${title}`, { headers });
      return response.data.data;
    } catch (error:any) {
      return rejectWithValue(error.response?.data || 'Error searching movies by title');
    }
  }
);

export const searchMoviesByActor = createAsyncThunk(
  'movies/searchMoviesByActor',
  async (actor: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/movies?actor=${actor}`, { headers });
      return response.data.data;
    } catch (error:any) {
      return rejectWithValue(error.response?.data || 'Error searching movies by actor');
    }
  }
);

export const importMovies = createAsyncThunk(
  'movies/importMovies',
  async (file: File, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('movies', file);
      const response = await axios.post(`${API_URL}/movies/import`, formData, {
        headers: { ...headers, 'Content-Type': 'multipart/form-data' },
      });
      return response.data.data;
    } catch (error:any) {
      return rejectWithValue(error.response?.data || 'Error importing movies');
    }
  }
);

// Slice
const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [] as Movie[],
    currentMovie: null as MovieExtended | null,
    status: 'idle',
    error: null as string | null,
  },
  reducers: {
    clearCurrentMovie(state) {
      state.currentMovie = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addMovie.fulfilled, (state, action) => {
        state.movies.push(action.payload);
        state.status = 'succeeded';
      })
      .addCase(addMovie.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addMovie.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(deleteMovie.fulfilled, (state, action) => {
        state.movies = state.movies.filter((movie) => movie.id !== action.payload);
        state.status = 'succeeded';
      })
      .addCase(deleteMovie.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteMovie.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(getMovie.fulfilled, (state, action) => {
        state.currentMovie = action.payload;
        state.status = 'succeeded';
      })
      .addCase(getMovie.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getMovie.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(getMovies.fulfilled, (state, action) => {
        state.movies = action.payload;
        state.status = 'succeeded';
      })
      .addCase(getMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(searchMoviesByTitle.fulfilled, (state, action) => {
        state.movies = action.payload;
        state.status = 'succeeded';
      })
      .addCase(searchMoviesByTitle.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchMoviesByTitle.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(searchMoviesByActor.fulfilled, (state, action) => {
        state.movies = action.payload;
        state.status = 'succeeded';
      })
      .addCase(searchMoviesByActor.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchMoviesByActor.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(importMovies.fulfilled, (state, action) => {
        state.movies = [...state.movies, ...action.payload];
        state.status = 'succeeded';
      })
      .addCase(importMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(importMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { clearCurrentMovie, clearError } = moviesSlice.actions;
export default moviesSlice.reducer;
