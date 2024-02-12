import "./Header.css";
import NavPc from "./NavPc";
import NavSp from "./NavSp";
import { useScrollDirection } from "../utils/useScrollDirection";
import { mediaQuery, useMediaQuery } from "../utils/useMediaQuery";
import { useNavigate } from "react-router-dom";

const Header = ({ fetchLikeData }) => {
	const { direction } = useScrollDirection();
	const navigate = useNavigate();
	const isSp = useMediaQuery(mediaQuery.sp);

	const handleToLikeCategoryList = () => {
		navigate("/likes");
	};

	return (
		<>
			<header
				className={`app-header ${direction === "down" && "app-header-hide"}`}
			>
				<div className="container app-header-container">
					<div className="app-header-title">
						<small>楽天レシピ検索を簡単に</small>
						<h1>R-Recipeeee!</h1>
					</div>
					{isSp ? (
						<NavSp
							fetchLikeData={fetchLikeData}
							handleToLikeCategoryList={handleToLikeCategoryList}
						/>
					) : (
						<NavPc
							fetchLikeData={fetchLikeData}
							handleToLikeCategoryList={handleToLikeCategoryList}
						/>
					)}
				</div>
			</header>
		</>
	);
};

export default Header;
