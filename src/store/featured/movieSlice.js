import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movie: [],
};

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setMovies: (state, action) => {
      state.movie = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMovies } = movieSlice.actions;
export const getMovies = (state) => state.movie.movie;
export default movieSlice.reducer;
