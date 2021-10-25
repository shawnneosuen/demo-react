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
import { Bay, Coil, Command, PlanModel, StockSaddle } from "boot/model";
import { useAppSelector } from "app/hook";
import { coilOpenDirectionMapping, CommandMapping } from "boot/utils/mapping";
import { useDebounce } from "utils";
import { sleep } from "boot/utils";
import { columns, DataModel } from "./Setup";

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
  const plans = useAppSelector((state) => state.plan).plans;
  const coils = useAppSelector((state) => state.coils).coils;
  const equipmentStocks = useAppSelector(
    (state) => state.yard
  ).equipmentSaddles;

  // 设置计算频率
  const debounceParams = useDebounce(rowData, 3000);

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
      let height = 375;
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

  const data = useData(plans, coils, equipmentStocks);
  useEffect(() => {
    if (data) {
      setRowData(data);
    }
  }, [debounceParams]);
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
        {columns.map((column) => (
          <AgGridColumn
            field={column.field}
            headerName={column.headerName}
            key={column.field}
          />
        ))}
      </AgGridReact>
    </div>
  );
};
export default Index;

const useData = (
  plans: PlanModel[],
  coils: Coil[],
  stockSaddles: StockSaddle[]
) => {
  const [data, setData] = useState<DataModel[]>([]);
  useEffect(() => {
    if (plans.length <= 0) {
      console.error("为查询到计划");
      return;
    }

    let stockIdList: string[] = [];
    const targetCoils = coils.filter((coil: Coil) => {
      if (
        plans
          .map((planTemp: PlanModel) => planTemp.COIL_NO)
          .includes(coil.MAT_NO)
      ) {
        if (coil.ST_NO) {
          stockIdList.push(coil.ST_NO);
        }

        return true;
      } else {
        return false;
      }
    });

    let dataList: DataModel[] = [];
    let index = 0;
    targetCoils.forEach((coil: Coil) => {
      let data: DataModel = {
        INDEX: index++,
        MAT_NO: coil.MAT_NO,
        SCHEDULE_NO:
          plans.find((planTemp: PlanModel) => planTemp.COIL_NO === coil.MAT_NO)
            ?.ID ?? "",
        WEIGHT: coil.WEIGHT ?? 0,
        WIDTH: coil.WIDTH ?? 0,
        INDIA: coil.INDIA ?? 0,
        OUTDIA: coil.OUTDIA ?? 0,
        PACKAGE_STATUS: coil.PACK_CODE ?? "未知",
        COIL_OPEN_DIRECTION: coilOpenDirectionMapping(coil.COIL_OPEN_DIRECTION),
        STOCK_NO: coil.ST_NO ?? "",
        STOCK_STATUS: coil.ST_NO ? "鞍座占用" : "未知",
        STOCK_TYPE: !coil.ST_NO
          ? "未知"
          : judgeStockType(
              coil.ST_NO,
              stockSaddles.map(
                (stockSaddleTemp: StockSaddle) => stockSaddleTemp.id
              )
            ),
        TIME:
          plans.find((planTemp: PlanModel) => planTemp.COIL_NO === coil.MAT_NO)
            ?.TIME ?? "",
      };
      dataList.push(data);
    });
    setData(dataList);
  }, [plans]);

  return data;
};

/**
 * @description: 判断鞍座类型
 * @param {string} stockNo
 * @param {string} equipmentStocks
 * @return {*}
 * @author: Shawnneosuen@outlook.com
 */
const judgeStockType = (stockNo: string, equipmentStocks: string[]) => {
  if (equipmentStocks.includes(stockNo)) {
    return "机组鞍座";
  } else {
    return "库区内普通鞍座";
  }
};
