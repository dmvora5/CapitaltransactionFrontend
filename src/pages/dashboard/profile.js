import APICallStatushandler from "@/components/Shared/APICallStatushandler";
import Loader from "@/components/Shared/Loader";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PATH } from "@/path";
import {
	useChangePasswordMutation,
	useUpdateUserMutation,
	useUserDetailsQuery,
} from "@/redux/api/userApi";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import { KeyIcon } from "lucide-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const Layout = dynamic(() => import("@/components/Layout"), {
	ssr: false,
});

const ChagePasswordModel = () => {
	const router = useRouter();

	const [submit, changePasswordOption] = useChangePasswordMutation();

	const afterChangePasswordHandler = () => {
		Cookies.remove("currentUser");
		router.replace(PATH.login);
	};

	const formSchema = z.object({
		oldPassword: z.string({
			required_error: "please enter a valid oldPassword",
		}),
		newPassword: z
			.string({
				required_error: "please enter a valid oldPassword",
			})
			.min(8, "new password atleast 8 characters long"),
	});

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {},
	});

	// oldPassword
	// newPassword

	return (
		<Dialog>
			<APICallStatushandler
				options={changePasswordOption}
				cb={afterChangePasswordHandler}
			/>
			<DialogTrigger asChild>
				<span>Change password</span>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[700px] p-0">
				<span className="p-5 border-b font-medium text-xl">
					Change password
				</span>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(submit)}
						className="space-y-4 px-8 pb-8 border-b"
					>
						<div className="">
							<FormField
								className=""
								control={form.control}
								name="oldPassword"
								render={({ field }) => (
									<FormItem className="min-h-[70px]">
										<FormLabel>Old Password</FormLabel>
										<FormControl>
											<Input
												type="password"
												className="h-14 focus:outline-none border border-[#acacac] rounded-[10px]"
												placeholder="User name"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="">
							<FormField
								className=""
								control={form.control}
								name="newPassword"
								render={({ field }) => (
									<FormItem className="min-h-[70px]">
										<FormLabel>New Password</FormLabel>
										<FormControl>
											<Input
												type="password"
												className="h-14 focus:outline-none border border-[#acacac] rounded-[10px]"
												placeholder="User name"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="p-5 flex gap-x-4 justify-center">
							<Button className="w-36 rounded-xl bg-theamP">
								Save
							</Button>
							<DialogClose>
								<Button
									type="button"
									className="w-36 rounded-xl bg-[#acacac]"
								>
									Cancel
								</Button>
							</DialogClose>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

const Profile = () => {
	const [image, setImage] = useState();
	const [imgPriview, setImagePriview] = useState();

	const { data, isLoading, isError, error, isSuccess } =
		useUserDetailsQuery();

	console.log("data", data);
	console.log("error", error);
	const [updateUser, updateUserOption] = useUpdateUserMutation();

	//otp form
	const formSchema = z.object({
		fullName: z.string({
			required_error: "please enter a valid fullName",
		}),
	});

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			fullName: "",
		},
	});

	useEffect(() => {
		if (isSuccess && data) {
			form.setValue("fullName", data.data?.fullName);
			form.setValue("email", data.data?.email);
			form.setValue("phoneNo", data.data?.phoneNo);
			setImagePriview(data?.data?.profilePic);
		}
	}, [data, isSuccess]);

	const handleFileChange = (e) => {
		imgPriview && URL.revokeObjectURL(imgPriview);
		setImage(e.target.files[0]);
		setImagePriview(URL.createObjectURL(e.target.files[0]));
	};

	const onSubmitHandler = (values) => {
		// if (!image) {
		// 	return toast.error("Please select image");
		// }
		const formData = new FormData();
		Object.keys(values).forEach((key) => {
			formData.append(key, values[key]);
		});
		if (image) {
			formData.append("profilePic", image);
		}
		updateUser(formData);
	};

	return (
		<Layout>
			<h2 className="font-medium text-3xl text-[#333333]">
				Profile Settings
			</h2>
			{(isLoading || updateUserOption.isLoading) && <Loader />}

			<APICallStatushandler options={updateUserOption} />
			<APICallStatushandler
				options={{ data, isLoading, isError, error, isSuccess }}
			/>
			<div className="mt-8 flex flex-col lg:flex-row gap-8">
				<div className=" lg:w-1/3  lg:h-36 bg-white rounded-md shadow-md flex gap-4 p-4">
					<div className="flex-1 flex flex-col justify-between">
						<div className="space-y-2">
							<h2 className="font-medium text-xl">Full Name</h2>
							<p className="text-[#acacac]">User</p>
						</div>
						<p className="text-sm text-theamP cursor-pointer">
							<KeyIcon className="w-4 h-4 inline-block mr-2" />
							<ChagePasswordModel />
						</p>
					</div>
					<div className="w-1/4 relative ">
						<img
							src={imgPriview || "/images/pic.svg"}
							className="absolute top-0 left-0 h-full w-full object-fill object-center "
						/>
						<input
							onChange={handleFileChange}
							type="file"
							className="h-full w-full opacity-0"
						/>
					</div>
				</div>
				<div className="flex-1 bg-white rounded-md shadow-md">
					<h2 className="font-medium text-lg text-[#333333] p-7 border-b border-[#acacac]">
						Edit Profile
					</h2>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmitHandler)}
							className="p-5 space-y-4"
						>
							<div className="">
								<FormField
									className=""
									control={form.control}
									name="fullName"
									render={({ field }) => (
										<FormItem className="min-h-[70px]">
											<FormLabel>
												Your Full Name
											</FormLabel>
											<FormControl>
												<Input
													className="h-14 focus:outline-none border border-[#acacac] rounded-[10px]"
													placeholder="User name"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className="">
								<FormField
									className=""
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem className="min-h-[70px]">
											<FormLabel>Email Address</FormLabel>
											<FormControl>
												<Input
													disabled={true}
													className="h-14 focus:outline-none border border-[#acacac] rounded-[10px]"
													placeholder="User name"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className="">
								<FormField
									className=""
									control={form.control}
									name="phoneNo"
									render={({ field }) => (
										<FormItem className="min-h-[70px]">
											<FormLabel>Phone Number</FormLabel>
											<FormControl>
												<Input
													disabled={true}
													className="h-14 focus:outline-none border border-[#acacac] rounded-[10px]"
													placeholder="Phone number"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className="flex mt-8 gap-4">
								<Button className="w-1/2 lg:w-1/5 h-12 bg-theamP">
									Save
								</Button>
								<Button className="w-1/2 lg:w-1/5 h-12 bg-[#acacac]">
									Cancle
								</Button>
							</div>
						</form>
					</Form>
				</div>
			</div>
		</Layout>
	);
};

export default Profile;
