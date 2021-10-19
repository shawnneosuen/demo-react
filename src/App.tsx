/*
 * @Description:
 * @Version: 2.0
 * @Autor: Shawnneosuen@outlook.com
 * @Date: 2021-09-08 20:26:28
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-10-19 12:04:24
 */
import React, { useEffect } from 'react'
import { CssBaseline, Toolbar } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

import { Routes, Route } from 'react-router'
import './App.css'

import Header from './components/Header'
import DrawerContent from './components/DrawerContent'
import RouterConfig from './routes'

import { Provider } from 'react-redux'
import { store } from 'app/store'
import ContextMenu from 'components/ContextMenu'
import WMSLogin from 'pages/wms-login'
import { useAuthContext } from 'auth-content/BasePageStatus'
import { PrivateRoute } from 'routes/PrivateRoute'
import NotFound from 'pages/Error'
import LoadComponent from 'components/LoadComponent'
import { useStatusContext } from 'context/BasePageStatus'
import MySnackbar from './components/MySnackbar'
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		MainPage: {
			height: '100vh',
		},
	})
)

export default function ClippedDrawer() {
	const { auth, setAuth } = useAuthContext()

	useEffect(() => {
		const localAuth = localStorage.getItem('userConfig')
		if (auth) {
			return
		}
		if (localAuth) {
			setAuth(JSON.parse(localAuth))
		}
	})

	const { contextMenuStatus } = useStatusContext()
	return (
		<div>
			<LoadComponent></LoadComponent>
			<Provider store={store}>
				<CssBaseline />
				<Header />

				<DrawerContent open={false} />
				<main style={{ marginTop: 40 }}>
					<Routes>
						{RouterConfig()
							.filter((router) => router.path != '/login')
							.map((router) => (
								<PrivateRoute
									path={router.path}
									element={router.main}
									key={router.path}
								></PrivateRoute>
							))}
						<Route path={'/login'} element={<WMSLogin />}>
							{' '}
						</Route>
						<Route path='*' element={<NotFound />} />
					</Routes>
					<ContextMenu show={contextMenuStatus}></ContextMenu>
					<MySnackbar></MySnackbar>
				</main>
			</Provider>
		</div>
	)
}
