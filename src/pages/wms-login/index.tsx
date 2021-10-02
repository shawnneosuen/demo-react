/*
 * @Author: your name
 * @Date: 2021-10-02 00:53:13
 * @LastEditTime: 2021-10-02 09:33:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /demo-react/src/pages/wms-login/index.tsx
 */

import { Button } from '@material-ui/core'
import { useAuthContext } from 'auth-content/BasePageStatus'
import React from 'react'
import { useNavigate } from 'react-router'

const Index = () => {
	const { auth, setAuth } = useAuthContext()
	const navigate = useNavigate()
	return (
		<div>
			<Button
				onClick={() => {
					setAuth(auth)
				}}
			>
				cilck
			</Button>
		</div>
	)
}
export default Index
