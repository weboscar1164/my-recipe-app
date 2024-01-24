import React from "react";
import "./Error.css";

const Error = ({ errorMessage }) => {
	return (
		<div className="container error-container">
			<h2 className="app-error-title">エラーが発生しました。</h2>
			<pre>{errorMessage}</pre>
		</div>
	);
};

export default Error;
