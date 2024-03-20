import APICallStatushandler from "@/components/Shared/APICallStatushandler";
import EllipsisPagination from "@/components/Shared/EllipsisPagination";
import Loader from "@/components/Shared/Loader";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { limit } from "@/constant";
import {
	useGetUserEquipmentQuery,
	useListingEquipmentOnMarketMutation,
} from "@/redux/api/userItemsApi";
import { zodResolver } from "@hookform/resolvers/zod";
import moment from "moment";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const EquipmentList = () => {
	const [page, setPage] = useState(1);
	const [open, setOpen] = useState(false);
	const [id, setId] = useState();

	const { isLoading, data, isSuccess, isError, error } =
		useGetUserEquipmentQuery();

	const [submit, statusOption] = useListingEquipmentOnMarketMutation();

	const handleDialogOpen = (id) => {
		setId(id);
		setOpen(true);
	};

	const handleDialogClose = () => {
		setId();
		setOpen(false);
	};

	const afterHandler = () => {
		setOpen(false);
	};

	const ListingModel = () => {
		const formSchema = z.object({
			price: z.string(),
			bodyColor: z.string(),
			mileage: z.string(),
			doorCount: z.string(),
			description: z.string(),
			modelNo: z.string(),
		});

		const form = useForm({
			resolver: zodResolver(formSchema),
			defaultValues: {
				description: "",
			},
		});

		const handleSubmit = (values) => {
			submit({
				...values,
				id,
			});
		};

		return (
			<Dialog open={open}>
				{/* <DialogTrigger asChild>
				<span>Change password</span>
			</DialogTrigger> */}
				<DialogContent
					closeBtn={false}
					className="sm:max-w-[700px] p-0"
				>
					<span className="p-5 border-b font-medium text-xl">
						Listing On MarketPlace
					</span>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(handleSubmit)}
							className="space-y-4 px-8 pb-8 border-b"
						>
							<div className="">
								<FormField
									className=""
									control={form.control}
									name="price"
									render={({ field }) => (
										<FormItem className="min-h-[70px]">
											<FormLabel>Price</FormLabel>
											<FormControl>
												<Input
													type="number"
													className="h-14 focus:outline-none border border-[#acacac] rounded-[10px]"
													placeholder=""
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
									name="bodyColor"
									render={({ field }) => (
										<FormItem className="min-h-[70px]">
											<FormLabel>Body Color</FormLabel>
											<FormControl>
												<Input
													className="h-14 focus:outline-none border border-[#acacac] rounded-[10px]"
													placeholder=""
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
									name="mileage"
									render={({ field }) => (
										<FormItem className="min-h-[70px]">
											<FormLabel>Mileage</FormLabel>
											<FormControl>
												<Input
													type="number"
													className="h-14 focus:outline-none border border-[#acacac] rounded-[10px]"
													placeholder=""
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
									name="doorCount"
									render={({ field }) => (
										<FormItem className="min-h-[70px]">
											<FormLabel>Door Count</FormLabel>
											<FormControl>
												<Input
													type="number"
													className="h-14 focus:outline-none border border-[#acacac] rounded-[10px]"
													placeholder=""
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
									name="modelNo"
									render={({ field }) => (
										<FormItem className="min-h-[70px]">
											<FormLabel>Model No.</FormLabel>
											<FormControl>
												<Input
													className="h-14 focus:outline-none border border-[#acacac] rounded-[10px]"
													placeholder=""
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
									name="description"
									render={({ field }) => (
										<FormItem className="min-h-[70px]">
											<FormLabel>Description</FormLabel>
											<FormControl>
												<Input
													className="h-14 focus:outline-none border border-[#acacac] rounded-[10px]"
													placeholder=""
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

								<Button
									onClick={handleDialogClose}
									type="button"
									className="w-36 rounded-xl bg-[#acacac]"
								>
									Cancel
								</Button>
							</div>
						</form>
					</Form>
				</DialogContent>
			</Dialog>
		);
	};

	return (
		<>
			{(isLoading || statusOption.isLoading) && <Loader />}
			<div className="overflow-x-auto relative shadow-md sm:rounded-lg">
				<ListingModel />
				<APICallStatushandler
					options={statusOption}
					cb={afterHandler}
					errorCb={() => setOpen(false)}
				/>
				<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
						<tr>
							<th scope="col" className="py-3 px-6 border">
								No.
							</th>
							<th scope="col" className="py-3 px-6 border">
								Vehical Id
							</th>
							<th scope="col" className="py-3 px-6 border">
								Make Year
							</th>
							<th scope="col" className="py-3 px-6 border">
								Fule
							</th>
							<th scope="col" className="py-3 px-6 border">
								Title No.
							</th>
							<th scope="col" className="py-3 px-6 border">
								Approval
							</th>
						</tr>
					</thead>
					<tbody>
						{(data?.data || []).map((item, index) => (
							<tr
								key={item._id}
								className="bg-white dark:bg-gray-800"
							>
								<td className="py-4 px-6 border">
									{(page - 1) * limit + (index + 1)}
								</td>
								<td className="py-4 px-6 border">
									{item.vehicalIdetificationNo}
								</td>
								<td className="py-4 px-6 border">
									{moment(item.year).format("L")}
								</td>
								<td className="py-4 px-6 border">
									{item.Fuel}...
								</td>
								<td className="py-4 px-6 border">
									{item.titleNo}
								</td>
								<td className="py-4 px-6 border flex justify-center items-center gap-x-4">
									<span
										className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold leading-tight ${
											item.verifyed
												? "bg-green-100 text-green-800"
												: "bg-yellow-100 text-yellow-800"
										}`}
									>
										{item.verifyed ? "Verified" : "Pending"}
									</span>
									{item.verifyed && (
										<Button
											onClick={() =>
												handleDialogOpen(item._id)
											}
											size="sm"
										>
											List
										</Button>
									)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
				{data?.count > limit && (
					<div className="my-6 flex justify-center">
						<EllipsisPagination
							count={data?.count || 0}
							limit={limit}
							currentPage={page}
							handlePageChange={setPage}
						/>
					</div>
				)}
			</div>
		</>
	);
};

export default EquipmentList;
