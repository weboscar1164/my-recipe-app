/** @jsxImportSource @emotion/react */
import { useState } from "react";
import "./Auth.css";

import { styles } from "../utils/Styled";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.config";

function SignIn({ setIsAuth }) {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const [isError, setIsError] = useState(false);

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
				setIsAuth(Boolean(localStorage.getItem("isAuth")));
				setIsError(false);
				navigate("/");
			}
		} catch (error) {
			setIsError(true);
		}
	};

	return (
		<div className="container auth-container">
			<div className="auth-wrapper">
				<h2>ログイン</h2>
				<p
					className="auth-error-message"
					css={[isError && styles.authErrorMessageActive]}
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
