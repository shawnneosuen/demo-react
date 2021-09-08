import React from 'react';
import {CssBaseline, Toolbar, Card} from '@material-ui/core';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {BrowserRouter as Router} from 'react-router-dom';
import {Home} from '@material-ui/icons';
import {
    Routes,
    Route,
} from "react-router";
import logo from './logo.svg';
import './App.css';
import {MainLayout} from 'layouts/MainLayout';
import {Menu, Button, Grid} from '@material-ui/core'

import Header from './components/Header';
import DrawerContent from './components/DrawerContent';
import RouterConfig from "./routes"

import {About} from './pages/About';
import {ColorPicker} from './pages/tools/ColorPicker'
import {Tools} from './pages/tools'

const useStyles = makeStyles((theme: Theme) => createStyles({
    MainPage: {
        backgroundColor: '#F0F0F0',
        height: '100vh'
    }
}))

export default function ClippedDrawer() {

    const classes = useStyles()
    return (
        
        <div>
            <CssBaseline/>
            <Header/>
            <Toolbar/>
            <Router>
                <DrawerContent open={false}/>
                <main className={classes.MainPage}>
                    <Routes>
                        {/*<Route path="/" element={<Home/>}>*/}
                        {/*</Route>*/}
                        {/*<Route path="/Home" element={<Home/>}>*/}
                        {/*</Route>*/}
                        {/*<Route path="/Tools" element={<Tools/>}>*/}
                        {/*</Route>*/}
                        {/*<Route path="/About" element={<About/>}>*/}
                        {/*</Route>*/}
                        {
                            RouterConfig().map(router => <Route path={router.path} element={router.main}
                                                                key={router.path}/>)
                        }
                    </Routes>
                </main>
            </Router>
        </div>
    );
}
