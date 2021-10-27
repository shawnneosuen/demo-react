/*
 * @Author: your name
 * @Date: 2021-10-06 10:05:20
 * @LastEditTime: 2021-10-26 16:43:23
 * @LastEditors: Shawnneosuen@outlook.com
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
	Box,
} from '@material-ui/core'
import { useStatusContext } from 'context/BasePageStatus'
import { DialogModelProps } from 'context/model'
import Table from './components/Table'
import React, { useEffect, useState } from 'react'

import SearchPanel from './components/SearchPanel'
import { FilterCondition, TimeCondition } from './components/Setup'

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
	})
)

const Index = () => {
	const classes = useStyles()
	const [filterCondition, setFilterCondition] = useState<FilterCondition>()
	const [timeCondition, setTimeCondition] = useState<TimeCondition>()
	const [selectedData, setSelectedData] = useState<any>()
	const [open, setOpen] = useState<boolean>()
	const [tableData, setTableData] = useState()

	return (
		<div className={classes.root}>
			<Paper className={classes.page}>
				<Grid
					container
					direction={'column'}
					justifyContent='center'
					alignItems='center'
					style={{ width: '100%' }}
				>
					<Grid
						item
						xs={12}
						style={{
							width: '100%',
							marginLeft: 0,
						}}
					>
						<Typography variant={'h4'} style={{ marginBottom: 6 }}>
							作业实绩
						</Typography>
					</Grid>
				</Grid>
				<Grid item>
					<SearchPanel
						onSetFilter={setFilterCondition}
						onEditAction={() => setOpen(true)}
						disabled={!selectedData || selectedData.length !== 1}
						onTableData={tableData}
						onTimeCondition={setTimeCondition}
					></SearchPanel>
				</Grid>
				<Grid item>
					<Box>
						<Table
							filterValue={filterCondition}
							onSelectedValue={setSelectedData}
							onTableData={setTableData}
							onTimeCondition={timeCondition}
						></Table>
					</Box>
				</Grid>
			</Paper>
		</div>
	)
}

export default Index
