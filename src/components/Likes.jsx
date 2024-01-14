import { useEffect, useState } from "react";
import { db, auth } from "../firebase.config";
import "./Likes.css";
import SearchBar from "./SearchBar";
import LikeCategoryList from "./LikeCategoryList";
import RankingList from "./RankingList";
import { isEmpty } from "../utils/helpers";
import { getCategoryLikeList } from "../utils/likes";

const Likes = ({
	rankingLoading,
	setRankingLoading,
	searchWord,
	setSearchWord,
	currentCategory,
	setCurrentCategory,
	setRankingList,
	isOpen,
	allCategory,
	setShowCategory,
	getRankingCategoryNumber,
	handleOpenModal,
	rankingList,
}) => {
	const [showLikeCategory, setShowLikeCategory] = useState([]);
	const [currentAutherLikeList, setCurrentAutherLikeList] = useState([]);

	const updateLikeData = async () => {
		try {
			const fetchedData = await getCategoryLikeList();
			setCurrentAutherLikeList(fetchedData);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	useEffect(() => {
		// コンポーネントがマウントされたときに一度だけ updateLikeData を呼び出す
		setSearchWord("");
		updateLikeData();
	}, []);

	useEffect(() => {
		if (
			allCategory.length === 0 ||
			!auth.currentUser ||
			currentAutherLikeList.length === 0
		) {
			return;
		} else {
			try {
				const filterObjects = (data, filterArray) => {
					// allCategoryを用いてログイン中ユーザーのお気に入り一覧を抽出
					const filteredData = { ...data };
					for (const key in filteredData) {
						if (Array.isArray(filteredData[key])) {
							const filteredArray = filteredData[key].filter((obj) => {
								return filterArray.some(
									(filterObj) =>
										filterObj.categoryId === obj.categoryId &&
										filterObj.categoryType === key
								);
							});
							filteredData[key] = filteredArray;
						} else if (typeof filteredData[key] === "object") {
							filterObjects(filteredData[key], filterArray);
						}
					}
					return filteredData;
				};
				setShowLikeCategory(filterObjects(allCategory, currentAutherLikeList));
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		}
	}, [currentAutherLikeList, allCategory]);

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
				<LikeCategoryList
					isOpen={isOpen}
					isEmpty={isEmpty}
					allCategory={allCategory}
					showLikeCategory={showLikeCategory}
					setShowLikeCategory={setShowLikeCategory}
					setSearchWord={setSearchWord}
					setCurrentCategory={setCurrentCategory}
					getRankingCategoryNumber={getRankingCategoryNumber}
					handleOpenModal={handleOpenModal}
					updateLikeData={updateLikeData}
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
};

export default Likes;
