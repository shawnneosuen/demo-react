import { ButtonProps } from '@material-ui/core'

/*
 * @Description:
 * @Version: 2.0
 * @Autor: Shawnneosuen@outlook.com
 * @Date: 2021-09-30 02:20:41
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-10-08 11:58:23
 */
export interface Command extends ButtonProps {
	Id: string
	Name: string
	Action: Function
}
