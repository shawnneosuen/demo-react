/*
 * @Description:
 * @Version: 2.0
 * @Autor: Shawnneosuen@outlook.com
 * @Date: 2021-10-17 22:30:39
 * @LastEditors: Shawnneosuen@outlook.com
 * @LastEditTime: 2021-10-18 17:04:14
 */
import {
  Grid,
  Theme,
  createStyles,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { useAppSelector } from "app/hook";
import { ParkingModel, TruckStowageModel } from "boot/model";
import StowageCard from "./components/StowageCard";

import React, { useEffect, useState } from "react";
import { parkings } from "features/parking/parkings";
import Table from "./components/Table";
import ActionPanel from "./components/ActionPanel";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
    },
    Header: {
      fontSize: 32,
    },
    headerPanel: {
      height: "10vh",
      width: "100%",
    },
    mainPanel: {
      marginTop: theme.spacing(2),
      height: "65vh",
      width: "100%",
    },
    footPanel: {
      height: "4vh",
      width: "100%",
      marginTop: theme.spacing(2),
    },
  })
);

const Index = () => {
  const classes = useStyles();
  const stowages = useAppSelector((state) => state.truckStowage);
  const [targetStowage, setTargetStowage] = useState<TruckStowageModel>();
  const parkString = JSON.stringify(
    useAppSelector((state) => state.parks).parkings
  );
  const [targetPark, setTargetPark] = useState<ParkingModel>();

  useEffect(() => {
    let parkingsTemp = JSON.parse(parkString);
    let targetParkTemp: ParkingModel = {
      ID: parkingsTemp[0].ID ? parkingsTemp[0].ID : "为查询到停车位",
      PARKING_NO: parkingsTemp[0].PARKING_NO
        ? parkingsTemp[0].PARKING_NO
        : "为查询到停车位",
      STOWAGE_ID: parkingsTemp[0].STOWAGE_ID
        ? parkingsTemp[0].STOWAGE_ID
        : "未绑定配载图",
      TRUCK_ID: parkingsTemp[0].TRUCK_ID
        ? parkingsTemp[0].TRUCK_ID
        : "车辆未到位",
      UPDATE_TIME: parkingsTemp[0].UPDATE_TIME,
      CREATE_TIME: parkingsTemp[0].CREATE_TIME,
    };
    setTargetPark(targetParkTemp);
  }, [parkString]);

  return (
    <div className={classes.root}>
      <Paper className={classes.root}>
        <div className={classes.headerPanel}>
          <Grid container spacing={2} className={classes.Header}>
            <Grid item xs={2}>
              <Typography variant={"h4"} component={"h4"}>
                Parking id: {targetPark?.PARKING_NO}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant={"h4"} component={"h4"}>
                TruckStowage: {targetPark?.STOWAGE_ID}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant={"h4"} component={"h4"}>
                Truck id:{targetPark?.TRUCK_ID}
              </Typography>
            </Grid>

            <Grid item xs={4}>
              <Typography variant={"h4"} component={"h4"}>
                Update time:{targetPark?.UPDATE_TIME}
              </Typography>
            </Grid>
          </Grid>
          <StowageCard onSelected={setTargetStowage}></StowageCard>
        </div>
        <div className={classes.mainPanel}>
          <Table value={targetStowage?.STOWAGE_ID}></Table>
        </div>
        <div className={classes.footPanel}>
          <ActionPanel></ActionPanel>
        </div>
      </Paper>
    </div>
  );
};

export default Index;
