import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userApi } from "./api/userApi";
import { userItemApi } from "./api/userItemsApi";
import { userReducer } from "./slice/userSlice";

const rootReducer = combineReducers({
	[userApi.reducerPath]: userApi.reducer,
	[userItemApi.reducerPath]: userItemApi.reducer,
	userSlice: userReducer,
});

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({}).concat([
			userApi.middleware,
			userItemApi.middleware,
		]),
});
