import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAddEquipmentMutation, useGetAllCategorysQuery } from "@/redux/api/userItemsApi";
import APICallStatushandler from "@/components/Shared/APICallStatushandler";
import Loader from "@/components/Shared/Loader";

const Equipment = () => {

	const [images, setImages] = useState([{
		error: '',
		value: '',
		url: ''
	}]);

	const { data, isLoading, isSuccess, isError, error } = useGetAllCategorysQuery({ type: 'Equipment' })
	const [submit, addEquipmentOption] = useAddEquipmentMutation();


	const formSchema = z.object({
		vehicalIdetificationNo: z.string().min(2, {
			message: "vehicalIdetificationNo must be at least 2 characters.",
		}),
		titleNo: z.string(),
		year: z.string(),
		make: z.string(),
		vehicalBody: z.string(),
		emptyWGT: z.string(),
		grossWGT: z.string(),
		GVWR: z.string(),
		GCWR: z.string(),
		AXLES: z.string(),
		Fuel: z.string(),
		SalesTaxPaid: z.string(),
		ODOMeter: z.string(),
		DateIsuued: z.string(),
		OtherPartinantDate: z.string(),
		fullName: z.string(),
		address: z.string(),
		cateroryId: z.string(),
		OddMeterBrand: z.string(),
		PriorTitleNo: z.string()
	});

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {},
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
		console.log('values', values)
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

	const afterAddHandler = () => {

	}


	return (
		<>
			<h2 className="font-medium text-3xl text-[#333333]">
				Car Registration
			</h2>
			{(isLoading || addEquipmentOption.isLoading) && <Loader />}
			<APICallStatushandler
				options={{ data, isLoading, isSuccess, isError, error }}
			/>
			<APICallStatushandler
				options={addEquipmentOption}
				cb={afterAddHandler}
			/>
			<Form {...form} className="">
				<form onSubmit={form.handleSubmit(handleSubmit)} className="mt-8 sm:p-8 p-4 bg-white rounded-lg space-y-2">
					<div className="flex flex-col lg:flex-row gap-x-5 space-y-2 md:space-y-0">
						<div className="flex-1 min-h-[116px]">
							<FormField
								control={form.control}
								name="vehicalIdetificationNo"
								render={({ field }) => (
									<FormItem className="min-h-[70px]">
										<FormLabel className="font-normal">
											Vehicle Identification Number										</FormLabel>
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
						<div className="flex-1 min-h-[116px]">
							<FormField
								control={form.control}
								name="titleNo"
								render={({ field }) => (
									<FormItem className="min-h-[70px]">
										<FormLabel className="font-normal">
											Title No.
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
						<div className="flex-1 min-h-[116px]">
							<FormField
								control={form.control}
								name="year"
								render={({ field }) => (
									<FormItem className="min-h-[70px]">
										<FormLabel className="font-normal">
											Year
										</FormLabel>
										<FormControl>
											<Input
												type="date"
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
						<div className="flex-1 min-h-[116px]">
							<FormField
								control={form.control}
								name="make"
								render={({ field }) => (
									<FormItem className="min-h-[70px]">
										<FormLabel className="font-normal">
											Make
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
						<div className="flex-1 min-h-[116px]">
							<FormField
								control={form.control}
								name="vehicalBody"
								render={({ field }) => (
									<FormItem className="min-h-[70px]">
										<FormLabel className="font-normal">
											Vehicle Body
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
					<div className="flex flex-wrap lg:flex-row gap-x-5 space-y-2 md:space-y-0">
						<div className="flex-1 min-h-[116px]">
							<FormField
								control={form.control}
								name="emptyWGT"
								render={({ field }) => (
									<FormItem className="min-h-[70px]">
										<FormLabel className="font-normal">
											Empty WGT
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
						<div className="flex-1 min-h-[116px]">
							<FormField
								control={form.control}
								name="grossWGT"
								render={({ field }) => (
									<FormItem className="min-h-[70px]">
										<FormLabel className="font-normal">
											Gross WGT
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
						<div className="flex-1 min-h-[116px]">
							<FormField
								control={form.control}
								name="GVWR"
								render={({ field }) => (
									<FormItem className="min-h-[70px]">
										<FormLabel className="font-normal">
											GVWR
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
						<div className="flex-1 min-h-[116px]">
							<FormField
								control={form.control}
								name="GCWR"
								render={({ field }) => (
									<FormItem className="min-h-[70px]">
										<FormLabel className="font-normal">
											GCWR
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
						<div className="flex-1 min-h-[116px]">
							<FormField
								control={form.control}
								name="AXLES"
								render={({ field }) => (
									<FormItem className="min-h-[70px]">
										<FormLabel className="font-normal">
											AXLES
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
						<div className="flex-1 min-h-[116px]">
							<FormField
								control={form.control}
								name="Fuel"
								render={({ field }) => (
									<FormItem className="min-h-[70px]">
										<FormLabel className="font-normal">
											Fule
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
						<div className="flex-1 min-h-[116px]">
							<FormField
								control={form.control}
								name="SalesTaxPaid"
								render={({ field }) => (
									<FormItem className="min-h-[70px]">
										<FormLabel className="font-normal">
											Sales Tax Paid
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
						<div className="flex-1 min-h-[116px]">
							<FormField
								control={form.control}
								name="ODOMeter"
								render={({ field }) => (
									<FormItem className="min-h-[70px]">
										<FormLabel className="font-normal">
											ODO Meter
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
						<div className="flex-1 min-h-[116px]">
							<FormField
								control={form.control}
								name="DateIsuued"
								render={({ field }) => (
									<FormItem className="min-h-[70px]">
										<FormLabel className="font-normal">
											Date Issued
										</FormLabel>
										<FormControl>
											<Input
												type='date'
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

						<div className="flex-1 min-h-[116px]">
							<FormField
								control={form.control}
								name="OtherPartinantDate"
								render={({ field }) => (
									<FormItem className="min-h-[70px]">
										<FormLabel className="font-normal">
											Other Partinant Data
										</FormLabel>
										<FormControl>
											<Input
												type='date'
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

						<div className="flex-1 min-h-[116px]">
							<FormField
								control={form.control}
								name="OddMeterBrand"
								render={({ field }) => (
									<FormItem className="min-h-[70px]">
										<FormLabel className="font-normal">
											ODO Meter Brand
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
						<div className="flex-1 min-h-[116px]">
							<FormField
								control={form.control}
								name="PriorTitleNo"
								render={({ field }) => (
									<FormItem className="min-h-[70px]">
										<FormLabel className="font-normal">
											Prior Title No.
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
						<div className="flex-1 min-h-[116px]">
							<FormField
								control={form.control}
								name="fullName"
								render={({ field }) => (
									<FormItem className="min-h-[70px]">
										<FormLabel className="font-normal">
											Full Name
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
													<SelectValue placeholder="Select Category" />
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
					<div className="flex flex-col lg:flex-row gap-x-5 space-y-2 md:space-y-0">
						<div className="flex-1 min-h-[116px]">
							<FormField
								control={form.control}
								name="address"
								render={({ field }) => (
									<FormItem className="min-h-[70px]">
										<FormLabel className="font-normal">
											Address
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
						<Button className="px-10 bg-theamP w-full lg:w-fit">
							Submit
						</Button>
						<Button onClick={handleAddImageField} type='button' className="ml-5 px-10 bg-theamP w-full lg:w-fit">
							Add Image Field
						</Button>
					</div>
				</form>
			</Form>
		</>
	);
};

export default Equipment;
