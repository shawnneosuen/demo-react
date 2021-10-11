/*
 * @Author: your name
 * @Date: 2021-10-11 17:19:16
 * @LastEditTime: 2021-10-11 17:26:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /demo-react/src/components/Title/index.tsx
 */

import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core'
import React from 'react'

interface Props {
	value?: string
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			color: 'grey',
		},
		text: {
			fontSize: 4,
		},
	})
)
const Index = ({ value }: Props) => {
	const classes = useStyles()
	return (
		<div className={classes.root}>
			<Typography className={classes.text}>{value}</Typography>
		</div>
	)
}

export default Index
