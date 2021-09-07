import { createSlice } from "@reduxjs/toolkit";
import { Yard } from "./yard";

const initialState: Yard = {
        bay:'Test',
        width: 10000,
        length:10000
}
export const yardSlice = createSlice({
    name: 'yard',
    initialState,
    reducers:{
        updateYard: state => {
            return state
        }
    }
})

export const { updateYard } = yardSlice.actions

export default yardSlice.reducer

export const selectYard = (state:Yard) => state.bay