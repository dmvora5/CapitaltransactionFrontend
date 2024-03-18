import EquipmentList from "@/components/Dashboard/UploadList/EquipmentList";
import LicenceList from "@/components/Dashboard/UploadList/LicenceList";
import PassportList from "@/components/Dashboard/UploadList/PassportList";
import RealEstateList from "@/components/Dashboard/UploadList/RealEstateList";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

const TABNAME = {
	LICENCE: "LICENCE",
	PASSPORT: "PASSPORT",
	REALESTATE: "REALESTATE",
	EQUIPMENT: "EQUIPMENT",
};

const Uploadlist = () => {
	const [tab, setTab] = useState(TABNAME.LICENCE);

	return (
		<>
			<h2 className="font-medium text-3xl text-[#333333]">Upload List</h2>
			<div className="my-8 flex flex-wrap lg:w-[60%] gap-4 justify-center">
				{/* <Button className="w-full sm:flex-1 bg-theamP">
					Digital Id
				</Button> */}
				<Button
					onClick={() => setTab(TABNAME.LICENCE)}
					variant="ghost"
					className={cn(
						"w-[47%] sm:flex-1 border-2 rounded-lg border-solid border-[#acacac]",
						tab === TABNAME.LICENCE
							? "bg-theamP text-white"
							: " bg-white text-[#acacac]"
					)}
				>
					Driver Licences
				</Button>
				<Button
					onClick={() => setTab(TABNAME.PASSPORT)}
					variant="ghost"
					className={cn(
						"w-[47%] sm:flex-1 border-2 rounded-lg border-solid border-[#acacac]",
						tab === TABNAME.PASSPORT
							? "bg-theamP text-white"
							: " bg-white text-[#acacac]"
					)}
				>
					Passport
				</Button>
				<Button
					onClick={() => setTab(TABNAME.REALESTATE)}
					variant="ghost"
					className={cn(
						"w-[47%] sm:flex-1 border-2 rounded-lg border-solid border-[#acacac]",
						tab === TABNAME.REALESTATE
							? "bg-theamP text-white"
							: " bg-white text-[#acacac]"
					)}
				>
					Real Estate
				</Button>
				<Button
					onClick={() => setTab(TABNAME.EQUIPMENT)}
					variant="ghost"
					className={cn(
						"w-[47%] sm:flex-1 border-2 rounded-lg border-solid border-[#acacac]",
						tab === TABNAME.EQUIPMENT
							? "bg-theamP text-white"
							: " bg-white text-[#acacac]"
					)}
				>
					Car Registration
				</Button>
			</div>
			<div className="bg-white p-6">
				{tab === TABNAME.LICENCE && <LicenceList />}
				{tab === TABNAME.PASSPORT && <PassportList />}
				{tab === TABNAME.REALESTATE && <RealEstateList />}
				{tab === TABNAME.EQUIPMENT && <EquipmentList />}
			</div>
		</>
	);
};

export default Uploadlist;
