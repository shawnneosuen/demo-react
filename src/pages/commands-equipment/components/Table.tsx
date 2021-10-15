import React, {
  ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { render } from "react-dom";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import {
  RowNode,
  RowNodeEvent,
} from "ag-grid-community/dist/lib/entities/rowNode";
import {
  ColumnApi,
  GridApi,
  GridReadyEvent,
  RowClickedEvent,
} from "ag-grid-community";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { Command } from "boot/model";
import { useAppSelector } from "app/hook";

interface Column {
  field: string;
  headerName: string;
  width?: number;
}

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

const columns: Column[] = [
  {
    field: "EditPriority",
    headerName: "更改优先级",
  },
  {
    field: "CommandNo",
    headerName: "指令号",
  },
  {
    field: "Priority",
    headerName: "优先级",
  },
  {
    headerName: "跨号",
    field: "BayNo",
  },
  {
    headerName: "行车号",
    field: "CraneNo",
  },
  {
    headerName: "材料号",
    field: "CoilNo",
  },
  {
    headerName: "指令类型",
    field: "CommandType",
  },
  {
    headerName: "起始库位",
    field: "StartStock",
  },
  {
    headerName: "卸下库位",
    field: "ToStock",
  },
  {
    headerName: "指令状态",
    field: "CommandStatus",
  },
  {
    headerName: "可吊标志",
    field: "PickupFlag",
  },
  {
    headerName: "更新时间",
    field: "UpdateTime",
  },
];

interface Data extends Command {
  id: number;
  Selected: boolean;
  EditPriority: any[];
}

interface Props {
  onSelected?: any;
}

const Index = () => {
  const [gridApi, setGridApi] = useState<GridApi>();
  const [gridColumnApi, setGridColumnApi] = useState<ColumnApi>();
  const classes = useStyles();
  const commands = useAppSelector((state) => state.commands);

  const [rowData, setRowData] = useState<any[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  const onGridReady = (params: RowClickedEvent) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
    const updateData = (data: React.SetStateAction<any[]>) => {
      setRowData(data);
    };
  };

  const thisStyle = () => {
    let width = "100%";
    let height = window.innerHeight * 0.55;

    return { width: width, height: height, border: "1px solid #D0D0D0" };
  };

  return (
    <div style={thisStyle()}>
      <div className={classes.exampleWrapper} ref={ref}>
        <div style={{ marginBottom: "5px" }}></div>
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
            isExternalFilterPresent={() => true}
            onGridReady={onGridReady}
            rowData={rowData}
            rowSelection={"multiple"}
          >
            <AgGridColumn
              field="EditPriority"
              headerCheckboxSelection={true}
              headerCheckboxSelectionFilteredOnly={true}
              checkboxSelection={true}
            ></AgGridColumn>
            <AgGridColumn field="CommandNo" minWidth={150} />
            <AgGridColumn field="Priority" />
            <AgGridColumn field="BayNo" minWidth={150} />
            <AgGridColumn field="CraneNo" minWidth={150} />
            <AgGridColumn field="CoilNo" />
            <AgGridColumn field="CommandType" />
            <AgGridColumn field="StartStock" />
            <AgGridColumn field="ToStock" />
            <AgGridColumn field="CommandStatus" />
            <AgGridColumn field="PickupFlag" />
            <AgGridColumn field="UpdateTime" />
          </AgGridReact>
        </div>
      </div>
    </div>
  );
};
export default Index;
