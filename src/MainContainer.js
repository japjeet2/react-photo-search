import React, { useState, useCallback } from "react";
import SearchBar from "./components/SearchBar";
import Grid from "./components/Grid";
import PhotoWindow from "./components/PhotoWindow";
import Description from "./components/Description";
import qwest from "qwest";
import "./normalize.css";
import "./index.css";

const api = {
	baseUrl: "https://api.flickr.com/services/rest/?",
	key: "ccc40fa2d0e400ea13fae765dea404ba",
	secret: "ce9639759d72fbaf",
};

const MainContainer = () => {
	const [keyword, setKeyword] = useState(null);
	const [photos, setPhotos] = useState([]);
	const [hasMorePhotos, setHasMorePhotos] = useState(true);
	const [nextUrl, setNextUrl] = useState(null);
	const [page, setPage] = useState(0);
	const [prevKeyword, setPrevKeyword] = useState("");
	const [showGrid, setShowGrid] = useState(false);
	const [photoWindow, setPhotoWindow] = useState({
		id: "",
		src: "",
		status: "inactive",
		title: "",
		details: "",
	});

	const onSearchBoxChange = (evt) => {
		if (!evt.target.value.length) {
			setShowGrid(false);
		}
		setKeyword(evt.target.value);
		setPhotos(photos);
		setHasMorePhotos(hasMorePhotos);
		setNextUrl(nextUrl);
		setPage(page);
		setPhotoWindow(photoWindow);
	};

	const onSearchButtonClick = () => {
		setPhotos([]);
		setShowGrid(true);
		setPrevKeyword(keyword);
	};

	const loadGridItems = useCallback(
		(page) => {
			let url = api.baseUrl + "method=flickr.photos.search";
			if (nextUrl) {
				url = nextUrl;
			}

			let qwestConfig = {
				api_key: api.key,
				format: "json",
				nojsoncallback: 1,
				sort: "relevance",
				per_page: 16,
				text: keyword,
				page: page,
			};
			window.activeKeyword = keyword;

			let images = photos;
			if (prevKeyword !== keyword) {
				images = [];
			}

			qwest.get(url, qwestConfig, { cache: true }).then(function (xhr, resp) {
				if (resp) {
					resp.photos.photo.map((photo) => {
						if (photo.thumbnail_url == null) {
							photo.thumbnail = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_q.jpg`;
							photo.large = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`;
						}

						images.push(photo);

						return null;
					});
					if (!keyword) {
						images = [];
					}

					if (resp.photos.page < resp.photos.pages) {
						if (url.indexOf("&page=") === -1) {
							url = url + "&page=" + page;
						} else {
							url = url.split("&page=")[0] + "&page=" + page;
						}
						setPhotos(images);
						setNextUrl(url);
					} else {
						setHasMorePhotos(!hasMorePhotos);
					}
				}
			});
		},
		[showGrid, prevKeyword]
	);

	const onThumbnailClick = (evt, photo) => {
		evt.preventDefault();

		let url = api.baseUrl + "method=flickr.photos.getInfo";
		let qwestConfig = {
			api_key: api.key,
			format: "json",
			nojsoncallback: 1,
			photo_id: photo.id,
		};
		qwest.get(url, qwestConfig, { cache: true }).then(function (xhr, resp) {
			setPhotoWindow({
				id: photo.id,
				src: photo.large,
				status: "active",
				title: photo.title,
				details: resp.photo,
			});
		});
	};

	const deactivatePhotoWindow = (evt) => {
		evt.preventDefault();
		setPhotoWindow({
			id: "",
			src: "",
			status: "inactive",
			title: "",
		});
	};

	return (
		<React.Fragment>
			<SearchBar
				onChange={onSearchBoxChange}
				onSearchButtonClick={onSearchButtonClick}
			/>
			{showGrid ? (
				<Grid
					keyword={keyword}
					loadItems={loadGridItems}
					photos={photos}
					hasMorePhotos={hasMorePhotos}
					onThumbnailClick={onThumbnailClick}
				/>
			) : (
				<Description />
			)}
			{photoWindow.status === "active" && (
				<PhotoWindow
					id={photoWindow.id}
					src={photoWindow.src}
					title={photoWindow.title}
					details={photoWindow.details}
					status={photoWindow.status}
					onCloseButtonClick={deactivatePhotoWindow}
				/>
			)}
		</React.Fragment>
	);
};

export default MainContainer;
