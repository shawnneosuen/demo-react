/*
 * @Author: your name
 * @Date: 2021-09-30 20:37:14
 * @LastEditTime: 2021-10-17 00:45:37
 * @LastEditors: Shawnneosuen@outlook.com
 * @Description: In User Settings Edit
 * @FilePath: /demo-react/src/store/yardSlice.ts
 */
import { createNextState, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Command, Commands } from 'boot/model'
import CommandHistory from './commands'

const initialState: Commands = CommandHistory
export const historySlice = createSlice({
	name: 'commands',
	initialState,
	reducers: {
		getCommand: (state = initialState) => {
			return state
		},
		addNewCommandHistory: (state = initialState, action: PayloadAction<Command>) => {
			let stateTemp = JSON.parse(JSON.stringify(state))
			stateTemp.commands.push(action.payload)

			return stateTemp
		},
		deleteCommand: (state = initialState, action: PayloadAction<Command>) => {
			let stateTemp = JSON.parse(JSON.stringify(state))
			if (stateTemp.length <= 0) {
				console.error('指令库为空')
				return state
			}
			let targetValue = stateTemp?.commands.findIndex(
				(command: Command) => command.CommandNo === action.payload.CommandNo
			)
			if (targetValue === -1) {
				console.error('当前指令不存在')
				return state
			}

			return {
				commands: stateTemp.commands.filter(
					(item: Command) => item.CommandNo != action.payload.CommandNo
				),
			}
		},
	},
})
export const selectYard = (state: any) => state.yard
export const selectBayIds = (state: any) => state.yard.bayIds
export const {  getCommand, addNewCommandHistory } =
	historySlice.actions

export default historySlice.reducer
