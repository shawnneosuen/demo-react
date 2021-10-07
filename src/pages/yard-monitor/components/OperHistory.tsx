import React, { useEffect, useState } from "react";
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
        align={"left"}
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
        style={{ height: headerHeight }}
        align={columns[columnIndex].numeric || false ? "right" : "left"}
      >
        <span>{label}</span>
      </TableCell>
    );
  };

  render() {
    const { classes, columns, rowHeight, headerHeight, ...tableProps } =
      this.props;
    return (
      <AutoSizer size={"small"}>
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
  MODULE: string;
  USER_ID: string;
  ACTION: string;
  REC_TIME: string;
}
type DataModel = [string, string, string, string];

// const sample: Sample[] = [
// ]

function createData(
  MODULE: string,
  USER_ID: string,
  ACTION: string,
  REC_TIME: string
): Data {
  return { MODULE, USER_ID, ACTION, REC_TIME };
}

// function createData(
// 	id: number,
// 	dessert: string,
// 	calories: number,
// 	fat: number,
// 	carbs: number,
// 	protein: number
// ): Data {
// 	return { id, dessert, calories, fat, carbs, protein }
// }

// const rows: Data[] = []

// for (let i = 0; i < 200; i += 1) {
// 	const randomSelection = sample[Math.floor(Math.random() * sample.length)]
// 	rows.push(createData(i, ...randomSelection))
// }

interface Props {
  style: Object;
}

export default function ReactVirtualizedTable({ style }: Props) {
  const [rows, setRows] = useState<Data[]>([]);

  const debounceParam = useDebounce(rows, 3);
  useEffect(() => {
    const sql =
      "select MODULE, USER_ID, ACTION, REC_TIME from UACS_WEB_USER_RECORD order by REC_TIME desc fetch first 200 rows only";
    let queryData = query(sql).then((data) => {
      let rowsTemp: Data[] = [];
      if (data) {
        for (const subData of data.data) {
          if (subData) {
            rowsTemp.push(
              createData(subData[0], subData[1], subData[2], subData[3])
            );
          }
        }
      }

      setRows(rowsTemp);
    });
  }, [debounceParam]);

  return (
    <Paper style={style}>
      <VirtualizedTable
        rowCount={rows.length}
        rowGetter={({ index }) => rows[index]}
        columns={[
          {
            width: 250,
            label: "模块",
            dataKey: "MODULE",
          },
          {
            width: 150,
            label: "操作人",
            dataKey: "USER_ID",
          },
          {
            width: 150,
            label: "事件",
            dataKey: "ACTION",
          },
          {
            width: 250,
            label: "时间",
            dataKey: "REC_TIME",
          },
        ]}
      />
    </Paper>
  );
}
