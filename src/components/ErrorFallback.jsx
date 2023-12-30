import React from "react";
// import "./ErrorFallback.css";

const ErrorFallback = ({ error, resetErrorBoundary }) => {
	return (
		<div className="app-error">
			<h2>エラーが発生しました</h2>
			<pre>{error.message}</pre>
			<button onClick={resetErrorBoundary}>リセット</button>
		</div>
	);
};

export default ErrorFallback;
