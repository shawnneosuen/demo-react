/*
 * @Author: your name
 * @Date: 2021-10-11 09:53:31
 * @LastEditTime: 2021-10-11 17:25:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /demo-react/src/pages/crane-commands/components/CommandPanel.tsx
 */

import {
	Button,
	createStyles,
	FormControlLabel,
	Grid,
	makeStyles,
	MenuItem,
	Select,
	Switch,
	TextField,
	Theme,
	Typography,
} from '@material-ui/core'
import { useAppSelector } from 'app/hook'
import MySelect from 'components/MySelect'
import MyTitle from 'components/MyTitle'

import React, { useEffect, useRef, useState } from 'react'

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: '100%',
			padding: theme.spacing(2),
		},
	})
)

const Index = () => {
	const classes = useStyles()

	return (
		<div className={classes.root}>
			<Grid container>
				<Grid item xs={3}>
					<MyTitle value={'指令颜色指示'}></MyTitle>
					<CommandExample></CommandExample>
				</Grid>
				<Grid item xs={5}>
					<MyTitle value={'指令筛选'}></MyTitle>
					<CommandFilter />
				</Grid>
				<Grid item xs={4}>
					<MyTitle value={'指令管理'}></MyTitle>
					<ManageCommands />
				</Grid>
			</Grid>
		</div>
	)
}

export default Index

const useCommandPanelStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			paddingLeft: theme.spacing(4),
			paddingRight: theme.spacing(4),
		},
		item: {
			display: 'flex',
		},
	})
)

// 指令颜色指示
const CommandExample = () => {
	const classes = useCommandPanelStyles()
	return (
		<div className={classes.root}>
			<Grid container spacing={5}>
				<Grid item className={classes.item}>
					{' '}
					作业指令 <ColorSquare value='#5583b0' />
				</Grid>
				<Grid item className={classes.item}>
					{' '}
					作业指令 <ColorSquare value={'#98362f'} />
				</Grid>
				<Grid item className={classes.item}>
					{' '}
					作业指令 <ColorSquare value={'#4b8855'} />
				</Grid>
			</Grid>
		</div>
	)
}

interface ColorSqureProps {
	value?: string
	width?: number
	height?: number
}
const ColorSquare = ({
	value = 'red',
	width = 60,
	height = 30,
}: ColorSqureProps) => {
	return (
		<div style={{ backgroundColor: value, width: width, height: height }}></div>
	)
}

//  指令筛选
const CommandFilter = () => {
	const bayIds = useAppSelector((state) => state.yard).bayIds
	const craneIds = useAppSelector((state) => state.yard).craneIds
	const [selectBayId, setSelectBayId] = useState<string>('')
	const [selectOptions, setSelectOptions] = useState<string[]>([])
	const [inputCoilNo, setInputCoilNo] = useState<string>('')

	const changeHandle = (event: React.ChangeEvent<{ value: unknown }>) => {
		setSelectBayId(event.target.value as string)
	}

	const onCoilNoChange = (event: {
		target: { value: React.SetStateAction<string> }
	}) => {
		setInputCoilNo(event.target.value)
	}
	useEffect(() => {
		if (selectBayId) {
		} else {
			setSelectOptions(bayIds)
		}
	}, [selectBayId])

	return (
		<div>
			<Grid container spacing={4}>
				<Grid item xs={3}>
					库区：<MySelect options={bayIds}></MySelect>
				</Grid>
				<Grid item xs={3}>
					作业类型：<MySelect options={bayIds}></MySelect>
				</Grid>
				<Grid item xs={3}>
					行车号：<MySelect options={craneIds}></MySelect>
				</Grid>
			</Grid>
			<Grid container spacing={4}>
				<Grid item xs={3}>
					跨号：
					<MySelect options={bayIds}></MySelect>
				</Grid>
				<Grid item xs={3}>
					指令类型：<MySelect options={bayIds}></MySelect>
				</Grid>
				<Grid item xs={3}>
					材料号：
					<TextField
						variant={'outlined'}
						value={inputCoilNo}
						onChange={onCoilNoChange}
					></TextField>
				</Grid>
			</Grid>
		</div>
	)
}

//  指令管理
const ManageCommands = () => {
	const [autoUpdateFlag, setAutoUpdateFlag] = useState<boolean>(true)
	return (
		<div>
			<Grid container>
				<Grid item xs={4}>
					<FormControlLabel
						control={
							<Switch
								checked={autoUpdateFlag}
								onChange={() => setAutoUpdateFlag(!autoUpdateFlag)}
								name='checkAutoUpdate'
							/>
						}
						label='自动更新'
					/>
				</Grid>
				<Grid item xs={8} spacing={3} container>
					<Grid item>
						<Button size={'large'} variant={'outlined'} color='primary'>
							<Typography style={{ fontSize: '20px' }}>编辑指令</Typography>
						</Button>
					</Grid>
					<Grid item>
						<Button size={'large'} variant={'outlined'} color='primary'>
							<Typography style={{ fontSize: '20px' }}> 刷新指令 </Typography>
						</Button>
					</Grid>
					<Grid item>
						<Button size={'large'} variant={'outlined'} color='primary'>
							<Typography style={{ fontSize: '20px' }}> 生成指令 </Typography>
						</Button>
					</Grid>
					<Grid item>
						<Button size={'large'} variant={'outlined'} color='primary'>
							<Typography style={{ fontSize: '20px' }}> 删除指令 </Typography>
						</Button>
					</Grid>
				</Grid>
			</Grid>
		</div>
	)
}
