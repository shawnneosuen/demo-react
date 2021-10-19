/*
 * @Author: your name
 * @Date: 2021-10-06 10:22:05
 * @LastEditTime: 2021-10-19 12:10:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /demo-react/src/pages/terminal-product/components/SearchPanel.tsx
 */
import { Box, Button, createTheme, TextField, Theme } from '@material-ui/core'
import { createStyles, makeStyles, ThemeProvider } from '@material-ui/styles'
import React, { useEffect, useState } from 'react'

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

interface Props {
	onSetFilter?: any
}

const Index = ({ onSetFilter: handleFitler = () => {} }: Props) => {
	const classes = useStyles()

	const [value, setValue] = useState<string>('')
	const handleChange = (event: {
		currentTarget: { value: React.SetStateAction<string> }
	}) => {
		setValue(event.currentTarget.value)
	}
	useEffect(() => {
		handleFitler(value)
	}, [value])
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
						placeholder='钢卷号 ｜ 库位号'
						style={{ marginLeft: 10 }}
						value={value}
						onChange={handleChange}
					></TextField>
				</Box>
			</ThemeProvider>
		</div>
	)
}

export default Index
