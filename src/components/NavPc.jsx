/** @jsxImportSource @emotion/react */
import React from "react";
import "./Header.css";
import { useScrollDirection } from "../utils/useScrollDirection";
import { styles } from "../utils/Styled";
import { Link } from "react-router-dom";

const NavPc = ({ isAuth }) => {
	const { direction } = useScrollDirection();

	const handleLikeLInk = () => {
		setSerchWord("");
	};

	return (
		<nav
			className="app-header-nav"
			css={[direction === "down" && styles.upNav]}
		>
			<Link
				className="app-header-nav-item"
				to="/"
				onClick={() => setSerchWord("")}
			>
				ホーム
			</Link>
			{!isAuth ? (
				<>
					<Link
						className="app-header-nav-item"
						to="/signin"
						onClick={() => setSerchWord("")}
					>
						ログイン
					</Link>
					<Link
						className="app-header-nav-item"
						to="/signup"
						onClick={() => setSerchWord("")}
					>
						新規登録
					</Link>
				</>
			) : (
				<>
					<Link
						className="app-header-nav-item"
						to="/likes"
						onClick={() => handleLikeLInk()}
					>
						お気に入り
					</Link>
					<Link
						className="app-header-nav-item"
						to="/signout"
						onClick={() => setSerchWord("")}
					>
						ログアウト
					</Link>
				</>
			)}
		</nav>
	);
};

export default NavPc;
