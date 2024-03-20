import React from "react";
import Header from "./Shared/Header";

const MarketPlaceLayout = ({ children }) => {
	return (
		<>
			<Header />
			{children}
		</>
	);
};

export default MarketPlaceLayout;
