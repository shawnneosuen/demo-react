import { createStyles, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import {ElementModel} from './model'

const useStyles = makeStyles((theme:Theme)=> createStyles({
    DrawPage:{
        width:'100vh',
        height:"80vh",
        backgroundColor: 'grey'

    }
}))

interface Props{
    elementModels: ElementModel[]
}
const Index = ({elementModels}: Props) => {
    const classes = useStyles()
    return <div className={classes.DrawPage}></div>
}

export default Index