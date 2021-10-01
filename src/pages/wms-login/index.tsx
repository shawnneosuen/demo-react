/*
 * @Author: your name
 * @Date: 2021-10-02 00:53:13
 * @LastEditTime: 2021-10-02 02:18:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /demo-react/src/pages/wms-login/index.tsx
 */

import { Button } from '@material-ui/core'
import { useAuthContext } from 'auth-content/BasePageStatus'
import React from 'react'

const Index = () => {
	const { auth, setAuth } = useAuthContext()
	return (
		<div>
			<Button
				onClick={() => {
					setAuth(true)
				}}
			>
				cilck
			</Button>
		</div>
	)
}
export default Index
