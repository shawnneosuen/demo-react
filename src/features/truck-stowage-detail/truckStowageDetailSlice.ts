/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Shawnneosuen@outlook.com
 * @Date: 2021-10-18 16:12:52
 * @LastEditors: Shawnneosuen@outlook.com
 * @LastEditTime: 2021-10-18 16:19:22
 */

import { Action } from "@devexpress/dx-react-core";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TruckStowageDetailModel } from "boot/model";
import { TruckStowageDetials } from "./truckStowageDetails";

const initialState = {
    truckStowageDetails: TruckStowageDetials
}

export const TruckStowageDetailsSlice = createSlice({
    name: 'TruckStowageDetailsSlice',
    initialState,
    reducers:{
        updateTruckStowageDetailSlice: (state=initialState, action: PayloadAction<TruckStowageDetailModel>) => {
            return state
        }
    }
})

export const selectedTruckStowageDetails = (state: any) => state.truckStowageDetails

export const {updateTruckStowageDetailSlice} = TruckStowageDetailsSlice.actions

export default TruckStowageDetailsSlice.reducer 