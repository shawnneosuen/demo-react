/*
 * @Author: your name
 * @Date: 2021-10-05 09:20:49
 * @LastEditTime: 2021-10-05 09:22:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /demo-react/src/utils/index.tsx
 */

import React, { useEffect, useState } from 'react'

export const useDebounce = <V,>(value: V, delay?: number) => {
	const [debouncedValue, setDebouncedValue] = useState(value)

	useEffect(() => {
		const timeout = setTimeout(() => setDebouncedValue(value), delay)
		return () => clearTimeout(timeout)
	}, [value, delay])
	return debouncedValue
}
