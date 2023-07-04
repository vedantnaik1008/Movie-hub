import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface WatchItem {
  results: [];
  name: string;  
  title: string;
  poster_path: string;
  backdrop_path: string;
  first_air_date: string;
  release_date: string;
  media_type: string;
  id: number;
  overview: string;
  vote_average: number;
}

interface WatchlaterState {
  watchlater: WatchItem[];
}

const initialState: WatchlaterState = {
  watchlater: JSON.parse(localStorage.getItem("watchlater") || "[]")
};

const watchSlice = createSlice({
  name: "watchlater",  
  initialState,
  reducers: {
    ADD: (state, action: PayloadAction<WatchItem>) => {
      state.watchlater.push(action.payload);
      localStorage.setItem("watchlater", JSON.stringify(state.watchlater));
    },
    REMOVE: (state, action: PayloadAction<number>) => {
      state.watchlater = state.watchlater.filter(
        (item) => item.id !== action.payload
      );
      localStorage.setItem("watchlater", JSON.stringify(state.watchlater));  
    },
    CLEAR: (state) => {
      localStorage.removeItem("watchlater");      
      state.watchlater = [];
    }   
  }
});

export const { ADD, REMOVE, CLEAR } = watchSlice.actions;

export default watchSlice.reducer;