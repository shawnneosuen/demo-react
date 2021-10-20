/*
 * @Description:
 * @Version: 2.0
 * @Autor: Shawnneosuen@outlook.com
 * @Date: 2021-10-07 15:02:06
 * @LastEditors: Shawnneosuen@outlook.com
 * @LastEditTime: 2021-10-16 20:36:43
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
import SignalCellularAltIcon from "@material-ui/icons/SignalCellularAlt";
import MyLocationIcon from "@material-ui/icons/MyLocation";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    MarkupTables: {
      flexGrow: 1,
      display: "flex",
    },
    table: {
      maxWidth: 300,
    },
  })
);

const Index = () => {
  const classes = useStyles();
  return (
    <div>
      <Grid container className={classes.MarkupTables} spacing={2}>
        <Grid item xs={4}>
          {" "}
          <MarkupTablePLC></MarkupTablePLC>
        </Grid>
        <Grid item xs={4}>
          {" "}
          <MarkupTableData></MarkupTableData>
        </Grid>
        <Grid item xs={4}>
          <MarkupTableInfo></MarkupTableInfo>
        </Grid>
      </Grid>
    </div>
  );
};
export default Index;

function createData(NAME: string, VALUE: any) {
  return { NAME, VALUE };
}

const rowsPLC = [
  createData("PLC信号", false),
  createData("大车方向", 237),
  createData("小车方向", 262),
  createData("载荷信号", 305),
];

function MarkupTablePLC() {
  const classes = useStyles();

  return (
    <TableContainer className={classes.table} component={Paper}>
      <Table aria-label="simple table">
        <TableBody>
          <TableRow key={rowsPLC[0].NAME}>
            <TableCell component="th" scope="row">
              {rowsPLC[0].NAME}
            </TableCell>
            <TableCell align="right">
              <SignalCellularAltIcon
                fontSize={"small"}
                color={rowsPLC[0].VALUE ? "primary" : "error"}
              />
            </TableCell>
          </TableRow>
          <TableRow key={rowsPLC[1].NAME}>
            <TableCell component="th" scope="row">
              {rowsPLC[1].NAME}
            </TableCell>
            <TableCell align="right">{rowsPLC[1].VALUE}</TableCell>
          </TableRow>
          <TableRow key={rowsPLC[2].NAME}>
            <TableCell component="th" scope="row">
              {rowsPLC[2].NAME}
            </TableCell>
            <TableCell align="right">{rowsPLC[2].VALUE}</TableCell>
          </TableRow>
          <TableRow key={rowsPLC[3].NAME}>
            <TableCell component="th" scope="row">
              {rowsPLC[3].NAME}
            </TableCell>
            <TableCell align="right">
              <MyLocationIcon fontSize={"small"} />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const rowsData = [
  createData("当前库位", "No Data"),
  createData("大车实际", "No Data"),
  createData("小车实际", "No Data"),
  createData("夹钳高度", "No Data"),
];

function MarkupTableData() {
  const classes = useStyles();

  return (
    <TableContainer className={classes.table} component={Paper}>
      <Table aria-label="simple table">
        <TableBody>
          {rowsData.map((row) => (
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

const rowsInfo = [
  createData("上条记录", "No Data"),
  createData("材料号", "No Data"),
  createData("目标卸下位", "No Data"),
  createData("实际卸下位", "No Data"),
];

function MarkupTableInfo() {
  const classes = useStyles();

  return (
    <TableContainer className={classes.table} component={Paper}>
      <Table aria-label="simple table">
        <TableBody>
          {rowsInfo.map((row) => (
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
