import { useEffect } from "react";
import "./Home.css";
import SearchBar from "./SearchBar";
import CategoryList from "./CategoryList";
import RankingList from "./RankingList";

import { isEmpty } from "../utils/helpers";

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
		const getSerchCategory = (allCategory, searchWord) => {
			if (!searchWord || allCategory.length === 0) {
				setShowCategory([]);
				return;
			}
			const getSerchSelectedCategory = (searchWord, categoryName) => {
				return new RegExp(searchWord).test(categoryName);
			};
			const selectedLargeCategory = allCategory.large.filter((category) => {
				return getSerchSelectedCategory(searchWord, category.categoryName);
			});
			const selectedMediumCategory = allCategory.medium.filter((category) => {
				return getSerchSelectedCategory(searchWord, category.categoryName);
			});
			const selectedSmallCategory = allCategory.small.filter((category) => {
				return getSerchSelectedCategory(searchWord, category.categoryName);
			});

			// カテゴリ名の重複を削除
			const getUniqueCategory = (
				targetSelectedCategory,
				useSelectedCategory
			) => {
				return targetSelectedCategory.filter(
					(targetCategory) =>
						!useSelectedCategory.some(
							(useCategory) =>
								targetCategory.categoryName === useCategory.categoryName
						)
				);
			};

			const uniqueMediumCategory = getUniqueCategory(
				selectedMediumCategory,
				selectedSmallCategory
			);
			const uniqueLargeCategory = getUniqueCategory(
				selectedLargeCategory,
				selectedMediumCategory
			);

			const serectedCategory = {
				large: uniqueLargeCategory,
				medium: uniqueMediumCategory,
				small: selectedSmallCategory,
			};

			setShowCategory(serectedCategory);
		};
		getSerchCategory(allCategory, searchWord);
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