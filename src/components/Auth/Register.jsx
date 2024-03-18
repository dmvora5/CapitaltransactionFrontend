import { PATH } from "@/path";

import { useRouter } from "next/router";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Checkbox } from "../ui/checkbox";
import Link from "next/link";
import { useRegisterUserMutation } from "@/redux/api/userApi";
import Loader from "../Shared/Loader";
import APICallStatushandler from "../Shared/APICallStatushandler";

const Register = () => {
	const router = useRouter();

	const [register, registerOption] = useRegisterUserMutation();

	const formSchema = z.object({
		userName: z.string().min(2, {
			message: "user name must be at least 2 characters.",
		}),
		countryCode: z.string({
			required_error: "please enter a valid country code",
		}),
		phoneNo: z
			.string({
				required_error: "please enter a valid phoneNo",
			})
			.min(10, "please enter valid phone no"),
		email: z
			.string({
				required_error: "please enter a valid email",
			})
			.email("please enter valid email address"),
		password: z.string().min(2, "password at least 2 characters. long"),
	});

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			userName: "",
			countryCode: "",
			phoneNo: "",
			email: "",
			password: "",
		},
	});

	const afterRegisterHandler = (data) => {
		router.push({
			pathname: PATH.verifyemail,
			query: {
				email: data.data,
			},
		});
	};

	return (
		<div className="text-white space-y-10 sm:w-11/12">
			{registerOption.isLoading && <Loader />}
			<APICallStatushandler
				cb={afterRegisterHandler}
				options={registerOption}
			/>
			<h2 className="font-medium text-xl">Register Your Account</h2>
			<Form {...form}>
				<form
					className="space-y-8"
					onSubmit={form.handleSubmit(register)}
				>
					<FormField
						className=""
						control={form.control}
						name="userName"
						render={({ field }) => (
							<FormItem className="min-h-[70px]">
								{/* <FormLabel>Username</FormLabel> */}
								<FormControl>
									<Input
										className="bg-transparent pl-0 rounded-none placeholder:text-white border-t-0 border-x-0 border-b-2 outline-none "
										placeholder="User name"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="flex gap-x-4">
						<FormField
							type="number"
							control={form.control}
							name="countryCode"
							render={({ field }) => (
								<FormItem className="w-1/4 min-h-[70px]">
									{/* <FormLabel>Username</FormLabel> */}
									<FormControl>
										<Input
											className="bg-transparent pl-0 rounded-none placeholder:text-white border-t-0 border-x-0 border-b-2 outline-none "
											placeholder="Country code"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="phoneNo"
							render={({ field }) => (
								<FormItem className="flex-1 min-h-[70px]">
									{/* <FormLabel>Username</FormLabel> */}
									<FormControl>
										<Input
											className="bg-transparent pl-0 rounded-none placeholder:text-white border-t-0 border-x-0 border-b-2 outline-none "
											placeholder="+1"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem className="min-h-[70px]">
								{/* <FormLabel>Email</FormLabel> */}
								<FormControl>
									<Input
										type="email"
										className="bg-transparent pl-0 rounded-none placeholder:text-white border-t-0 border-x-0 border-b-2 outline-none "
										placeholder="Email"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem className="min-h-[70px]">
								{/* <FormLabel>Password</FormLabel> */}
								<FormControl>
									<Input
										type="password"
										className="bg-transparent pl-0 rounded-none placeholder:text-white border-t-0 border-x-0 border-b-2 outline-none "
										placeholder="Password"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="flex items-center space-x-4">
						<Checkbox className="border-white" id="terms" />
						<label
							htmlFor="terms"
							className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						>
							Accept terms and conditions
						</label>
					</div>

					<Button
						className="bg-white text-black w-40 mt-8"
						type="submit"
					>
						Register
					</Button>
				</form>
				<Link className="block" href="/login">
					Already Have&apos;n account ? Go Login
				</Link>
			</Form>
		</div>
	);
};

export default Register;
