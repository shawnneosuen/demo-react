/*
 * @Author: your name
 * @Date: 2021-10-11 09:51:48
 * @LastEditTime: 2021-10-11 17:10:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /demo-react/src/pages/crane-commands/index.tsx
 */

import { createStyles, makeStyles, Paper, Theme } from '@material-ui/core'
import CommandPanel from './components/CommandPanel'
import React from 'react'

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
	})
)

const Index = () => {
	const classes = useStyles()
	return (
		<div className={classes.root}>
			<Paper className={classes.page}>
				<div className={classes.commandPanel}>
					<CommandPanel></CommandPanel>
				</div>
			</Paper>
		</div>
	)
}

export default Index
