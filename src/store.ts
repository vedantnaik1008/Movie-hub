import { configureStore } from "@reduxjs/toolkit";
import WatchSlice from "./components/WatchSlice";

export const store = configureStore({
    reducer: {
        watchlater: WatchSlice
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch