/*
 * @Author: your name
 * @Date: 2021-09-30 20:37:14
 * @LastEditTime: 2021-10-12 02:01:04
 * @LastEditors: Shawnneosuen@outlook.com
 * @Description: In User Settings Edit
 * @FilePath: /demo-react/src/store/yardSlice.ts
 */
import { createNextState, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Crane, Yard, Zone } from '../../boot/model'
import DCLY from './DCLY'
import NY from './NY'
import RFBY from './RFBY'
import RFFY from './RFFY'
import RMY from './RMY'
const initialState: Yard = {
	bayIds: ['RFBY', 'RFFY', 'DCLY', 'RMY', 'NY'],
	bays: [
		RFBY,
		RFFY,
		DCLY,
		RMY,
		NY,
	],
	craneIds: ['11', '12', '21', '22', '23', '32', '43', '44', '51', '52'],
	cranes:[
	NY.cranes[0],
	NY.cranes[1],
	RMY.cranes[0],
	RMY.cranes[1],
	RMY.cranes[2],
	DCLY.cranes[0],
	RFFY.cranes[0],
	RFFY.cranes[1],
	RFBY.cranes[0],
	RFBY.cranes[1]
]
}
export const yardSlice = createSlice({
	name: 'yard',
	initialState,
	reducers: {
		updateYard: (state=initialState) => {
			return state
		},
		getAllBayId: (state=initialState) => {
			return state
		},
		updateCrane: (state=initialState,action :PayloadAction<Crane>) => {
			let strState = JSON.stringify(state)
			let stateClone = JSON.parse(strState)
			let index = stateClone.craneIds.indexOf(action.payload.id)
			let crane = stateClone.cranes[index]
			if (crane)
			{
				crane.left = action.payload.left
			}
			stateClone.cranes[index] = crane
		
			
			return stateClone
		
			
		},
	},
})
export const selectYard = (state: any) => state.yard
export const selectBayIds = (state: any) => state.yard.bayIds
export const { updateYard, getAllBayId, updateCrane } = yardSlice.actions

export default yardSlice.reducer
