/** @jsxImportSource @emotion/react */
import "./SearchBar.css";
import { useScrollDirection } from "../utils/useScrollDirection";
import { styles } from "../utils/Styled";

const SearchBar = ({
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
		<div
			className="app-search-bar"
			css={[direction === "down" && styles.hideHeader]}
		>
			<div className="container app-search-bar-container">
				<input
					type="text"
					onChange={(e) => onEditSerch(e.target.value)}
					placeholder="検索カテゴリ候補を入力してください"
					value={searchWord}
				/>
			</div>
		</div>
	);
};

export default SearchBar;
