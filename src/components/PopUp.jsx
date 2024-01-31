import React, { useEffect } from "react";
import "./PopUp.css";
import { usePopUpContext } from "../utils/usePopUp.jsx";

const PopUp = () => {
	const { isPopUp, setIsPopUp } = usePopUpContext();

	useEffect(() => {
		let timeoutId;
		if (isPopUp) {
			timeoutId = setTimeout(() => {
				setIsPopUp(null);
			}, 2000);

			return () => {
				clearTimeout(timeoutId);
			};
		}
	}, [isPopUp]);

	const popUpMessage = {
		login: "ログインしました",
		logout: "ログアウトしました",
		signup: "アカウントを登録しました",
		addlike: "お気に入りに登録しました",
		removelike: "削除しました",
	};

	return (
		<div className="app-popup-wrapper">
			{isPopUp && (
				<div className="app-popup app-popup-active">
					{popUpMessage[isPopUp]}
				</div>
			)}
		</div>
	);
};

export default PopUp;
