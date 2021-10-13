/*
 * @Description:
 * @Version: 2.0
 * @Autor: Shawnneosuen@outlook.com
 * @Date: 2021-10-13 03:17:50
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-10-13 17:30:46
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
} from '@material-ui/core'
import { useAppDispatch, useAppSelector } from 'app/hook'
import { Coil, Command } from 'boot/model'
import MySelect from 'components/MySelect'
import VirtualScrollSelect from 'components/MySelect/VirtualScrollSelect'
import MyTitle from 'components/MyTitle'
import { useStatusContext } from 'context/BasePageStatus'
import React, { useEffect, useState } from 'react'
import { addNewCommand } from 'features/commands/commadSlice'
import { useDispatch } from 'react-redux'

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			padding: theme.spacing(4),
		},
	})
)

const Index = () => {
	const { dialogStatus, setDialogStatus } = useStatusContext()
	const bayIds = useAppSelector((state) => state.yard).bayIds
	const craneIds = useAppSelector((state) => state.yard).craneIds
	const coilNos = useAppSelector((state) => state.coils).coils.map(
		(coil: Coil) => coil.MAT_NO
	)
	const classes = useStyles()
	const commands = useAppSelector((state) => state.commands)
	const dispatch = useAppDispatch()

	const [command, setCommand] = useState<Command>()

	const [commandNo, setCommandNo] = useState<string>(
		'' + Math.round(Math.random() * 1000000)
	)
	const [priority, setPriority] = useState<string>('')
	const [bayNo, setBayNo] = useState<string>('')
	const [craneNo, setCraneNo] = useState<string>('')
	const [coilNo, setCoilNo] = useState<string>('')
	const [status, setStatus] = useState<string>('')
	const [fromStock, setFromStock] = useState<string>('')

	const [toStock, setToStock] = useState<string>('')

	const [pickupFlag, setPickupFlag] = useState<string>('是')

	const onHandleCommandNoChange = (event: {
		target: { value: React.SetStateAction<string> }
	}) => {
		setCommandNo(event.target.value)
	}

	const onHandlePriorityChange = (event: {
		target: { value: React.SetStateAction<string> }
	}) => {
		setPriority(event.target.value)
	}

	const handleBayNoChange = (event: {
		target: { value: React.SetStateAction<string> }
	}) => {
		setBayNo(event.target.value)
	}

	const handleCraneNoChange = (event: {
		target: { value: React.SetStateAction<string> }
	}) => {
		setCraneNo(event.target.value)
	}

	const handleCoilNoChange = (event: {
		target: { value: React.SetStateAction<string> }
	}) => {
		setCoilNo(event.target.value)
	}

	const handleStatusChange = (event: {
		target: { value: React.SetStateAction<string> }
	}) => {
		setStatus(event.target.value)
	}

	const handleFromStockChange = (event: {
		target: { value: React.SetStateAction<string> }
	}) => {
		setFromStock(event.target.value)
	}

	const handleToStockChange = (event: {
		target: { value: React.SetStateAction<string> }
	}) => {
		setToStock(event.target.value)
	}
	const handlePickupChange = (event: {
		target: { value: React.SetStateAction<string> }
	}) => {
		setPickupFlag(event.target.value)
	}

	const handleConfirm = () => {
		if (command) {
			dispatch(addNewCommand(command))
		}
		handleClose()
	}

	const handleClose = () => {
		setDialogStatus(dialogStatus)
	}

	const [open, setOpen] = useState<boolean>(false)

	useEffect(() => {
		console.log('test')

		setOpen(dialogStatus === true)
	}, [dialogStatus])

	useEffect(() => {
		let commandTemp: Command = {
			CommandNo: commandNo,
			Priority: Number.parseInt(priority),
			BayNo: bayNo,
			CraneNo: craneNo,
			CoilNo: coilNo,
			CommandStatus: Number.parseInt(status),
			StartStock: fromStock,
			ToStock: toStock,
			PickupFlag: !!pickupFlag,
			UpdateTime: new Date().toLocaleString(),

			CommandType: '',
		}
		setCommand(commandTemp)
	}, [
		commandNo,
		priority,
		bayNo,
		craneNo,
		coilNo,
		status,
		fromStock,
		toStock,
		pickupFlag,
	])

	return (
		<div>
			<Dialog open={open} maxWidth={'lg'}>
				<Paper style={{ width: '80vh' }} className={classes.root}>
					<MyTitle fontSize={20} value={'创建指令'}></MyTitle>
					<Grid
						container
						spacing={2}
						style={{ height: 500, width: '100%', marginTop: 2 }}
					>
						<Grid item xs={4}>
							{' '}
							<TextField
								fullWidth
								variant='outlined'
								label='指令号'
								value={commandNo}
								disabled
								onChange={onHandleCommandNoChange}
							></TextField>
						</Grid>
						<Grid item xs={4}>
							{' '}
							<TextField
								fullWidth
								variant='outlined'
								label='优先级'
								value={priority}
								type='number'
								onChange={onHandlePriorityChange}
							></TextField>
						</Grid>
						<Grid item xs={4}>
							{' '}
							{/* <TextField
								fullWidth
								variant='outlined'
								label='跨号'
								value={bayNo}
								onChange={handleBayNoChange}
							></TextField> */}
							<MySelect options={bayIds} onSelect={setBayNo}></MySelect>
						</Grid>
						<Grid item xs={4}>
							{' '}
							{/* <TextField
								variant='outlined'
								label='行车号'
								value={craneNo}
								onChange={handleCraneNoChange}
							></TextField> */}
							<MySelect options={craneIds} onSelect={setCraneNo}></MySelect>
						</Grid>
						<Grid item xs={4}>
							{' '}
							<VirtualScrollSelect
								label={'钢卷号'}
								options={coilNos}
								placeholder={'钢卷号'}
								onSelect={setCoilNo}
							></VirtualScrollSelect>
						</Grid>
						<Grid item xs={4}>
							{' '}
							<TextField
								fullWidth
								variant='outlined'
								label={'指令状态'}
								value={status}
								onChange={handleStatusChange}
							></TextField>
						</Grid>
						<Grid item xs={4}>
							{' '}
							<TextField
								variant='outlined'
								fullWidth
								label='起始库位'
								value={fromStock}
								onChange={handleFromStockChange}
							></TextField>
						</Grid>{' '}
						<Grid item xs={4}>
							{' '}
							<TextField
								fullWidth
								variant='outlined'
								label='卸下库位'
								value={toStock}
								onChange={handleToStockChange}
							></TextField>
						</Grid>
						<Grid item xs={4}>
							{' '}
							<TextField
								fullWidth
								variant='outlined'
								label='可吊起标志'
								value={pickupFlag}
								onChange={handlePickupChange}
							></TextField>
						</Grid>
					</Grid>
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
