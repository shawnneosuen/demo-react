import { Theme } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/styles";
import React, { ReactNode } from "react";
import { Crane } from "../model";
import ZoneComponent from "./ZoneComponent";
import CraneMapLabel from './CraneMapLabel'
import { color } from 'boot/utils'
interface Props {
    cranes: Crane[],
    px: number,
    py: number,
    xMax?:string
}
const classes = {
    border: '3px solid #a6a6a6',
}

const modeColor =  (wmsMode: number) => {
    switch (wmsMode) {
        case 1: // 自动
          return color.autoCrane;
        case 2: // 手动
          return color.manualCrane;
        case 3: // 半自动
          return color.halFautoCrane;
        default:
          // 默认
          return color.grey6;
      }
}

const modeLabel = (wmsMode: number, xMax?: string) =>{
        // // 0= no valid mode　无效,  1=auto　自动,  2 = manu mode　手动,  3= semi-auto　半自动
        const value = xMax?.substring(0, 1);
        if (value === '1') {
        //   avadeModelColor = color.avade;
          return '避让';
        }
        if (value === '2') {
        //   avadeModelColor = color.follow;
          return '跟随';
        }
        if (wmsMode === 1) {
        //   avadeModelColor = color.default;
          return '自动';
        }
        if (wmsMode === 2) {
        //   avadeModelColor = color.default;
          return '手动';
        }
        if (wmsMode === 3) {
        //   avadeModelColor = color.default;
          return '半自动';
        }
        // avadeModelColor = color.default;
        return '离线';
}

const Index = ({cranes, px, py, xMax}: Props) => {

    return <div >
        {
            cranes.map((crane: Crane) => {
                const callStyles = {
                    border: '3px solid ' + modeColor(crane.wmsMode)
                }
                
                return (<div key={crane.id}>
                    <ZoneComponent callStyles={callStyles} className={'zone'} width={crane.width} height={crane.height} px={px} py={py} label={modeLabel(crane.wmsMode, xMax)} left={crane.left} top={crane.top} clickable={true}  >
                    </ZoneComponent>
                    <CraneMapLabel left={crane.left} top={crane.top + crane.height} width={crane.width + 10} px={px} py={py} key={crane.id + 'label'}>{crane.label}</CraneMapLabel>
                    </div>)})
        }
    </div>
}

export default Index;