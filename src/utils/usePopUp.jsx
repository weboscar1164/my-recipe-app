import { createContext, useContext, useState } from "react";

const PopUpContext = createContext();

export const PopUpProvider = ({ children }) => {
	const [isPopUp, setIsPopUp] = useState(null);

	return (
		<PopUpContext.Provider value={{ isPopUp, setIsPopUp }}>
			{children}
		</PopUpContext.Provider>
	);
};

export function usePopUpContext() {
	return useContext(PopUpContext);
}
