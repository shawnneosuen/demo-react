/*
 * @Author: your name
 * @Date: 2021-09-30 20:37:14
 * @LastEditTime: 2021-10-12 02:05:35
 * @LastEditors: Shawnneosuen@outlook.com
 * @Description: In User Settings Edit
 * @FilePath: /demo-react/src/store/yardSlice.ts
 */
import { createNextState, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Commands } from 'boot/model'


const initialState: Commands={
    commands:[]
}
export const commandsSlice = createSlice({
	name: 'commands',
	initialState,
	reducers: {
		updateYard: (state=initialState) => {
			return state
		},
		getAllBayId: (state=initialState) => {
			return state
		},
	},
})
export const selectYard = (state: any) => state.yard
export const selectBayIds = (state: any) => state.yard.bayIds
export const { updateYard, getAllBayId } = commandsSlice.actions

export default commandsSlice.reducer
