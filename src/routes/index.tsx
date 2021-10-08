/*
 * @Author: your name
 * @Date: 2021-08-23 13:20:23
 * @LastEditTime: 2021-10-08 11:27:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /demo-react/src/routes/index.tsx
 */
import * as React from 'react'
import TerminalProduct from 'pages/terminal-product'
import ThreeDimension from 'pages/three-dimension'
import Design from 'pages/settings/design'
import YardMonitor from 'pages/yard-monitor'
import WMSLogin from 'pages/wms-login'
import TerminalCrane from 'pages/terminal-crane'
import ZoneMonitor from 'pages/zone-monitor'

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
			path: '/terminal-crane',
			main: <TerminalCrane />,
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
		{
			path: '/zone-detail/:id',
			main: <ZoneMonitor />,
		},
	]
}
export default Routers
