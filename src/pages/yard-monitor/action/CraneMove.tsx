/*
 * @Author: your name
 * @Date: 2021-10-08 14:41:59
 * @LastEditTime: 2021-10-08 23:56:39
 * @LastEditors: Shawnneosuen@outlook.com
 * @Description: In User Settings Edit
 * @FilePath: /demo-react/src/pages/yard-monitor/action/CraneMove.ts
 */

import { useAppDispatch, useAppSelector } from "app/hook";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectYard, updateCrane } from "features/yard/yardSlice";
import { Crane } from "../../../boot/model";
import { useDebounce } from "utils";

const Index = () => {
  const yard = useSelector(selectYard);
  const [crane51, setCrane51] = useState<Crane>();
  const [crane52, setCrane52] = useState<Crane>();
  const count = useAppSelector((state) => state.yard);
  const dispatch = useAppDispatch();
  const debounceParams = useDebounce(crane51, 10);
  useEffect(() => {
    if (yard.cranes) {
      setCrane51(yard.cranes[yard.craneIds.indexOf("51")]);
      setCrane52(yard.cranes[yard.craneIds.indexOf("52")]);
    }
  }, [debounceParams]);
  const [functionSelect51, setFunctionSelect51] = useState<number>(0);
  const [functionSelect52, setFunctionSelect52] = useState<number>(0);

  useEffect(() => {
    if (crane51 && crane52) {
      let craneTemp: Crane = initialCrane(crane51);
      if (crane51.left > crane52.left - crane51.width - 2000) {
        setFunctionSelect51(1);
      } else if (crane51.left < 2000) {
        setFunctionSelect51(0);
      }

      craneTemp.left = functionOptions(craneTemp.left, functionSelect51, 1000);

      dispatch(updateCrane(craneTemp));
    }
  }, [crane51]);

  useEffect(() => {
    if (crane51 && crane52) {
      let craneTemp: Crane = initialCrane(crane52);
      if (crane52.left < crane51.left + crane51.width + 2000) {
        setFunctionSelect52(0);
      } else if (
        crane52.left >
        yard.bays[0].dimension.width - crane52.width - 2000
      ) {
        setFunctionSelect52(1);
      }

      craneTemp.left = functionOptions(craneTemp.left, functionSelect52, 2000);

      dispatch(updateCrane(craneTemp));
    }
  }, [crane52]);
  return <div></div>;
};

export default Index;

const initialCrane = (crane: Crane) => {
  return {
    id: crane.id,
    label: crane.label,
    y: crane.y,
    z: crane.z,
    left: crane.left,
    top: crane.top,
    width: crane.width,
    height: crane.height,
    trolleyHeight: crane.trolleyHeight,
    status: crane.status,
    occupied: crane.occupied,
    wmsMode: crane.wmsMode,
    activityStatus: crane.activityStatus,
    rotateAngleAct: crane.rotateAngleAct,
    pawActWidth: crane.pawActWidth,
    gantryTelemeter: crane.gantryTelemeter,
    trolleyTelemeter: crane.trolleyTelemeter,
    rejectionReason: crane.rejectionReason,
    faultCode: crane.faultCode,
    tagProps: crane.tagProps,
  };
};

const functionOptions = (left: number, mode: number, step: number) => {
  if (mode === 0) {
    return (left += step);
  } else {
    return (left -= step);
  }
};
