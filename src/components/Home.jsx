import { useEffect } from "react";
import "./Home.css";
import SearchBar from "./SearchBar";
import CategoryList from "./CategoryList";
import RankingList from "./RankingList";

import { isEmpty } from "../utils/helpers";
import { useGetSerchCategory } from "../utils/useHandleData";

function Home({
	rankingLoading,
	setRankingLoading,
	searchWord,
	setSearchWord,
	currentCategory,
	setCurrentCategory,
	setRankingList,
	isOpen,
	allCategory,
	showCategory,
	setShowCategory,
	getRankingCategoryNumber,
	handleOpenModal,
	rankingList,
}) {
	useEffect(() => {
		// 初回レンダリング時にserchWordを空にする
		setSearchWord("");
	}, []);

	useEffect(() => {
		if (!searchWord || allCategory.length === 0) {
			// 検索語句が空になったら一覧を消去
			setShowCategory([]);
			return;
		}

		// 検索語句が入ったらすべてのカテゴリから検索する
		const selectedCategory = useGetSerchCategory(allCategory, searchWord);
		setShowCategory(selectedCategory);
	}, [searchWord, allCategory]);

	return (
		<div className="home-container">
			<SearchBar
				setRankingLoading={setRankingLoading}
				searchWord={searchWord}
				setSearchWord={setSearchWord}
				setCurrentCategory={setCurrentCategory}
				setRankingList={setRankingList}
			/>
			{isEmpty(currentCategory) ? (
				<CategoryList
					isOpen={isOpen}
					isEmpty={isEmpty}
					allCategory={allCategory}
					showCategory={showCategory}
					setSearchWord={setSearchWord}
					setCurrentCategory={setCurrentCategory}
					getRankingCategoryNumber={getRankingCategoryNumber}
					handleOpenModal={handleOpenModal}
				/>
			) : (
				<RankingList
					isEmpty={isEmpty}
					rankingLoading={rankingLoading}
					setSearchWord={setSearchWord}
					currentCategory={currentCategory}
					rankingList={rankingList}
				/>
			)}
		</div>
	);
}

export default Home;
