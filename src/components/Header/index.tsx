import React from "react";
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles'
import {AppBar, IconButton, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu'
import {useStatusContext} from "../../context/BasePageStatus";

const Header = () => {
    const {drawerFlag, openCloseDialog} = useStatusContext()
    const classes = useStyles();
    return <AppBar position="fixed" className={classes.header}>
        <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => {
                openCloseDialog(drawerFlag).then(r => console.log(r))
            }}>
                <MenuIcon/>
            </IconButton>
            <Typography>Header</Typography>
        </Toolbar>
    </AppBar>
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        header: {

            backgroundColor: 'black',
            zIndex: theme.zIndex.drawer + 1,
        }
    })
)

export default (Header)