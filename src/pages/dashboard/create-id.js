import React from "react";
import { Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const CreateId = () => {
	const formSchema = z.object({
		fullName: z.string().min(2, {
			message: "fullName must be at least 2 characters.",
		}),
	});

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			fullName: "",
		},
	});

	return (
		<>
			<h2 className="font-medium text-3xl text-[#333333]">
				Digital ID Creation
			</h2>
			<Form {...form} className="mt-8 sm:p-8 p-4 bg-white rounded-lg">
				<form className="space-y-2">
					<div className="flex flex-col lg:flex-row gap-x-5 space-y-2 md:space-y-0">
						<div className="flex-1">
							<label className="block p-3">Your Full Name</label>
							<Input
								className="h-14 focus:outline-none border border-[#acacac] rounded-[10px]"
								placeholder="Enter your full name..."
							/>
						</div>
						<div className="flex-1">
							<label className="block sm:p-3 p-2">Card No.</label>
							<Input
								className="h-14 focus:outline-none border border-[#acacac] rounded-[10px]"
								placeholder="xxxx xxxx xxxx xxxx"
							/>
						</div>
					</div>
					<div className="flex flex-col lg:flex-row gap-x-5 space-y-2 md:space-y-0">
						<div className="flex-1">
							<label className="block p-3">Email Address</label>
							<Input
								type="email"
								className="h-14 focus:outline-none border border-[#acacac] rounded-[10px]"
								placeholder="Enter your email..."
							/>
						</div>
						<div className="flex-1">
							<label className="block p-3">Phone Number</label>
							<Input
								type="number"
								className="h-14 focus:outline-none border border-[#acacac] rounded-[10px]"
								placeholder="Enter your phone number..."
							/>
						</div>
						<div className="flex-1">
							<label className="block p-3">Country</label>
							<Input
								className="h-14 focus:outline-none border border-[#acacac] rounded-[10px]"
								placeholder="Enter your Country..."
							/>
						</div>
					</div>
					<div className="flex flex-col lg:flex-row gap-x-5 space-y-2 md:space-y-0">
						<div className="w-1/2 h-full">
							<label className="block p-2">Upload Document</label>
							<Input
								type="file"
								className="h-14 focus:outline-none border border-none rounded-[10px] file:h-12 file:px-4 file:font-medium file:text-[18px] file:text-[#acacac] file:bg-[#acacac34] file:rounded-lg file:mr-5"
								placeholder="Enter your full name..."
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
		</>
	);
};

export default CreateId;
