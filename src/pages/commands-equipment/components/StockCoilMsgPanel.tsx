/*
 * @Author: your name
 * @Date: 2021-10-15 14:53:06
 * @LastEditTime: 2021-10-15 19:24:45
 * @LastEditors: Shawnneosuen@outlook.com
 * @Description: In User Settings Edit
 * @FilePath: /demo-react/src/pages/commands-equipment/components/StockCoilMsgPanel.tsx
 */

import {
  Button,
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Tooltip,
  Typography,
} from "@material-ui/core";
import MyDivider from "components/MyDivider";
import MyTitle from "components/MyTitle";
import React, { ReactNode } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      alignItems: "center",
      flexGrow: 1,
      textAlign: "center",
    },
  })
);

interface Props {
  value?: string;
}

const Index = ({ value }: Props) => {
  const classes = useStyles();
  const coilInStock = useCoilModel();

  return (
    <div>
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <MyTitle value={value + "号机组"}></MyTitle>
        </Grid>
      </Grid>
      <MyDivider />
      <Grid
        container
        spacing={4}
        style={{
          width: "100%",
          flexGrow: 1,
          marginTop: 2,
          border: "1px solid grey",
        }}
      >
        <Grid item xs={4} style={{ padding: "auto" }}>
          <StockModel label={"RMI1"}>{coilInStock}</StockModel>
        </Grid>
        <Grid item xs={4}>
          <Tooltip
            title={
              <React.Fragment>
                <div>指令：{"--"}</div>
                <div>材料号：{"--"} </div>
                <div> 起吊：{"--"}</div>
                <div>卸下： {"--"}</div>
                <div>动作： {"--"}</div>
                <div>大车位置：{"--"}</div>
                <div>小车位置：{"--"}</div>
              </React.Fragment>
            }
            aria-label="add"
            open={true}
            placement="right-start"
            arrow
          >
            <StockModel></StockModel>
          </Tooltip>
        </Grid>
        <Grid item xs={4}>
          <Tooltip
            title={
              <React.Fragment>
                <div>指令：{"--"}</div>
                <div>材料号：{"--"} </div>
                <div> 起吊：{"--"}</div>
                <div>卸下： {"--"}</div>
                <div>动作： {"--"}</div>
                <div>大车位置：{"--"}</div>
                <div>小车位置：{"--"}</div>
              </React.Fragment>
            }
            aria-label="add"
            open={true}
            placement="right-start"
            arrow
          >
            <StockModel></StockModel>
          </Tooltip>
        </Grid>
      </Grid>
      <EquipmentManagePanel></EquipmentManagePanel>
    </div>
  );
};
export default Index;

const useStockStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 152,
      height: 190,
      backgroundColor: "white",
      border: "1px dashed black",
    },
    label: {
      display: "flex",
      height: "100%",
      flexGrow: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: "auto",
      marginBottom: "auto",
      backgroundColor: "grey",
    },
  })
);
const StockModel = ({
  children,
  label,
}: {
  children?: ReactNode;
  label?: string;
}) => {
  const classes = useStockStyle();
  return (
    <Tooltip
      title={
        <React.Fragment>
          <div>材料号：{"--"}</div>
          <div>宽度：{"--"} </div>
          <div> 外径：{"--"}</div>
          <div>重量： {"--"}</div>
          <div>下道工序： {"--"}</div>
          <div>材料验证：{"--"}</div>
        </React.Fragment>
      }
      aria-label="add"
      open={true}
      placement="right-start"
      arrow
    >
      <div className={classes.root}>
        <div style={{ height: "80%" }}> {children}</div>
        <MyDivider></MyDivider>
        <div style={{ height: "19.9%" }}>
          <Typography className={classes.label}>
            <strong> {label}</strong>
          </Typography>
        </div>
      </div>
    </Tooltip>
  );
};

const useCoilShapeStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 150,
      height: 150,
      border: "1px solid black",
      borderRadius: "50%",
      backgroundColor: "#c1defd",
      position: "absolute",
      display: "flex",
      alignItems: "center",
      flex: "center",
      justifyContent: "center",
    },
    indiaCoil: {
      width: 80,
      height: 80,
      border: "1px solid black",
      borderRadius: "50%",
      backgroundColor: "white",
    },
  })
);

const useCoilModel = () => {
  const classes = useCoilShapeStyle();
  return (
    <div className={classes.root}>
      <div className={classes.indiaCoil}></div>
    </div>
  );
};

const EquipmentManagePanel = () => {
  return (
    <div>
      <MyTitle value={"4号机组计划"}></MyTitle>
      <Grid container spacing={4} style={{ width: "100%" }}>
        <Grid item xs={6}>
          {" "}
          <Button size="large" variant="contained" fullWidth color="primary">
            4号机组入口生产
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            size="large"
            variant="contained"
            fullWidth
            color={"secondary"}
          >
            4号机组入口检修
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};
