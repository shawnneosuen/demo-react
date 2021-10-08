/*
 * @Description:
 * @Version: 2.0
 * @Autor: Shawnneosuen@outlook.com
 * @Date: 2021-09-08 20:26:28
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-10-08 15:52:20
 */
import {
	createStyles,
	FormControlLabel,
	Grid,
	makeStyles,
	Switch,
	Theme,
} from '@material-ui/core'
import { store } from 'app/store'
import React, { useState } from 'react'
import { Provider, useSelector } from 'react-redux'
import { selectYard, selectBayIds } from '../../store/yardSlice'
import YardMap from './YardMap'
import BarChart from './components/charts/BarChart'
import OperHistory from './components/OperHistory'
import CraneCard from 'pages/yard-monitor/components/CraneCard'
import PieChart from './components/charts/PieChart'
import CraneMove from './action/CraneMove'
// import EspecialBay from './EspecialBay'

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		Header: {
			width: '100vh',
		},
		page: {
			paddingTop: theme.spacing(2),
			paddingBottom: theme.spacing(10),
			overflow: 'hidden',
		},
		CraneCards: {
			paddingBottom: 20,
			alignItems: 'center',
			textAlign: 'center',
			whiteSpace: 'nowrap',
			overflowX: 'scroll',
			overflowY: 'hidden',
			display: 'flex',
		},
		CraneCardDisplayAll: {
			paddingBottom: 20,
			alignItems: 'center',
			textAlign: 'center',
			display: 'flex',
		},
		chartsArea: {
			marginTop: '10vh',
			display: 'flex',
		},
		GridStyle: {
			flexGrow: 1,
		},
		bayStyle: {
			border: '1px solid grey',
		},
	})
)

const Index = () => {
	return (
		<Provider store={store}>
			<GetYard />
		</Provider>
	)
}
const GetYard = () => {
	const cranes = useSelector(selectYard).cranes

	const craneIds = useSelector(selectYard).craneIds

	const [check, setCheck] = useState<boolean>(false)
	const baseHeight = 180
	const baseWidth = 1900
	const classes = useStyles()
	const bayIds = useSelector(selectBayIds)

	const onToggleCheck = () => {
		setCheck(!check)
	}

	return (
		<div className={classes.page}>
			<FormControlLabel
				control={<Switch checked={check} onChange={onToggleCheck} />}
				label='显示所有行车信息'
			/>
			{check ? (
				<div>
					<div className={classes.CraneCardDisplayAll}>
						{craneIds
							.filter((craneId: string) => craneIds.indexOf(craneId) < 7)
							.map((craneId: string) => (
								<CraneCard
									value={cranes.get(craneId)}
									style={{ marginLeft: 4 }}
									key={craneId}
								/>
							))}
					</div>
					<div className={classes.CraneCardDisplayAll}>
						{craneIds
							.filter((craneId: string) => craneIds.indexOf(craneId) >= 7)
							.map((craneId: string) => (
								<CraneCard
									value={cranes.get(craneId)}
									style={{ marginLeft: 4 }}
									key={craneId}
								/>
							))}
					</div>
				</div>
			) : (
				<div className={classes.CraneCards}>
					{craneIds.map((craneId: string) => (
						<CraneCard
							value={cranes.get(craneId)}
							style={{ marginLeft: 4 }}
							key={craneId}
						/>
					))}
				</div>
			)}

			{bayIds
				// .filter((bayId: string) => !['RFBY', 'RFFY'].includes(bayId))
				.map((bayId: string) => {
					return (
						<div
							style={{ width: baseWidth + 'px', height: baseHeight + 'px' }}
							key={bayId}
							className={classes.bayStyle}
						>
							<YardMap
								bayId={bayId}
								key={bayId}
								baseHeight={baseHeight}
								baseWidth={baseWidth}
							></YardMap>
						</div>
					)
				})}
			<div className={classes.chartsArea}>
				<Grid container className={classes.GridStyle}>
					<Grid item xs={3}>
						{' '}
						<BarChart />
					</Grid>
					<Grid item xs={3}>
						{' '}
						<PieChart />
					</Grid>
					<Grid item xs={6}>
						{' '}
						<OperHistory style={{ height: 500, width: 800, marginRight: 0 }} />
					</Grid>
				</Grid>
			</div>
			<CraneMove></CraneMove>
		</div>
	)
}
export default Index
