import { configureStore } from "@reduxjs/toolkit";
import { updateYard } from "pages/yard-monitor/yardSlice";
export default configureStore({

    reducer: {
        yard: updateYard
    }
})

