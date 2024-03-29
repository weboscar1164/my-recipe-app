import { useState } from "react";
import "./Auth.css";

import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.config";
import { usePopUpContext } from "../utils/usePopUp";
import { useErrorState } from "../utils/useErrorState";

function SignIn() {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const [isLoginError, setIsLoginError] = useState(false);
	const { setIsPopUp } = usePopUpContext();
	const { setErrorState } = useErrorState();

	const { email, password } = formData;
	const navigate = useNavigate();

	const onChange = (e) => {
		setFormData({
			...formData,
			[e.target.id]: e.target.value,
		});
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);
			if (userCredential.user) {
				localStorage.setItem("isAuth", true);
				setIsLoginError(false);
				setIsPopUp("login");
				navigate("/");
			}
		} catch (error) {
			if (error.code == "auth/invalid-credential") {
				setIsLoginError(true);
			} else {
				setErrorState(error.code);
				navigate("/error");
			}
		}
	};

	return (
		<div className="container auth-container">
			<div className="auth-wrapper">
				<h2>ログイン</h2>
				<p
					className={`auth-error-message ${
						isLoginError && "auth-error-message-active"
					}`}
				>
					メールアドレスかパスワードが間違っています。
				</p>
				<form onSubmit={onSubmit}>
					<label htmlFor="email">e-mail</label>
					<input
						type="email"
						placeholder="Email"
						id="email"
						value={email}
						required
						onChange={onChange}
					/>
					<label htmlFor="password">パスワード</label>
					<input
						type="password"
						placeholder="Password"
						id="password"
						value={password}
						required
						onChange={onChange}
					/>
					<button type="submit">ログイン</button>
				</form>
			</div>
		</div>
	);
}

export default SignIn;
