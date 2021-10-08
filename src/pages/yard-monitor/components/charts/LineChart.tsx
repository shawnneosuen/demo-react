/*
 * @Description:
 * @Version: 2.0
 * @Autor: Shawnneosuen@outlook.com
 * @Date: 2021-09-08 20:26:28
 * @LastEditors: Shawnneosuen@outlook.com
 * @LastEditTime: 2021-10-09 02:30:42
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
  const [chartData, setChartData] = useState<DataModel[]>([]);
  const debounceParam = useDebounce(chartData, 1000);
  const [time, setTime] = useState<string>("");
  const [timeList, setTimeList] = useState<string[]>([
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
  ]);
  const timeDebounce = useDebounce(timeList, 1000);

  useEffect(() => {
    setTime(new Date().toLocaleString());
    if (time) {
      setTimeList(pop(timeList, time));
      console.log(timeList);
    }
  }, [timeDebounce]);
  useEffect(() => {
    if (bayIds.length > 0) {
      let datasTemp: DataModel[] = [];
      // for (const temp of timeList) {
      //   let dataTemp: DataModel = {
      //     name: temp,
      //     value: Math.random(),
      //   };
      //   datasTemp.push(dataTemp);
      // }
      // timeList.forEach((temp) => {
      //   if (timeList.indexOf(temp) === timeList.length - 1) {
      //     datasTemp.push({
      //       name: temp,
      //       value: Math.random(),
      //     });
      //   }
      // });
      setChartData(datasTemp);
    }
  }, [debounceParam, timeList]);
  return (
    <div>
      <Chart data={chartData} height={400} width={400}>
        <ValueScale name="value" />

        <ArgumentAxis />
        <ValueAxis scaleName="value" showGrid={false} showLine />

        <LineSeries
          name="Units Sold"
          valueField="value"
          argumentField="name"
          scaleName="value"
        />

        <Animation />
        <Title text={"自动化率"}></Title>
      </Chart>
    </div>
  );
};

export default Index;

const pop = (arrayValue: string[], value: string) => {
  return [...arrayValue.filter((item) => arrayValue.indexOf(item) != 0), value];
};
