import {
	Button,
	ButtonGroup,
	Card,
	createStyles,
	makeStyles,
	Theme,
	Typography,
} from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		CraneCard: {
			width: 270,
			textAlign: 'center',
			border: '1px solid #B0B0B0',
		},
		DivideLine: {
			height: 1,
			width: '100%',
			backgroundColor: '#e0e0e0',
		},
	})
)

const Index = () => {
	const classes = useStyles()
	return (
		<div>
			<Card className={classes.CraneCard}>
				<Typography>1234</Typography>
				<Typography>12345</Typography>
				<Typography>123456</Typography>
				<div className={classes.DivideLine}></div>
				<div>
					<ButtonGroup
						variant='text'
						color='primary'
						aria-label='text primary button group'
					>
						<Button>自动</Button>
						<Button>手动</Button>
						<Button>半自动</Button>
						<Button>离线</Button>
						<Button></Button>
					</ButtonGroup>
				</div>
			</Card>
		</div>
	)
}

export default Index
