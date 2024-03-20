import MarketPlaceLayout from "@/components/MarketPlaceLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PATH } from "@/path";
import { useGetAllEquipmentOnMarketQuery } from "@/redux/api/userItemsApi";
import { Search } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import React from "react";

const Loader = dynamic(() => import("@/components/Shared/Loader"), {
	ssr: false,
});

const Index = () => {
	const { data, isLoading } = useGetAllEquipmentOnMarketQuery();

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
					<div className="w-1/4 flex gap-x-4 items-center">
						<div className="border border-[#acacac] rounded-md shadow-lg flex px-2 items-center">
							<Search className="w-8 h-8 text-[#acacac]" />
							<Input className="border-none" />
						</div>
						<Button className="bg-theamP">Search</Button>
					</div>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 lg:grid-rows-2 gap-x-6 gap-y-20">
					{(data?.data || []).map((item, index) => (
						<div className="h-[400px] flex flex-col shadow-lg rounded-lg">
							<div className="h-[55%]">
								<img
									className="w-full h-full object-cover"
									src={item?.images[0]?.url}
								/>
							</div>
							<div className="space-y-4 flex flex-col p-4 flex-1 justify-between">
								<div className="space-y-4">
									<h2 className="font-medium text-2xl">
										{item?.modelNo}
									</h2>
									<p>{item?.description?.slice(0, 135)}...</p>
								</div>
								<Link
									className="block mt-auto"
									href={`${PATH.marketItemDetails}/${item._id}`}
								>
									Check
								</Link>
							</div>
						</div>
					))}
				</div>
			</section>
		</MarketPlaceLayout>
	);
};

export default Index;
