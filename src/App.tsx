/*
 * @Description:
 * @Version: 2.0
 * @Autor: Shawnneosuen@outlook.com
 * @Date: 2021-09-08 20:26:28
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-10-02 09:31:21
 */
import React, { useEffect, useState } from 'react'
import { CssBaseline, Toolbar, Card } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

import { Routes, Route, useNavigate, Navigate, RouteProps } from 'react-router'
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

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		MainPage: {
			backgroundColor: '#F0F0F0',
			height: '100vh',
		},
	})
)

export default function ClippedDrawer() {
	const classes = useStyles()
	const { auth, setAuth } = useAuthContext()
	const navigate = useNavigate()
	return (
		<div>
			<Provider store={store}>
				<CssBaseline />
				<Header />
				<Toolbar />
				<DrawerContent open={false} />
				<main>
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
					<ContextMenu></ContextMenu>
				</main>
			</Provider>
		</div>
	)
}
