import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const Search = ({ setValue }) => {
	const [search, setSearch] = useState();

	useEffect(() => {
		if (!search) return;
		const timer = setTimeout(() => {
			setValue(search);
		}, 800);

		return () => clearTimeout(timer);
	}, [search]);

	const handleReset = () => {
		setValue("");
		setSearch("");
	};

	return (
		<div className="flex gap-x-4">
			<Input
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				className="sm:w-1/4 ml-auto"
				placeholder="search"
			/>
			<Button onClick={handleReset} variant="outline">
				Reset
			</Button>
		</div>
	);
};

export default Search;
