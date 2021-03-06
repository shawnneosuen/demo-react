/*
 * @Author: your name
 * @Date: 2021-08-23 11:13:09
 * @LastEditTime: 2021-10-12 01:06:11
 * @LastEditors: Shawnneosuen@outlook.com
 * @Description: In User Settings Edit
 * @FilePath: /demo-react/src/boot/api.ts
 */
import axios from 'axios'

const NODE_ENV = 'local'

const ip = {
	local: 'www.estrella.zone',
	development: '10.25.105.41',
	production: '10.0.1.10',
}

const port = 18080

const apiQuery = 'http://' + ip[NODE_ENV] + ':' + port + '/api/query'

export async function query(sql: string) {
	let queryData: any
	let error: string = ''
	await axios
		.post(apiQuery, sql)
		.then((response) => {
			queryData = response.data
		})
		.catch(() => {
			error = '未查询到数据'
		})
	if (error) {
		console.error(error)
	}
	return queryData
}
