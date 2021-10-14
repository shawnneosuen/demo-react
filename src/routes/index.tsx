/*
 * @Author: your name
 * @Date: 2021-08-23 13:20:23
 * @LastEditTime: 2021-10-14 15:41:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /demo-react/src/routes/index.tsx
 */
import * as React from 'react'
import TerminalProduct from 'pages/terminal-product'
import YardMonitor from 'pages/yard-monitor'
import WMSLogin from 'pages/wms-login'
import TerminalCrane from 'pages/terminal-crane'
import ZoneMonitor from 'pages/zone-monitor'
import CraneCommands from 'pages/crane-commands'
import EquipmentCommands from 'pages/commands-equipment'

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
			path: '/login',
			main: <WMSLogin />,
		},
		{
			path: '/zone-detail/:id',
			main: <ZoneMonitor />,
		},

		{
			path: '/crane-commands',
			main: <CraneCommands />,
		},
		{
			path: '/equipment-commands',
			main: <EquipmentCommands />,
		},
	]
}
export default Routers
