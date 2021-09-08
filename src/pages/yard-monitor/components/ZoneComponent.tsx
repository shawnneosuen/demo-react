import { makeStyles, Theme,createStyles, Typography } from "@material-ui/core";
import { Label, Lock } from "@material-ui/icons";
import React, { ReactNode } from "react";

interface Props{
    className?:string | 'yard' | 'zone' | undefined ,
    width?: number,
    height?:number,
    px?: number,
    py?: number,
    top?:number,
    left?: number,
    label?: string,
    locked?: boolean,
    horizontal?:boolean,
    clickable?: boolean,
    children?: ReactNode,
}

const useStyles = makeStyles((theme:Theme) => createStyles({
    yard: {
        position: "relative",
        backgroundColor: '#f0f0f0'
    },
    zone: {
        position: "absolute",
        display:'flex',
        alignItems:'center',
        flex: 'center',       
        justifyContent: 'center',
        borderRadius: '3px',
        cursor: 'default',
        backgroundColor: 'white',
        "&:hover": {
            backgroundColor:'#C6C6C6'
        },
        border:'1px solid #505050',
        // writingMode:''
    },
    zoneLabel:{
        wordBreak: 'break-all',
        fontSize: '11px',
    }
}))

const Index = ({className, width, height, px, py, top, left, label, locked, horizontal, clickable, children}: Props) => {
    const classes = useStyles()

    const styles = {
        thisStyles:{
            height: height && py ? height * py + 'px':'100%',
            width: width && px ? width * px + 'px':'100%',
            left :left && px ? left * px + 'px' : 0 , 
            top: top &&  py ? top * py + 'px' : 0,
        }
    }
   
    return <div className={className === 'zone' ? classes.zone : classes.yard} style={styles.thisStyles} onClick={() => {
        if (!clickable){
            return
        }
        console.log(1234)
    }}> 
    {
        locked ? <Lock color={"disabled"} fontSize={"small"}></Lock> : ''
    }
 
        {
            label ? <Typography className={classes.zoneLabel} align={'center'} display={'block'} style={
                horizontal == false ? {width:'1px'} : {}
            }>{label}</Typography> : ''
        }
        {children}
    </div>
}

export default Index