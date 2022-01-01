import { configureStore } from "@reduxjs/toolkit";
import movieSlice from "./featured/movieSlice";
import userSlice from "./featured/userSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    movie: movieSlice,
  },
});
