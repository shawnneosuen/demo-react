/*
 * @Author: your name
 * @Date: 2021-10-11 09:51:48
 * @LastEditTime: 2021-10-13 11:05:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /demo-react/src/pages/crane-commands/index.tsx
 */

import { createStyles, makeStyles, Paper, Theme } from '@material-ui/core'
import CommandPanel from './components/CommandPanel'
import React, { useState } from 'react'
import Table from './components/Table'
import EmergencyButton from './components/EmergencyButton'
import { TableProviders } from './context'
import CreateDialog from './components/CreateDialog'

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: '100%',
			height: '100%',
			paddingLeft: theme.spacing(3),
			paddingRight: theme.spacing(3),
		},
		page: {
			widht: '100%',
			heigth: '100%',
		},
		commandPanel: {
			width: '100%',
			height: '30%',
		},
		tablePanel: {
			borderTop: '1px solid #E0E0E0',
			padding: theme.spacing(2),
		},
		emergencyPanel: {
			display: 'flex',
			justifyContent: 'right',
		},
	})
)

const Index = () => {
	const classes = useStyles()
	const [openDialog, setOpenDialog] = useState<boolean>(false)
	return (
		<div className={classes.root}>
			<TableProviders>
				<Paper className={classes.page}>
					<div className={classes.commandPanel}>
						<CommandPanel></CommandPanel>
					</div>
					<div className={classes.tablePanel}>
						<Table></Table>
					</div>
					<div className={classes.emergencyPanel}>
						<EmergencyButton></EmergencyButton>
					</div>
				</Paper>
			</TableProviders>
			<CreateDialog></CreateDialog>
		</div>
	)
}

export default Index
