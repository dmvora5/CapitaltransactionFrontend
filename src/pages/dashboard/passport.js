import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { useAddPassportMutation } from "@/redux/api/userItemsApi";
import Loader from "@/components/Shared/Loader";
import APICallStatushandler from "@/components/Shared/APICallStatushandler";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";

const Layout = dynamic(() => import("@/components/Layout"), {
	ssr: false,
});

const Passport = () => {
	const [image, setImage] = useState();
	const [submit, addPassportOption] = useAddPassportMutation();

	const formSchema = z.object({
		fullName: z.string().min(2, {
			message: "fullName must be at least 2 characters.",
		}),
		nationality: z.string("please enter valid nationality"),
		dob: z
			.string("please enter valid dob")
			.min(8, "Please enter valid dob"),
		gender: z.string({
			message: "Please enter valid value",
		}),
		passportNo: z.string("please enter valid passport no."),
		country: z.string("please enter valid passport no."),
	});

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			// fullName: "",
			// nationality: "",
			// dob: "",
			// gender: "male",
			// passportNo: "",
			// country: "india",
		},
	});

	useEffect(() => {
		form.setValue("gender", "male");
		form.setValue("country", "india");
	}, []);

	const handlePassportAdd = (values) => {
		if (!image) {
			return toast.error("Please select image!");
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
			{addPassportOption.isLoading && <Loader />}
			<h2 className="font-medium text-3xl text-[#333333]">Passport</h2>
			<APICallStatushandler
				options={addPassportOption}
				cb={afterAddHandler}
			/>
			<Form {...form} className="">
				<form
					onSubmit={form.handleSubmit(handlePassportAdd)}
					className="space-y-6 mt-8 sm:p-8 p-4 bg-white rounded-lg"
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
								name="nationality"
								render={({ field }) => (
									<FormItem className="min-h-[70px]">
										<FormLabel className="font-normal">
											Nationality
										</FormLabel>
										<FormControl>
											<Input
												className="h-14 focus:outline-none border border-[#acacac] rounded-[10px]"
												placeholder="xxxx xxxx xxxx xxxx"
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
								name="dob"
								render={({ field }) => (
									<FormItem className="min-h-[70px]">
										<FormLabel className="font-normal">
											Date of Birth
										</FormLabel>
										<FormControl>
											<Input
												type="date"
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
								name="gender"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="font-normal">
											Gender
										</FormLabel>
										<Select
											className="focus:outline-none border border-[#acacac] rounded-[10px]"
											onValueChange={field.onChange}
											value={field.value || "male"}
											defaultValue={"male"}
										>
											<FormControl className="h-14 border-[#acacac] rounded-[10px]">
												<SelectTrigger>
													<SelectValue placeholder="Select Gender" />
												</SelectTrigger>
											</FormControl>
											<SelectContent className="">
												<SelectItem value="male">
													Male
												</SelectItem>
												<SelectItem value="female">
													Female
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
						<div className="flex-1 min-h-[116px]">
							<FormField
								control={form.control}
								name="passportNo"
								render={({ field }) => (
									<FormItem className="min-h-[70px]">
										<FormLabel className="font-normal">
											Passport No.
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
						<div className="flex-1">
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
								{/* <FormField
								control={form.control}
								name="gender"
								render={({ field }) => (
									<FormItem className="min-h-[70px]">
										<FormLabel className="font-normal">
											Gender
										</FormLabel>
										<FormControl>
											<Input
												className="h-14 focus:outline-none border border-[#acacac] rounded-[10px]"
												placeholder="xxx xxx xxx xxx"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/> */}
							</div>
						</div>
						<div className="flex-1 h-full">
							<FormField
								control={form.control}
								name="frontImage"
								render={({ field }) => (
									<FormItem className="min-h-[70px]">
										<FormLabel className="font-normal">
											Image
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
						<Button className="px-10 bg-theamP w-full lg:w-fit">
							Submit
						</Button>
					</div>
				</form>
			</Form>
		</Layout>
	);
};

export default Passport;
