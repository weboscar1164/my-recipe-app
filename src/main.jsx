import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ErrorFallback from "./components/ErrorFallback";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { ErrorBoundary } from "react-error-boundary";

ReactDOM.createRoot(document.getElementById("root")).render(
	// <React.StrictMode>
	<ErrorBoundary
		FallbackComponent={ErrorFallback}
		onReset={() => alert("エラーがリセットされました")}
	>
		<HelmetProvider>
			<Helmet>
				<title>my recipe</title>
			</Helmet>
			<App />
		</HelmetProvider>
	</ErrorBoundary>
	// </React.StrictMode>
);
