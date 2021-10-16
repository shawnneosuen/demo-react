/*
 * @Author: your name
 * @Date: 2021-10-14 15:38:06
 * @LastEditTime: 2021-10-17 03:42:36
 * @LastEditors: Shawnneosuen@outlook.com
 * @Description: In User Settings Edit
 * @FilePath: /demo-react/src/pages/commands-equipment/index.tsx
 */

import {
  createStyles,
  Grid,
  makeStyles,
  Paper,
  Theme,
} from "@material-ui/core";
import { useAppSelector } from "app/hook";
import React from "react";
import StockCoilMsgPanel from "./components/StockCoilMsgPanel";
import Table from "./components/Table";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
    },
    page: {
      padding: theme.spacing(2),
    },
    headPanel: {
      height: "30vh",
      width: "100%",
    },
  })
);
const Index = () => {
  const classes = useStyles();
  const commands = useAppSelector((state) => state.commands);
  return (
    <div className={classes.root}>
      <Paper className={classes.page}>
        <div className={classes.headPanel}>
          <Grid container>
            <Grid item xs={6}>
              {" "}
              <StockCoilMsgPanel value={"4号机组入口"} />
            </Grid>
            <Grid item xs={6}>
              {" "}
              <StockCoilMsgPanel value={"4号机组出口"} />
            </Grid>
          </Grid>
        </div>
        <div style={{ marginTop: 24 }}>
          <Table></Table>
        </div>
      </Paper>
    </div>
  );
};
export default Index;
