/*
 * @Author: your name
 * @Date: 2021-10-08 10:56:02
 * @LastEditTime: 2021-10-12 17:06:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /demo-react/src/pages/zone-monitor/index.tsx
 */

import { createStyles, makeStyles, Paper, Theme } from "@material-ui/core";
import { Bay, Zone } from "boot/model";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RouteProps, useParams } from "react-router";
import { selectBayIds, selectYard } from "features/yard/yardSlice";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      height: "100%",
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(5),
    },
  })
);

interface Props extends RouteProps {
  value?: Zone;
}
const Index = ({ value }: Props) => {
  const classes = useStyles();

  let { id } = useParams();
  const [zones, setZones] = useState<Zone[]>([]);

  const [zone, setZone] = useState<Zone>();
  const [bay, setBay] = useState<Bay>();

  const bayIds = useSelector(selectBayIds);
  const bays = useSelector(selectYard).bays;

  const [py, setPy] = useState<number>(0);
  const [px, setPx] = useState<number>(0);
  const baseHeight = 800;
  const baseWidth = 1900;
  useEffect(() => {
    if (bay) {
      setPy(baseHeight / bay.dimension.height);
      setPx(baseWidth / bay.dimension.width);
    }
  }, [bay]);

  useEffect(() => {
    let zoneGroup: Zone[] = [];
    bayIds.forEach((bayId: string) => {
      const zonesTemp = bays.get(bayId).safetyZones;
      zonesTemp.forEach((zoneTemp: Zone) => {
        zoneGroup.push(zoneTemp);
      });
    });

    setZones(zoneGroup);
  }, bayIds);

  useEffect(() => {
    setZone(zones.find((zone: Zone) => zone.id === id));
  }, [id, zones]);

  useEffect(() => {
    if (bays && zones) {
      bayIds.forEach((bayId: string) => {
        let bayTemp = bays.get(bayId);
        if (bayTemp.safetyZones.includes(zone)) {
          setBay(bayTemp);
        }
      });
    }
    console.log(bay);
  }, [zone]);
  return (
    <div className={classes.root}>
      <Paper
        style={{
          width: baseWidth,
          height: baseHeight,
        }}
      >
        {zone?.label}
        {bay?.bayId}
      </Paper>
    </div>
  );
};

export default Index;
