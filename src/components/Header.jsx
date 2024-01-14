/** @jsxImportSource @emotion/react */
import "./Header.css";
import NavPc from "./NavPc";
import NavSp from "./NavSp";
import { useScrollDirection } from "../utils/useScrollDirection";
import { styles } from "../utils/Styled";
import { mediaQuery, useMediaQuery } from "../utils/useMediaQuery";
import { useNavigate } from "react-router-dom";

const Header = ({ isAuth, fetchLikeData }) => {
	const { direction } = useScrollDirection();
	const navigate = useNavigate();
	const isSp = useMediaQuery(mediaQuery.sp);

	const handleToLikeCategoryList = () => {
		navigate("/likes");
	};

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
			{isSp ? (
				<NavSp
					isAuth={isAuth}
					fetchLikeData={fetchLikeData}
					handleToLikeCategoryList={handleToLikeCategoryList}
				/>
			) : (
				<NavPc
					isAuth={isAuth}
					fetchLikeData={fetchLikeData}
					handleToLikeCategoryList={handleToLikeCategoryList}
				/>
			)}
		</>
	);
};

export default Header;
