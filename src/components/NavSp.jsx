/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import "./Header.css";
import { useScrollDirection } from "../utils/useScrollDirection";
import { styles } from "../utils/Styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faBars } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const NavSp = ({ isAuth }) => {
	const [openNav, setOpenNav] = useState(false);
	const { direction } = useScrollDirection();

	const handleToggleNav = () => {
		openNav ? setOpenNav(false) : setOpenNav(true);
	};

	return (
		<>
			<div
				className="app-header-navbutton"
				css={[direction === "down" && styles.upNav]}
				onClick={() => handleToggleNav()}
			>
				<div
					className="app-header-navbutton-wrapper"
					css={[openNav && styles.navigationButtonActive]}
				>
					<div className="app-header-navbutton-open">
						<small>Menu</small>
						<FontAwesomeIcon
							icon={faBars}
							className="app-header-navbutton-open-icon"
						/>
					</div>
					<FontAwesomeIcon
						icon={faXmark}
						className="app-header-navbutton-close"
					/>
				</div>
			</div>
			<nav
				className="app-header-nav-sp"
				css={[openNav && styles.activeNavigation]}
			>
				<Link
					className="app-header-nav-item app-header-nav-item-sp"
					to="/"
					onClick={() => setSerchWord("")}
				>
					ホーム
				</Link>
				{!isAuth ? (
					<>
						<Link
							className="app-header-nav-item app-header-nav-item-sp"
							to="/signin"
							onClick={() => setSerchWord("")}
						>
							ログイン
						</Link>
						<Link
							className="app-header-nav-item app-header-nav-item-sp"
							to="/signup"
							onClick={() => setSerchWord("")}
						>
							新規登録
						</Link>
					</>
				) : (
					<>
						<Link
							className="app-header-nav-item app-header-nav-item-sp"
							to="/likes"
							onClick={() => setSerchWord("")}
						>
							お気に入り
						</Link>
						<Link
							className="app-header-nav-item app-header-nav-item-sp"
							to="/signout"
							onClick={() => setSerchWord("")}
						>
							ログアウト
						</Link>
					</>
				)}
			</nav>
		</>
	);
};

export default NavSp;
