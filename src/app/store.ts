/*
 * @Description:
 * @Version: 2.0
 * @Autor: Shawnneosuen@outlook.com
 * @Date: 2021-09-08 20:26:28
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-10-13 13:37:19
 */
import { configureStore } from '@reduxjs/toolkit'
import yardReducer from 'features/yard/yardSlice'
import commandsReducer from 'features/commands/commadSlice'
import coilSlice from 'features/coil/coilSlice'
export const store = configureStore({
	reducer: {
		yard: yardReducer,
		commands: commandsReducer,
		coils: coilSlice,
	},
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
