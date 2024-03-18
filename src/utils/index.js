// import axios from "axios";
import EventBus from "./event";

//new
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { Mutex } from "async-mutex";

// const Axios = axios.create({
// 	baseURL: process.env.API_URL,
// });

// Axios.interceptors.request.use(function (config) {
// 	const cookie = Cookies.get("currentUser");
// 	const user = JSON.parse(cookie || "{}");

// 	config.headers["authorization"] = `Bearer ${user?.token}`;

// 	return config;
// });

// Axios.interceptors.response.use(function (response) {
// 	const { data } = response;
// 	if (data?.status === 401) {
// 		EventBus.dispatch("logout");
// 	}

// 	return response;
// });

// export { Axios };

//new implementation
const mutex = new Mutex();

export const baseQuery = fetchBaseQuery({
	baseUrl: process.env.API_URL,
	credentials: "include",
});

export const baseQueryWithAuth = async (args, api, extraOptions) => {
	// const cookie = Cookies.get("currentUser");
	// const user = JSON.parse(cookie || "{}");

	// console.log("user", user);
	await mutex.waitForUnlock();
	let result = await baseQuery(args, api, extraOptions);
	console.log("resultinquery", result);
	switch (result.error?.status) {
		case 403:
			if (!mutex.isLocked()) {
				const release = await mutex.acquire();
				try {
					const refreshResult = await baseQuery(
						{ url: "auth/refresh" },
						api,
						extraOptions
					);
					console.log("result", result);
					console.log("refreshResult", refreshResult);

					if (refreshResult.data) {
						result = await baseQuery(args, api, extraOptions);
					} else {
						if (refreshResult.error?.status === 401) {
							EventBus.dispatch("logout");
						}
						//dispatch logout after
					}
				} finally {
					release();
				}
			} else {
				await mutex.waitForUnlock();
				result = await baseQuery(args, api, extraOptions);
			}
			break;
		case 401:
			EventBus.dispatch("logout");
			break;
		default:
			break;
	}

	return result;
};
