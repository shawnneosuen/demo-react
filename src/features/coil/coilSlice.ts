/*
 * @Author: your name
 * @Date: 2021-10-13 13:34:36
 * @LastEditTime: 2021-10-17 01:07:50
 * @LastEditors: Shawnneosuen@outlook.com
 * @Description: In User Settings Edit
 * @FilePath: /demo-react/src/features/coil/coilSlice.ts
 */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Coil } from 'boot/model'
import coils from './UACSAPP_UACS_SCHEDULE_COIL.json'

const initialState = {
	coils: coils as Coil[],
}

export const coilSlice = createSlice({
	name: 'coils',
	initialState,
	reducers: {
		updateCoil: (state = initialState, action: PayloadAction<Coil>) => {
			let stateTemp = JSON.parse(JSON.stringify(state))

			let index = stateTemp.coils.findIndex((coilTemp : Coil) => coilTemp.MAT_NO === action.payload.MAT_NO)
			stateTemp.coils[index] = action.payload
			return stateTemp
		},
		getAllBayId: (state = initialState) => {
			return state
		},
	},
})
export const selectCoils = (state: any) => state
export const { updateCoil, getAllBayId } = coilSlice.actions

export default coilSlice.reducer
