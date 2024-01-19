import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Fetching } from "../types/Fetching";

interface WatchlaterState {
  watchlater: Fetching[];
}

const initialState: WatchlaterState = {
  watchlater: JSON.parse(localStorage.getItem("watchlater") || "[]")
};

const watchSlice = createSlice({
  name: "watchlater",  
  initialState,
  reducers: {
    ADD: (state, action: PayloadAction<Fetching>) => {
      state.watchlater.push(action.payload);
      localStorage.setItem("watchlater", JSON.stringify(state.watchlater));
    },
    REMOVE: (state, action: PayloadAction<number>) => {
      state.watchlater = state.watchlater.filter(
        (item) => item.id !== action.payload
      );
      localStorage.setItem("watchlater", JSON.stringify(state.watchlater));  
    }, 
  }
});

export const { ADD, REMOVE } = watchSlice.actions;

export default watchSlice.reducer;