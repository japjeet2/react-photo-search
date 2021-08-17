import React from "react";
import Thumbnail from "./Thumbnail";
import InfinitePhotoScroll from "./InfinitePhotoScroll";

const Grid = ({
	photos,
	onThumbnailClick,
	keyword,
	hasMorePhotos,
	loadItems,
}) => {
	const searchResults = {
		END_SEARCH_RESULT: "You have reached the end of the search result",
		CANT_FIND_PHOTOS: "We can't find any photos on Flickr with this keyword",
	};

	let items = [];

	photos.map((photo, i) => {
		items.push(<Thumbnail photo={photo} key={i} onClick={onThumbnailClick} />);
		return null;
	});

	let message =
		items.length <= 0
			? searchResults.CANT_FIND_PHOTOS
			: searchResults.END_SEARCH_RESULT;

	if (keyword && keyword !== "") {
		return (
			<InfinitePhotoScroll
				loadItems={loadItems}
				hasMorePhotos={hasMorePhotos}
				images={items}
				message={message}
			/>
		);
	}else {
		return null;
	}
};

export default Grid;
