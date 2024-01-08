import React from "react";
import "./SignOut.css";
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
		<div className="container sign-out-container">
			<form onSubmit={onSubmit}>
				<p>ログアウトしますか？</p>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
};

export default SignOut;
