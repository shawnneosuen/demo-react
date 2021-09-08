import { Button, createStyles, makeStyles, styled, Theme } from "@material-ui/core";
import {store} from "app/store";
import React from "react";
import { Provider, useDispatch, useSelector } from 'react-redux'
import { Yard } from "./model";
import { selectYard, getAllBayId, selectBayIds } from "./store/yardSlice";
import ZoneComponent from './components/ZoneComponent'
import YardMap from './YardMap'

const useStyles = makeStyles((theme: Theme) => createStyles({
    Header:{
        width:'100vh'
    },
    page: {
        paddingTop: theme.spacing(10),
        paddingBottom: theme.spacing(10)
    }
}))

const Index = () =>{
        return (<Provider store={store}>
            <GetYard/>
        </Provider>)

}
const  GetYard = () => {
    const bay =useSelector(selectYard).bays
    console.log(bay);
    
    const dispatch = useDispatch()
    const baseHeight =  500;
    const baseWidth = 1780;
    const classes = useStyles()

    const bayIds = useSelector(selectBayIds)
    
    
  
   return <div className={classes.page}>
       {
           bayIds.map((bayId: string) => {
               return(
                <div style={{width:'1780px',height: '270px', marginBottom:"20px"}} key={bayId}>
                    <YardMap bayId={bayId}></YardMap>
                </div>)
           })
       }
    </div> 
}
export default Index