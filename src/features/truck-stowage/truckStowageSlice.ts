import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { TruckStowageModel } from "boot/model"
import { truckStowages } from "./truckStowage"

/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Shawnneosuen@outlook.com
 * @Date: 2021-10-18 10:11:35
 * @LastEditors: Shawnneosuen@outlook.com
 * @LastEditTime: 2021-10-18 10:53:50
 */
const initialState = {
    truckStowage: truckStowages
}
export const truckStowageSlice = createSlice({
    name:'truckStowage',
    initialState,
    reducers:{
        updateTruckStwage:(state=initialState, action:PayloadAction<TruckStowageModel>) => {
            return state
        }
    }
})

export const selectedTruckStowage = (state: any) => state.truckStowage
export const { updateTruckStwage } = truckStowageSlice.actions

export default truckStowageSlice.reducer
