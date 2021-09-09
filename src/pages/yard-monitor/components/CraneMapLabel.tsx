import { createStyles, makeStyles, Theme } from '@material-ui/core'
import React, { ReactNode } from 'react'

interface Props {
    height?: number,
    width: number,
    left: number,
    top: number,
    px: number,
    py: number,
    children?:ReactNode
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    label: {
        position: 'absolute',
        fontSize: '11px',
        textAlign: 'center'
    }
}))
const MyLabel =({height, width, left, top,px, py,children}: Props, ) => {
    const classes = useStyles();
    const thisStyles = {
        height: height && py ? height * py + 'px':'100%',
        width: width && px ? width * px + 'px':'100%',
        left :left && px ? left * px + 'px' : 0 , 
        top: top &&  py ? top * py + 'px' : 0,
    }
    return (<div className={classes.label} style={thisStyles}>
        {children}
    </div>)

}
export default MyLabel;