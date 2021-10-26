/*
 * @Author: your name
 * @Date: 2021-09-30 20:37:14
 * @LastEditTime: 2021-10-26 16:10:40
 * @LastEditors: Shawnneosuen@outlook.com
 * @Description: In User Settings Edit
 * @FilePath: /demo-react/src/store/yardSlice.ts
 */
import { createNextState, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CraneHistoryModel } from "boot/model";

import CraneHistory from "./CraneHistory.json";

const initialState = {
  craneHistory: CraneHistory,
};
export const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    getCommand: (state = initialState) => {
      return state;
    },
    addNewCommandHistory: (
      state = initialState,
      action: PayloadAction<CraneHistoryModel>
    ) => {
      let stateTemp = JSON.parse(JSON.stringify(state));
      stateTemp.commands.push(action.payload);

      return stateTemp;
    },
  },
});
export const selectYard = (state: any) => state.yard;
export const selectBayIds = (state: any) => state.yard.bayIds;
export const { getCommand, addNewCommandHistory } = historySlice.actions;

export default historySlice.reducer;
