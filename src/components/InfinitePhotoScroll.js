import React from "react";
import InfiniteScroll from "react-infinite-scroller";
import DotsLoader from "./DotsLoader";

const InfinitePhotoScroll = ({ loadItems, hasMorePhotos, images, message }) => {
	return (
		<div className="grid">
			<InfiniteScroll
				pageStart={0}
				loadMore={loadItems}
				hasMore={hasMorePhotos}
				loader={<DotsLoader />}
				useWindow={true}
			>
				<div className="photos">{images}</div>
			</InfiniteScroll>
			{!hasMorePhotos && message && <p className="message">{message}</p>}
		</div>
	);
};

export default InfinitePhotoScroll;
