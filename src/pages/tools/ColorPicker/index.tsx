import React from 'react'
import {Card} from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => createStyles({
    card:{

        width:300,
        height:500
    }
}))
export const ColorPicker = () => {

    const classes = useStyles()
    
    return <div>
          <Card className={classes.card}>
        
        </Card>
    </div>
  
}
