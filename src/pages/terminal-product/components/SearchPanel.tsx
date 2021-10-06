/*
 * @Author: your name
 * @Date: 2021-10-06 10:22:05
 * @LastEditTime: 2021-10-06 12:54:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /demo-react/src/pages/terminal-product/components/SearchPanel.tsx
 */
import { Box, Button, createTheme, TextField, Theme } from '@material-ui/core'
import { createStyles, makeStyles, ThemeProvider } from '@material-ui/styles'
import React from 'react'

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		SearchPanel: {
			display: 'flex',
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
	const classes = useStyles()
	return (
		<div style={{ marginBottom: 20 }}>
			<ThemeProvider theme={theme}>
				<Box className={classes.SearchPanel}>
					<Button size='small' variant='outlined' color='primary'>
						刷新
					</Button>
					<TextField
						fullWidth
						variant='outlined'
						size='small'
						placeholder='COIL'
						style={{ marginLeft: 10 }}
					></TextField>
				</Box>
			</ThemeProvider>
		</div>
	)
}

export default Index
