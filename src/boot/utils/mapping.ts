/*
 * @Author: your name
 * @Date: 2021-10-15 10:40:08
 * @LastEditTime: 2021-10-17 03:34:13
 * @LastEditors: Shawnneosuen@outlook.com
 * @Description: In User Settings Edit
 * @FilePath: /demo-react/src/boot/utils/commandmap.ts
 */

export const commandCodes = [
	'21',
	'14',
	'31',
	'1D',
	'1F',
	'2I',
	'2H',
	'1A',
	'2B',
	'12',
]

export const CommandMapping = (code: string) => {
	if (!code) {
		console.error('指令错误')
		return ''
	}
	switch (code) {
		case '21':
			return '机组上料'
		case '14':
			return '机组下料'
		case '31':
			return '库内倒垛'
		case '1D':
			return '框架车入库'
		case '1F':
			return '社会车辆入库'
		case '2I':
			return '成品发货出库'
		case '2H':
			return '汽车转库出库'
		case '1A':
			return '过跨入库'
		case '2B':
			return '库内上过跨车'
		case '12':
			return '机组回退'
		default:
			return 'code 类型出错'
	}
}
