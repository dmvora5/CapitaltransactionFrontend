import { Axios } from "@/utils";

export const registerUserService = async (payload) => {
	return Axios.post("user/register", payload);
};

export const verifyOtpService = async (payload) => {
	return Axios.post("user/verify-email", payload);
};

export const loginService = async (payload) => {
	return Axios.post("user/login", payload);
};

export const sendOtpService = async (payload) => {
	return Axios.post("user/send-otp", payload);
};

export const forgetPasswordService = async (payload) => {
	return Axios.post("user/forget-password", payload);
};
