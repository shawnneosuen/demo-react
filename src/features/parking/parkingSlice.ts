/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Shawnneosuen@outlook.com
 * @Date: 2021-10-18 14:06:36
 * @LastEditors: Shawnneosuen@outlook.com
 * @LastEditTime: 2021-10-18 15:17:34
 */
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ParkingModel } from "boot/model"
import { parkings } from "./parkings"

const initialState = {
    parkings:parkings
}

export const parkingSlice = createSlice({
    name: 'parking',
    initialState,
    reducers:{
        updateParking: (state=initialState, action: PayloadAction<ParkingModel>) => {
            return state
        }
    }
})
export const selectedParkings = (state: any) => state.parkings
export const { updateParking } = parkingSlice.actions

export default parkingSlice.reducer