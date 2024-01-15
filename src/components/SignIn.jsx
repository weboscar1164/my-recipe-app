import { useState } from "react";
import "./Auth.css";

import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.config";

function SignIn({ setIsAuth }) {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
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
				setIsAuth(true);
				navigate("/");
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="container auth-container">
			<div className="auth-wrapper">
				<h2>ログイン</h2>
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
