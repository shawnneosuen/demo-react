/*
 * @Author: your name
 * @Date: 2021-10-06 10:05:20
 * @LastEditTime: 2021-10-19 13:11:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /demo-react/src/pages/terminal-product/index.tsx
 */

import {
	createTheme,
	Theme,
	createStyles,
	makeStyles,
	Paper,
	Toolbar,
	Typography,
	Button,
	Grid,
} from '@material-ui/core'
import Table from 'pages/terminal-product/components/Table'
import React, { useState } from 'react'
import SearchPanel from './components/SearchPanel'

const theme = createTheme({
	palette: {
		primary: {
			main: '#3576CB',
		},
	},
})

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			paddingLeft: theme.spacing(3),
			paddingRight: theme.spacing(3),
		},
		page: {
			padding: theme.spacing(2),
		},

		tablePanel: {
			height: '75vh',
		},
	})
)

const Index = () => {
	const classes = useStyles()

	const [filterCondition, setFilterCondition] = useState<string>()
	return (
		<div className={classes.root}>
			<Paper className={classes.page}>
				<Grid container>
					{' '}
					<Grid item xs={11}>
						<Typography variant={'h4'} style={{ marginBottom: 6 }}>
							钢卷信息
						</Typography>
					</Grid>
					<Grid item xs={1} style={{ display: 'flex', justifyContent: 'end' }}>
						<div>
							<Button variant={'contained'} size={'small'} color={'primary'}>
								修改
							</Button>
						</div>
					</Grid>
				</Grid>

				<SearchPanel onSetFilter={setFilterCondition}></SearchPanel>
				<div className={classes.tablePanel}>
					{' '}
					<Table filterValue={filterCondition}></Table>
				</div>
			</Paper>
		</div>
	)
}

export default Index
