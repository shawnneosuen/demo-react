/*
 * @Author: your name
 * @Date: 2021-10-02 07:48:04
 * @LastEditTime: 2021-10-04 08:08:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /demo-react/src/routes/PrivateRoute.tsx
 */
import { useAuthContext } from 'auth-content/BasePageStatus'
import { useSelector } from 'react-redux'
import { Navigate, Route, useLocation } from 'react-router-dom'

interface Props {
	element: React.ReactElement
	path?: string
}

const PrivateElement: React.FC<Props> = ({ element }) => {
	let location = useLocation()
	const { auth, setAuth } = useAuthContext()
	let user = localStorage.getItem('userConfig') ?? ''
	// if (user && !auth) {
	// 	setAuth(user)
	// }

	return user != '' ? (
		element
	) : (
		<Navigate to='/login' state={{ from: location }} />
	)
}

export const PrivateRoute: React.FC<Props> = ({ element, ...rest }) => {
	return <Route {...rest} element={<PrivateElement element={element} />} />
}
