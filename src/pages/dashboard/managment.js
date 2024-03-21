import Loader from "@/components/Shared/Loader";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useGetUserDashBoardQuery } from "@/redux/api/userItemsApi";
import dynamic from "next/dynamic";
import React from "react";

const Layout = dynamic(() => import("@/components/Layout"), {
	ssr: false,
});

const Managment = () => {
	const { data, isLoading, isSuccess, isError, error } =
		useGetUserDashBoardQuery();

	return (
		<Layout>
			{isLoading && <Loader />}
			<h2 className="font-medium text-3xl text-[#333333]">
				Digital Managment
			</h2>
			<div className="flex gap-8 flex-col sm:flex-row flex-wrap mt-8">
				<div className="sm:w-full lg:w-[47%] xl:w-[31%] shadow-md rounded-lg h-[125px] bg-white p-2 md:p-4  flex">
					{data?.data?.digitalIdImage ?
						<Dialog>
							<DialogTrigger asChild>
								<img
									src="/images/DigitalId.svg"
									className="w-1/4 object-fill cursor-pointer object-center h-full rounded-lg"
								/>
							</DialogTrigger>
							<DialogContent className="p-0 sm:h-full">
								<img
									className="object-cover object-center h-full"
									src={data?.data?.digitalIdImage}
								/>
							</DialogContent>
						</Dialog>
						:
						<img
							src="/images/DrivingLicence.svg"
							className="w-1/4 object-fill cursor-pointer object-center h-full rounded-lg"
						/>
					}
					<div className="flex-1 pl-1 sm:px-4">
						<h2 className="py-2 text-xl text-[#acacac] font-medium">
							Digital ID Creation
						</h2>
						<p className="text-5xl py-2">
							{data?.data?.digitalIdCount}
						</p>
					</div>
				</div>
				<div className="sm:w-full lg:w-[47%] xl:w-[31%] shadow-md rounded-lg  h-[125px] bg-white p-2 md:p-4 flex">
					{data?.data?.licenceImage ?
						<Dialog>
							<DialogTrigger asChild>
								<img
									src="/images/DrivingLicence.svg"
									className="w-1/4 object-fill cursor-pointer object-center h-full rounded-lg"
								/>
							</DialogTrigger>
							<DialogContent className="p-0 sm:h-full">
								<img
									className="object-cover object-center h-full"
									src={data?.data?.licenceImage}
								/>
							</DialogContent>
						</Dialog>
						:
						<img
							src="/images/DrivingLicence.svg"
							className="w-1/4 object-fill cursor-pointer object-center h-full rounded-lg"
						/>
					}

					<div className="flex-1 pl-1 sm:px-4 ">
						<h2 className="py-2 text-xl text-[#acacac] font-medium">
							Driver&apos; Licences
						</h2>
						<p className="text-5xl py-2">
							{data?.data?.drivingLicenceCount}
						</p>
					</div>
				</div>
				<div className="sm:w-full lg:w-[47%] xl:w-[31%] shadow-md rounded-lg  h-[125px] bg-white p-2 md:p-4 flex">
					<img
						src="/images/Passport.svg"
						className="w-1/4 object-fill object-center h-full rounded-lg"
					/>
					<div className="flex-1 pl-1 sm:px-4 ">
						<h2 className="py-2 text-xl text-[#acacac] font-medium">
							Passport
						</h2>
						<p className="text-5xl py-2">
							{data?.data?.passportCount}
						</p>
					</div>
				</div>
				<div className="sm:w-full lg:w-[47%] xl:w-[31%] shadow-md rounded-lg  h-[125px] bg-white p-2 md:p-4 flex">
					<img
						src="/images/RealEstate.svg"
						className="w-1/4 object-fill object-center h-full rounded-lg"
					/>
					<div className="flex-1 pl-1 sm:px-4 ">
						<h2 className="py-2 text-xl text-[#acacac] font-medium">
							Real Estate
						</h2>
						<p className="text-5xl py-2">
							{data?.data?.realEstateCount}
						</p>
					</div>
				</div>
				<div className="sm:w-full lg:w-[47%] xl:w-[31%] shadow-md rounded-lg  h-[125px] bg-white p-2 md:p-4 flex">
					<img
						src="/images/CarRegistration.svg"
						className="w-1/4 object-fill object-center h-full rounded-lg"
					/>
					<div className="flex-1 pl-1 sm:px-4 ">
						<h2 className="py-2 text-xl text-[#acacac] font-medium">
							Car Registration
						</h2>
						<p className="text-5xl py-2">
							{data?.data?.equipmentCount}
						</p>
					</div>
				</div>
				<div className="sm:w-full lg:w-[47%] xl:w-[31%] shadow-md rounded-lg  h-[125px] bg-white p-2 md:p-4 flex">
					<img
						src="/images/TotalUpload.svg"
						className="w-1/4 object-fill object-center h-full rounded-lg"
					/>
					<div className="flex-1 pl-1 sm:px-4 ">
						<h2 className="py-2 text-xl text-[#acacac] font-medium">
							Total Upload
						</h2>
						<p className="text-5xl py-2">{data?.data?.total}</p>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Managment;
