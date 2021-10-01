/*
 * @Author: your name
 * @Date: 2021-10-02 01:23:37
 * @LastEditTime: 2021-10-02 01:54:13
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /demo-react/src/auth-content/index.tsx
 */
import React, { ReactNode } from 'react'
import { BaseStatusProvider } from './BasePageStatus'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	return <BaseStatusProvider>{children}</BaseStatusProvider>
}
