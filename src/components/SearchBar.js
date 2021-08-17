import React from "react";

const SearchBar = ({onChange, onSearchButtonClick}) => {
	return (
		<div className="searchBar">
			<input
				type="text"
				id="searchbox"
				placeholder="what are you looking for?"
				onChange={onChange}
			/>
			<button className="search-btn" onClick={onSearchButtonClick}>Search</button>
		</div>
	);
};

export default SearchBar;
