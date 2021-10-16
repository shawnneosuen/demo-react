/*
 * @Author: your name
 * @Date: 2021-10-15 14:53:06
 * @LastEditTime: 2021-10-17 04:04:46
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
import { useAppSelector } from "app/hook";
import { Coil, StockSaddle } from "boot/model";
import MyDivider from "components/MyDivider";
import MyTitle from "components/MyTitle";
import React, { ReactNode, useEffect, useState } from "react";

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
  const equipmentStocks = useAppSelector((state) => state.yard).bays[3]
    .equipmentStock;
  const [stock, setStock] = useState<StockSaddle[]>([]);
  const coils = useAppSelector((state) => state.coils).coils;
  useEffect(() => {
    if (value?.includes("入口")) {
      setStock(
        equipmentStocks.filter((stockTemp: StockSaddle) =>
          stockTemp.id.includes("I")
        )
      );
    } else {
      setStock(
        equipmentStocks.filter((stockTemp: StockSaddle) =>
          stockTemp.id.includes("O")
        )
      );
    }
  }, [equipmentStocks]);

  return (
    <div>
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <MyTitle value={value}></MyTitle>
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
        }}
      >
        {stock.map((stockTemp: StockSaddle) => (
          <Grid item xs={4} style={{ padding: "auto" }} key={stockTemp.id}>
            <StockModel
              label={stockTemp.id}
              value={coils.find((coil: Coil) => coil.ST_NO === stockTemp.id)}
              key={stockTemp.id}
            >
              {coils.find((coil: Coil) => coil.ST_NO === stockTemp.id) ? (
                <CoilModel key={stockTemp.id} />
              ) : (
                ""
              )}
            </StockModel>
          </Grid>
        ))}
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
      backgroundColor: "lightgrey",
    },
  })
);
const StockModel = ({
  children,
  label,
  value,
}: {
  children?: ReactNode;
  label?: string;
  value: Coil | undefined;
}) => {
  const classes = useStockStyle();
  return (
    <Tooltip
      title={
        <React.Fragment>
          <div>材料号：</div>
          <div>{value ? value.MAT_NO : "--"}</div>
          <div>宽度：</div>
          <div>{value ? value.WIDTH : "--"}</div>
          <div> 外径：</div>
          <div>{value ? value.OUTDIA : "--"}</div>
          <div>重量：</div>
          <div>{value ? value.WEIGHT : "--"}</div>
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

const CoilModel = () => {
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
