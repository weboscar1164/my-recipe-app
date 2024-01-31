/** @jsxImportSource @emotion/react */
import { useState } from "react";
import "./Header.css";
import { auth } from "../firebase.config";
import { useScrollDirection } from "../utils/useScrollDirection";
import { styles } from "../utils/Styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faBars } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const NavSp = ({ isAuth }) => {
	const [openNav, setOpenNav] = useState(false);
	const { direction } = useScrollDirection();

	const handleToggleNav = () => {
		setOpenNav(!openNav);
	};

	const handleLinkClick = () => {
		setOpenNav(false);
		setCurrentCategory({});
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
					onClick={() => handleLinkClick()}
					to="/"
				>
					ホーム
				</Link>
				{!auth.currentUser ? (
					<>
						<Link
							className="app-header-nav-item app-header-nav-item-sp"
							onClick={() => handleLinkClick()}
							to="/signin"
						>
							ログイン
						</Link>
						<Link
							className="app-header-nav-item app-header-nav-item-sp"
							onClick={() => handleLinkClick()}
							to="/signup"
						>
							新規登録
						</Link>
					</>
				) : (
					<>
						<Link
							className="app-header-nav-item app-header-nav-item-sp"
							onClick={() => handleLinkClick()}
							to="/likes"
						>
							お気に入り
						</Link>
						<Link
							className="app-header-nav-item app-header-nav-item-sp"
							onClick={() => handleLinkClick()}
							to="/signout"
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
