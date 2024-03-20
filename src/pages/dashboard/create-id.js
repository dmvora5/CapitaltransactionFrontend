import React, { useState } from "react";
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
} from "@/components/ui/form";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useAddDigitalIdMutation } from "@/redux/api/userItemsApi";
import Loader from "@/components/Shared/Loader";
import APICallStatushandler from "@/components/Shared/APICallStatushandler";
import dynamic from "next/dynamic";

const Layout = dynamic(() => import("@/components/Layout"), {
	ssr: false,
});

const CreateId = () => {
	const [submit, addDigitalIdOption] = useAddDigitalIdMutation();

	const [image, setImage] = useState();

	const formSchema = z.object({
		fullName: z.string().min(2, {
			message: "fullName must be at least 2 characters.",
		}),
		cardNo: z.string(),
		email: z
			.string({
				required_error: "please enter a valid email",
			})
			.email("please enter valid email address"),
		phoneNo: z
			.string({
				required_error: "please enter a valid phoneNo",
			})
			.min(10, "please enter valid phone no"),
		country: z.string("please enter valid passport no."),
	});

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			fullName: "",
			country: "us",
		},
	});

	const handleSubmit = (values) => {
		if (!image) {
			return toast.error("Please select image");
		}
		const formData = new FormData();
		Object.keys(values).forEach((key) => {
			formData.append(key, values[key]);
		});
		formData.append("frontImg", image);
		submit(formData);
	};

	const afterAddHandler = () => {
		form.reset({});
	};

	return (
		<Layout>
			<h2 className="font-medium text-3xl text-[#333333]">
				Digital ID Creation
			</h2>
			{addDigitalIdOption.isLoading && <Loader />}
			<APICallStatushandler
				options={addDigitalIdOption}
				cb={afterAddHandler}
			/>
			<Form {...form} className="">
				<form
					onSubmit={form.handleSubmit(handleSubmit)}
					className="space-y-2 mt-8 sm:p-8 p-4 bg-white rounded-lg"
				>
					<div className="flex flex-col lg:flex-row gap-x-5 space-y-2 md:space-y-0">
						<div className="flex-1 min-h-[116px]">
							<FormField
								control={form.control}
								name="fullName"
								render={({ field }) => (
									<FormItem className="min-h-[70px]">
										<FormLabel className="font-normal">
											Your Full Name
										</FormLabel>
										<FormControl>
											<Input
												className="h-14 focus:outline-none border border-[#acacac] rounded-[10px]"
												placeholder="Enter your full name..."
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="flex-1 min-h-[116px]">
							<FormField
								control={form.control}
								name="cardNo"
								render={({ field }) => (
									<FormItem className="min-h-[70px]">
										<FormLabel className="font-normal">
											Card No.
										</FormLabel>
										<FormControl>
											<Input
												className="h-14 focus:outline-none border border-[#acacac] rounded-[10px]"
												placeholder="xxxx xxxx"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>
					<div className="flex flex-col lg:flex-row gap-x-5 space-y-2 md:space-y-0">
						<div className="flex-1 min-h-[116px]">
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem className="min-h-[70px]">
										<FormLabel className="font-normal">
											Email
										</FormLabel>
										<FormControl>
											<Input
												type="email"
												className="h-14 focus:outline-none border border-[#acacac] rounded-[10px]"
												placeholder="Enter your email"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="flex-1 min-h-[116px]">
							<FormField
								control={form.control}
								name="phoneNo"
								render={({ field }) => (
									<FormItem className="min-h-[70px]">
										<FormLabel className="font-normal">
											Phone Number
										</FormLabel>
										<FormControl>
											<Input
												className="h-14 focus:outline-none border border-[#acacac] rounded-[10px]"
												placeholder="Enter your phone number..."
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="flex-1 min-h-[116px]">
							<FormField
								control={form.control}
								name="country"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="font-normal">
											Country
										</FormLabel>
										<Select
											className="focus:outline-none border border-[#acacac] rounded-[10px]"
											onValueChange={field.onChange}
											value={field.value || "us"}
											defaultValue={"us"}
										>
											<FormControl className="h-14 border-[#acacac] rounded-[10px]">
												<SelectTrigger>
													<SelectValue placeholder="Select Gender" />
												</SelectTrigger>
											</FormControl>
											<SelectContent className="">
												<SelectItem value="india">
													India
												</SelectItem>
												<SelectItem value="us">
													US
												</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>

					<div className="flex flex-col lg:flex-row gap-x-5 space-y-2 md:space-y-0">
						<div className="w-1/2 h-full">
							<FormField
								control={form.control}
								name="frontImage"
								render={({ field }) => (
									<FormItem className="min-h-[70px]">
										<FormLabel className="font-normal text-base">
											Upload Document
										</FormLabel>
										<FormControl>
											<Input
												type="file"
												className="h-14 focus:outline-none border border-none rounded-[10px] file:h-12 file:px-4 file:font-medium file:text-[18px] file:text-[#acacac] file:bg-[#acacac34] file:rounded-lg file:mr-5"
												{...field}
												onChange={(e) =>
													setImage(e.target.files[0])
												}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						{/* <div className="w-1/2 h-full">
							<label className="block p-2">Upload Document</label>
							<Input
								type="file"
								className="h-14 focus:outline-none border border-none rounded-[10px] file:h-12 file:px-4 file:font-medium file:text-[18px] file:text-[#acacac] file:bg-[#acacac34] file:rounded-lg file:mr-5"
								placeholder="Enter your full name..."
							/>
						</div> */}
					</div>
					<div className="text-center py-5">
						<Button className="px-10 bg-theamP w-full md:w-fit">
							Submit
						</Button>
					</div>
				</form>
			</Form>
		</Layout>
	);
};

export default CreateId;
