import React from "react";
import ImageDetails from "./ImageDetails";

const PhotoWindow = ({
	id,
	details,
	status,
	src,
	title,
	onCloseButtonClick,
}) => {
	const {
		description: { _content },
		views,
		urls,
		tags,
	} = details;

	return (
		id && (
			<div className={"photoWindow " + status}>
				<div className="window">
					<div className="imageWrapper">
						<img id="largeImage" src={src} alt={title} />
					</div>
					{details && (
						<ImageDetails
							content={_content}
							views={views}
							url={urls.url[0]}
							tags={tags}
							title={title}
						/>
					)}
				</div>
				<a className="closeButton" target="_blank" onClick={onCloseButtonClick}>
					&times;
				</a>
			</div>
		)
	);
};

export default PhotoWindow;
