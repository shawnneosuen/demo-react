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
import { FilterCondition } from "../context/model";
import { useAppSelector } from "app/hook";
import { useTabelStatusContext } from "../context/TableStatus";
import { useStatusContext } from "context/BasePageStatus";

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
  EditPriority: string[];
}

interface Props {
  onSelected?: any;
}

const Index = ({ onSelected: handleSelect }: Props) => {
  const [gridApi, setGridApi] = useState<GridApi>();
  const [gridColumnApi, setGridColumnApi] = useState<ColumnApi>();
  const classes = useStyles();
  const commands = useAppSelector((state) => state.commands);
  const { filter, setFilterConditon, getFilterCondifion } =
    useTabelStatusContext();

  const [rowData, setRowData] = useState<any[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  const onGridReady = (params: RowClickedEvent) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
    const updateData = (data: React.SetStateAction<any[]>) => {
      setRowData(data);
    };
    handleSelect(gridApi?.getSelectedRows);
  };

  const onSelectionChanged = () => {
    handleSelect(gridApi?.getSelectedRows());
  };

  const thisStyle = () => {
    let width = "100%";
    let height = window.innerHeight * 0.55;

    return { width: width, height: height, border: "1px solid #D0D0D0" };
  };

  const filterData = useFilter(commands.commands, filter);
  useEffect(() => {
    let rowsTemp: Data[] = [];
    let index = 0;
    if (filterData) {
      for (const item of filterData) {
        let itemTemp: Data = {
          id: index++,
          Selected: false,
          EditPriority: ["提升", "取消"],
          ...item,
        };
        rowsTemp.push(itemTemp);
      }
    } else {
      for (const item of commands.commands) {
        let itemTemp: Data = {
          id: index++,
          Selected: false,
          EditPriority: ["提升", "取消"],
          ...item,
        };
        rowsTemp.push(itemTemp);
      }
    }
    setRowData(rowsTemp);
  }, [filterData, commands.commands]);

  useEffect(() => {
    gridApi?.onFilterChanged();
    gridApi?.onFilterChanged();
    gridApi?.onFilterChanged();
    console.log(1111111111111);
    // setTimeout(() => {
    //   setTest(() => doesExternalFilterPass);
    // }, 1000);
  }, [filter]);
  //   setTest(() => doesExternalFilterPass);

  const doesExternalFilterPass = (node: RowNode) => {
    if (
      filter &&
      (!!filter.BayNo ||
        !!filter.CoilNoFilter ||
        !!filter.CommandTypeFilter ||
        !!filter.CraneNoFileter ||
        !!filter.WorkingTypeFilter ||
        !!filter.ZoneFilter)
    ) {
      let filterTemp = filter;
      return (
        node.data?.ZoneFilter == filterTemp?.ZoneFilter ||
        node.data?.WorkingTypeFilter == filterTemp?.WorkingTypeFilter ||
        node.data?.CraneNoFileter == filterTemp?.CraneNoFileter ||
        node.data?.CommandTypeFilter == filterTemp?.CommandTypeFilter ||
        node.data?.CoilNoFilter == filterTemp?.CoilNoFilter ||
        node.data?.BayNo == filterTemp?.BayNo
      );
    } else {
      return true;
    }
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
            doesExternalFilterPass={doesExternalFilterPass}
            onGridReady={onGridReady}
            rowData={rowData}
            rowSelection={"multiple"}
            onSelectionChanged={onSelectionChanged}
            // onFilterChanged={}
          >
            <AgGridColumn
              field="EditPriority"
              headerCheckboxSelection={true}
              headerCheckboxSelectionFilteredOnly={true}
              checkboxSelection={true}
            />
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

const useFilter = (commands: Command[], filter: FilterCondition | null) => {
  const [value, setValue] = useState<Command[]>([]);
  let commandsTemp: Command[] = [];

  useEffect(() => {
    if (
      filter &&
      commands &&
      (filter.BayNo !== "" ||
        filter.CoilNoFilter !== "" ||
        filter.CommandTypeFilter !== "" ||
        filter.CraneNoFileter !== "" ||
        filter.WorkingTypeFilter !== "" ||
        filter.ZoneFilter !== "")
    ) {
      if (filter.BayNo) {
        commandsTemp = commands.filter((temp: Command) =>
          temp.BayNo.includes(filter.BayNo)
        );
      }
      if (filter.CoilNoFilter) {
        commandsTemp = commands.filter((temp: Command) =>
          temp.CoilNo.includes(filter.CoilNoFilter)
        );
      }
      if (filter.CommandTypeFilter) {
        commandsTemp = commands.filter((temp: Command) =>
          temp.CommandType.includes(filter.BayNo)
        );
      }
      if (filter.CraneNoFileter) {
        commandsTemp = commands.filter((temp: Command) =>
          temp.CraneNo.includes(filter.CraneNoFileter)
        );
      }

      if (filter.WorkingTypeFilter) {
        commandsTemp = commands.filter(
          (temp: Command) =>
            temp.CommandStatus === Number.parseInt(filter.WorkingTypeFilter)
        );
      }
      if (filter.ZoneFilter) {
        commandsTemp = commands.filter((temp: Command) =>
          temp.BayNo.includes(filter.BayNo)
        );
      }
    } else {
      commandsTemp = commands;
    }
    setValue(commandsTemp);
  }, [filter, commands]);

  return value;
};
