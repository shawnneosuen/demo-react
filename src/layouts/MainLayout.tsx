import React from 'react'
import { Navigate, Route, Router } from 'react-router'
import ReactDOM from 'react-dom';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {Button,Paper, Grid}  from '@material-ui/core';
import { Styles } from '@material-ui/styles/withStyles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height:"100vh",
      width:"200vh",
      backgroundColor:"black"
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      height:'100%',
    },
  }),
);


export const MainLayout = () => {
    const classes = useStyles()
    return (

        <div className={classes.root}></div>

    )
}