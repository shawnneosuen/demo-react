import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PlanModel } from "boot/model";
import { plans } from "./plan";

const initialState = {
  plans: plans,
};

export const planSlice = createSlice({
  name: "plan",
  initialState: initialState,
  reducers: {
    updatePlan: (state = initialState, action: PayloadAction<PlanModel>) => {
      return state;
    },
  },
});

export const selectedPlan = (state: any) => state.plans;
export const { updatePlan } = planSlice.actions;

export default planSlice.reducer;
