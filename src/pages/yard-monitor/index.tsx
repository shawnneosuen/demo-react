import { createStyles, makeStyles, styled, Theme } from "@material-ui/core";
import React from "react";

const classes = {
    Header:{
        width:'100vh'
    }
}

class Index extends React.Component{

    render(){
        return (<div>
            <div className={classes.Header}></div>
           
        </div>)
    }
}

export default Index