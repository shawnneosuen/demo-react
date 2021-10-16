/*
 * @Author: your name
 * @Date: 2021-10-12 11:00:08
 * @LastEditTime: 2021-10-12 11:04:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /demo-react/src/pages/crane-commands/context/index.tsx
 */
import React, { ReactNode } from 'react'
import { TableStatusProvider } from './TableStatus'

export const TableProviders = ({ children }: { children: ReactNode }) => {
	return <TableStatusProvider>{children}</TableStatusProvider>
}
