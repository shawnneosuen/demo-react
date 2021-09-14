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
import { ValueScale, Animation } from "@devexpress/dx-react-chart";

const chartData = [
  { name: "PY", value: 20 },
  { name: "ZY", value: 20 },
  { name: "LY", value: 20 },
];

const Index = () => {
  return (
    <div>
      <Chart data={chartData}>
        <ValueScale name="value" />

        <ArgumentAxis />
        <ValueAxis scaleName="value" showGrid={false} showLine />

        <BarSeries
          name="Units Sold"
          valueField="value"
          argumentField="name"
          scaleName="value"
        />

        <Animation />
        <Title text={"库容量"}></Title>
      </Chart>
    </div>
  );
};

export default Index;
