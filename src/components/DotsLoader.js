import React from "react";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const DotsLoader = () => (
	<Loader
		type="ThreeDots"
		color="#00BFFF"
		height={100}
		width={100}
		timeout={3000} //3 secs
	/>
);

export default DotsLoader;
