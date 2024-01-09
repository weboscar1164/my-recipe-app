import React from "react";
import "./Auth.css";
import { auth } from "../firebase.config";
import { useNavigate } from "react-router-dom";

const SignOut = ({ setIsAuth }) => {
	const navigate = useNavigate();
	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			auth.signOut();
			localStorage.setItem("isAuth", false);
			setIsAuth(false);
			navigate("/");
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className="container auth-container">
			<form onSubmit={onSubmit}>
				<p>ログアウトしますか？</p>
				<button type="submit">ログアウト</button>
			</form>
		</div>
	);
};

export default SignOut;
