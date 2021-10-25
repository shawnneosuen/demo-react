/*
 * @Author: your name
 * @Date: 2021-09-30 20:37:14
 * @LastEditTime: 2021-10-25 17:02:32
 * @LastEditors: Shawnneosuen@outlook.com
 * @Description: In User Settings Edit
 * @FilePath: /demo-react/src/store/yardSlice.ts
 */
import { createNextState, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Bay, Crane, StockSaddle, Yard, Zone } from "../../boot/model";
import DCLY from "./DCLY";
import NY from "./NY";
import RFBY from "./RFBY";
import RFFY from "./RFFY";
import RMY from "./RMY";
const initialState: Yard = {
  bayIds: ["RFBY", "RFFY", "DCLY", "RMY", "NY"],
  bays: [RFBY, RFFY, DCLY, RMY, NY],
  craneIds: ["11", "12", "21", "22", "23", "32", "43", "44", "51", "52"],
  cranes: [
    NY.cranes[0],
    NY.cranes[1],
    RMY.cranes[0],
    RMY.cranes[1],
    RMY.cranes[2],
    DCLY.cranes[0],
    RFFY.cranes[0],
    RFFY.cranes[1],
    RFBY.cranes[0],
    RFBY.cranes[1],
  ],
  stockSaddles: [
    ...NY.stockSaddles,
    ...RMY.stockSaddles,
    ...DCLY.stockSaddles,
    ...RFFY.stockSaddles,
    ...RFBY.stockSaddles,
  ],
  equipmentSaddles: [
    ...NY.equipmentStock,
    ...RMY.equipmentStock,
    ...DCLY.equipmentStock,
    ...RFFY.equipmentStock,
    ...RFBY.equipmentStock,
  ],
};
export const yardSlice = createSlice({
  name: "yard",
  initialState,
  reducers: {
    updateYard: (state = initialState) => {
      return state;
    },
    getAllBayId: (state = initialState) => {
      return state;
    },
    updateCrane: (state = initialState, action: PayloadAction<Crane>) => {
      let strState = JSON.stringify(state);
      let stateClone = JSON.parse(strState);
      let index = stateClone.craneIds.indexOf(action.payload.id);
      let crane = stateClone.cranes[index];
      if (crane) {
        crane.left = action.payload.left;
      }
      stateClone.cranes[index] = crane;
      return stateClone;
    },
    // 锁定解锁鞍座
    lockUnlockStockSaddle: (
      state = initialState,
      action: PayloadAction<string>
    ) => {
      let strState = JSON.stringify(state);
      let stateClone = JSON.parse(strState);
      let index = -1;
      index = stateClone.stockSaddles.findIndex(
        (stockSaddleTemp: StockSaddle) =>
          stockSaddleTemp.label === action.payload
      );

      if (index !== -1) {
        stateClone.stockSaddles[index].static =
          !stateClone.stockSaddles[index].static;
        return stateClone;
      }
      index = stateClone.equipmentSaddles.findIndex(
        (stockSaddleTemp: StockSaddle) =>
          stockSaddleTemp.label === action.payload
      );
      if (index !== -1) {
        stateClone.equipmentSaddles[index].static =
          !stateClone.equipmentSaddles[index].static;
        console.log(stateClone.equipmentSaddles[index].static);

        return stateClone;
      }
    },
  },
});
export const selectYard = (state: any) => state.yard;
export const selectBayIds = (state: any) => state.yard.bayIds;
export const { updateYard, getAllBayId, updateCrane, lockUnlockStockSaddle } =
  yardSlice.actions;

export default yardSlice.reducer;
