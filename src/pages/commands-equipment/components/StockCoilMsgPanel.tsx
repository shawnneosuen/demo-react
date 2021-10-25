/*
 * @Author: your name
 * @Date: 2021-10-15 14:53:06
 * @LastEditTime: 2021-10-25 16:57:56
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
import { Command } from "components/ContextMenu/models";
import MyDivider from "components/MyDivider";
import MyTitle from "components/MyTitle";
import { useStatusContext } from "context/BasePageStatus";
import { lockUnlockStockSaddle } from "features/yard/yardSlice";
import React, { ReactNode, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

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
    <Grid container direction={"column"}>
      <Grid container item className={classes.root}>
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
              key={stockTemp.id}
              isStatic={stockTemp.static}
            >
              {coils.find((coil: Coil) => coil.ST_NO === stockTemp.id) ? (
                <CoilModel
                  key={stockTemp.id}
                  value={coils.find(
                    (coil: Coil) => coil.ST_NO === stockTemp.id
                  )}
                />
              ) : (
                ""
              )}
            </StockModel>
          </Grid>
        ))}
      </Grid>
      <Grid item>
        <EquipmentManagePanel></EquipmentManagePanel>
      </Grid>
    </Grid>
  );
};
export default Index;

const useStockStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 100,
      height: 120,
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
    },
  })
);
const StockModel = ({
  children,
  label,
  isStatic,
}: {
  children?: ReactNode;
  label?: string;
  isStatic?: boolean;
}) => {
  const classes = useStockStyle();

  const dispatch = useDispatch();

  let lockUnlockCommand: Command = {
    Id: "lock",
    Name: "锁定",
    Action: () => {
      if (label) {
        console.log("label", label);

        dispatch(lockUnlockStockSaddle(label));
      }
    },
  };
  // 右键或长按弹出框
  const { setArchorPointStatus, setContextMenuStatus, setContextMenuCommands } =
    useStatusContext();

  const onContextMenu = (event: {
    preventDefault: () => void;
    pageX: any;
    pageY: any;
  }) => {
    event.preventDefault();

    setArchorPointStatus({ x: event.pageX, y: event.pageY });
    setContextMenuStatus(true);
    setContextMenuCommands([lockUnlockCommand]);
  };

  return (
    <div
      className={classes.root}
      onContextMenu={onContextMenu}
      style={{ backgroundColor: isStatic ? "red" : "" }}
    >
      <div style={{ height: "80%" }}> {children}</div>

      <div style={{ height: "20%", backgroundColor: "lightgrey" }}>
        <Typography className={classes.label}>
          <strong> {label}</strong>
        </Typography>
      </div>
    </div>
  );
};

const useCoilShapeStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 100,
      height: 100,
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
      width: 50,
      height: 50,
      border: "1px solid black",
      borderRadius: "50%",
      backgroundColor: "white",
    },
  })
);

interface CoilModelProps {
  value: Coil | undefined;
}

const CoilModel = ({ value }: CoilModelProps) => {
  const classes = useCoilShapeStyle();
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
        </React.Fragment>
      }
      aria-label="add"
      open={true}
      placement="right-start"
      arrow
    >
      <div className={classes.root}>
        <div className={classes.indiaCoil}></div>
      </div>
    </Tooltip>
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
