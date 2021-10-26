/*
 * @Description:
 * @Version: 2.0
 * @Autor: Shawnneosuen@outlook.com
 * @Date: 2021-10-18 16:57:25
 * @LastEditors: Shawnneosuen@outlook.com
 * @LastEditTime: 2021-10-26 10:38:59
 */

import { Button, createStyles, makeStyles, Theme } from "@material-ui/core";
import { useAppDispatch } from "app/hook";
import {
  ParkingModel,
  TruckStowageDetailModel,
  TruckStowageModel,
} from "boot/model";
import { addNewCommand } from "features/commands/commadSlice";
import { updateParking } from "features/parking/parkingSlice";
import React from "react";
import { CreateCommandData } from "./CreateData";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexGrow: 1,
      justifyContent: "end",
    },
    button: {
      marginRight: theme.spacing(2),
      minWdith: 100,
    },
  })
);

interface Props {
  value?: TruckStowageDetailModel[];
  truckNo?: string;
}
const Index = ({ value, truckNo }: Props) => {
  const classes = useStyles();

  const dispatch = useAppDispatch();
  return (
    <div className={classes.root}>
      <Button
        variant={"contained"}
        className={classes.button}
        color="primary"
        onClick={() => {
          if (value) {
            let parking: ParkingModel = {
              ID: "NYP1",
              PARKING_NO: "NYP1",
              TRUCK_ID: "沪12345",
              STOWAGE_ID: value[0].STOWAGE_ID,
              UPDATE_TIME: new Date().toLocaleString(),
              CREATE_TIME: "",
            };
            dispatch(updateParking(parking));
          }
        }}
      >
        确认配载图信息
      </Button>
      <Button
        variant={"contained"}
        color="primary"
        className={classes.button}
        disabled={truckNo === "车辆未到位"}
        onClick={() => {
          if (value) {
            for (const item of value) {
              if (item) {
                let data = CreateCommandData(item, truckNo);
                if (data) {
                  dispatch(addNewCommand(data));
                }
              }
            }
          }
        }}
      >
        {" "}
        Confirm
      </Button>
      <Button variant={"contained"} color="primary" className={classes.button}>
        {" "}
        Edit
      </Button>
    </div>
  );
};

export default Index;
