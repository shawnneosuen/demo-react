import React, { useEffect, useRef, useState } from 'react'
import { AgGridReact, AgGridColumn } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import { ColumnApi, GridApi, RowClickedEvent } from 'ag-grid-community'
import { Button, createStyles, makeStyles, Theme } from '@material-ui/core'
import { Coil, Command } from 'boot/model'
import { useAppSelector } from 'app/hook'
import { sleep } from 'boot/utils'
import { handleExportAll } from 'boot/utils/exportData'

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

const columns: Column[] = [
	{
		field: 'MAT_NO',
		headerName: '钢卷号',
	},
	{
		field: 'WEIGHT',
		headerName: '重量',
	},
	{
		headerName: '宽度',
		field: 'WIDTH',
	},
	{
		headerName: '厚度',
		field: 'THICKNESS',
	},
	{
		headerName: '鞍座',
		field: 'ST_NO',
	},
]

interface Data extends Command {
	id: number
	Selected: boolean
}

interface Props {
	filterValue?: string
	onSelectedValue?: any
}

const Index = ({
	filterValue,
	onSelectedValue: handleSelectedData = () => {},
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
			let height = 220
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

	const coils = useFilter(
		useAppSelector((state) => state.coils).coils,
		filterValue
	)

	const handleSelectedChanged = () => {
		setSelectedValue(gridApi?.getSelectedRows())
	}

	useEffect(() => {
		setRowData(coils)
	}, [coils])
	useEffect(() => {
		handleSelectedData(selectedValue)
		console.log(selectedValue)
	}, [selectedValue])
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
				onSelectionChanged={handleSelectedChanged}
				// onFilterChanged={}
			>
				<AgGridColumn
					field='MAT_NO'
					minWidth={150}
					headerCheckboxSelection={true}
					headerCheckboxSelectionFilteredOnly={true}
					checkboxSelection={true}
					headerName={columns[0].headerName}
				/>
				<AgGridColumn field='WEIGHT' headerName={columns[1].headerName} />
				<AgGridColumn
					field='WIDTH'
					minWidth={150}
					headerName={columns[2].headerName}
				/>
				<AgGridColumn
					field='THICKNESS'
					minWidth={150}
					headerName={columns[3].headerName}
				/>
				<AgGridColumn field='ST_NO' headerName={columns[4].headerName} />
			</AgGridReact>
		</div>
	)
}
export default Index

const useFilter = (coils: Coil[], filter: string | undefined) => {
	const [value, setValue] = useState<Coil[]>([])
	let coilsTemp: Coil[] = []

	useEffect(() => {
		if (filter && filter != '') {
			coilsTemp = coils.filter(
				(temp: Coil) =>
					temp.MAT_NO.includes(filter.toString()) ||
					temp.ST_NO?.includes(filter.toString())
			)
		} else {
			coilsTemp = coils
		}
		setValue(coilsTemp)
		return
	}, [filter, coils])

	return value
}
