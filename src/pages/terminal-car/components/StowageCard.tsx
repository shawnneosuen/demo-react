/*
 * @Description:
 * @Version: 2.0
 * @Autor: Shawnneosuen@outlook.com
 * @Date: 2021-10-18 10:31:18
 * @LastEditors: Shawnneosuen@outlook.com
 * @LastEditTime: 2021-10-18 16:42:25
 */

import {
  createStyles,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Theme,
} from "@material-ui/core";
import { useAppSelector } from "app/hook";
import { TruckStowageModel } from "boot/model";
import React, { useEffect, useState } from "react";

const TableCellWidth = 180;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      display: "flex",
      border: "1px solid lightgrey",
    },
    tableHeader: {
      backgroundColor: "lightgrey",
      width: TableCellWidth,
    },
    tableData: {
      width: TableCellWidth,
    },
  })
);

type TabelRowModel = {
  name: string;
  value: string;
};

const createData = (key: string, value: string) => {
  return { name: key, value: value };
};

interface Props {
  onSelected?: any;
}

const Index = ({ onSelected }: Props) => {
  const classes = useStyles();
  const [rowData, setRowData] = useState<TabelRowModel[]>([]);
  const turckStowageString = JSON.stringify(
    useAppSelector((state) => state.truckStowage).truckStowage
  );

  useEffect(() => {
    let truckStowage = JSON.parse(turckStowageString);
    let targetTruckStowage: TruckStowageModel;
    let rowDatasTemp: TabelRowModel[] = [];
    if (truckStowage) {
      truckStowage.sort(
        (truckStowage1: TruckStowageModel, truckStowage2: TruckStowageModel) =>
          new Date(truckStowage2.CRAETE_TIME).valueOf() -
          new Date(truckStowage1.CRAETE_TIME).valueOf()
      );
      targetTruckStowage = truckStowage[0];

      rowDatasTemp.push(
        createData("Stowage ID", targetTruckStowage.STOWAGE_ID)
      );
      rowDatasTemp.push(createData("Truck ID", targetTruckStowage.STOWAGE_ID));
      rowDatasTemp.push(createData("Park ID", targetTruckStowage.PARKING_ID));
      rowDatasTemp.push(
        createData("CREATE_TIME", targetTruckStowage.CRAETE_TIME)
      );
      rowDatasTemp.push(
        createData("UPDATE_TIME", targetTruckStowage.UPDATE_TIME)
      );

      setRowData(rowDatasTemp);
      console.log(rowData);

      onSelected(targetTruckStowage);
    }
  }, [turckStowageString]);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableBody className={classes.table}>
          {rowData.map((row: TabelRowModel) => (
            <TableRow key={row.name}>
              <TableCell
                component={"th"}
                scope={"row"}
                className={classes.tableHeader}
              >
                {row.name}
              </TableCell>
              <TableCell className={classes.tableData}>{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Index;