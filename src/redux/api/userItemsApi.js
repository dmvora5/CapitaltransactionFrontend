import { baseQueryWithAuth } from "@/utils";
import { createApi } from "@reduxjs/toolkit/query/react";

export const userItemApi = createApi({
	baseQuery: baseQueryWithAuth,
	reducerPath: "userItems",
	tagTypes: [
		"UserItems",
		"Licence",
		"Passport",
		"DigitalId",
		"RealEstate",
		"Equipment",
		"Notification",
		"RealEstate",
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

		//digital id
		addDigitalId: build.mutation({
			query: (payload) => ({
				url: "user/digitalId",
				method: "POST",
				body: payload,
			}),
			invalidatesTags: ["UserItems", "DigitalId"],
		}),
		getUserDigitalId: build.query({
			query: () => ({
				url: "user/digitalId",
			}),
			providesTags: ["DigitalId"],
		}),

		//listing on Marketplace
		listingEquipmentOnMarket: build.mutation({
			query: (payload) => ({
				url: "market/equipment",
				method: "POST",
				body: payload,
			}),
			invalidatesTags: ["Equipment"],
		}),
		listingRealEstateOnMarket: build.mutation({
			query: (payload) => ({
				url: "market/realestate",
				method: "POST",
				body: payload,
			}),
			invalidatesTags: ["RealEstate", "RealEstate"],
		}),

		//market listing
		getAllEquipmentOnMarket: build.query({
			query: (payload) => ({
				url: "market/equipment",
				params: payload,
			}),
			providesTags: (result, error, args) =>
				result?.data
					? [
							...(result?.data || []).map(({ _id }) => ({
								type: "Equipment",
								_id,
							})),
							"Equipment",
					  ]
					: ["Equipment"],
		}),
		getAllRealEstateOnMarket: build.query({
			query: (payload) => ({
				url: "market/realestate",
				params: payload,
			}),
			providesTags: (result, error, args) =>
				result?.data
					? [
							...(result?.data || []).map(({ _id }) => ({
								type: "RealEstate",
								_id,
							})),
							"RealEstate",
					  ]
					: ["RealEstate"],
		}),

		getEquipmentOnMarket: build.query({
			query: (payload) => ({
				url: `market/equipment/${payload}`,
			}),
			providesTags: (result, error, arg) => [
				{ type: "Equipment", _id: arg },
			],
		}),
		getRealEstateOnMarket: build.query({
			query: (payload) => ({
				url: `market/realestate/${payload}`,
			}),
			providesTags: (result, error, arg) => [
				{ type: "RealEstate", _id: arg },
			],
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

	//digitalId
	useAddDigitalIdMutation,
	useGetUserDigitalIdQuery,

	//market
	useListingEquipmentOnMarketMutation,
	useListingRealEstateOnMarketMutation,

	useGetAllEquipmentOnMarketQuery,
	useGetAllRealEstateOnMarketQuery,
	//
	useGetEquipmentOnMarketQuery,
	useGetRealEstateOnMarketQuery,
} = userItemApi;
