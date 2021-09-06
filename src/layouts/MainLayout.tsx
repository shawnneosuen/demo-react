import * as React from 'react'
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import NavigaterLink from "components/NavigaterLink";
import Monitor from "./Monitor";
import TerminalTransport from "./terminal-transport";
import TerminalProduct from "./terminal-product";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "100vh",
      width: "full",
      backgroundColor: "lightgrey",
    },
    sideBar: {
      height: "100vh",
      width: "20vh",
      backgroundColor: "white",
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
      height: "100%",
    },
  })
);

const routes = [
  {
    path: "/",
    main: () => <Monitor />,
  },
  {
    path: "/terminal-transport",
    main: () => <TerminalTransport />,
  },
  {
    path: "/terminal-product",
    main: () => <TerminalProduct />,
  },
];

export const MainLayout = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container>
        <Router>
          <Grid item xs={3}>
            <div className={classes.sideBar}>
              <NavigaterLink />
            </div>
          </Grid>
          <Grid item xs={9}>
            <Routes>
              {routes.map((route, index) => (
                // Render more <Route>s with the same paths as
                // above, but different components this time.
                <Route
                  key={index}
                  path={route.path}
                  children={<route.main />}
                />
              ))}
            </Routes>
          </Grid>
        </Router>
      </Grid>
    </div>
  );
};
