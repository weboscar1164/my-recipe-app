/** @jsxImportSource @emotion/react */
import { auth } from "../firebase.config";
import "./Header.css";
import { useScrollDirection } from "../utils/useScrollDirection";
import { styles } from "../utils/Styled";
import { Link } from "react-router-dom";

const NavPc = ({ isAuth }) => {
	const { direction } = useScrollDirection();

	return (
		<nav
			className="app-header-nav"
			css={[direction === "down" && styles.upNav]}
		>
			<Link
				className="app-header-nav-item"
				to="/"
				onClick={() => setCurrentCategory({})}
			>
				ホーム
			</Link>
			{!auth.currentUser ? (
				<>
					<Link
						className="app-header-nav-item"
						to="/signin"
						onClick={() => setCurrentCategory({})}
					>
						ログイン
					</Link>
					<Link
						className="app-header-nav-item"
						to="/signup"
						onClick={() => setCurrentCategory({})}
					>
						新規登録
					</Link>
				</>
			) : (
				<>
					<Link
						className="app-header-nav-item"
						to="/likes"
						onClick={() => setCurrentCategory({})}
					>
						お気に入り
					</Link>
					<Link
						className="app-header-nav-item"
						to="/signout"
						onClick={() => setCurrentCategory({})}
					>
						ログアウト
					</Link>
				</>
			)}
		</nav>
	);
};

export default NavPc;
