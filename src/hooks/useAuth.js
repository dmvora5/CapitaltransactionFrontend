import { loginService } from "@/services/user-services";
import EventBus from "@/utils/event";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export const useLogin = () => {
	const login = async (payload) => {
		const { data } = await loginService(payload);
		if (data.data) {
			Cookies.set("currentUser", JSON.stringify(data.data));
		}
		return data;
	};

	const logout = () => {
		Cookies.remove("currentUser");
		EventBus.dispatch("logout");
	};

	return {
		login,
		logout,
	};
};

export const useCurrentUser = () => {
	const [user, setUser] = useState();

	useEffect(() => {
		const currentUser = Cookies.get("currentUser");
		if (currentUser) {
			setUser(JSON.parse(currentUser));
		}
	}, []);

	return user;
};
