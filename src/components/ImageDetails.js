import React from "react";

const ImageDetails = ({ content, views, url, tags, title }) => {
	return (
		<div className="info">
			<h2>{title}</h2>
			<div className="details">
				{content && <p className="description">{content}</p>}
				{views && <span className="viewCount">{views} Views</span>}
				{url && (
					<a className="link" href={url._content}>
						View on Flickr
					</a>
				)}
				<ul className="tags">
					{tags.tag.map((data) => {
						return <li key={data.id}>{data.raw}</li>;
					})}
				</ul>
			</div>
		</div>
	);
};

export default ImageDetails;
