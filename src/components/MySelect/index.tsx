/*
 * @Author: your name
 * @Date: 2021-10-11 14:37:08
 * @LastEditTime: 2021-10-12 17:09:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /demo-react/src/components/MySelect/index.tsx
 */
import React, { forwardRef, useEffect, useRef, useState } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Menu, { MenuProps } from '@material-ui/core/Menu'
import MenuItem, { MenuItemProps } from '@material-ui/core/MenuItem'
import { InputAdornment, OutlinedInput } from '@material-ui/core'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'

const StyledMenu = withStyles({
	paper: {
		border: '1px solid #d3d4d5',
	},
})((props: MenuProps) => (
	<Menu
		elevation={0}
		getContentAnchorEl={null}
		anchorOrigin={{
			vertical: 'bottom',
			horizontal: 'center',
		}}
		transformOrigin={{
			vertical: 'top',
			horizontal: 'center',
		}}
		{...props}
	/>
))

interface Props extends MenuItemProps {
	value?: string
	options?: string[]
	onSelect?: any
	onClear?: any
}

const Index = ({
	value = '',
	options,
	onSelect: handleSelect = () => {},
	onClear: handleClear,
}: Props) => {
	const [selectedValue, setSelectedValue] = useState<string>('')
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
	const inputRef = useRef<HTMLDivElement>()
	const [itemWidth, setItemWidth] = useState<number>(0)

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleSelectClick = async (event: React.MouseEvent<HTMLElement>) => {
		setSelectedValue(event.currentTarget.innerText)
		setAnchorEl(null)
	}
	const handleClose = () => {
		setAnchorEl(null)
	}

	useEffect(() => {
		setItemWidth((inputRef.current?.offsetWidth ?? 0) + 40)
	}, [inputRef.current])

	useEffect(() => {
		handleSelect(selectedValue)
	}, [selectedValue])
	return (
		<div>
			<OutlinedInput
				ref={inputRef}
				value={selectedValue}
				onClick={handleClick}
				endAdornment={
					<InputAdornment position='end'>
						<ArrowDropDownIcon />
					</InputAdornment>
				}
			></OutlinedInput>
			<StyledMenu
				id='customized-menu'
				anchorEl={anchorEl}
				keepMounted
				style={{ width: itemWidth }}
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				{options?.map((option: string) => (
					<MenuItem
						style={{ width: itemWidth }}
						key={option}
						onClick={handleSelectClick}
					>
						<div> {option}</div>
					</MenuItem>
				))}
			</StyledMenu>
		</div>
	)
}
export default Index
