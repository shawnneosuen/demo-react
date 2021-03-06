/*
 * @Description:
 * @Version: 2.0
 * @Autor: Shawnneosuen@outlook.com
 * @Date: 2021-09-08 20:26:28
 * @LastEditors: Shawnneosuen@outlook.com
 * @LastEditTime: 2021-10-26 16:11:21
 */
import { configureStore } from "@reduxjs/toolkit";
import yardReducer from "features/yard/yardSlice";
import commandsReducer from "features/commands/commadSlice";
import coilSlice from "features/coil/coilSlice";
import { truckStowages } from "features/truck-stowage/truckStowage";
import truckStowageSlice from "features/truck-stowage/truckStowageSlice";
import parkingSlice from "features/parking/parkingSlice";
import truckStowageDetailSlice from "features/truck-stowage-detail/truckStowageDetailSlice";
import planSlice from "features/plan/planSlice";
import historySlice from "features/history/historySlice";
export const store = configureStore({
  reducer: {
    yard: yardReducer,
    commands: commandsReducer,
    coils: coilSlice,
    truckStowage: truckStowageSlice,
    parks: parkingSlice,
    truckStowageDetail: truckStowageDetailSlice,
    history: historySlice,
    plan: planSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
