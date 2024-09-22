import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// const apiKey = process.env.TMDB_API_KEY;

interface FetchMoviesParams {
  category: string;
  page: number;
}

interface MovieState {
  category: string;
  page: number;
  movies: Movie[];
}

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
}

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async ({ category, page }: FetchMoviesParams) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${category}?api_key=a210960a51789a1b25ddea27ad15d692&page=${page}`
    );
    return await response.json();
  }
);

const initialState: MovieState = {
  category: "popular",
  page: 1,
  movies: [],
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload.key;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.movies = action.payload.results;
    });
  },
});

export const { setCategory, setPage } = movieSlice.actions;

export const selectMovies = (state: { movie: MovieState }) =>
  state.movie.movies;

export default movieSlice.reducer;
