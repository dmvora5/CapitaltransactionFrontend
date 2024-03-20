import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ChevronDown, Menu } from "lucide-react";
import { useSelector } from "react-redux";
import { userState } from "@/redux/slice/userSlice";

const Header = () => {
	const { user } = useSelector(userState);

	return (
		<header className="w-full h-[90px] bg-white shadow-md flex justify-between items-center px-5 ">
			<h1 className="font-semibold text-2xl xl:text-5xl text-theamP ">
				Capital Transactions
			</h1>
			<ul className="hidden lg:flex items-center gap-x-20 font-medium">
				<li className="">Home</li>
				<li className="">About</li>
				<li className="">Faq</li>
				<li className="">Contact us</li>
				<li className="flex gap-x-2 items-center">
					<Avatar>
						<AvatarImage
							src={
								user?.profilePic ||
								"https://github.com/shadcn.png"
							}
							alt="@shadcn"
						/>
						<AvatarFallback>{user?.userName}</AvatarFallback>
					</Avatar>
					<ChevronDown className="cursor-pointer" />
				</li>
			</ul>
			<Menu className="lg:hidden w-10 h-8 rounded-md bg-theamP text-white" />
		</header>
	);
};

export default Header;
