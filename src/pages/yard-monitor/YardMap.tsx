/*
 * @Description:主监控
 * @Version: 2.0
 * @Autor: Shawnneosuen@outlook.com
 * @Date: 2021-09-08 20:26:28
 * @LastEditors: Shawnneosuen@outlook.com
 * @LastEditTime: 2021-10-08 23:03:55
 */
import { Theme } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/styles";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ZoneComponent from "./components/ZoneComponent";
import { selectYard } from "../../features/yard/yardSlice";
import { Parking, Zone, CircleZone, Bay, Crane } from "./model";
import CraneMap from "./components/CraneMap";
import CircleZoneComponent from "./components/CircleZoneComponent";
import YardComponent from "./components/YardComponent";
import { useAppSelector } from "app/hook";

interface Props {
  bayId: string;
  baseHeight: number;
  baseWidth: number;
}

const useStyles = makeStyles((theme: Theme) => createStyles({}));

const Index = ({ bayId, baseHeight, baseWidth }: Props) => {
  const yard = useAppSelector((state) => state.yard);
  const [bay, setBay] = useState<Bay>();
  const [bayIds, setBayIds] = useState<string[]>([]);

  useEffect(() => {
    setBayIds(yard.bayIds);
    setBay(yard.bays[bayIds.indexOf(bayId)]);
  }, [yard]);

  const safetyZones = bay?.safetyZones;
  const circleZones = bay?.circleZones;
  const parkingZones = bay?.parkings;
  const [cranes, setCranes] = useState<string[]>([]);

  const [py, setPy] = useState<number>(0);
  const [px, setPx] = useState<number>(0);
  useEffect(() => {
    if (bay) {
      setCranes(bay.craneIds);
      setPy(baseHeight / bay.dimension.height);
      setPx(baseWidth / bay.dimension.width);
    }
  }, [bay]);
  return (
    <div>
      <YardComponent
        className={"Yard"}
        width={bay?.dimension.width}
        height={bay?.dimension.height}
        px={px}
        py={py}
        showContextMenu={false}
      >
        {safetyZones?.map((zone: Zone) => (
          <ZoneComponent
            key={zone.id}
            className={"zone"}
            width={zone.width}
            height={zone.height}
            px={px}
            py={py}
            left={zone.left}
            top={zone.top}
            clickable={true}
            label={zone.label}
            showContextMenu={true}
            id={zone.id}
          >
            {" "}
          </ZoneComponent>
        ))}
        {circleZones?.map((circleZone: CircleZone) => (
          <CircleZoneComponent
            key={circleZone.id}
            className={"zone"}
            label={circleZone.label}
            left={circleZone.left}
            top={circleZone.top}
            width={circleZone.width}
            height={circleZone.height}
            px={px}
            py={py}
            isUpperLeftCircle={circleZone.upperLeftCircle}
            isUpperRightCircle={circleZone.upperRightCircle}
            isBottomLeftCircle={circleZone.bottomLeftCircle}
            isBottomRightCircle={circleZone.bottomRightCircle}
          />
        ))}
        {parkingZones?.map((parking: Parking) => (
          <ZoneComponent
            key={parking.id}
            className={"zone"}
            width={parking.width}
            height={parking.height}
            px={px}
            py={py}
            left={parking.left}
            top={parking.top}
            clickable={true}
            label={parking.label}
            locked={parking.locked}
            horizontal={parking.horizontal}
          ></ZoneComponent>
        ))}
        {cranes ? (
          <CraneMap
            craneIds={cranes}
            px={px}
            py={py}
            key={JSON.stringify(cranes)}
          ></CraneMap>
        ) : (
          <div></div>
        )}
      </YardComponent>
    </div>
  );
};

export default Index;
