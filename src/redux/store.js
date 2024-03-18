import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userApi } from "./api/userApi";
import { userItemApi } from "./api/userItemsApi";

const rootReducer = combineReducers({
	[userApi.reducerPath]: userApi.reducer,
	[userItemApi.reducerPath]: userItemApi.reducer,
});

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({}).concat([
			userApi.middleware,
			userItemApi.middleware,
		]),
});
