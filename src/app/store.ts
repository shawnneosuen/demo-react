/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Shawnneosuen@outlook.com
 * @Date: 2021-09-08 20:26:28
 * @LastEditors: Shawnneosuen@outlook.com
 * @LastEditTime: 2021-09-30 16:57:50
 */
import { configureStore } from "@reduxjs/toolkit";
import yardReducer from "store/yardSlice";
export  const store = configureStore({
    reducer: {
        yard: yardReducer

    }
})