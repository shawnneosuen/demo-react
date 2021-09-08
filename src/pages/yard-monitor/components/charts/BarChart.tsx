import React, { useState } from "react";
import * as echarts from 'echarts';
import { Button } from "@material-ui/core";

const Index = () => {
   
    const [id, setId] = useState<string>('')
 
    
   
    return <div>
        <Button onClick={() => {
             const app = document.getElementById('main123')
             let myChart;
               if (app){
                myChart = echarts.init(app);
                // 绘制图表
                myChart?.setOption({
                    title: {
                        text: 'ECharts 入门示例'
                    },
                    tooltip: {},
                    xAxis: {
                        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
                    },    
                    yAxis: {},
                    
                    series: [
                        {
                        name: '销量',
                        type: 'bar',
                        data: [5, 20, 36, 10, 10, 20]
                        }
                    ]
                    });
                    setId(myChart.id)
           }
        }}>1234</Button>
        <div id='main123' style={{width:1000, height:100}}>
        
    </div>
    </div>
}

export default Index