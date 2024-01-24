import { useState } from "react";

export const useErrorState = () => {
	const [errorMessage, setErrorMessage] = useState(null);

	const setError = (message) => {
		setErrorMessage(message);
	};
	return { errorMessage, setError };
};

export default useErrorState;
