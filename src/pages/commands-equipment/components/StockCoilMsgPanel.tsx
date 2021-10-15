/*
 * @Author: your name
 * @Date: 2021-10-15 14:53:06
 * @LastEditTime: 2021-10-15 16:29:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /demo-react/src/pages/commands-equipment/components/StockCoilMsgPanel.tsx
 */

import {
	createStyles,
	Grid,
	makeStyles,
	Theme,
	Tooltip,
	Typography,
} from '@material-ui/core'
import MyTitle from 'components/MyTitle'
import React, { ReactNode } from 'react'

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			border: '1px solid grey',
			alignItems: 'center',
			flexGrow: 1,
			textAlign: 'center',
		},
	})
)

const Index = () => {
	const classes = useStyles()
	const coilInStock = useCoilModel()

	return (
		<div>
			<Grid container className={classes.root}>
				<Grid item xs={12}>
					<MyTitle value={'4号机组'}></MyTitle>
				</Grid>
			</Grid>
			<Grid container spacing={4}>
				<Grid item xs={3}>
					<StockModel label={'RMI1'}>{coilInStock}</StockModel>
				</Grid>
				<Grid item xs={3}>
					<Tooltip
						title={
							<React.Fragment>
								<div>指令：{'--'}</div>
								<div>材料号：{'--'} </div>
								<div> 起吊：{'--'}</div>
								<div>卸下： {'--'}</div>
								<div>动作： {'--'}</div>
								<div>大车位置：{'--'}</div>
								<div>小车位置：{'--'}</div>
							</React.Fragment>
						}
						aria-label='add'
						open={true}
						placement='right-start'
						arrow
					>
						<StockModel></StockModel>
					</Tooltip>
				</Grid>
				<Grid item xs={3}>
					<Tooltip
						title={
							<React.Fragment>
								<div>指令：{'--'}</div>
								<div>材料号：{'--'} </div>
								<div> 起吊：{'--'}</div>
								<div>卸下： {'--'}</div>
								<div>动作： {'--'}</div>
								<div>大车位置：{'--'}</div>
								<div>小车位置：{'--'}</div>
							</React.Fragment>
						}
						aria-label='add'
						open={true}
						placement='right-start'
						arrow
					>
						<StockModel></StockModel>
					</Tooltip>
				</Grid>
			</Grid>
		</div>
	)
}
export default Index

const useStockStyle = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: 152,
			height: 190,
			backgroundColor: 'white',
			border: '1px dashed black',
		},
		label: {},
	})
)
const StockModel = ({
	children,
	label,
}: {
	children?: ReactNode
	label?: string
}) => {
	const classes = useStockStyle()
	return (
		<Tooltip
			title={
				<React.Fragment>
					<div>指令：{'--'}</div>
					<div>材料号：{'--'} </div>
					<div> 起吊：{'--'}</div>
					<div>卸下： {'--'}</div>
					<div>动作： {'--'}</div>
					<div>大车位置：{'--'}</div>
					<div>小车位置：{'--'}</div>
				</React.Fragment>
			}
			aria-label='add'
			open={true}
			placement='right-start'
			arrow
		>
			<div className={classes.root}>
				<div style={{ height: '80%' }}> {children}</div>

				<Typography className={classes.label}>{label}</Typography>
			</div>
		</Tooltip>
	)
}

const useCoilShapeStyle = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: 150,
			height: 150,
			border: '1px solid black',
			borderRadius: '50%',
			backgroundColor: '#c1defd',
			position: 'absolute',
			display: 'flex',
			alignItems: 'center',
			flex: 'center',
			justifyContent: 'center',
		},
		indiaCoil: {
			width: 80,
			height: 80,
			border: '1px solid black',
			borderRadius: '50%',
			backgroundColor: 'white',
		},
	})
)

const useCoilModel = () => {
	const classes = useCoilShapeStyle()
	return (
		<div className={classes.root}>
			<div className={classes.indiaCoil}></div>
		</div>
	)
}
