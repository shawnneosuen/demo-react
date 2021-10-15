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
    headerName: "计划内序号",
  },
  {
    field: "CommandNo",
    headerName: "材料号",
  },
  {
    field: "Priority",
    headerName: "计划号",
  },
  {
    headerName: "重量",
    field: "BayNo",
  },
  {
    headerName: "宽度",
    field: "CraneNo",
  },
  {
    headerName: "内径",
    field: "CoilNo",
  },
  {
    headerName: "外径",
    field: "CommandType",
  },
  {
    headerName: "包装状态",
    field: "StartStock",
  },
  {
    headerName: "开卷方向",
    field: "ToStock",
  },
  {
    headerName: "鞍座号",
    field: "CommandStatus",
  },
  {
    headerName: "鞍座状态",
    field: "PickupFlag",
  },
  {
    headerName: "鞍座类型",
    field: "UpdateTime",
  },
  {
    headerName: "时间",
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
    let height = window.innerHeight * 0.5;

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
              headerName={columns[0].headerName}
            ></AgGridColumn>
            <AgGridColumn
              field="CommandNo"
              minWidth={150}
              headerName={columns[1].headerName}
            />
            <AgGridColumn field="Priority" headerName={columns[2].headerName} />
            <AgGridColumn
              field="BayNo"
              minWidth={150}
              headerName={columns[3].headerName}
            />
            <AgGridColumn
              field="CraneNo"
              minWidth={150}
              headerName={columns[4].headerName}
            />
            <AgGridColumn field="CoilNo" headerName={columns[5].headerName} />
            <AgGridColumn
              field="CommandType"
              headerName={columns[6].headerName}
            />
            <AgGridColumn
              field="StartStock"
              headerName={columns[7].headerName}
            />
            <AgGridColumn field="ToStock" headerName={columns[8].headerName} />
            <AgGridColumn
              field="CommandStatus"
              headerName={columns[9].headerName}
            />
            <AgGridColumn
              field="PickupFlag"
              headerName={columns[10].headerName}
            />
            <AgGridColumn
              field="UpdateTime"
              headerName={columns[11].headerName}
            />
            <AgGridColumn
              field="UpdateTime"
              headerName={columns[12].headerName}
            />
          </AgGridReact>
        </div>
      </div>
    </div>
  );
};
export default Index;
