import APICallStatushandler from "@/components/Shared/APICallStatushandler";
import EllipsisPagination from "@/components/Shared/EllipsisPagination";
import Loader from "@/components/Shared/Loader";
import { limit } from "@/constant";
import { useGetUserEquipmentQuery } from "@/redux/api/userItemsApi";
import moment from "moment";
import { useState } from "react";

const EquipmentList = () => {
	const [page, setPage] = useState(1);

	const { isLoading, data, isSuccess, isError, error } =
		useGetUserEquipmentQuery();
	return (
		<>
			{isLoading && <Loader />}
			<div className="overflow-x-auto relative shadow-md sm:rounded-lg">
				<APICallStatushandler
					options={{ isLoading, data, isSuccess, isError, error }}
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
