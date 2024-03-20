import EllipsisPagination from "@/components/Shared/EllipsisPagination";
import Loader from "@/components/Shared/Loader";
import { limit } from "@/constant";
import { useGetUserDigitalIdQuery } from "@/redux/api/userItemsApi";

const DigitalIdList = () => {
	const { isLoading, data, isSuccess, isError, error } =
		useGetUserDigitalIdQuery();
	return (
		<>
			{isLoading && <Loader />}
			<div className="overflow-x-auto relative shadow-md sm:rounded-lg">
				<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
						<tr>
							<th scope="col" className="py-3 px-6 border">
								No.
							</th>
							<th scope="col" className="py-3 px-6 border">
								Full Name
							</th>
							<th scope="col" className="py-3 px-6 border">
								Card No.
							</th>
							<th scope="col" className="py-3 px-6 border">
								Email
							</th>
							<th scope="col" className="py-3 px-6 border">
								Phone No.
							</th>
							<th scope="col" className="py-3 px-6 border">
								Country
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
								<td className="py-4 px-6 border">{1}</td>
								<td className="py-4 px-6 border">
									{item.fullName}
								</td>
								<td className="py-4 px-6 border">
									{item.cardNo}
								</td>
								<td className="py-4 px-6 border">
									{item.email}
								</td>
								<td className="py-4 px-6 border">
									{item.phoneNo}
								</td>
								<td className="py-4 px-6 border">
									{item.country}
								</td>
								<td className="py-4 px-6 border">
									<span
										className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold leading-tight ${
											item.verifyed
												? "bg-green-100 text-green-800"
												: "bg-yellow-100 text-yellow-800"
										}`}
									>
										{item.verifyed ? "Verified" : "Pending"}
									</span>
								</td>
								{/* <Dialog>
										<DialogTrigger asChild>
											<span
												className={`inline-flex rounded-full px-3 py-1 cursor-pointer text-sm font-semibold leading-tight ${
													item.verifyed
														? "bg-green-100 text-green-800"
														: "bg-yellow-100 text-yellow-800"
												}`}
											>
												{item.verifyed
													? "Verified"
													: "Pending"}
											</span>
										</DialogTrigger>
										<DialogContent className="sm:max-w-[700px] p-0">
											<img src={item.frontImage} />
											{item.frontImage}
										</DialogContent>
									</Dialog> */}
							</tr>
						))}
					</tbody>
				</table>
				{data?.count > limit && (
					<div className="my-6 flex justify-center">
						<EllipsisPagination
							count={data?.count || 0}
							limit={limit}
							currentPage={1}
						/>
					</div>
				)}
			</div>
		</>
	);
};

export default DigitalIdList;
