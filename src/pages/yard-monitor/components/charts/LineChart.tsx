/*
 * @Description:
 * @Version: 2.0
 * @Autor: Shawnneosuen@outlook.com
 * @Date: 2021-09-08 20:26:28
 * @LastEditors: Shawnneosuen@outlook.com
 * @LastEditTime: 2021-10-09 10:36:24
 */
import React, { useEffect, useState } from "react";
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
  Title,
} from "@devexpress/dx-react-chart-material-ui";
import { ValueScale, Animation, LineSeries } from "@devexpress/dx-react-chart";
import { useSelector } from "react-redux";
import { selectYard } from "features/yard/yardSlice";
import { useDebounce } from "utils";
interface DataModel {
  name: string;
  value: number;
}

const Index = () => {
  const bayIds = useSelector(selectYard).bayIds;
  const [chartData, setChartData] = useState<DataModel[]>([
    { name: "1", value: Math.random() },
    { name: "2", value: Math.random() },
    { name: "3", value: Math.random() },
    { name: "4", value: Math.random() },
    { name: "5", value: Math.random() },
  ]);
  const debounceParam = useDebounce(chartData, 3000);
  const [time, setTime] = useState<string>("");
  const [timeList, setTimeList] = useState<string[]>([
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
  ]);

  useEffect(() => {
    setTime(new Date().toLocaleTimeString());
  }, [debounceParam]);
  useEffect(() => {
    let datasTemp: DataModel[] = [];
    datasTemp = JSON.parse(JSON.stringify(chartData));

    datasTemp.shift();

    let dataTemp: DataModel = {
      name: time,
      value: Math.random(),
    };
    datasTemp.push(dataTemp);
    console.log(chartData);

    setChartData(datasTemp);
  }, [time]);
  return (
    <div>
      <Chart data={chartData} height={400} width={500}>
        <ValueScale name="value" />

        <ArgumentAxis />
        <ValueAxis scaleName="value" showGrid={false} showLine />

        <LineSeries
          name="Units Sold"
          valueField="value"
          argumentField="name"
          scaleName="value"
        />

        <Animation duration={1000} />
        <Title text={"自动化率"}></Title>
      </Chart>
    </div>
  );
};

export default Index;
