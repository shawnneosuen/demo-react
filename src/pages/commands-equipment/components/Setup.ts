/*
 * @Description:
 * @Version: 2.0
 * @Autor: Shawnneosuen@outlook.com
 * @Date: 2021-10-25 16:15:39
 * @LastEditors: Shawnneosuen@outlook.com
 * @LastEditTime: 2021-10-25 16:18:07
 */

import { Column } from "boot/model";

// 定义表格列名
export const columns: Column[] = [
  {
    field: "INDEX",
    headerName: "计划内序号",
  },
  {
    field: "MAT_NO",
    headerName: "钢卷号",
  },
  {
    headerName: "计划号",
    field: "SCHEDULE_NO",
  },
  {
    headerName: "重量",
    field: "WEIGHT",
  },
  {
    headerName: "宽度",
    field: "WIDTH",
  },
  {
    headerName: "内径",
    field: "INDIA",
  },
  {
    headerName: "外径",
    field: "OUTDIA",
  },
  {
    headerName: "包装状态",
    field: "PACKAGE_STATUS",
  },
  {
    headerName: "开卷方向",
    field: "COIL_OPEN_DIRECTION",
  },
  {
    headerName: "鞍座号",
    field: "STOCK_NO",
  },
  {
    headerName: "鞍座状态",
    field: "STOCK_STATUS",
  },
  {
    headerName: "鞍座类型",
    field: "STOCK_TYPE",
  },
  {
    headerName: "时间",
    field: "TIME",
  },
];

// 定义表格数据类型
export type DataModel = {
  INDEX: number;
  MAT_NO: string;
  SCHEDULE_NO: string;
  WEIGHT: number;
  WIDTH: number;
  INDIA: number;
  OUTDIA: number;
  PACKAGE_STATUS: string;
  COIL_OPEN_DIRECTION: string;
  STOCK_NO: string;
  STOCK_STATUS: string;
  STOCK_TYPE: string;
  TIME: string;
};
