/** @jsxImportSource @emotion/react */
import "./Header.css";
import { Link } from "react-router-dom";
import { useScrollDirection } from "../utils/useScrollDirection";
import { styles } from "../utils/Styled";

const Header = ({ isAuth }) => {
	const { direction } = useScrollDirection();

	return (
		<>
			<header
				className="app-header"
				css={[direction === "down" && styles.hideHeader]}
			>
				<div className="container app-header-container">
					<div className="app-header-title">
						<small>楽天レシピ検索を簡単に</small>
						<h1>R-Recipeeee!</h1>
					</div>
				</div>
			</header>
			<nav
				className="app-header-nav"
				css={[direction === "down" && styles.upNav]}
			>
				<Link className="app-header-nav-item" to="/">
					ホーム
				</Link>
				{!isAuth ? (
					<>
						<Link className="app-header-nav-item" to="/signin">
							ログイン
						</Link>
						<Link className="app-header-nav-item" to="/signup">
							新規登録
						</Link>
					</>
				) : (
					<Link className="app-header-nav-item" to="/signout">
						ログアウト
					</Link>
				)}
			</nav>
		</>
	);
};

export default Header;
