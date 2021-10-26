/*
 * @Description:
 * @Version: 2.0
 * @Autor: Shawnneosuen@outlook.com
 * @Date: 2021-10-18 15:40:54
 * @LastEditors: Shawnneosuen@outlook.com
 * @LastEditTime: 2021-10-26 10:38:29
 */
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { ColumnApi, GridApi, RowClickedEvent } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { AgGridColumn } from "ag-grid-react/lib/agGridColumn";
import { useAppSelector } from "app/hook";
import { TruckStowageDetailModel } from "boot/model";
import { sleep } from "boot/utils";
import React, { useEffect, useState } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    exampleWrapper: {
      display: "flex",
      flexDirection: "column",
      height: window.innerHeight * 0.7,
    },

    myGrid: {
      flex: "1 1 0px",
      width: "100%",
    },
  })
);

interface Props {
  value?: string | undefined;
  onSetTruckStowage?: any;
}

const Index = ({
  value,
  onSetTruckStowage: handleTruckStowage = () => {},
}: Props) => {
  // Initial table operate
  const [gridApi, setGridApi] = useState<GridApi>();
  const [gridColumnApi, setGridColumnApi] = useState<ColumnApi>();

  const onGridReady = (params: RowClickedEvent) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  // Initial Data
  const [rowData, setRowData] = useState<any[]>([]);
  const truckStowageDetailsString = JSON.stringify(
    useAppSelector((state) => state.truckStowageDetail).truckStowageDetails
  );

  useEffect(() => {
    let truckStowageDetails = JSON.parse(truckStowageDetailsString);
    if (!truckStowageDetails) {
      console.error("There is error for getting truck stowage details");
      return;
    }

    let truckStowageDetail = truckStowageDetails.filter(
      (truckStowageItem: TruckStowageDetailModel) =>
        truckStowageItem.STOWAGE_ID === value
    );

    setRowData(truckStowageDetail);
    handleTruckStowage(truckStowageDetail);
  }, [value]);

  // Table Styles
  const classes = useStyles();

  const [height, setHeight] = useState<string | undefined>();

  useEffect(() => {
    if (!rowData) {
      return;
    }
    sleep(0).then(() => {
      const elements = document.querySelectorAll("." + "substract");
      if (!elements) {
        return;
      }
      let height = 370;
      elements.forEach((element) => {
        height += element.clientHeight;
      });
      height += 16;
      setHeight(`calc(100vh - ${height}px)`);
    });
  }, [rowData]);

  return (
    <div
      style={{
        height: height,
        width: "100%",
      }}
      className={"ag-theme-alpine " + classes.myGrid}
    >
      <AgGridReact
        defaultColDef={{
          flex: 1,
          minWidth: 120,
          filter: true,
        }}
        animateRows={true}
        onGridReady={onGridReady}
        rowData={rowData}
        rowSelection={"single"}
        // onSelectionChanged={onSelectionChanged}
        // getRowStyle={changeRowStyle}
      >
        {columns.map((column) => (
          <AgGridColumn
            field={column.field}
            headerName={column.headerName}
            key={column.field}
          ></AgGridColumn>
        ))}
      </AgGridReact>
    </div>
  );
};

const columns = [
  {
    headerName: "配载图号",
    field: "STOWAGE_ID",
  },
  {
    headerName: "钢卷号",
    field: "COIL_NO",
  },
  {
    headerName: "鞍座号",
    field: "ST_NO",
  },
  {
    headerName: "车上位置",
    field: "POSITION_ON_TRUCK",
  },
];

export default Index;
