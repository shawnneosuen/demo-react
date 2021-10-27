import React, { useEffect, useRef, useState } from 'react'
import { AgGridReact, AgGridColumn } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import { ColumnApi, GridApi, RowClickedEvent } from 'ag-grid-community'
import { createStyles, makeStyles, Theme } from '@material-ui/core'
import { Coil, Command, CraneHistoryModel } from 'boot/model'
import { useAppSelector } from 'app/hook'
import { sleep } from 'boot/utils'
import { columns, FilterCondition } from './Setup'
import { CommandMapping } from 'boot/utils/mapping'

interface Column {
	field: string
	headerName: string
	width?: number
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		exampleWrapper: {
			display: 'flex',
			flexDirection: 'column',
			height: window.innerHeight * 0.7,
		},

		myGrid: {
			flex: '1 1 0px',
			width: '100%',
		},
	})
)

interface Data extends Command {
	id: number
	Selected: boolean
}

interface Props {
	filterValue?: FilterCondition
	onSelectedValue?: any
	onTableData?: any
}

const Index = ({
	filterValue,
	onSelectedValue: handleSelectedData = () => {},
	onTableData: handleTableData = () => {},
}: Props) => {
	const [gridApi, setGridApi] = useState<GridApi>()
	const [gridColumnApi, setGridColumnApi] = useState<ColumnApi>()
	const classes = useStyles()

	const [rowData, setRowData] = useState<any[]>([])
	const [selectedValue, setSelectedValue] = useState<any>()
	const ref = useRef<HTMLDivElement>(null)

	const onGridReady = (params: RowClickedEvent) => {
		setGridApi(params.api)
		setGridColumnApi(params.columnApi)
		const updateData = (data: React.SetStateAction<any[]>) => {
			setRowData(data)
		}
	}

	const [height, setHeight] = useState<string | undefined>()

	useEffect(() => {
		if (!rowData) {
			return
		}
		sleep(0).then(() => {
			const elements = document.querySelectorAll('.' + 'substract')
			if (!elements) {
				return
			}
			let height = 330
			elements.forEach((element) => {
				height += element.clientHeight
			})
			height += 16
			setHeight(`calc(100vh - ${height}px)`)
		})
	}, [rowData])

	// Set row styles
	const changeRowStyle = (params: { data: { CommandStatus: number } }) => {
		if (params.data.CommandStatus === 1) {
			return { backgroundColor: ' red' }
		} else {
			return { backgroundColor: 'white' }
		}
	}

	const history = useAppSelector((state) => state.history).craneHistory
	const filterHistory = useFilter(history, filterValue)

	useEffect(() => {
		setRowData(filterHistory)
		handleTableData(filterHistory)
	}, [filterHistory])

	return (
		<div
			style={{
				height: height,
				width: '100%',
			}}
			className={'ag-theme-alpine ' + classes.myGrid}
		>
			<AgGridReact
				defaultColDef={{
					flex: 1,
					minWidth: 120,
					filter: true,
				}}
				animateRows={true}
				onGridReady={onGridReady}
				rowData={rowData}
				rowSelection={'single'}
				getRowStyle={changeRowStyle}
			>
				{columns.map((column: Column) => (
					<AgGridColumn
						field={column.field}
						headerName={column.headerName}
						key={column.field}
					/>
				))}
			</AgGridReact>
		</div>
	)
}
export default Index

const useFilter = (
	craneHistory: CraneHistoryModel[],
	filter: FilterCondition | undefined
) => {
	const [value, setValue] = useState<CraneHistoryModel[]>([])

	useEffect(() => {
		let filterCraneHistory = craneHistory
			.filter((historyTemp: CraneHistoryModel) =>
				filter?.coilNo ? historyTemp.COIL_NO.includes(filter?.coilNo) : true
			)
			.filter((historyTemp: CraneHistoryModel) =>
				filter?.commandCode
					? filter?.commandCode.includes(
							CommandMapping(historyTemp.COMMAND_CODE)
					  )
					: true
			)
			.filter((historyTemp: CraneHistoryModel) =>
				filter?.craneNo ? filter?.craneNo.includes(historyTemp.CRANE_NO) : true
			)
		let filterCraneHistoryClone = JSON.parse(JSON.stringify(filterCraneHistory))
		filterCraneHistoryClone.forEach(
			(history: CraneHistoryModel) =>
				(history.COMMAND_CODE = CommandMapping(history.COMMAND_CODE))
		)

		console.log('filterCraneHistoryClone', filterCraneHistoryClone)

		setValue(filterCraneHistoryClone)
	}, [craneHistory, filter])

	return value
}
