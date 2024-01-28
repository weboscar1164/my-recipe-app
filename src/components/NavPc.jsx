/** @jsxImportSource @emotion/react */
import { auth } from "../firebase.config";
import "./Header.css";
import { useScrollDirection } from "../utils/useScrollDirection";
import { styles } from "../utils/Styled";
import { Link } from "react-router-dom";

const NavPc = ({ isAuth }) => {
	const { direction } = useScrollDirection();
	// console.log(isAuth);
	// console.log(typeof isAuth);
	// console.log(auth.currentUser);
	// console.log("Rendered!");
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
					<Link className="app-header-nav-item" to="/likes">
						お気に入り
					</Link>
					<Link className="app-header-nav-item" to="/signout">
						ログアウト
					</Link>
				</>
			)}
		</nav>
	);
};

export default NavPc;
