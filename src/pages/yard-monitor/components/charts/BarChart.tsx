/*
 * @Description:
 * @Version: 2.0
 * @Autor: Shawnneosuen@outlook.com
 * @Date: 2021-09-08 20:26:28
 * @LastEditors: Shawnneosuen@outlook.com
 * @LastEditTime: 2021-10-08 02:32:02
 */
import React, { useEffect, useState } from "react";
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
  Title,
} from "@devexpress/dx-react-chart-material-ui";
import { ValueScale, Animation } from "@devexpress/dx-react-chart";
import { useSelector } from "react-redux";
import { selectYard } from "store/yardSlice";
import { useDebounce } from "utils";
interface DataModel {
  name: string;
  value: number;
}

const Index = () => {
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
  return (
    <div>
      <Chart data={chartData} height={400} width={400}>
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
