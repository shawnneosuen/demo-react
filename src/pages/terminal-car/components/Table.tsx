/*
 * @Description:
 * @Version: 2.0
 * @Autor: Shawnneosuen@outlook.com
 * @Date: 2021-10-18 15:40:54
 * @LastEditors: Shawnneosuen@outlook.com
 * @LastEditTime: 2021-10-18 20:11:08
 */
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { ColumnApi, GridApi, RowClickedEvent } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { AgGridColumn } from "ag-grid-react/lib/agGridColumn";
import { useAppSelector } from "app/hook";
import { TruckStowageDetailModel } from "boot/model";
import React, { useEffect, useState } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    exampleWrapper: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
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
    console.log("Acquire Data successfully!");
    console.log(value);
    console.log(truckStowageDetails);

    let truckStowageDetail = truckStowageDetails.filter(
      (truckStowageItem: TruckStowageDetailModel) =>
        truckStowageItem.STOWAGE_ID === value
    );
    console.log(truckStowageDetail);

    setRowData(truckStowageDetail);
    handleTruckStowage(truckStowageDetail);
  }, [value]);

  // Table Styles
  const classes = useStyles();
  const thisStyle = () => {
    let width = "100%";
    let height = "100%"; //window.innerHeight * 0.65;

    return { width: width, height: height, border: "1px solid #D0D0D0" };
  };
  return (
    <div style={thisStyle()}>
      <div className={classes.exampleWrapper}>
        <div
          style={{
            height: "100%",
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
      </div>
    </div>
  );
};

const columns = [
  {
    headerName: "STOWAGE_ID",
    field: "STOWAGE_ID",
  },
  {
    headerName: "COIL_NO",
    field: "COIL_NO",
  },
  {
    headerName: "ST_NO",
    field: "ST_NO",
  },
  {
    headerName: "POSITION ON TRUCK",
    field: "POSITION_ON_TRUCK",
  },
];

export default Index;
