import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	user: null,
};

const userSlice = createSlice({
	name: "userSlice",
	initialState: initialState,
	reducers: {
		setUser: (state, { payload }) => {
			state.user = payload;
		},
	},
});

export const userReducer = userSlice.reducer;

export const { setUser } = userSlice.actions;

export const userState = (state) => state.userSlice;
