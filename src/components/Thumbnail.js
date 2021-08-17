import React from "react";

const Thumbnail = ({photo, onClick}) => {
	return (
		<div
			className="thumbnail"
			onClick={(evt) => onClick(evt, photo)}
		>
			<a id={photo.id} target="_blank">
				<img
					src={photo.thumbnail}
					alt={photo.title}
					width="150"
					height="150"
				/>
			</a>
		</div>
	);
};

export default Thumbnail;
