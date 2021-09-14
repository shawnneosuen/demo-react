import React from "react";
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
import { createStyles, makeStyles, styled, Theme } from "@material-ui/core";

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
  })
);
const Index = () => {
  const classes = useStyles();
  return (
    <Chart data={chartData} height={200} width={200}>
      <PieSeries valueField="value" argumentField="name" />
      <Animation />
    </Chart>
  );
};

export default Index;
