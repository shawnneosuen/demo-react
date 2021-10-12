/*
 * @Author: your name
 * @Date: 2021-09-30 20:37:14
 * @LastEditTime: 2021-10-12 09:28:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /demo-react/src/store/yardSlice.ts
 */
import { createNextState, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Command, Commands } from 'boot/model'
import COMM from './Comm'

const initialState: Commands = COMM
export const commandsSlice = createSlice({
	name: 'commands',
	initialState,
	reducers: {
		updateCommand: (state = initialState) => {
			return state
		},
		getCommand: (state = initialState) => {
			return state
		},
		addNewCommand: (state = initialState, action: PayloadAction<Command>) => {
			let stateTemp = JSON.parse(JSON.stringify(state))
			stateTemp.push(action.payload)

			return stateTemp
		},
	},
})
export const selectYard = (state: any) => state.yard
export const selectBayIds = (state: any) => state.yard.bayIds
export const { updateCommand, getCommand } = commandsSlice.actions

export default commandsSlice.reducer
