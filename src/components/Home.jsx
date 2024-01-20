import { useEffect } from "react";
import "./Home.css";
import SearchBar from "./SearchBar";
import CategoryList from "./CategoryList";
import RankingList from "./RankingList";

import { isEmpty } from "../utils/helpers";
import { getSerchCategory } from "../utils/handleData";

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
		setSearchWord("");
	}, []);

	useEffect(() => {
		if (!searchWord || allCategory.length === 0) {
			setShowCategory([]);
			return;
		}

		const selectedCategory = getSerchCategory(allCategory, searchWord);
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
