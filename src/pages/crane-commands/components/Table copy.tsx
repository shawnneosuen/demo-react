import * as React from "react";
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
} from "@material-ui/data-grid";
import { Command } from "boot/model";
import { useEffect, useRef, useState } from "react";
import { FilterCondition } from "../context/model";
import { useAppSelector } from "app/hook";
import { useTabelStatusContext } from "../context/TableStatus";

const columns: GridColDef[] = [];

interface Data extends Command {
  id: number;
  Selected: boolean;
  EditPriority: string[];
}
type DataModel = [
  string,
  string,
  string,
  number,
  string,
  string,
  boolean,
  number,
  string,
  string
];

function createData(
  id: number,
  Selected: boolean,
  EditPriority: string[],
  CommandNo: string,
  CommandType: string,
  Priority: number,
  CraneNo: string,
  StartStock: string,
  ToStock: string,
  CommandStatus: number,
  PickupFlag: boolean,
  CoilNo: string,
  BayNo: string,
  UpdateTime: string
): Data {
  return {
    id,
    Selected,
    EditPriority,
    CommandNo,
    CommandType,
    Priority,
    CraneNo,
    StartStock,
    ToStock,
    CommandStatus,
    PickupFlag,
    CoilNo,
    BayNo,
    UpdateTime,
  };
}

export default function DataTable() {
  const commands = useAppSelector((state) => state.commands);
  const { filter } = useTabelStatusContext();
  const [rows, setRows] = useState<Data[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  const [selectedRows, setSelectedRows] = useState<Data[]>([]);
  const [checkedAll, onCheckedAll] = useState<boolean>(false);

  const thisStyle = () => {
    let width = "100%";
    let height = window.innerHeight * 0.55;

    return { width: width, height: height, border: "1px solid #D0D0D0" };
  };

  const [itemWidth, setItemWidth] = useState<number>(0);
  useEffect(() => {
    setItemWidth(ref.current ? ref.current.offsetWidth / 12 : 0);
  }, [ref.current]);

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
    setRows(rowsTemp);
  }, [filterData, commands.commands]);

  return (
    <div style={{ height: 400, width: "100%" }} ref={ref}>
      <DataGrid
        style={thisStyle()}
        rows={rows}
        columns={[
          {
            field: "EditPriority",
            headerName: "更改优先级",
            width: itemWidth,
          },
          {
            field: "CommandNo",
            headerName: "指令号",
            width: itemWidth,
          },
          {
            field: "Priority",
            headerName: "优先级",
            width: itemWidth,
          },
          {
            width: itemWidth,
            headerName: "跨号",
            field: "BayNo",
          },
          {
            width: itemWidth,
            headerName: "行车号",
            field: "CraneNo",
          },
          {
            width: itemWidth,
            headerName: "材料号",
            field: "CoilNo",
          },
          {
            width: itemWidth,
            headerName: "指令类型",
            field: "CommandType",
          },
          {
            width: itemWidth,
            headerName: "起始库位",
            field: "StartStock",
          },
          {
            width: itemWidth,
            headerName: "卸下库位",
            field: "ToStock",
          },
          {
            width: itemWidth,
            headerName: "指令状态",
            field: "CommandStatus",
          },
          {
            width: itemWidth,
            headerName: "可吊标志",
            field: "PickupFlag",
          },
          {
            width: itemWidth,
            headerName: "更新时间",
            field: "UpdateTime",
          },
        ]}
        pageSize={5}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}

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
