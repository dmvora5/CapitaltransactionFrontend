// import { PATH } from "@/path";
// import { useVerifyOtpMutation } from "@/redux/api/userApi";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import React, { useState, useEffect } from "react";

// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
// 	Form,
// 	FormControl,
// 	FormField,
// 	FormItem,
// 	FormLabel,
// 	FormMessage,
// } from "../ui/form";
// import Loader from "../Shared/Loader";
// import APICallStatushandler from "../Shared/APICallStatushandler";

// const VerifyOtp = () => {
// 	const router = useRouter();

// 	const [email, setEmail] = useState();

// 	const [verifyEmail, emailVerificationOption] = useVerifyOtpMutation();

// 	useEffect(() => {
// 		if (!router.isReady) return;
// 		setEmail(router.query.email);
// 	}, [router.isReady]);

// 	const otpFormSchema = z.object({
// 		otp: z
// 			.string({
// 				required_error: "please enter a valid otp",
// 			})
// 			.min(6, "please enter valid otp address"),
// 	});

// 	const otpForm = useForm({
// 		resolver: zodResolver(otpFormSchema),
// 		defaultValues: {
// 			otp: "",
// 		},
// 	});

// 	const afterValidate = () => {
// 		router.push(PATH.login);
// 	};

// 	return (
// 		<>
// 			<div>
// 				{emailVerificationOption.isLoading && <Loader />}
// 				<APICallStatushandler
// 					cb={afterValidate}
// 					options={emailVerificationOption}
// 				/>
// 				<main className="min-h-screen flex flex-col sm:flex-row overflow-y-auto">
// 					<div className="min-h-96 md:w-7/12 flex flex-col py-15 px-11 md:py-20 md:px-16">
// 						<h1 className="font-bold text-3xl md:text-5xl py-5 text-theamP">
// 							Capital Transactions
// 						</h1>
// 						<div className="flex-1 flex flex-col justify-center">
// 							<div className="space-y-6 px-1 py-5">
// 								<h2 className="text-3xl md:text-6xl">
// 									Verify OTP
// 								</h2>
// 								<p className="md:w-8/12">
// 									Lorem ipsum dolor sit amet, consectetur
// 									adipiscing elit, sed do eiusmod tempor
// 									incididunt ut labore et dolore magna aliqua.
// 									Ut enim ad minim veniam, quis nostrud
// 									exercitation ullamco laboris nisi ut aliquip
// 									ex ea commodo consequat.
// 								</p>
// 								<Link
// 									href={PATH.login}
// 									className="bg-theamP  w-1/3 sm:w-52 py-2 block text-white rounded-md text-center"
// 								>
// 									Login
// 								</Link>
// 							</div>
// 						</div>
// 					</div>
// 					<div className="flex flex-1 flex-col justify-center items-center bg-theamP px-10">
// 						<div className="text-white space-y-10 sm:w-11/12">
// 							<h2 className="font-medium text-xl">
// 								Verify Your Account
// 							</h2>

// 							<Form {...otpForm}>
// 								<form
// 									className="space-y-8"
// 									onSubmit={otpForm.handleSubmit((values) =>
// 										verifyEmail({
// 											...values,
// 											email,
// 										})
// 									)}
// 								>
// 									<FormField
// 										control={otpForm.control}
// 										name="otp"
// 										render={({ field }) => (
// 											<FormItem className="min-h-[70px]">
// 												{/* <FormLabel>Email</FormLabel> */}
// 												<FormControl>
// 													<Input
// 														className="bg-transparent pl-0 rounded-none placeholder:text-white border-t-0 border-x-0 border-b-2 outline-none "
// 														placeholder="otp"
// 														{...field}
// 													/>
// 												</FormControl>
// 												<FormMessage />
// 											</FormItem>
// 										)}
// 									/>
// 									<div className="flex justify-between items-center">
// 										<Button
// 											className="bg-white text-black w-40"
// 											type="submit"
// 										>
// 											Submit
// 										</Button>
// 										<Button
// 											variant="ghost"
// 											className="h-10"
// 											type="submit"
// 										>
// 											resend
// 										</Button>
// 									</div>
// 								</form>
// 							</Form>
// 						</div>
// 					</div>
// 				</main>
// 			</div>
// 		</>
// 	);
// };

// export default VerifyOtp;
