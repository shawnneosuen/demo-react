/*
 * @Author: your name
 * @Date: 2021-10-13 13:34:36
 * @LastEditTime: 2021-10-13 14:23:36
 * @LastEditors: Please set LastEditors
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
		updateYard: (state = initialState) => {
			return state
		},
		getAllBayId: (state = initialState) => {
			return state
		},
	},
})
export const selectCoils = (state: any) => state
export const { updateYard, getAllBayId } = coilSlice.actions

export default coilSlice.reducer
