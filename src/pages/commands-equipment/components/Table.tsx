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
import { Button, createStyles, makeStyles, Theme } from "@material-ui/core";
import { Coil, Command } from "boot/model";
import { useAppSelector } from "app/hook";
import { CommandMapping } from "boot/utils/mapping";
import { useDebounce } from "utils";
import { sleep } from "boot/utils";

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
      height: window.innerHeight * 0.7,
    },

    myGrid: {
      flex: "1 1 0px",
      width: "100%",
    },
  })
);

const columns: Column[] = [
  {
    field: "CommandNo",
    headerName: "指令号",
  },
  {
    field: "CommandType",
    headerName: "指令类型",
  },
  {
    headerName: "钢卷号",
    field: "CoilNo",
  },
  {
    headerName: "优先级",
    field: "Priority",
  },
  {
    headerName: "起始鞍座位",
    field: "StartStock",
  },
  {
    headerName: "落关鞍座位",
    field: "ToStock",
  },
  {
    headerName: "起吊标志",
    field: "PickupFlag",
  },
  {
    headerName: "指令状态",
    field: "CommandStatus",
  },
  {
    headerName: "行车号",
    field: "CraneNo",
  },
  {
    headerName: "跨号",
    field: "BayNo",
  },
  {
    headerName: "更新时间",
    field: "UpdateTime",
  },
];

interface Data extends Command {
  id: number;
  Selected: boolean;
}

interface Props {
  filterValue?: string;
}

const Index = ({ filterValue }: Props) => {
  const [gridApi, setGridApi] = useState<GridApi>();
  const [gridColumnApi, setGridColumnApi] = useState<ColumnApi>();
  const classes = useStyles();

  const [rowData, setRowData] = useState<any[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  const onGridReady = (params: RowClickedEvent) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
    const updateData = (data: React.SetStateAction<any[]>) => {
      setRowData(data);
    };
  };

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
      let height = 360;
      elements.forEach((element) => {
        height += element.clientHeight;
      });
      height += 16;
      setHeight(`calc(100vh - ${height}px)`);
    });
  }, [rowData]);

  // Set row styles
  const changeRowStyle = (params: { data: { CommandStatus: number } }) => {
    console.log("params", params);

    if (params.data.CommandStatus === 1) {
      return { backgroundColor: " red" };
    } else {
      return { backgroundColor: "white" };
    }
  };

  const coils = useFilter(
    useAppSelector((state) => state.commands).commands,
    filterValue
  );

  // const debounceParam = useDebounce(coils, 3000);

  useEffect(() => {
    setRowData(coils);
  }, [coils]);
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
        getRowStyle={changeRowStyle}
        // onFilterChanged={}
      >
        <AgGridColumn
          field="CommandNo"
          minWidth={150}
          headerCheckboxSelection={true}
          headerCheckboxSelectionFilteredOnly={true}
          checkboxSelection={true}
          headerName={columns[0].headerName}
        />
        <AgGridColumn field="CommandType" headerName={columns[1].headerName} />
        <AgGridColumn
          field="CoilNo"
          minWidth={150}
          headerName={columns[2].headerName}
        />
        <AgGridColumn
          field="Priority"
          minWidth={150}
          headerName={columns[3].headerName}
        />
        <AgGridColumn field="StartStock" headerName={columns[4].headerName} />
        <AgGridColumn field="ToStock" headerName={columns[5].headerName} />
        <AgGridColumn field="PickupFlag" headerName={columns[6].headerName} />
        <AgGridColumn
          field="CommandStatus"
          headerName={columns[7].headerName}
        />
        <AgGridColumn field="CraneNo" headerName={columns[8].headerName} />
        <AgGridColumn field="BayNo" headerName={columns[9].headerName} />
        <AgGridColumn field="UpdateTime" headerName={columns[10].headerName} />
      </AgGridReact>
    </div>
  );
};
export default Index;

const useFilter = (commands: Command[], filter: string | undefined) => {
  const [value, setValue] = useState<Command[]>([]);
  let commandTemp: Command[] = [];

  useEffect(() => {
    if (commandTemp) {
      commandTemp = commands.filter(
        (temp: Command) =>
          temp.CommandType.includes("21" + "") ||
          temp.CommandType.includes("14" + "")
      );

      setValue(commandTemp);
    }
  }, [filter]);

  return value;
};
