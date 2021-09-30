import { createSlice } from '@reduxjs/toolkit'
import { Yard } from '../pages/yard-monitor/model'
import LY from './LY'
import PY from './PY'
import ZY from './ZY'

const initialState: Yard = {
	bayIds: ['PY', 'ZY', 'LY'],
	bays: new Map([
		['LY', LY],
		['PY', PY],
		['ZY', ZY],
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
