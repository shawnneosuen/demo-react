import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import Paper from "@material-ui/core/Paper";
import {
  AutoSizer,
  Column,
  Table,
  TableCellRenderer,
  TableHeaderProps,
} from "react-virtualized";
import { useDebounce } from "utils";
import { query } from "boot/api";
import { useStatusContext } from "context/BasePageStatus";
import { Button, ButtonBase, Checkbox, Grid } from "@material-ui/core";
import { useAppSelector } from "app/hook";
import { Command, Commands } from "boot/model";
import { useTabelStatusContext } from "../context/TableStatus";
import { FilterCondition } from "../context/model";

declare module "@material-ui/core/styles/withStyles" {
  // Augment the BaseCSSProperties so that we can control jss-rtl
  interface BaseCSSProperties {
    /*
     * Used to control if the rule-set should be affected by rtl transformation
     */
    flip?: boolean;
  }
}

const styles = (theme: Theme) =>
  createStyles({
    flexContainer: {
      display: "flex",
      alignItems: "center",
      boxSizing: "border-box",
    },
    table: {
      "& .ReactVirtualized__Table__headerRow": {
        flip: false,
        paddingRight: theme.direction === "rtl" ? "0 !important" : undefined,
      },
    },
    tableRow: {
      cursor: "pointer",
    },
    tableRowHover: {
      "&:hover": {
        backgroundColor: theme.palette.grey[200],
      },
    },
    tableCell: {
      flex: 1,
    },
    noClick: {
      cursor: "initial",
    },
  });

interface ColumnData {
  dataKey: string;
  label: string;
  numeric?: boolean;
  buttons?: boolean;
  check?: boolean;
  width: number;
}

interface Row {
  index: number;
}

interface MuiVirtualizedTableProps extends WithStyles<typeof styles> {
  columns: ColumnData[];
  headerHeight?: number;
  onRowClick?: () => void;
  rowCount: number;
  rowGetter: (row: Row) => Data;
  rowHeight?: number;
}

class MuiVirtualizedTable extends React.PureComponent<MuiVirtualizedTableProps> {
  static defaultProps = {
    headerHeight: 48,
    rowHeight: 48,
  };

  getRowClassName = ({ index }: Row) => {
    const { classes, onRowClick } = this.props;

    return clsx(classes.tableRow, classes.flexContainer, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null,
    });
  };

  cellRenderer: TableCellRenderer = ({ cellData, columnIndex }) => {
    const { columns, classes, rowHeight, onRowClick } = this.props;
    return (
      <TableCell
        component="div"
        className={clsx(classes.tableCell, classes.flexContainer, {
          [classes.noClick]: onRowClick == null,
        })}
        variant="body"
        style={{ height: rowHeight }}
        align={
          (columnIndex != null && columns[columnIndex].numeric) || false
            ? "right"
            : "left"
        }
      >
        {columnIndex != null && !columns[columnIndex].buttons ? (
          cellData
        ) : (
          <Grid container>
            <Grid item xs={6}>
              {" "}
              <Button>{cellData[0]}</Button>
            </Grid>
            <Grid item xs={6}>
              {" "}
              <Button>{cellData[1]}</Button>
            </Grid>
          </Grid>
        )}

        {columnIndex != null && !columns[columnIndex].check ? (
          ""
        ) : (
          <Checkbox></Checkbox>
        )}
      </TableCell>
    );
  };

  headerRenderer = ({
    label,
    columnIndex,
  }: TableHeaderProps & { columnIndex: number }) => {
    const { headerHeight, columns, classes } = this.props;

    return (
      <TableCell
        component="div"
        className={clsx(
          classes.tableCell,
          classes.flexContainer,
          classes.noClick
        )}
        variant="head"
        style={{ height: headerHeight, backgroundColor: "#D0D0D0" }}
        align={"left"}
      >
        {columnIndex != null && !columns[columnIndex].check ? (
          <span>{label}</span>
        ) : (
          <Checkbox></Checkbox>
        )}
      </TableCell>
    );
  };

  render() {
    const { classes, columns, rowHeight, headerHeight, ...tableProps } =
      this.props;
    return (
      <AutoSizer>
        {({ height, width }) => (
          <Table
            height={height}
            width={width}
            rowHeight={rowHeight!}
            gridStyle={{
              direction: "inherit",
            }}
            headerHeight={headerHeight!}
            className={classes.table}
            {...tableProps}
            rowClassName={this.getRowClassName}
          >
            {columns.map(({ dataKey, ...other }, index) => {
              return (
                <Column
                  key={dataKey}
                  headerRenderer={(headerProps) =>
                    this.headerRenderer({
                      ...headerProps,
                      columnIndex: index,
                    })
                  }
                  className={classes.flexContainer}
                  cellRenderer={this.cellRenderer}
                  dataKey={dataKey}
                  {...other}
                />
              );
            })}
          </Table>
        )}
      </AutoSizer>
    );
  }
}

const VirtualizedTable = withStyles(styles)(MuiVirtualizedTable);

// ---

interface Data extends Command {
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

export default function ReactVirtualizedTable() {
  const commands = useAppSelector((state) => state.commands);
  const { filter } = useTabelStatusContext();
  const [rows, setRows] = useState<Data[]>([]);

  const ref = useRef<HTMLDivElement>(null);

  const thisStyle = () => {
    let width = "100%";
    let height = window.innerHeight * 0.55;

    return { width: width, height: height, border: "1px solid #D0D0D0" };
  };

  const [itemWidth, setItemWidth] = useState<number>(0);
  useEffect(() => {
    setItemWidth(ref.current ? ref.current.offsetWidth / 4 : 0);
  }, [ref.current]);

  const filterData = useFilter(commands.commands, filter);

  useEffect(() => {
    let rowsTemp: Data[] = [];
    if (filterData) {
      for (const item of filterData) {
        let itemTemp: Data = {
          Selected: false,
          EditPriority: ["提升", "取消"],
          ...item,
        };
        rowsTemp.push(itemTemp);
      }
    } else {
      for (const item of commands.commands) {
        let itemTemp: Data = {
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
    <Paper style={thisStyle()} ref={ref}>
      <VirtualizedTable
        rowCount={rows.length}
        rowGetter={({ index }) => rows[index]}
        columns={[
          {
            width: itemWidth,
            label: "全选",
            dataKey: "SelectFlag",
            check: true,
          },
          {
            width: itemWidth,
            label: "更改优先级",
            dataKey: "EditPriority",
            buttons: true,
          },
          {
            width: itemWidth,
            label: "指令号",
            dataKey: "CommandNo",
          },
          {
            width: itemWidth,
            label: "优先级",
            dataKey: "Priority",
          },
          {
            width: itemWidth,
            label: "跨号",
            dataKey: "BayNo",
          },
          {
            width: itemWidth,
            label: "行车号",
            dataKey: "CraneNo",
          },
          {
            width: itemWidth,
            label: "材料号",
            dataKey: "CoilNo",
          },
          {
            width: itemWidth,
            label: "指令类型",
            dataKey: "CommandType",
          },
          {
            width: itemWidth,
            label: "起始库位",
            dataKey: "StartStock",
          },
          {
            width: itemWidth,
            label: "卸下库位",
            dataKey: "ToStock",
          },
          {
            width: itemWidth,
            label: "指令状态",
            dataKey: "CommandStatus",
          },
          {
            width: itemWidth,
            label: "可吊标志",
            dataKey: "PickupFlag",
          },
          {
            width: itemWidth,
            label: "更新时间",
            dataKey: "UpdateTime",
          },
        ]}
      />
    </Paper>
  );
}

const useFilter = (commands: Command[], filter: FilterCondition | null) => {
  const [value, setValue] = useState<Command[]>([]);
  let commandsTemp: Command[] = [];

  useEffect(() => {
    console.log(filter);
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
      console.log("执行筛选");

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
