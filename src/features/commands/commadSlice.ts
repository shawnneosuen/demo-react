/*
 * @Author: your name
 * @Date: 2021-09-30 20:37:14
 * @LastEditTime: 2021-10-14 13:41:05
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
		updateCommand: (state = initialState, action: PayloadAction<Command>) => {
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
			stateTemp.commands[targetValue] = action.payload

			return stateTemp
		},
		getCommand: (state = initialState) => {
			return state
		},
		addNewCommand: (state = initialState, action: PayloadAction<Command>) => {
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
export const { updateCommand, getCommand, addNewCommand, deleteCommand } =
	commandsSlice.actions

export default commandsSlice.reducer
