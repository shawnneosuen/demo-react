/*
 * @Author: your name
 * @Date: 2021-10-02 00:53:13
 * @LastEditTime: 2021-10-04 08:49:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /demo-react/src/pages/wms-login/index.tsx
 */

import {
	Button,
	Card,
	createStyles,
	createTheme,
	Input,
	makeStyles,
	TextField,
	Theme,
	ThemeProvider,
	Typography,
} from '@material-ui/core'
import { AgPickerField } from 'ag-grid-community/dist/lib/widgets/agPickerField'
import { useAuthContext } from 'auth-content/BasePageStatus'
import { query } from 'boot/api'
import { User } from 'pages/yard-monitor/model'
import React, { ChangeEventHandler, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import * as fs from 'fs'
import { UserComponentFactory } from 'ag-grid-community'

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		LoginPage: {
			width: '50%',
			display: 'flex',
			margin: 'auto',
		},
		LoginCard: {
			marginTop: '20%',
			margin: 'auto',
			padding: theme.spacing(10),
			border: '1px solid #e0e0e0',
			'& .MuiTextField-root': {
				marginTop: theme.spacing(3),
			},
			'& .MuiButton-root': {
				marginTop: theme.spacing(5),
			},
		},
		LoginButton: {
			backgroundColor: '#3576CB',
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
	const [username, setUsername] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [role, setRole] = useState()
	const sqlRef = useRef('')

	const onUsernameChange = (event: {
		target: { value: React.SetStateAction<string> }
	}) => {
		setUsername(event.target.value)
	}
	const onPasswordChange = (event: {
		target: { value: React.SetStateAction<string> }
	}) => {
		setPassword(event.target.value)
	}
	const navigate = useNavigate()

	const { auth, setAuth } = useAuthContext()

	useEffect(() => {
		sqlRef.current = `select ID, PASSWORD, ROLE from UACS_WEB_USER where ID = '${username}' and PASSWORD = '${password}'`
	}, [username, password])

	const onHandleClick = async () => {
		let result = await query(sqlRef.current)
		let user: User = {
			username: result.data[0][0],
			password: result.data[0][1],
			role: result.data[0][2],
		}
		setAuth(user)
		localStorage.setItem('userConfig', JSON.stringify(user))
		navigate('/')
	}

	return (
		<div>
			<div className={classes.LoginPage}>
				<Card className={classes.LoginCard}>
					<Typography variant='caption'>
						开发账号：dev, 管理员账号: admin
					</Typography>
					<TextField
						variant={'outlined'}
						fullWidth
						placeholder={'用户名'}
						defaultValue={username}
						onChange={onUsernameChange}
					></TextField>
					<TextField
						variant={'outlined'}
						fullWidth
						type={'password'}
						placeholder={'密码'}
						defaultValue={password}
						onChange={onPasswordChange}
					></TextField>
					<ThemeProvider theme={theme}>
						<Button
							variant={'contained'}
							color={'primary'}
							fullWidth
							onClick={onHandleClick}
						>
							LOGIN
						</Button>
					</ThemeProvider>
				</Card>
			</div>
		</div>
	)
}
export default Index