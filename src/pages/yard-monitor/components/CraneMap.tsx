/*
 * @Author: your name
 * @Date: 2021-09-09 09:52:48
 * @LastEditTime: 2021-10-09 01:55:45
 * @LastEditors: Shawnneosuen@outlook.com
 * @Description: In User Settings Edit
 * @FilePath: /demo-react/src/pages/yard-monitor/components/CraneMap.tsx
 */

import React, { useEffect, useState } from "react";
import { Crane } from "../model";
import ZoneComponent from "./ZoneComponent";
import CraneMapLabel from "./CraneMapLabel";
import { color } from "boot/utils";
import { useAppSelector } from "app/hook";
import {
  createStyles,
  Fab,
  Fade,
  makeStyles,
  Paper,
  Popper,
  Theme,
  Tooltip,
  Typography,
} from "@material-ui/core";
import MyTooltip from "components/MyTooltip";
import AddIcon from "@material-ui/icons/Add";
import zIndex from "@material-ui/core/styles/zIndex";
interface Props {
  craneIds: string[];
  px: number;
  py: number;
  xMax?: string;
}

const modeColor = (wmsMode: number) => {
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
};

const modeLabel = (wmsMode: number, xMax?: string) => {
  // // 0= no valid mode　无效,  1=auto　自动,  2 = manu mode　手动,  3= semi-auto　半自动
  const value = xMax?.substring(0, 1);
  if (value === "1") {
    //   avadeModelColor = color.avade;
    return "避让";
  }
  if (value === "2") {
    //   avadeModelColor = color.follow;
    return "跟随";
  }
  if (wmsMode === 1) {
    //   avadeModelColor = color.default;
    return "自动";
  }
  if (wmsMode === 2) {
    //   avadeModelColor = color.default;
    return "手动";
  }
  if (wmsMode === 3) {
    //   avadeModelColor = color.default;
    return "半自动";
  }
  // avadeModelColor = color.default;
  return "离线";
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    typography: {
      padding: theme.spacing(2),
    },
    fab: {
      margin: theme.spacing(2),
    },
    absolute: {
      position: "absolute",
      zIndex: theme.zIndex.drawer - 2,
    },
    tooltip: {
      zIndex: theme.zIndex.drawer - 1000,
    },
  })
);

const Index = ({ craneIds, px, py, xMax }: Props) => {
  const classes = useStyles();
  const [craneList, setCraneList] = useState<Crane[]>([]);
  const yard = useAppSelector((state) => state.yard);
  useEffect(() => {
    setCraneList(yard.cranes.filter((crane) => craneIds.includes(crane.id)));
  }, [yard]);
  return (
    <div>
      {craneList.map((crane: Crane) => {
        const callStyles = {
          border: "3px solid " + modeColor(crane.wmsMode),
        };

        return (
          <div key={crane.id}>
            <ZoneComponent
              callStyles={callStyles}
              className={"zone"}
              width={crane.width}
              height={crane.height}
              px={px}
              py={py}
              label={modeLabel(crane.wmsMode, xMax)}
              left={crane.left}
              top={crane.top}
              clickable={true}
            ></ZoneComponent>
            <CraneMapLabel
              left={crane.left}
              top={crane.top + 90}
              width={crane.width}
              px={px}
              py={py}
              key={crane.id + "label"}
            >
              {crane.label}
            </CraneMapLabel>
            <Tooltip
              title={
                <React.Fragment>
                  <div>{crane.label}</div>
                  <div>{crane.left} </div>
                </React.Fragment>
              }
              aria-label="add"
              open={true}
              className={classes.tooltip}
              placement="right-start"
              arrow
            >
              <div
                color="secondary"
                className={classes.absolute}
                style={{
                  top: crane.top * py,
                  left: crane.left * px,
                  width: crane.width * px,
                }}
              >
                {/* <AddIcon /> */}
              </div>
            </Tooltip>
          </div>
        );
      })}
    </div>
  );
};

export default Index;
