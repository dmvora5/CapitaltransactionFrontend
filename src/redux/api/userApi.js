import { baseQuery, baseQueryWithAuth } from "@/utils";
import { retry, createApi } from "@reduxjs/toolkit/query/react";

// const staggeredBaseQuery = retry(baseQueryWithAuth, {
// 	maxRetries: 1,
// });

export const userApi = createApi({
	baseQuery: baseQueryWithAuth,
	reducerPath: "userAuth",
	tagTypes: ["Auth"],
	endpoints: (build) => ({
		registerUser: build.mutation({
			query: (payload) => ({
				url: "auth/register",
				method: "POST",
				body: payload,
			}),
		}),
		login: build.mutation({
			query: (payload) => ({
				url: "auth/login",
				method: "POST",
				body: payload,
			}),
			invalidatesTags: ["Auth"],
		}),
		verifyEmail: build.mutation({
			query: (payload) => ({
				url: "auth/verifyemail/",
				method: "POST",
				body: payload,
			}),
		}),
		logout: build.mutation({
			query: () => ({
				url: "auth/logout",
				method: "POST",
			}),
			// invalidatesTags: ["Auth"],
		}),
		forgetPassword: build.mutation({
			query: (payload) => ({
				url: "auth/forget-password",
				method: "POST",
				body: payload,
			}),
		}),
		resetPassword: build.mutation({
			query: (payload) => ({
				url: "auth/reset-password",
				method: "POST",
				body: payload,
			}),
			invalidatesTags: ["Auth"],
		}),
		resendOtp: build.mutation({
			query: (payload) => ({
				url: "auth/resend-otp",
				method: "POST",
				body: payload,
			}),
		}),
		userDetails: build.query({
			query: () => ({
				url: "auth/user-details",
			}),
			providesTags: ["Auth"],
		}),
		updateUser: build.mutation({
			query: (payload) => ({
				url: "auth",
				method: "PATCH",
				body: payload,
			}),
			invalidatesTags: ["Auth"],
		}),
		changePassword: build.mutation({
			query: (payload) => ({
				url: "auth/change-password",
				method: "PATCH",
				body: payload,
			}),
		}),
	}),
});

export const {
	useRegisterUserMutation,
	useLoginMutation,
	useVerifyEmailMutation,
	useLogoutMutation,
	useForgetPasswordMutation,
	useResetPasswordMutation,
	useResendOtpMutation,
	useUserDetailsQuery,
	useUpdateUserMutation,
	useChangePasswordMutation,
} = userApi;
