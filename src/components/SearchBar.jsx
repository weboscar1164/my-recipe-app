import "./SearchBar.css";
import { useScrollDirection } from "../utils/useScrollDirection";

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
			className={`app-search-bar ${
				direction === "down" && "app-search-bar-scroll"
			}`}
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
