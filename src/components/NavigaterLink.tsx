/*
 * @Author: your name
 * @Date: 2021-08-23 11:13:09
 * @LastEditTime: 2021-10-08 13:30:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /demo-react/src/components/NavigaterLink.tsx
 */
import React from 'react'
import { List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core'
import ThreeDRotationIcon from '@material-ui/icons/ThreeDRotation'
import OndemandVideoIcon from '@material-ui/icons/OndemandVideo'
import BrushIcon from '@material-ui/icons/Brush'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'
import DriveEtaIcon from '@material-ui/icons/DriveEta'
import { useNavigate } from 'react-router-dom'
import { useStatusContext } from '../context/BasePageStatus'

const links = [
	{
		icon: <OndemandVideoIcon />,
		title: '主监控',
		path: '/',
	},
	{
		icon: <RadioButtonUncheckedIcon />,
		title: '钢卷信息',
		path: '/terminal-product',
	},
	// {
	// 	icon: <DriveEtaIcon />,
	// 	title: '装载管理',
	// 	path: '/terminal-transport',
	// },
	{
		icon: <DriveEtaIcon />,
		title: '行车画面',
		path: '/terminal-crane',
	},
	// {
	// 	icon: <ThreeDRotationIcon />,
	// 	title: '3D',
	// 	path: '/three-dimension',
	// },
	// {
	// 	icon: <BrushIcon />,
	// 	title: '绘制库图',
	// 	path: '/setting/design',
	// },
]
const NavigaterLink = () => {
	let navigate = useNavigate()
	const { drawerFlag, openCloseDialog } = useStatusContext()
	return (
		<div>
			<List>
				{links.map((link) => (
					<ListItem
						button
						key={link.title}
						onClick={() => {
							navigate(link.path)
							openCloseDialog(drawerFlag).then((r) => r)
						}}
					>
						<ListItemAvatar>{link.icon}</ListItemAvatar>
						<ListItemText primary={link.title}></ListItemText>
					</ListItem>
				))}
			</List>
		</div>
	)
}

export default NavigaterLink
