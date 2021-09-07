import { createStyles, makeStyles, styled, Theme } from "@material-ui/core";
import store from "app/store";
import React from "react";
import { Provider, useSelector } from 'react-redux'
import { Yard } from "./yard";
import { selectYard } from "./yardSlice";

const classes = {
    Header:{
        width:'100vh'
    }
}



const Index = () =>{
  
    
        return (<Provider store={store}>
            <GetYard/>
        </Provider>)

}
const  GetYard = () => {
    const testGetState =useSelector(selectYard)
    console.log(testGetState);
    
   return <div style={classes.Header}>
    <h1>{testGetState}</h1>
    <h1>{testGetState}</h1>    
    <h1>{testGetState}</h1>
    </div> 
}
export default Index