/*
 * @Description:
 * @Version: 2.0
 * @Autor: Shawnneosuen@outlook.com
 * @Date: 2021-09-14 14:27:55
 * @LastEditors: Shawnneosuen@outlook.com
 * @LastEditTime: 2021-10-07 17:46:21
 */
import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
  SplineSeries,
  Legend,
  Title,
} from "@devexpress/dx-react-chart-material-ui";
import { ValueScale, Animation, PieSeries } from "@devexpress/dx-react-chart";
import {
  createStyles,
  makeStyles,
  styled,
  Theme,
  withStyles,
} from "@material-ui/core";
import { useSelector, useStore } from "react-redux";
import { selectYard } from "store/yardSlice";
import { useDebounce } from "utils";

const chartData = [
  { name: "PY", value: 20 },
  { name: "ZY", value: 20 },
  { name: "LY", value: 20 },
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    Chart: {
      height: "100px",
    },
    root: {
      // display: "flex",
      margin: "auto",
      flexDirection: "row",
    },
    label: {
      paddingTop: theme.spacing(1),
    },
    item: {
      flexDirection: "row",
      flexGrow: 1,
    },
  })
);

interface DataModel {
  name: string;
  value: number;
}

const Index = () => {
  const classes = useStyles();
  const bayIds = useSelector(selectYard).bayIds;
  const [chartData, setChartData] = useState<DataModel[]>([]);

  const debounceParam = useDebounce(chartData, 3000);
  useEffect(() => {
    if (bayIds.length > 0) {
      let datasTemp: DataModel[] = [];
      for (const bayId of bayIds) {
        let dataTemp: DataModel = {
          name: bayId,
          value: 20,
        };
        datasTemp.push(dataTemp);
      }
      setChartData(datasTemp);
    }
  }, [debounceParam]);

  //   const bay = useSelector(selectYard).bays.get(bayId);

  const LegendRootBase = (
    { ...restProps },
    { children }: { children: React.ReactNode }
  ) => (
    <Legend.Root children={children} {...restProps} className={classes.root} />
  );
  const LegendLabelBase = ({ ...restProps }) => (
    <Legend.Label text={"value"} {...restProps} className={classes.label} />
  );
  const LegendItemBase = (
    { ...restProps },
    { children }: { children: React.ReactNode }
  ) => (
    <Legend.Item children={children} {...restProps} className={classes.item} />
  );

  const LegendRoot = LegendRootBase;
  const LegendLabel = LegendLabelBase;
  const LegendItem = LegendItemBase;

  return (
    <Chart data={chartData} height={400} width={400}>
      <PieSeries
        valueField="value"
        argumentField="name"
        name={"name"}
        color={"primary"}
      />
      <Animation />
      <Legend
        position="right"
        rootComponent={LegendRoot}
        itemComponent={LegendItem}
        labelComponent={LegendLabel}
      />
    </Chart>
  );
};

export default Index;
