import { createSlice } from "@reduxjs/toolkit";
import { Yard } from "./yard";

export const yardSlice = createSlice({
    name: 'yard',
    initialState:{
        yard: {
            bay:'Test',
            width: 10000,
            length:10000
        }
    },
    reducers:{
        updateYard: state => {
            return state
        }
    }
})

export const { updateYard } = yardSlice.actions

export default yardSlice.reducer