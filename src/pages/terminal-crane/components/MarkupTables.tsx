/*
 * @Description:
 * @Version: 2.0
 * @Autor: Shawnneosuen@outlook.com
 * @Date: 2021-10-07 15:02:06
 * @LastEditors: Shawnneosuen@outlook.com
 * @LastEditTime: 2021-10-07 15:51:30
 */
import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Grid } from "@material-ui/core";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    MarkupTables: {
      flexGrow: 1,
    },
    table: {
      maxWidth: 600,
    },
  })
);

const Index = () => {
  const classes = useStyles();
  return (
    <div>
      <Grid container className={classes.MarkupTables} spacing={3}>
        <Grid item xs={3}>
          {" "}
          <MarkupTable></MarkupTable>
        </Grid>
        <Grid item xs={3}>
          {" "}
          <MarkupTable></MarkupTable>
        </Grid>
        <Grid item xs={3}>
          <MarkupTable></MarkupTable>
        </Grid>
        <Grid item xs={3}>
          {" "}
          <MarkupTable></MarkupTable>
        </Grid>
      </Grid>
    </div>
  );
};
export default Index;

function createData(NAME: string, VALUE: number) {
  return { NAME, VALUE };
}

const rows = [
  createData("PLC信号", 159),
  createData("大车方向", 237),
  createData("小车方向", 262),
  createData("载荷信号", 305),
];

function MarkupTable() {
  const classes = useStyles();

  return (
    <TableContainer className={classes.table} component={Paper}>
      <Table aria-label="simple table">
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.NAME}>
              <TableCell component="th" scope="row">
                {row.NAME}
              </TableCell>
              <TableCell align="right">{row.VALUE}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
