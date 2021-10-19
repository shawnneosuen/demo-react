import React, {
	ReactNode,
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from 'react'
import { render } from 'react-dom'
import { AgGridReact, AgGridColumn } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import {
	RowNode,
	RowNodeEvent,
} from 'ag-grid-community/dist/lib/entities/rowNode'
import {
	ColumnApi,
	GridApi,
	GridReadyEvent,
	RowClickedEvent,
} from 'ag-grid-community'
import { Button, createStyles, makeStyles, Theme } from '@material-ui/core'
import { Coil, Command } from 'boot/model'
import { useAppSelector } from 'app/hook'
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
			height: '100%',
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
}

const Index = ({ filterValue }: Props) => {
	const [gridApi, setGridApi] = useState<GridApi>()
	const [gridColumnApi, setGridColumnApi] = useState<ColumnApi>()
	const classes = useStyles()

	const [rowData, setRowData] = useState<any[]>([])
	const ref = useRef<HTMLDivElement>(null)

	const onGridReady = (params: RowClickedEvent) => {
		setGridApi(params.api)
		setGridColumnApi(params.columnApi)
		const updateData = (data: React.SetStateAction<any[]>) => {
			setRowData(data)
		}
	}

	const thisStyle = () => {
		let width = '100%'
		let height = '100%'

		return { width: width, height: height, border: '1px solid #D0D0D0' }
	}

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

	useEffect(() => {
		setRowData(coils)
	}, [coils])
	return (
		<div style={thisStyle()}>
			<div className={classes.exampleWrapper} ref={ref}>
				{/* <div style={{ marginBottom: "5px" }}></div> */}
				<div
					style={{
						height: '100%',
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
			</div>
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
	}, [filter])

	return value
}
