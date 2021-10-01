/*
 * @Author: your name
 * @Date: 2021-10-02 01:23:37
 * @LastEditTime: 2021-10-02 01:57:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /demo-react/src/auth-content/BasePageStatus.tsx
 */
import React, { ReactNode, useState } from 'react'
import * as action from './Action'

const AuthContext = React.createContext<
	| {
			auth: boolean | null
			setAuth: (auth: boolean | null) => Promise<void>
			getAuth: (auth: boolean) => Promise<boolean>
	  }
	| undefined
>(undefined)
AuthContext.displayName = 'AutoContext'

export const BaseStatusProvider = ({ children }: { children: ReactNode }) => {
	const [auth, setAu] = useState<boolean | null>(null)

	const setAuth = (auth: boolean | null) =>
		action.setLoginAuth(auth).then(setAu)
	const getAuth = (auth: boolean) => action.getAuth(auth)

	return (
		<AuthContext.Provider
			children={children}
			value={{ auth, setAuth, getAuth }}
		/>
	)
}

export const useAuthContext = () => {
	const context = React.useContext(AuthContext)
	if (!context) {
		throw new Error('useAuthContext Error! ')
	}
	return context
}
