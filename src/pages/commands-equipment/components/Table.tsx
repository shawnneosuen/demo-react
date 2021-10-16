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
    field: "CommandNo",
    headerName: "CommandNo",
  },
  {
    field: "CommandType",
    headerName: "CommandType",
  },
  {
    headerName: "CoilNo",
    field: "CoilNo",
  },
  {
    headerName: "Priority",
    field: "Priority",
  },
  {
    headerName: "StartStock",
    field: "StartStock",
  },
  {
    headerName: "ToStock",
    field: "ToStock",
  },
  {
    headerName: "PickupFlag",
    field: "PickupFlag",
  },
  {
    headerName: "CommandStatus",
    field: "CommandStatus",
  },
  {
    headerName: "CraneNo",
    field: "CraneNo",
  },
  {
    headerName: "BayNo",
    field: "BayNo",
  },
  {
    headerName: "UpdateTime",
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

  const thisStyle = () => {
    let width = "100%";
    let height = window.innerHeight * 0.5;

    return { width: width, height: height, border: "1px solid #D0D0D0" };
  };

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
    <div style={thisStyle()}>
      <div className={classes.exampleWrapper} ref={ref}>
        {/* <div style={{ marginBottom: "5px" }}></div> */}
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
            getRowStyle={changeRowStyle}
            // onFilterChanged={}
          >
            <AgGridColumn
              field="CommandNo"
              minWidth={150}
              headerCheckboxSelection={true}
              headerCheckboxSelectionFilteredOnly={true}
              checkboxSelection={true}
            />
            <AgGridColumn field="CommandType" />
            <AgGridColumn field="CoilNo" minWidth={150} />
            <AgGridColumn field="Priority" minWidth={150} />
            <AgGridColumn field="StartStock" />
            <AgGridColumn field="ToStock" />
            <AgGridColumn field="PickupFlag" />
            <AgGridColumn field="CommandStatus" />
            <AgGridColumn field="CraneNo" />
            <AgGridColumn field="BayNo" />
            <AgGridColumn field="UpdateTime" />
          </AgGridReact>
        </div>
      </div>
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
