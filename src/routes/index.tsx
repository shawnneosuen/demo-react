/*
 * @Author: your name
 * @Date: 2021-08-23 13:20:23
 * @LastEditTime: 2021-10-02 02:26:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /demo-react/src/routes/index.tsx
 */
import * as React from 'react'
import TerminalProduct from '../layouts/terminal-product'
import Home from '../pages/Home'
import ThreeDimension from 'pages/three-dimension'
import Design from 'pages/settings/design'
import YardMonitor from 'pages/yard-monitor'
import WMSLogin from 'pages/wms-login'

const Routers = () => {
	return [
		{
			path: '/',
			main: <YardMonitor />,
		},

		{
			path: '/terminal-product',
			main: <TerminalProduct />,
		},
		{
			path: '/three-dimension',
			main: <ThreeDimension />,
		},
		{
			path: '/setting/design',
			main: <Design />,
		},
		{
			path: '/login',
			main: <WMSLogin />,
		},
	]
}
export default Routers
