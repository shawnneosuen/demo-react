/*
 * @Author: your name
 * @Date: 2021-10-06 12:58:52
 * @LastEditTime: 2021-10-08 10:12:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /demo-react/src/pages/terminal-crane/index.tsx
 */
import {
	Button,
	createStyles,
	createTheme,
	Grid,
	makeStyles,
	Theme,
	ThemeProvider,
} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDebounce } from 'utils'
import MarkupTables from './components/MarkupTables'
import Table from './components/Table'

const useStyle = makeStyles((theme: Theme) =>
	createStyles({
		page: {
			paddingLeft: theme.spacing(3),
			paddingRight: theme.spacing(3),
		},
		topPanel: {
			flexGrow: 1,
		},
		table: {
			marginTop: 10,
			height: '50%',
		},
		footPanel: {
			width: '100%',
		},
	})
)

const theme = createTheme({
	palette: {
		primary: {
			main: '#3576CB',
		},
	},
})

const Index = () => {
	const classes = useStyle()
	return (
		<div className={classes.page}>
			<ThemeProvider theme={theme}>
				<Grid container className={classes.topPanel}>
					<Grid item xs={8}>
						{' '}
						<MarkupTables></MarkupTables>{' '}
					</Grid>
					<Grid item xs={3}>
						<ActionPanel />
					</Grid>
					<Grid item xs={1}>
						{' '}
						<DatePanel></DatePanel>
					</Grid>
				</Grid>
				<div className={classes.table}>
					<Table></Table>
				</div>
				<div className={classes.footPanel}>
					<FootPanel></FootPanel>
				</div>
			</ThemeProvider>
		</div>
	)
}

export default Index

const DatePanel = () => {
	const [date, setDate] = useState<string>()
	const debounceParam = useDebounce(date, 1000)
	useEffect(() => {
		setDate(new Date().toLocaleString())
	}, [debounceParam])

	return <div>{date}</div>
}

const ActionPanel = () => {
	return (
		<div>
			<div>{'任务分类'}</div>
		</div>
	)
}

const useFootPanelStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			marginTop: 20,
			display: 'flex',
			flexGrow: 1,
			justifyContent: 'right',
			alignItems: 'right',
		},
	})
)
const FootPanel = () => {
	const classes = useFootPanelStyles()
	return (
		<div className={classes.root} style={{ flexGrow: 1 }}>
			<Button
				variant='contained'
				color={'primary'}
				size={'large'}
				style={{ margin: 2 }}
			>
				吊起完成
			</Button>
			<Button
				variant='contained'
				color={'primary'}
				size={'large'}
				style={{ margin: 2 }}
			>
				卸下完成
			</Button>
			<Button
				variant='contained'
				color={'primary'}
				size={'large'}
				style={{ margin: 2 }}
			>
				强起完成
			</Button>
			<Button
				variant='contained'
				color={'primary'}
				size={'large'}
				style={{ margin: 2 }}
			>
				强卸完成
			</Button>
		</div>
	)
}
