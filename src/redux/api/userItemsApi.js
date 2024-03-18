import { baseQueryWithAuth } from "@/utils";
import { createApi } from "@reduxjs/toolkit/query/react";

export const userItemApi = createApi({
	baseQuery: baseQueryWithAuth,
	reducerPath: "userItems",
	tagTypes: [
		"UserItems",
		"Licence",
		"Passport",
		"RealEstate",
		"Equipment",
		"Notification",
	],
	endpoints: (build) => ({
		addDrivingLicence: build.mutation({
			query: (payload) => ({
				url: "user/driving-licence",
				method: "POST",
				// headers: {
				// 	"Content-Type": "multipart/related",
				// },
				body: payload,
			}),
			invalidatesTags: ["UserItems", "Licence"],
		}),
		addPassport: build.mutation({
			query: (payload) => ({
				url: "user/passport",
				method: "POST",
				// headers: {
				// 	"content-type": "multipart/form-data",
				// },
				body: payload,
			}),
			invalidatesTags: ["UserItems", "Passport"],
		}),
		getAllCategorys: build.query({
			query: (payload) => ({
				url: "category",
				params: payload,
			}),
		}),
		addRealEstate: build.mutation({
			query: (payload) => ({
				url: "user/realestate",
				method: "POST",
				body: payload,
			}),
			invalidatesTags: ["UserItems", "RealEstate"],
		}),
		addEquipment: build.mutation({
			query: (payload) => ({
				url: "user/equipment",
				method: "POST",
				body: payload,
			}),
			invalidatesTags: ["UserItems", "Equipment"],
		}),
		getUserDashBoard: build.query({
			query: (payload) => ({
				url: "user/dashboard",
				params: payload,
			}),
			providesTags: ["UserItems"],
		}),
		getUserLicence: build.query({
			query: () => ({
				url: "user/driving-licence",
			}),
			providesTags: ["Licence"],
		}),
		getUserPassport: build.query({
			query: () => ({
				url: "user/passport",
			}),
			providesTags: ["Passport"],
		}),
		getUserRealEstate: build.query({
			query: () => ({
				url: "user/realestate",
			}),
			providesTags: ["RealEstate"],
		}),
		getUserEquipment: build.query({
			query: () => ({
				url: "user/equipment",
			}),
			providesTags: ["Equipment"],
		}),
		getUserNotification: build.query({
			query: () => ({
				url: "notification",
			}),
			providesTags: ["Notification"],
		}),
		viewNotiofication: build.mutation({
			query: (payload) => ({
				url: "notification",
				method: "PATCH",
				body: payload,
			}),
			invalidatesTags: ["Notification"],
		}),
	}),
});

export const {
	useAddDrivingLicenceMutation,
	useAddPassportMutation,
	useGetAllCategorysQuery,
	useAddRealEstateMutation,
	useAddEquipmentMutation,
	useGetUserDashBoardQuery,
	useGetUserLicenceQuery,
	useGetUserPassportQuery,
	useGetUserRealEstateQuery,
	useGetUserEquipmentQuery,
	useGetUserNotificationQuery,
	useViewNotioficationMutation,
} = userItemApi;
