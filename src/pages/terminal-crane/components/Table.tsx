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
import { Command } from 'boot/model'
import { FilterCondition } from '../context/model'
import { useAppSelector } from 'app/hook'
import { useTabelStatusContext } from '../context/TableStatus'
import { useStatusContext } from 'context/BasePageStatus'
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
		field: 'CommandNo',
		headerName: '指令号',
	},
	{
		field: 'Priority',
		headerName: '优先级',
	},
	{
		headerName: '跨号',
		field: 'BayNo',
	},
	{
		headerName: '行车号',
		field: 'CraneNo',
	},
	{
		headerName: '材料号',
		field: 'CoilNo',
	},
	{
		headerName: '指令类型',
		field: 'CommandType',
	},
	{
		headerName: '起始库位',
		field: 'StartStock',
	},
	{
		headerName: '卸下库位',
		field: 'ToStock',
	},
	{
		headerName: '指令状态',
		field: 'CommandStatus',
	},
	{
		headerName: '可吊标志',
		field: 'PickupFlag',
	},
	{
		headerName: '更新时间',
		field: 'UpdateTime',
	},
]

interface Data extends Command {
	id: number
	Selected: boolean
}

interface Props {
	onSelected?: any
}

const Index = ({ onSelected: handleSelect }: Props) => {
	const [gridApi, setGridApi] = useState<GridApi>()
	const [gridColumnApi, setGridColumnApi] = useState<ColumnApi>()
	const classes = useStyles()
	const commands = useAppSelector((state) => state.commands)
	const { filter, setFilterConditon, getFilterCondifion } =
		useTabelStatusContext()

	const [rowData, setRowData] = useState<any[]>([])
	const ref = useRef<HTMLDivElement>(null)

	const onGridReady = (params: RowClickedEvent) => {
		setGridApi(params.api)
		setGridColumnApi(params.columnApi)
		const updateData = (data: React.SetStateAction<any[]>) => {
			setRowData(data)
		}
		handleSelect(gridApi?.getSelectedRows)
	}

	const onSelectionChanged = () => {
		handleSelect(gridApi?.getSelectedRows())
	}

	const thisStyle = () => {
		let width = '100%'
		let height = window.innerHeight * 0.55

		return { width: width, height: height, border: '1px solid #D0D0D0' }
	}

	const filterData = useFilter(commands.commands, filter)
	useEffect(() => {
		console.log('filtedAtas', filterData)

		let rowsTemp: Data[] = []
		let index = 0
		if (filterData) {
			console.log(2222222)

			for (const item of filterData) {
				console.log(item)

				let itemTemp: Data = {
					id: index++,
					Selected: false,
					CommandType: CommandMapping(item.CommandType),
					CommandNo: item.CommandNo,
					Priority: item.Priority,
					CraneNo: item.CraneNo,
					StartStock: item.StartStock,
					ToStock: item.ToStock,
					CommandStatus: item.CommandStatus,
					PickupFlag: item.PickupFlag,
					CoilNo: item.CoilNo,
					BayNo: item.BayNo,
					UpdateTime: item.UpdateTime,
				}
				rowsTemp.push(itemTemp)
			}
		}
		setRowData(rowsTemp)
	}, [filterData, commands.commands])

	useEffect(() => {
		gridApi?.onFilterChanged()
	}, [filter])
	//   setTest(() => doesExternalFilterPass);

	const doesExternalFilterPass = (node: RowNode) => {
		if (
			filter &&
			(!!filter.BayNo ||
				!!filter.CoilNoFilter ||
				!!filter.CommandTypeFilter ||
				!!filter.CraneNoFileter ||
				!!filter.WorkingTypeFilter ||
				!!filter.ZoneFilter)
		) {
			let filterTemp = filter
			return (
				node.data?.ZoneFilter == filterTemp?.ZoneFilter ||
				node.data?.WorkingTypeFilter == filterTemp?.WorkingTypeFilter ||
				node.data?.CraneNoFileter == filterTemp?.CraneNoFileter ||
				node.data?.CommandTypeFilter == filterTemp?.CommandTypeFilter ||
				node.data?.CoilNoFilter == filterTemp?.CoilNoFilter ||
				node.data?.BayNo == filterTemp?.BayNo
			)
		} else {
			return true
		}
	}

	// Set row styles
	const changeRowStyle = (params: { data: { CommandStatus: number } }) => {
		console.log('params', params)

		if (params.data.CommandStatus === 1) {
			return { backgroundColor: ' red' }
		} else {
			return { backgroundColor: 'white' }
		}
	}
	return (
		<div style={thisStyle()}>
			<div className={classes.exampleWrapper} ref={ref}>
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
						onSelectionChanged={onSelectionChanged}
						getRowStyle={changeRowStyle}
						// onFilterChanged={}
					>
						<AgGridColumn
							field='CommandNo'
							minWidth={150}
							headerCheckboxSelection={true}
							headerCheckboxSelectionFilteredOnly={true}
							checkboxSelection={true}
							headerName={columns[0].headerName}
						/>
						<AgGridColumn field='Priority' headerName={columns[1].headerName} />
						<AgGridColumn
							field='BayNo'
							minWidth={150}
							headerName={columns[2].headerName}
						/>
						<AgGridColumn
							field='CraneNo'
							minWidth={150}
							headerName={columns[3].headerName}
						/>
						<AgGridColumn field='CoilNo' headerName={columns[4].headerName} />
						<AgGridColumn
							field='CommandType'
							headerName={columns[5].headerName}
						/>
						<AgGridColumn
							field='StartStock'
							headerName={columns[6].headerName}
						/>
						<AgGridColumn field='ToStock' headerName={columns[7].headerName} />
						<AgGridColumn
							field='CommandStatus'
							headerName={columns[8].headerName}
						/>
						<AgGridColumn
							field='PickupFlag'
							headerName={columns[9].headerName}
						/>
						<AgGridColumn
							field='UpdateTime'
							headerName={columns[10].headerName}
						/>
					</AgGridReact>
				</div>
			</div>
		</div>
	)
}
export default Index

const useFilter = (commands: Command[], filter: FilterCondition | null) => {
	const [value, setValue] = useState<Command[]>([])
	let commandsTemp: Command[] = []

	useEffect(() => {
		if (
			filter &&
			commands &&
			(filter.BayNo !== '' ||
				filter.CoilNoFilter !== '' ||
				filter.CommandTypeFilter !== '' ||
				filter.CraneNoFileter !== '' ||
				filter.WorkingTypeFilter !== '' ||
				filter.ZoneFilter !== '')
		) {
			if (filter.CommandTypeFilter) {
				commandsTemp = commands.filter((temp: Command) =>
					temp.CommandType.includes(filter.CommandTypeFilter + '')
				)
			}
		} else {
			commandsTemp = commands
		}
		console.log(commandsTemp)

		setValue(commandsTemp)
	}, [filter, commands])

	return value
}
