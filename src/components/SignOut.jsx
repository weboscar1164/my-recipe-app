import React from "react";
import "./Auth.css";
import { auth } from "../firebase.config";
import { useNavigate } from "react-router-dom";
import { usePopUpContext } from "../utils/usePopUp";

const SignOut = ({ setIsAuth }) => {
	const { setIsPopUp } = usePopUpContext();

	const navigate = useNavigate();
	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			auth.signOut();
			localStorage.setItem("isAuth", false);
			setIsAuth(localStorage.getItem("isAuth"));
			setIsPopUp("logout");
			navigate("/");
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className="container auth-container">
			<div className="auth-wrapper">
				<form onSubmit={onSubmit}>
					<h2>ログアウトしますか？</h2>
					<button type="submit">ログアウト</button>
				</form>
			</div>
		</div>
	);
};

export default SignOut;
