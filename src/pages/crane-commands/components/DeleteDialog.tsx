/*
 * @Description:
 * @Version: 2.0
 * @Autor: Shawnneosuen@outlook.com
 * @Date: 2021-10-13 03:17:50
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-10-14 13:49:17
 */

import {
	Button,
	createStyles,
	Dialog,
	DialogActions,
	Grid,
	makeStyles,
	Paper,
	TextField,
	Theme,
	Typography,
} from '@material-ui/core'
import { useAppDispatch, useAppSelector } from 'app/hook'
import { Coil, Command, Commands } from 'boot/model'
import MySelect from 'components/MySelect'
import VirtualScrollSelect from 'components/MySelect/VirtualScrollSelect'
import MyTitle from 'components/MyTitle'
import { useStatusContext } from 'context/BasePageStatus'
import React, { useEffect, useState } from 'react'
import {
	addNewCommand,
	updateCommand,
	deleteCommand,
} from 'features/commands/commadSlice'

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			padding: theme.spacing(2),
		},
	})
)
interface Props {
	selectedData?: Command[]
}
const Index = ({ selectedData }: Props) => {
	const { deleteDialogStatus, setDeleteDialogStatus } = useStatusContext()
	const classes = useStyles()
	const dispatch = useAppDispatch()

	const handleConfirm = () => {
		if (selectedData) {
			dispatch(deleteCommand(selectedData[0]))
		}

		handleClose()
	}

	const handleClose = () => {
		setDeleteDialogStatus(deleteDialogStatus)
	}

	const [open, setOpen] = useState<boolean>(false)

	useEffect(() => {
		setOpen(deleteDialogStatus === true)
	}, [deleteDialogStatus])

	return (
		<div>
			<Dialog open={open} className={classes.root}>
				<Paper style={{ width: '100%' }} className={classes.root}>
					<MyTitle fontSize={20} value={'删除指令'}></MyTitle>
					<Typography>是否确认删除？</Typography>
					<DialogActions>
						<Button onClick={handleConfirm}>确定</Button>
						<Button onClick={handleClose}>取消</Button>
					</DialogActions>
				</Paper>
			</Dialog>
		</div>
	)
}

export default Index
