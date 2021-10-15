/*
 * @Author: your name
 * @Date: 2021-10-14 15:38:06
 * @LastEditTime: 2021-10-15 15:05:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /demo-react/src/pages/commands-equipment/index.tsx
 */

import { createStyles, makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import StockCoilMsgPanel from './components/StockCoilMsgPanel'

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		headPanel: {
			height: '30vh',
			width: '100%',
		},
	})
)
const Index = () => {
	const classes = useStyles()
	return (
		<div>
			<div className={classes.headPanel}>
				<StockCoilMsgPanel />
			</div>
		</div>
	)
}
export default Index
