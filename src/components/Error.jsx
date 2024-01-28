import React from "react";
import "./Error.css";
import { useErrorState } from "../utils/useErrorState";

const Error = () => {
	const { errorState } = useErrorState();
	console.log(errorState);
	return (
		<div className="container error-container">
			<h2 className="app-error-title">エラーが発生しました。</h2>
			<pre>{errorState}</pre>
		</div>
	);
};

export default Error;
