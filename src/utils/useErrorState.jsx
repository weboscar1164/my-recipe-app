import { createContext, useContext, useState } from "react";

const ErrorStateContext = createContext();

export const ErrorStateProvider = ({ children }) => {
	const [errorState, setErrorState] = useState(null);

	return (
		<ErrorStateContext.Provider value={{ errorState, setErrorState }}>
			{children}
		</ErrorStateContext.Provider>
	);
};

export const useErrorState = () => {
	const context = useContext(ErrorStateContext);

	if (!context) {
		throw new Error("useErrorState must be used within an ErrorStateProvider");
	}
	return context;
};
