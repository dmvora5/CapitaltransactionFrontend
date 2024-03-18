import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useAddRealEstateMutation, useGetAllCategorysQuery } from "@/redux/api/userItemsApi";
import APICallStatushandler from "@/components/Shared/APICallStatushandler";
import Loader from "@/components/Shared/Loader";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Realestate = () => {


	const { data, isLoading, isSuccess, isError, error } = useGetAllCategorysQuery({ type: 'RealEstate' })
	const [submit, addRealEstateOption] = useAddRealEstateMutation();

	const [images, setImages] = useState([{
		error: '',
		value: '',
		url: ''
	}]);

	const formSchema = z.object({
		fullName: z.string().min(2, {
			message: "fullName must be at least 2 characters.",
		}),
		location: z.string().regex(/^(-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)$/, 'please enter valid latitude and longitude'),
		address: z.string("please enter valid address"),
		propertyAddress: z.string("please enter valid address"),
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
		cateroryId: z.string()
	});

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			fullName: "",
			cateroryId: ''
		},
	});

	useEffect(() => {
		if(isSuccess && data) {
			form.setValue('cateroryId', data?.data[0]?._id)
		}
	},[isSuccess, data, form])


	const handleAddImageField = () => {
		if (images.length >= 4) return;
		setImages(state => [...state, {
			error: '',
			value: ''
		}])
	}

	const removeImages = (index) => {
		if (index <= 0) return;
		const copyImagesState = [...images];
		copyImagesState.splice(index, 1);
		setImages(copyImagesState);
	}

	const handleSubmit = (values) => {
		let valid = true;
		const copyImageState = images.map(image => {
			if (!image.value) {
				image.error = 'please enter valid image'
				valid = false
			}
			return image
		})
		setImages(copyImageState);
		if (!valid) return;

		const formData = new FormData();
		Object.keys(values).forEach((key) => {
			formData.append(key, values[key]);
		});
		images.forEach(image => {
			formData.append("images[]", image.value);
		});
		submit(formData);
	}

	const onImageChange = ({ index, value }) => {
		const copyImageState = [...images];
		copyImageState[index] = {
			error: '',
			value: value
		}
		setImages(copyImageState)
	}


	return (
		<>
			{(isLoading || addRealEstateOption.isLoading) && <Loader />}
			<h2 className="font-medium text-3xl text-[#333333]">Real Estate</h2>
			<APICallStatushandler
				options={{ data, isLoading, isSuccess, isError, error }}
			/>
			<APICallStatushandler
				options={addRealEstateOption}
			/>
			<Form {...form} className="">
				<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-2 mt-8 sm:p-8 p-4 bg-white rounded-lg">
					<div className="flex flex-col lg:flex-row gap-x-5 space-y-2 md:space-y-0">
						<div className="flex-1">
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
												placeholder="xxx xxx xxx xxx"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="flex-1">
							<FormField
								control={form.control}
								name="location"
								render={({ field }) => (
									<FormItem className="min-h-[70px]">
										<FormLabel className="font-normal">
											Location
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
							/>
						</div>
					</div>
					<div className="flex flex-col lg:flex-row gap-x-5 space-y-2 md:space-y-0">
						<div className="flex-1">
							<FormField
								control={form.control}
								name="address"
								render={({ field }) => (
									<FormItem className="min-h-[70px]">
										<FormLabel className="font-normal">
											Your Address
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
							/>
						</div>
						<div className="flex-1">
							<FormField
								control={form.control}
								name="propertyAddress"
								render={({ field }) => (
									<FormItem className="min-h-[70px]">
										<FormLabel className="font-normal">
											Property Address
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
							/>
						</div>
					</div>
					<div className="flex flex-col lg:flex-row gap-x-5 space-y-2 md:space-y-0">
						<div className="flex-1">
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
												placeholder="xxx xxx xxx xxx"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="flex-1">
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
												placeholder="xxx xxx xxx xxx"
												{...field}
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
					<div className="flex flex-col space-y-2 md:space-y-0">
						<div className="flex-1 min-h-[116px]">
							<FormField
								control={form.control}
								name="cateroryId"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="font-normal">
											Category
										</FormLabel>
										<Select
											className="focus:outline-none border border-[#acacac] rounded-[10px]"
											onValueChange={field.onChange}
											value={field.value || data?.data[0]?._id}
											defaultValue={data?.data[0]?._id}
										>
											<FormControl className="h-14 border-[#acacac] rounded-[10px]">
												<SelectTrigger>
													<SelectValue placeholder="Select Gender" />
												</SelectTrigger>
											</FormControl>
											<SelectContent className="">
												{(data?.data || []).map((category) => (
													<SelectItem key={category._id} value={category._id}>
														{category.name}
													</SelectItem>
												))}

											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>
					<div className="flex flex-col space-y-2 md:space-y-0">
						{images.map((image, index) => (
							<div key={index} className="flex gap-x-5 items-end">
								<div className="flex-1 h-full  min-h-[70px]">
									<label className="block p-2">Upload Photo</label>
									<Input
										type="file"
										className="h-14 focus:outline-none border border-none rounded-[10px] file:h-12 file:px-4 file:font-medium file:text-[18px] file:text-[#acacac] file:bg-[#acacac34] file:rounded-lg file:mr-5"
										placeholder="Enter your full name..."
										onChange={(e) => onImageChange({ index, value: e.target.files[0] })}
									/>
									<p className="text-[#EF4444]">{image.error}</p>

								</div>
								<Button type='button' onClick={() => removeImages(index)}>Remove</Button>
							</div>
						))}
					</div>
					<div className="text-center py-5">
						<Button type="submit" className="px-10 bg-theamP w-full lg:w-fit">
							Submit
						</Button>
						<Button onClick={handleAddImageField} type='button' className="px-10 bg-theamP w-full lg:w-fit">
							Append
						</Button>
					</div>
				</form>
			</Form>
		</>
	);
};

export default Realestate;
