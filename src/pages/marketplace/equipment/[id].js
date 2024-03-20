import MarketPlaceLayout from "@/components/MarketPlaceLayout";
import { Button } from "@/components/ui/button";
import { useGetEquipmentOnMarketQuery } from "@/redux/api/userItemsApi";
import moment from "moment";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";

const Loader = dynamic(() => import("@/components/Shared/Loader"), {
	ssr: false,
});

const Id = () => {
	const router = useRouter();

	const { data, isLoading } = useGetEquipmentOnMarketQuery(router.query.id, {
		skip: !router.query?.id,
	});

	return (
		<MarketPlaceLayout>
			{isLoading && <Loader />}
			<section className="w-full h-[500px] md:h-[700px] bg-market-back-image bg-no-repeat bg-cover flex items-center">
				<div className="px-4 sm:px-0 sm:w-1/2 lg:w-1/3 min-h-[300px] flex flex-col justify-between sm:ml-24 space-y-6">
					<div className="space-y-6">
						<h1 className="font-medium text-3xl sm:text-6xl text-white">
							Listing Marketplace
						</h1>
						<p className="text-[#acacac]">
							Lorem ipsum dolor sit amet, consectetur adipiscing
							elit, sed do eiusmod tempor incididunt ut labore et
							dolore magna aliqua. quis nostrud exercitation
							ullamco laboris nisi ut aliquip ex ea commodo
							consequat.{" "}
						</p>
					</div>
					<Button className="w-[200px] bg-theamP rounded-lg">
						New Listing
					</Button>
				</div>
			</section>
			<section className="py-8 px-6 md:py-28 md:px-24 space-y-40">
				<div className="space-y-4 flex">
					<div className="flex-1">
						<h3 className="text-theamP font-medium text-[20px] tracking-widest">
							Digital ID
						</h3>
						<h2 className="font-semibold text-5xl">
							Listing Items
						</h2>
					</div>
				</div>
				<div className="flex">
					<div className="space-y-8 w-1/3">
						<h2>Car Details</h2>
						<div>
							<p>
								Vehical Id No : -{" "}
								{data?.data?.vehicalIdetificationNo}
							</p>
							<p>
								Year: - {moment(data?.data?.year).format("L")}
							</p>
							<p>Title No: - {data?.data?.titleNo}</p>
							<p>Fuel: - {data?.data?.Fuel}</p>
						</div>
					</div>
					<div className="flex-1 flex">
						<div className="flex-1">
							<div>
								<img
									className="object-cover"
									src={data?.data?.images[0]?.url}
								/>
							</div>
						</div>
						<div className="w-1/3 flex flex-col gap-y-4">
							{(
								data?.data?.images?.slice(
									1,
									data?.data?.images?.length
								) || []
							).map((image, index) => (
								<div>
									<img src={image?.url} />
								</div>
							))}
						</div>
					</div>
				</div>
				<div className="">
					<h2>Genral Information</h2>
					<div>
						<p>Price : - {data?.data?.price}</p>
						<p>Body Color: - {data?.data?.bodyColor}</p>
						<p>DoorCount: - {data?.data?.doorCount}</p>
						<p>Model No: - {data?.data?.modelNo}</p>
					</div>
				</div>
			</section>
		</MarketPlaceLayout>
	);
};

export default Id;
