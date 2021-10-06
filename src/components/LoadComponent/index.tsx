/*
 * @Author: your name
 * @Date: 2021-10-04 00:33:04
 * @LastEditTime: 2021-10-04 00:41:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /demo-react/src/components/LoadComponent/index.tsx
 */

import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'flex',
			'& > * + *': {
				marginLeft: theme.spacing(2),
			},
		},
	})
)

const Index = () => {
	const classes = useStyles()

	return (
		<div className={classes.root}>
			<CircularProgress />
		</div>
	)
}

export default Index
