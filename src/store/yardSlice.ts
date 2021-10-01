/*
 * @Author: your name
 * @Date: 2021-09-30 20:37:14
 * @LastEditTime: 2021-10-01 23:01:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /demo-react/src/store/yardSlice.ts
 */
import { createSlice } from '@reduxjs/toolkit'
import { Yard } from '../pages/yard-monitor/model'
import DCLY from './DCLY'
import NY from './NY'
import RFBY from './RFBY'
import RFFY from './RFFY'
import RMY from './RMY'
const initialState: Yard = {
	bayIds: ['RFBY', 'RFFY', 'DCLY', 'RMY', 'NY'],
	bays: new Map([
		['RFBY', RFBY],
		['RFFY', RFFY],
		['DCLY', DCLY],
		['RMY', RMY],
		['NY', NY],
	]),
	craneIds: ['11', '12', '21', '22', '23', '32', '43', '44', '51', '52'],
	cranes: new Map([
		['11', NY.cranes[0]],
		['12', NY.cranes[1]],
		['21', RMY.cranes[0]],
		['22', RMY.cranes[1]],
		['23', RMY.cranes[2]],
		['32', DCLY.cranes[0]],
		['43', RFFY.cranes[0]],
		['44', RFFY.cranes[1]],
		['51', RFBY.cranes[0]],
		['52', RFBY.cranes[1]],
	]),
}
export const yardSlice = createSlice({
	name: 'yard',
	initialState,
	reducers: {
		updateYard: (state: any) => {
			return state
		},
		getAllBayId: (state: any) => {
			return state
		},
	},
})
export const selectYard = (state: any) => state.yard
export const selectBayIds = (state: any) => state.yard.bayIds
export const { updateYard, getAllBayId } = yardSlice.actions

export default yardSlice.reducer
