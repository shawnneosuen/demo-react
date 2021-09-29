/*
 * @Description:
 * @Version: 2.0
 * @Autor: Shawnneosuen@outlook.com
 * @Date: 2021-09-08 20:26:28
 * @LastEditors: Shawnneosuen@outlook.com
 * @LastEditTime: 2021-09-30 01:55:57
 */
import {
  Button,
  createStyles,
  FormControlLabel,
  makeStyles,
  styled,
  Switch,
  Theme,
} from "@material-ui/core";
import { store } from "app/store";
import React from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { Yard } from "./model";
import { selectYard, getAllBayId, selectBayIds } from "./store/yardSlice";
import ZoneComponent from "./components/ZoneComponent";
import YardMap from "./YardMap";
import BarChart from "./components/charts/BarChart";
import PieChart from "./components/charts/PieChart";
import OperHistory from "./components/OperHistory";
import CraneCard from "components/CraneCard";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    Header: {
      width: "100vh",
    },
    page: {
      paddingTop: theme.spacing(10),
      paddingBottom: theme.spacing(10),
    },
    chartsArea: {
      marginTop: "10vh",
      display: "flex",
    },
  })
);

const Index = () => {
  return (
    <Provider store={store}>
      <GetYard />
    </Provider>
  );
};
const GetYard = () => {
  const bay = useSelector(selectYard).bays;
  console.log(bay);

  const dispatch = useDispatch();
  const baseHeight = 500;
  const baseWidth = 1780;
  const classes = useStyles();

  const bayIds = useSelector(selectBayIds);

  return (
    <div className={classes.page}>
      <FormControlLabel control={<Switch defaultChecked />} label="Label" />
      {bayIds.map((bayId: string) => {
        return (
          <div
            style={{ width: "1780px", height: "270px", marginBottom: "30px" }}
            key={bayId}
          >
            <YardMap bayId={bayId} key={bayId}></YardMap>
          </div>
        );
      })}
      <div className={classes.chartsArea}>
        <CraneCard></CraneCard>
        <BarChart />
        <PieChart />
        <OperHistory />
      </div>
    </div>
  );
};
export default Index;
