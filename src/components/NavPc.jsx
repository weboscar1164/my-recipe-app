/** @jsxImportSource @emotion/react */
import React from "react";
import { auth } from "../firebase.config";
import "./Header.css";
import { useScrollDirection } from "../utils/useScrollDirection";
import { styles } from "../utils/Styled";
import { Link } from "react-router-dom";

const NavPc = ({ isAuth, handleToLikeCategoryList }) => {
	const { direction } = useScrollDirection();

	return (
		<nav
			className="app-header-nav"
			css={[direction === "down" && styles.upNav]}
		>
			<Link className="app-header-nav-item" to="/">
				ホーム
			</Link>
			{!auth.currentUser ? (
				<>
					<Link className="app-header-nav-item" to="/signin">
						ログイン
					</Link>
					<Link className="app-header-nav-item" to="/signup">
						新規登録
					</Link>
				</>
			) : (
				<>
					<div
						className="app-header-nav-item"
						to="/likes"
						onClick={() => handleToLikeCategoryList()}
					>
						お気に入り
					</div>
					<Link className="app-header-nav-item" to="/signout">
						ログアウト
					</Link>
				</>
			)}
		</nav>
	);
};

export default NavPc;
