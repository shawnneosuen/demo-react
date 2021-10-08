/*
 * @Author: your name
 * @Date: 2021-10-08 14:41:59
 * @LastEditTime: 2021-10-08 17:22:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /demo-react/src/pages/yard-monitor/action/CraneMove.ts
 */

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectYard, updateCrane } from 'store/yardSlice'
import { Crane } from '../model'

const Index = () => {
	const yard = useSelector(selectYard)
	const [crane51, setCrane51] = useState<Crane>()
	const [crane52, setCrane52] = useState<Crane>()

	const dispatch = useDispatch()

	useEffect(() => {
		setCrane51(yard.cranes.get('51'))
	}, [crane51])

	useEffect(() => {
		setCrane52(yard.cranes.get('52'))
	}, [crane52])
	setInterval(() => {
		if (crane51) {
			dispatch(updateCrane(1000))
		}
	}, 1000)
	return <div></div>
}

export default Index
