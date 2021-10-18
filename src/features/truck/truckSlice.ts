/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Shawnneosuen@outlook.com
 * @Date: 2021-10-18 11:26:33
 * @LastEditors: Shawnneosuen@outlook.com
 * @LastEditTime: 2021-10-18 14:02:11
 */

import { createSlice } from "@reduxjs/toolkit"
import { Trucks } from "./truck"

const initialState={
    trucks: Trucks
}

const truckSlice = createSlice({
    name: 'truck',
    initialState: initialState,
    reducers:{
        updateTruck:(state=initialState)=>{
            return state
        }
    }
})
export const selectedTruck = (state: any) => state.truck
export const { updateTruck } = truckSlice.actions

export default truckSlice.reducer 