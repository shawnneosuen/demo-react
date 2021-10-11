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
        {cellData}
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
        <span>{label}</span>
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

interface Data {
  COIL_NO: string;
  oper: string;
  user: string;
  ip: string;
  date: string;
}
type DataModel = [string, string, string, string];

function createData(
  COIL_NO: string,
  oper: string,
  user: string,
  ip: string,
  date: string
): Data {
  return { COIL_NO, oper, user, ip, date };
}

export default function ReactVirtualizedTable() {
  const [rows, setRows] = useState<Data[]>([]);

  const ref = useRef<HTMLDivElement>(null);

  const { snackbar, setSnackbar } = useStatusContext();

  const debounceParam = useDebounce(rows, 2000);
  useEffect(() => {
    const sql = "select MAT_NO from UACS_SCHEDULE_COIL";
    let queryData = query(sql).then((data) => {
      if (data) {
        let rowsTemp: Data[] = [];
        for (const subData of data.data) {
          rowsTemp.push(createData(subData[0], "", "", "", ""));
        }
        setRows(rowsTemp);
      } else {
        setSnackbar({ msg: "网络连接失败", type: "error" });
      }
    });
  }, [debounceParam]);

  const thisStyle = () => {
    let width = "100%";
    let height = window.innerHeight * 0.55;

    return { width: width, height: height, border: "1px solid #D0D0D0" };
  };

  const [itemWidth, setItemWidth] = useState<number>(0);
  useEffect(() => {
    setItemWidth(ref.current ? ref.current.offsetWidth / 4 : 0);
    console.log(itemWidth);
  }, [ref.current]);
  return (
    <Paper style={thisStyle()} ref={ref}>
      <VirtualizedTable
        rowCount={rows.length}
        rowGetter={({ index }) => rows[index]}
        columns={[
          {
            width: itemWidth,
            label: "更改优先级",
            dataKey: "EditPriority",
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
            numeric: true,
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
