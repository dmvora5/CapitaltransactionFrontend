import React from "react";
import { createPortal } from "react-dom";
import { InfinitySpin } from "react-loader-spinner";

const Loader = () => {
	return createPortal(
		<div className="w-full h-full z-10 absolute top-0 left-0 bg-[rgba(0,0,0,0.6)] flex justify-center items-center">
			<InfinitySpin
				className="opacity-100"
				visible={true}
				width="200"
				color="#4123D0"
				ariaLabel="infinity-spin-loading"
			/>
		</div>,
		document.body
	);
};

export default Loader;
