import React, { useState } from "react";

const EllipsisPagination = ({
	count,
	limit,
	handlePageChange,
	currentPage,
}) => {
	const totalPages = Math.ceil(count / limit);

	const handleClick = (pageNumber) => {
		handlePageChange(pageNumber);
	};

	const renderPaginationButtons = () => {
		const buttons = [];
		const maxButtons = 5; // Number of buttons to show excluding ellipsis

		if (totalPages <= maxButtons) {
			for (let i = 1; i <= totalPages; i++) {
				buttons.push(
					<li
						key={i}
						onClick={() => handleClick(i)}
						className={`w-8 h-8 flex justify-center items-center rounded-full cursor-pointer ${
							currentPage === i ? "bg-theamP text-white" : ""
						}`}
					>
						{i}
					</li>
				);
			}
		} else {
			const leftBound = Math.min(
				Math.max(1, currentPage - Math.floor(maxButtons / 2)),
				totalPages - maxButtons + 1
			);
			const rightBound = Math.min(leftBound + maxButtons - 1, totalPages);

			if (leftBound > 1) {
				buttons.push(
					<li
						key="first"
						onClick={() => handleClick(1)}
						className={`w-8 h-8 flex justify-center items-center rounded-full bg-white cursor-pointer ${
							currentPage === 1
								? "bg-theamP text-white"
								: "bg-white"
						}`}
					>
						1
					</li>
				);
				buttons.push(
					<li
						key="ellipsisLeft"
						className="w-8 h-8 flex justify-center rounded-full items-center cursor-default"
					>
						...
					</li>
				);
			}

			for (let i = leftBound; i <= rightBound; i++) {
				console.log("currentPage", currentPage);
				console.log("currentPage === i", currentPage === i);
				buttons.push(
					<li
						key={i}
						onClick={() => handleClick(i)}
						className={`w-8 h-8 flex justify-center items-center rounded-full cursor-pointer ${
							currentPage === i
								? "bg-theamP text-white"
								: "bg-white"
						}`}
					>
						{i}
					</li>
				);
			}

			if (rightBound < totalPages) {
				buttons.push(
					<li
						key="ellipsisRight"
						className="w-8 h-8 flex justify-center items-center cursor-default"
					>
						...
					</li>
				);
				buttons.push(
					<li
						key="last"
						onClick={() => handleClick(totalPages)}
						className="w-8 h-8 flex justify-center items-center rounded-full bg-white cursor-pointer"
					>
						{totalPages}
					</li>
				);
			}
		}

		return buttons;
	};

	return (
		<ul className="flex gap-x-4">
			<li
				onClick={() => {
					if (currentPage > 1) {
						handleClick(currentPage - 1);
					}
				}}
				className="w-8 h-8 flex justify-center items-center rounded-full bg-white cursor-pointer"
			>
				<p className="">&laquo;</p>
			</li>
			{renderPaginationButtons()}
			<li
				onClick={() => {
					if (currentPage < totalPages) {
						handleClick(currentPage + 1);
					}
				}}
				className="w-8 h-8 flex justify-center items-center rounded-full bg-white cursor-pointer"
			>
				<p className="">&raquo;</p>
			</li>
		</ul>
	);
};

export default EllipsisPagination;
