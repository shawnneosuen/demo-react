import { configureStore } from "@reduxjs/toolkit";
import yardReducer from "pages/yard-monitor/store/yardSlice";
export  const store = configureStore({
    reducer: {
        yard: yardReducer

    }
})