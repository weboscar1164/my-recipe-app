import { useState } from "react";
import "./Auth.css";
import { useNavigate } from "react-router-dom";
import { updateProfile, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.config";
import { useErrorState } from "../utils/useErrorState";
import { usePopUpContext } from "../utils/usePopUp";

function SignUp() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
	});
	const [isDuplicateError, setIsDuplicateError] = useState(false);
	const { name, email, password } = formData;
	const navigate = useNavigate();
	const { setErrorState } = useErrorState();
	const { setIsPopUp } = usePopUpContext();

	const onChange = (e) => {
		setFormData({
			...formData,
			[e.target.id]: e.target.value,
		});
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			await createUserWithEmailAndPassword(auth, email, password);
			updateProfile(auth.currentUser, {
				displayName: name,
			});
			localStorage.setItem("isAuth", true);
			setIsDuplicateError(false);
			setIsPopUp("signup");
			navigate("/");
		} catch (error) {
			if (error.code === "auth/email-already-in-use") {
				setIsDuplicateError(true);
			} else {
				setErrorState(error.code);
				navigate("/error");
			}
		}
	};

	return (
		<div className="container auth-container">
			<div className="auth-wrapper">
				<h2>新規登録</h2>
				<p
					className={`auth-error-message ${
						isDuplicateError && "auth-error-message-active"
					}`}
				>
					このメールアドレスは既に使用されています
				</p>
				<form onSubmit={onSubmit}>
					<label htmlFor="name">お名前</label>
					<input
						type="text"
						placeholder="Name"
						id="name"
						value={name}
						required
						onChange={onChange}
					/>
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
					<button type="submit">登録</button>
				</form>
			</div>
		</div>
	);
}

export default SignUp;
