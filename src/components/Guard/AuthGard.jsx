import EventBus from "@/utils/event";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect } from "react";

const AuthGard = ({ children }) => {
	const router = useRouter();

	useEffect(() => {
		EventBus.on("logout", () => {
			// Cookies.set('path', router.pathname);
			Cookies.remove("currentUser");
			router.replace("/login");
		});

		return () => EventBus.remove("logout");
	}, [router]);
	return children;
};

export default AuthGard;
