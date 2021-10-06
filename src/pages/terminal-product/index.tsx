/*
 * @Author: your name
 * @Date: 2021-10-06 10:05:20
 * @LastEditTime: 2021-10-06 10:26:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /demo-react/src/pages/terminal-product/index.tsx
 */

import {
	Box,
	Button,
	createTheme,
	Input,
	TextField,
	Theme,
	ThemeProvider,
} from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/styles'
import Table from 'pages/terminal-product/components/Table'
import React from 'react'
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
		Page: {
			margin: 30,
		},
	})
)

const Index = () => {
	const classes = useStyles()
	return (
		<div className={classes.Page}>
			<SearchPanel></SearchPanel>
			<Table></Table>
		</div>
	)
}

export default Index
