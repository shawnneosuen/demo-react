/*
 * @Author: your name
 * @Date: 2021-10-06 10:22:05
 * @LastEditTime: 2021-10-26 16:50:18
 * @LastEditors: Shawnneosuen@outlook.com
 * @Description: In User Settings Edit
 * @FilePath: /demo-react/src/pages/terminal-product/components/SearchPanel.tsx
 */
import {
	Box,
	Button,
	createTheme,
	Grid,
	TextField,
	Theme,
} from '@material-ui/core'
import { createStyles, makeStyles, ThemeProvider } from '@material-ui/styles'
import { useAppSelector } from 'app/hook'
import { CraneHistoryModel } from 'boot/model'
import { handleExportAll } from 'boot/utils/exportData'
import { commandCodes, CommandMapping } from 'boot/utils/mapping'
import MyDateComponent from 'components/MyDateComponent'
import MyDivider from 'components/MyDivider'
import MyInputText from 'components/MyInputText'
import MySelect from 'components/MySelect'
import MyTitle from 'components/MyTitle'
import moment from 'moment'
import { setFilterConditon } from 'pages/crane-commands/context/Action'
import React, { useEffect, useState } from 'react'
import { columns, FilterCondition, TimeCondition } from './Setup'

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
	disabled?: boolean
	onEditAction?: any
	onTableData?: CraneHistoryModel[]
	onTimeCondition?: any
}

const Index = ({
	onSetFilter: handleFitler = () => {},
	disabled,
	onEditAction: handleAction = () => {},
	onTableData,
	onTimeCondition: handleTimeCondition = () => {},
}: Props) => {
	const classes = useStyles()

	const [value, setValue] = useState<FilterCondition>()

	const [coilNo, setCoilNo] = useState<string>('')
	const craneIds = useAppSelector((state) => state.yard).craneIds

	const [craneNo, setCraneNo] = useState<string>()
	const [commandType, setCommandType] = useState<string>()

	const [forwardTimeCondition, setForwardTimeCondition] = useState<string>(
		moment(new Date().valueOf() - 24 * 60 * 60 * 1000).format(
			'YYYY-MM-DDTHH:mm'
		)
	)
	const [rearTimeCondition, setRearTimeCondition] = useState<string>(
		moment(new Date()).format('YYYY-MM-DDTHH:mm')
	)

	useEffect(() => {
		let filterCondition: FilterCondition = {
			craneNo: craneNo ?? '',
			commandCode: commandType ?? '',
			coilNo: coilNo ?? '',
		}
		setValue(filterCondition)
	}, [coilNo, craneNo, commandType])

	useEffect(() => {
		handleFitler(value)
	}, [value])

	useEffect(() => {
		console.log('test')
		console.log(forwardTimeCondition)
		console.log(rearTimeCondition)

		handleTimeCondition({
			forwardTime: forwardTimeCondition,
			rearTime: rearTimeCondition,
		})
	}, [forwardTimeCondition, rearTimeCondition])
	return (
		<div style={{ marginBottom: 20 }}>
			<ThemeProvider theme={theme}>
				<Grid container spacing={2}>
					{/* ???????????? */}
					<Grid item xs={3} style={{ border: '1px dashed lightgrey' }}>
						<MyTitle value={'????????????'}></MyTitle>
						<MyDateComponent
							label={'????????????'}
							defaultValue={forwardTimeCondition}
							onConfirmed={setForwardTimeCondition}
						/>
						<MyDateComponent
							label={'????????????'}
							defaultValue={rearTimeCondition}
							onConfirmed={setRearTimeCondition}
						/>
					</Grid>

					{/* ???????????? */}
					<Grid item xs={9} style={{ border: '1px dashed lightgrey' }}>
						<Box>
							<MyTitle value={'????????????'} />
						</Box>
						<Box>
							<Grid container spacing={1}>
								<Grid item xs={2}>
									<MySelect
										label={'??????'}
										options={craneIds}
										onSelect={setCraneNo}
									></MySelect>
								</Grid>
								<Grid item xs={3}>
									<MySelect
										label={'????????????'}
										options={commandCodes.map((codeTemp) =>
											CommandMapping(codeTemp)
										)}
										onSelect={setCommandType}
									/>
								</Grid>
								<Grid item xs={7}>
									<MyInputText
										label={'?????????'}
										onChange={setCoilNo}
									></MyInputText>
								</Grid>
							</Grid>
						</Box>
						<Button
							variant={'contained'}
							style={{ marginTop: 5 }}
							color={'primary'}
							onClick={() => {
								let exportDatas: any[] = []
								let dataKey: keyof CraneHistoryModel
								if (onTableData) {
									onTableData.forEach((dataTemp: CraneHistoryModel) => {
										let strData: string = ''

										for (dataKey in dataTemp) {
											if (dataKey && columns)
												if (
													columns.find(
														(column) => column.field === dataKey.toString()
													)?.headerName
												)
													strData =
														strData +
														`"${
															columns.find(
																(column) => column.field === dataKey.toString()
															)?.headerName as string
														}":"${dataTemp[dataKey] as string}",`
										}

										exportDatas.push(
											JSON.parse(
												`{${strData.substring(0, strData.length - 1)}}`
											)
										)
									})
									handleExportAll(exportDatas)
								}
							}}
						>
							{' '}
							??????
						</Button>
					</Grid>
				</Grid>
			</ThemeProvider>
		</div>
	)
}

export default Index
