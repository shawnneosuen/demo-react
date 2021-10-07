/*
 * @Author: your name
 * @Date: 2021-09-15 13:42:05
 * @LastEditTime: 2021-10-07 18:21:12
 * @LastEditors: Shawnneosuen@outlook.com
 * @Description: 行车相关信息展示
 * @FilePath: /demo-react/src/pages/yard-monitor/components/CraneCard/index.tsx
 */
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  createStyles,
  Icon,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { color } from "boot/utils";
import MyDivider from "components/MyDivider";
import { Crane } from "pages/yard-monitor/model";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    CraneCard: {
      width: 229,
      textAlign: "center",
      border: "1px solid #B0B0B0",
      fontSize: "10px",
    },
    DivideLine: {
      height: 1,
      width: "100%",
      backgroundColor: "#e0e0e0",
    },
    ButtonGroup: {
      height: 20,
      width: "100%",
      display: "flex",
    },
    Button: {
      fontSize: "10px",
      color: "black",
      marginLeft: "0",
      hover: "grey",
    },
  })
);

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

interface Props {
  value: Crane;
  style?: Object;
}

const Index = ({ value, style }: Props) => {
  const classes = useStyles();
  return (
    <div>
      <Card className={classes.CraneCard} style={style}>
        <div>{value?.id}</div>
        <div v-if="faultCode !== 0"></div>
        <div>任务状态:</div>
        <div>WMS报警:</div>

        <div className={classes.DivideLine}></div>
        <div className={classes.ButtonGroup}>
          <ButtonGroup
            variant={"text"}
            size={"small"}
            aria-label="small text button group"
          >
            <Button
              size={"small"}
              className={classes.Button}
              style={{
                backgroundColor: value.wmsMode == 1 ? color.yellow : "",
              }}
            >
              自动
            </Button>
            <Button
              size={"small"}
              className={classes.Button}
              style={{
                backgroundColor: value.wmsMode == 2 ? color.yellow : "",
              }}
            >
              手动
            </Button>
            <Button
              size={"small"}
              className={classes.Button}
              style={{
                backgroundColor: value.wmsMode == 3 ? color.yellow : "",
              }}
            >
              半自动
            </Button>
            <Button
              size={"small"}
              className={classes.Button}
              style={{
                backgroundColor: value.wmsMode == 99999 ? color.yellow : "",
              }}
            >
              离线
            </Button>
            <Button
              size="small"
              className={classes.Button}
              endIcon={<ArrowDropDownIcon fontSize="small" />}
            >
              更多
            </Button>
          </ButtonGroup>
        </div>
      </Card>
    </div>
  );
};

export default Index;
