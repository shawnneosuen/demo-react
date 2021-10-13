/*
 * @Description:
 * @Version: 2.0
 * @Autor: Shawnneosuen@outlook.com
 * @Date: 2021-10-12 01:41:03
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-10-13 17:31:09
 */
import { Button, createStyles, makeStyles, Theme } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			padding: theme.spacing(2),
		},
	})
)

const Index = () => {
	const classes = useStyles()
	const [value, setValue] = useState<string[]>([
		'急停1',
		'急停2',
		'急停3',
		'急停4',
		'急停5',
		'急停6',
		'急停7',
		'急停8',
		'急停9',
		'急停10',
		'急停11',
	])

	return (
		<div className={classes.root}>
			{value.map((item: string) => (
				<Button
					variant='outlined'
					style={{ color: 'red', marginLeft: 2 }}
					key={item}
				>
					{item}
				</Button>
			))}
		</div>
	)
}

export default Index
