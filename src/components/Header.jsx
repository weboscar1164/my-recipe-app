/** @jsxImportSource @emotion/react */
import "./Header.css";
import { useScrollDirection } from "../utils/useScrollDirection";
import { styles } from "../utils/Styled";

const Header = ({
	setRankingLoading,
	searchWord,
	setSearchWord,
	setCurrentCategory,
	setRankingList,
}) => {
	const { direction } = useScrollDirection();

	const onEditSerch = (value) => {
		setSearchWord(value);
		setCurrentCategory({});
		setRankingList([]);
		setRankingLoading(true);
	};

	return (
		<header className="app-header" css={[direction === "down" && styles.hide]}>
			<div className="container app-header-container">
				<div className="app-header-title">
					<small>楽天レシピ検索を簡単に</small>
					<h1>R-Recipeeee!</h1>
				</div>
				<input
					type="text"
					onChange={(e) => onEditSerch(e.target.value)}
					placeholder="検索カテゴリ候補を入力してください"
					value={searchWord}
				/>
			</div>
		</header>
	);
};

export default Header;
