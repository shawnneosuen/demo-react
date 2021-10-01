/*
 * @Author: your name
 * @Date: 2021-09-15 13:42:05
 * @LastEditTime: 2021-10-01 23:06:10
 * @LastEditors: Please set LastEditors
 * @Description: 行车相关信息展示
 * @FilePath: /demo-react/src/pages/yard-monitor/components/CraneCard/index.tsx
 */
import {
	Box,
	Button,
	ButtonGroup,
	Card,
	createStyles,
	Icon,
	makeStyles,
	Theme,
	Typography,
} from '@material-ui/core'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import MyDivider from 'components/MyDivider'
import { Crane } from 'pages/yard-monitor/model'
import React from 'react'

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		CraneCard: {
			width: 229,
			textAlign: 'center',
			border: '1px solid #B0B0B0',
			fontSize: '10px',
		},
		DivideLine: {
			height: 1,
			width: '100%',
			backgroundColor: '#e0e0e0',
		},
		ButtonGroup: {
			height: 20,
			width: '100%',
			display: 'flex',
		},
		Button: {
			fontSize: '10px',
			color: 'black',
			marginLeft: '0',
			hover: 'grey',
		},
	})
)

interface Props {
	value: Crane
	style?: Object
}

const Index = ({ value, style }: Props) => {
	const classes = useStyles()
	return (
		<div>
			<Card className={classes.CraneCard} style={style}>
				<div>{value?.id}</div>
				<div v-if='faultCode !== 0'></div>
				<div>任务状态:</div>
				<div>WMS报警:</div>

				<div className={classes.DivideLine}></div>
				<div className={classes.ButtonGroup}>
					<ButtonGroup
						variant={'text'}
						size={'small'}
						aria-label='small text button group'
					>
						<Button size={'small'} className={classes.Button}>
							自动
						</Button>
						<Button size={'small'} className={classes.Button}>
							手动
						</Button>
						<Button size={'small'} className={classes.Button}>
							半自动
						</Button>
						<Button size={'small'} className={classes.Button}>
							离线
						</Button>
						<Button
							size='small'
							className={classes.Button}
							endIcon={<ArrowDropDownIcon fontSize='small' />}
						>
							更多
						</Button>
					</ButtonGroup>
				</div>
			</Card>
		</div>
	)
}

export default Index
