/*
 * @Description:
 * @Version: 2.0
 * @Autor: Shawnneosuen@outlook.com
 * @Date: 2021-09-08 20:26:28
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-10-02 02:31:55
 */
import React, { useEffect, useState } from 'react'
import { CssBaseline, Toolbar, Card } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { BrowserRouter as Router } from 'react-router-dom'
import { Home } from '@material-ui/icons'
import { Routes, Route, useNavigate, Navigate, RouteProps } from 'react-router'
import logo from './logo.svg'
import './App.css'
import { MainLayout } from 'layouts/MainLayout'
import { Menu, Button, Grid } from '@material-ui/core'

import Header from './components/Header'
import DrawerContent from './components/DrawerContent'
import RouterConfig from './routes'

import { About } from './pages/About'
import { ColorPicker } from './pages/tools/ColorPicker'
import { Tools } from './pages/tools'
import { Provider } from 'react-redux'
import { store } from 'app/store'
import ContextMenu from 'components/ContextMenu'
import WMSLogin from 'pages/wms-login'
import { useAuthContext } from 'auth-content/BasePageStatus'

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

	setAuth(true)
	return (
		<div>
			<Provider store={store}>
				<CssBaseline />
				<Header />
				<Toolbar />
				<Router>
					<DrawerContent open={false} />
					<main className={classes.MainPage}>
						<Routes>
							{RouterConfig().map((router) => (
								<Route
									path={router.path}
									element={router.main}
									key={router.path}
								></Route>
							))}
						</Routes>
						<ContextMenu></ContextMenu>
					</main>
				</Router>
			</Provider>
		</div>
	)
}
