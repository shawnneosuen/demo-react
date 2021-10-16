/*
 * @Author: your name
 * @Date: 2021-10-12 09:25:07
 * @LastEditTime: 2021-10-16 19:49:42
 * @LastEditors: Shawnneosuen@outlook.com
 * @Description: In User Settings Edit
 * @FilePath: /demo-react/src/features/commands/Comm.ts
 */

import { Commands } from 'boot/model'

const COMM: Commands = {
	commands: [
		{
			CommandNo: '1',
			CommandType: '2I',
			CoilNo: '1',
			Priority: 1,
			StartStock: '',
			ToStock: '',
			PickupFlag: true,
			CommandStatus: 0,
			CraneNo: '',
			BayNo: 'NY',
			UpdateTime: '',
		},
	],
}

export default COMM
