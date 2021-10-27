import { Column } from 'boot/model'

/*
 * @Description:
 * @Version: 2.0
 * @Autor: Shawnneosuen@outlook.com
 * @Date: 2021-10-26 16:15:35
 * @LastEditors: Shawnneosuen@outlook.com
 * @LastEditTime: 2021-10-26 16:34:51
 */
export const columns: Column[] = [
	{
		field: 'ID',
		headerName: '编号',
	},
	{
		field: 'TIME',
		headerName: '时间',
	},
	{
		headerName: '行车号',
		field: 'CRANE_NO',
	},
	{
		headerName: '创建时间',
		field: 'CREATE_EVENT',
	},
	{
		headerName: '钢卷号',
		field: 'COIL_NO',
	},
	{
		headerName: '指令类型',
		field: 'COMMAND_CODE',
	},
	{
		headerName: '大车位置',
		field: 'CRANE_BIG',
	},
	{
		headerName: '小车位置',
		field: 'CRANE_SMALL',
	},
	{
		headerName: '起始鞍座位',
		field: 'FROM_STOCK',
	},
	{
		headerName: '目标鞍座位',
		field: 'TO_STOCK',
	},
]

export type FilterCondition = {
	craneNo: string
	commandCode: string
	coilNo: string
}

export type TimeCondition = {
	forwardTime: string
	rearTime: string
}
