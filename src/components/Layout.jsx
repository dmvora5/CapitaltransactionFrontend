import { cn } from "@/lib/utils";
import { PATH, authFlowRoutes, withoutLayoutRoutes } from "@/path";
import {
	Bell,
	BookUser,
	Building,
	CreditCard,
	FileTerminal,
	LayoutDashboard,
	MenuIcon,
	MessageSquare,
	NotebookPen,
	Scroll,
	Search,
	Settings,
	ShoppingBag,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { useLogoutMutation, useUserDetailsQuery } from "@/redux/api/userApi";

import {
	useGetUserNotificationQuery,
	useViewNotioficationMutation,
} from "@/redux/api/userItemsApi";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { userState } from "@/redux/slice/userSlice";

const Menu = [
	{
		name: "Digital Managment",
		Icon: LayoutDashboard,
		path: "/dashboard/managment",
	},
	{
		name: "ID Creation",
		Icon: NotebookPen,
		path: "/dashboard/create-id",
	},
	{
		name: "Drivers's Licence",
		Icon: CreditCard,
		path: "/dashboard/licence",
	},
	{
		name: "Passport",
		Icon: BookUser,
		path: "/dashboard/passport",
	},
	{
		name: "Real Estate",
		Icon: Building,
		path: "/dashboard/realestate",
	},
	{
		name: "Car Registration",
		Icon: FileTerminal,
		path: "/dashboard/equipment",
	},
	{
		name: "Upload List",
		Icon: Scroll,
		path: "/dashboard/uploadlist",
	},
	{
		name: "Setting",
		Icon: Settings,
		path: "/dashboard/profile",
	},
	{
		name: "MarketPlace",
		Icon: ShoppingBag,
		path: "/marketplace/equipment",
	},
];

const Notification = ({ isMobile }) => {
	const { isLoading, data } = useGetUserNotificationQuery();
	const [submit, updateNotificationOption] = useViewNotioficationMutation();

	return (
		<>
			{isLoading ? (
				<p>Loading...</p>
			) : (
				<Popover>
					<PopoverTrigger asChild>
						<span className="relative mx-auto cursor-pointer">
							{data?.unreadCount > 0 && (
								<Badge className="absolute right-0 top-[-4px] w-4 h-4 p-1 bg-theamP">
									{data?.unreadCount}
								</Badge>
							)}
							<Bell className="w-8 h-8" />
						</span>
					</PopoverTrigger>
					<PopoverContent
						className="w-[400px] p-0"
						align={isMobile ? "center" : "end"}
					>
						<div className="p-4 flex border-b">
							<h2 className="flex-1 font-medium text-xl">
								Notification
							</h2>
							{data?.unreadCount > 0 && (
								<Button size="sm" className="px-2 bg-theamP">
									{data?.unreadCount} unread
								</Button>
							)}
						</div>
						{(data?.data || []).map((notificaton, index) => (
							<div
								onClick={() => submit({ id: notificaton._id })}
								key={notificaton._id}
								className={cn(
									"p-2 flex items-center border-b h-24",
									!notificaton.view ? "cursor-pointer" : ""
								)}
							>
								<div className="w-1/6">
									<img
										src="/images/notification.svg"
										className="w-full h-full"
									/>
								</div>
								<div className="flex-1 p-1">
									<h2 className="text-lg flex justify-between mr-2">
										<span>{notificaton.title}</span>
										{!notificaton.view && (
											<img src="/images/check.svg" />
										)}
									</h2>
									<p className="text-sm">
										{notificaton.message}
									</p>
								</div>
							</div>
						))}
						<div className="h-28 py-10 px-6">
							{data?.unreadCount > 0 && (
								<Button
									disabled={
										updateNotificationOption.isLoading
									}
									onClick={() => submit({ viewAll: true })}
									className="w-full h-12 bg-theamP"
								>
									View All
								</Button>
							)}
						</div>
					</PopoverContent>
				</Popover>
			)}
		</>
	);
};

const BackSection = ({ classNames = "", isMobile = false, user }) => {
	const router = useRouter();

	const [submit, logOutOption] = useLogoutMutation();
	const logOut = async () => {
		try {
			await submit();
			Cookies.remove("currentUser");
			router.replace(PATH.login);
		} catch (err) {
			console.log("err", err);
		}
	};
	return (
		<div className={cn("flex items-center", classNames)}>
			<MessageSquare className="w-8 h-8 mx-auto" />
			<Notification isMobile={isMobile} />
			<div className={cn("flex justify-evenly w-1/2 mx-auto")}>
				<Avatar>
					<AvatarImage
						src={
							user?.profilePic || "https://github.com/shadcn.png"
						}
						alt="@shadcn"
					/>
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>

				<div className="text-sm hidden lg:block">
					<p>{user?.userName}</p>
					{logOutOption.isLoading ? (
						<p>Loading...</p>
					) : (
						<p onClick={logOut} className="cursor-pointer">
							Logout
						</p>
					)}
				</div>

				<MenuIcon className="h-8 w-8 lg:hidden" />
			</div>
		</div>
	);
};

const SearchSection = ({ classNames }) => {
	return (
		<div
			className={cn(
				"flex items-center border border-[#acacac] rounded-[10px]",
				classNames
			)}
		>
			<Search className="w-6 mx-4 text-[#acacac]" />
			<input
				className="h-[40px] outline-none mr-2"
				placeholder="Search"
			/>
		</div>
	);
};

const Layout = ({ children }) => {
	const router = useRouter();

	const { user } = useSelector(userState);

	const [show, setShow] = useState(true);
	const [itemShow, setItemShow] = useState(true);

	const handleShow = () => {
		setShow(!show);
		setTimeout(() => {
			setItemShow(!itemShow);
		}, 100);
	};

	if (
		authFlowRoutes.includes(router.pathname) ||
		withoutLayoutRoutes.includes(router.pathname)
	) {
		return children;
	}

	return (
		<div className="flex flex-col md:flex-row h-screen overflow-hidden">
			<header className={cn("container h-[135px] md:hidden py-4 px-3 top-0")}>
				<div className="flex h-1/2 items-center">
					<h2 className="w-1/2 font-bold text-theamP">
						Capital Transactions
					</h2>
					<BackSection
						classNames="w-1/2"
						isMobile={true}
						user={user}
					/>
				</div>
				<SearchSection />
			</header>
			<aside
				className={cn(
					"bg-slate-50 space-y-10 transition-all hidden md:block",
					show ? "w-64" : "w-20"
				)}
			>
				<div
					className={cn(
						"transition-all h-[80px] font-semibold text-xl p-5 text-theamP"
					)}
				>
					<span
						className={cn(
							"transition-all",
							show && itemShow ? "" : "hidden"
						)}
					>
						Capital Transactions
					</span>
				</div>
				<div>
					<div className="">
						<h2 className="p-4">
							<span
								className={
									("transition-all",
									cn(show && itemShow ? "" : "hidden"))
								}
							>
								MAIN MENU
							</span>
						</h2>
					</div>

					{Menu.map(({ name, Icon, path }) => (
						<div
							key={path}
							className={cn(
								"py-5 text-sm flex",
								path === router.pathname
									? "bg-white shadow-lg text-theamP"
									: " text-[#333333]"
							)}
						>
							<Link href={path}>
								<div className="flex">
									<Icon
										className={cn(
											show && itemShow ? "mx-4" : "mx-7"
										)}
									/>
									<h2
										className={cn(
											show && itemShow ? "" : "hidden"
										)}
									>
										{name}
									</h2>
								</div>
							</Link>
						</div>
					))}
				</div>
			</aside>
			<section className="flex-1 min-h-full flex flex-col">
				<div className="h-[80px] items-center hidden md:flex  justify-between">
					<div className="w-1/4 flex">
						<MenuIcon
							onClick={handleShow}
							className="h-[40px] text-[#acacac] w-[100px] cursor-pointer"
						/>
						<SearchSection />
					</div>
					<BackSection
						user={user}
						classNames="sm:w-[30%] md:w-1/2 xl:w-1/5"
					/>
				</div>
				<div className="bg-[#acacac34] overflow-auto flex-1 p-4 sm:p-7">
					{children}
				</div>
			</section>
		</div>
	);
};

export default Layout;
