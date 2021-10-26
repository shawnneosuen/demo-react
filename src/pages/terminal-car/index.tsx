/*
 * @Description:
 * @Version: 2.0
 * @Autor: Shawnneosuen@outlook.com
 * @Date: 2021-10-17 22:30:39
 * @LastEditors: Shawnneosuen@outlook.com
 * @LastEditTime: 2021-10-26 10:40:20
 */
import {
  Grid,
  Theme,
  createStyles,
  makeStyles,
  Paper,
  Typography,
  Box,
} from "@material-ui/core";
import { useAppSelector } from "app/hook";
import {
  ParkingModel,
  TruckStowageDetailModel,
  TruckStowageModel,
} from "boot/model";
import StowageCard from "./components/StowageCard";

import React, { useEffect, useState } from "react";
import { parkings } from "features/parking/parkings";
import Table from "./components/Table";
import ActionPanel from "./components/ActionPanel";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
    page: {
      padding: theme.spacing(2),
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
  const [targetStowageDetail, setTargetStowageDetail] = useState<
    TruckStowageDetailModel[]
  >([]);

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
      <Paper className={classes.page}>
        <Grid
          container
          direction={"column"}
          justifyContent="center"
          style={{ width: "100%" }}
          spacing={2}
        >
          <Grid item container spacing={2}>
            <Grid item xs={2}>
              <Typography variant={"h5"} component={"h5"}>
                停车位:
              </Typography>
              <Typography variant={"h5"} component={"h5"}>
                {targetPark?.PARKING_NO}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant={"h5"} component={"h5"}>
                配载图:
              </Typography>
              <Typography variant={"h5"} component={"h5"}>
                {targetPark?.STOWAGE_ID}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant={"h5"} component={"h5"}>
                卡车号:
              </Typography>
              <Typography variant={"h5"} component={"h5"}>
                {targetPark?.TRUCK_ID}
              </Typography>
            </Grid>

            <Grid item xs={4}>
              <Typography variant={"h5"} component={"h5"}>
                更新时间:
              </Typography>
              <Typography variant={"h5"} component={"h5"}>
                {targetPark?.UPDATE_TIME}
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <StowageCard onSelected={setTargetStowage}></StowageCard>
          </Grid>
          <Grid item xs={12}>
            <Box>
              <Table
                value={targetStowage?.STOWAGE_ID}
                onSetTruckStowage={setTargetStowageDetail}
              ></Table>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <ActionPanel
              value={targetStowageDetail}
              truckNo={targetPark?.TRUCK_ID}
            ></ActionPanel>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default Index;
