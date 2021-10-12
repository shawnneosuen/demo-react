/*
 * @Description:
 * @Version: 2.0
 * @Autor: Shawnneosuen@outlook.com
 * @Date: 2021-09-08 20:26:28
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-10-12 16:24:16
 */
import { Command } from 'components/ContextMenu/models'
import React, { ReactNode, useState } from 'react'
import * as action from './Action'
import { FilterCondition } from './model'

const TableContext = React.createContext<
	| {
			filter: FilterCondition | null
			setFilterConditon: (filter: FilterCondition | null) => Promise<void>
			getFilterCondifion: (filter: FilterCondition) => Promise<FilterCondition>
	  }
	| undefined
>(undefined)
TableContext.displayName = 'TableContext'

export const TableStatusProvider = ({ children }: { children: ReactNode }) => {
	const [filter, setFilter] = useState<FilterCondition | null>(null)

	const setFilterConditon = (filter: FilterCondition | null) =>
		action.setFilterConditon(filter).then((value: any) => {
			setFilter(value)
			console.log(value)
		})

	const getFilterCondifion = (filter: FilterCondition) =>
		action.getFilterCondifion(filter)

	const value = {
		filter,
		setFilterConditon,
		getFilterCondifion,
	}
	return <TableContext.Provider children={children} value={value} />
}

export const useTabelStatusContext = () => {
	const context = React.useContext(TableContext)
	if (!context) {
		throw new Error('useTabelStatusContext Error! ')
	}
	return context
}
