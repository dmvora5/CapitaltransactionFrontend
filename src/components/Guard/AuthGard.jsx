import { authFlowRoutes } from "@/path";
import { useUserDetailsQuery } from "@/redux/api/userApi";
import { setUser } from "@/redux/slice/userSlice";
import EventBus from "@/utils/event";
import Cookies from "js-cookie";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
const Loader = dynamic(() => import("../Shared/Loader"), {
	ssr: false,
});

const AuthGard = ({ children }) => {
	const router = useRouter();
	const dispatch = useDispatch();

	const { data, isSuccess, isLoading } = useUserDetailsQuery(
		{},
		{
			skip: authFlowRoutes.includes(router.pathname),
		}
	);

	useEffect(() => {
		if (isSuccess && data) {
			dispatch(setUser(data.data));
		}
	}, [isSuccess, data]);

	useEffect(() => {
		EventBus.on("logout", () => {
			// Cookies.set('path', router.pathname);
			Cookies.remove("currentUser");
			dispatch(setUser(null));
			router.replace("/login");
		});

		return () => EventBus.remove("logout");
	}, [router]);
	return (
		<>
			{isLoading && <Loader />}
			{children}
		</>
	);
};

export default AuthGard;
