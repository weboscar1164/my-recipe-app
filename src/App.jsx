import { useEffect, useState } from "react";
import { getApiData } from "./utils/recipe";
import "./App.css";
import CategoryList from "./components/CategoryList";
import Header from "./components/Header";
import RankingList from "./components/RankingList";

// オブジェクトが空かどうか判定
const isEmpty = (obj) => {
	return Object.keys(obj).length === 0;
};

function App() {
	const [allCategory, setAllCategory] = useState([]);
	const [loading, setLoading] = useState(true);
	const [searchWord, setSearchWord] = useState("");
	const [showCategory, setShowCategory] = useState([]);
	const [currentCategory, setCurrentCategory] = useState({});
	const [rankingList, setRankingList] = useState([]);

	const VALUE = import.meta.env.VITE_API_KEY;
	useEffect(() => {
		const INITIAL_CATEGORY_URL = `https://app.rakuten.co.jp/services/api/Recipe/CategoryList/20170426?format=json&applicationId=${VALUE}`;
		const fetchCategoryData = async () => {
			// 楽天APIデータを取得
			let res = await getApiData(INITIAL_CATEGORY_URL);

			// console.log(res);
			setAllCategory(res.result);
			// console.log( allCategory);
			setLoading(false);
		};

		fetchCategoryData();
	}, []);

	useEffect(() => {
		const getSerchCategory = (allCategory, searchWord) => {
			if (!searchWord || allCategory.length === 0) {
				setShowCategory([]);
				return;
			}
			console.log(allCategory);
			const selectedLargeCategory = allCategory.large.filter((category) => {
				return new RegExp(searchWord).test(category.categoryName);
			});
			const selectedMediumCategory = allCategory.medium.filter((category) => {
				return new RegExp(searchWord).test(category.categoryName);
			});
			const selectedSmallCategory = allCategory.small.filter((category) => {
				return new RegExp(searchWord).test(category.categoryName);
			});
			// const selectedLargeCategory = allCategory.large.filter(
			// 	(category) => category.categoryName === searchWord
			// );
			// const selectedMediumCategory = allCategory.medium.filter(
			// 	(category) => category.categoryName === searchWord
			// );
			// const selectedSmallCategory = allCategory.small.filter(
			// 	(category) => category.categoryName === searchWord
			// );
			const uniqueMedium = selectedMediumCategory.filter(
				(mediumCategory) =>
					!selectedSmallCategory.some(
						(smallCategory) =>
							smallCategory.categoryName === mediumCategory.categoryName
					)
			);
			const uniqueLarge = selectedLargeCategory.filter(
				(largeCategory) =>
					!selectedMediumCategory.some(
						(mediumCategory) =>
							mediumCategory.categoryName === largeCategory.categoryName
					)
			);
			const serectedCategory = {
				large: uniqueLarge,
				medium: uniqueMedium,
				small: selectedSmallCategory,
			};
			// const uniqueCategory = Array.from(
			// 	new Map(
			// 		serectedCategory.map((category) => [category.categoryName, category])
			// 	).values()
			// );
			console.log(serectedCategory);
			setShowCategory(serectedCategory);
		};
		getSerchCategory(allCategory, searchWord);
	}, [searchWord, allCategory]);

	useEffect(() => {
		if (isEmpty(currentCategory)) {
			return;
		}
		const INITIAL_RANKING_URL = `https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20170426?applicationId=${VALUE}&categoryId=${currentCategory.categoryNumber}`;
		const fetchRankingData = async () => {
			// 楽天APIランキングデータを取得
			let res = await getApiData(INITIAL_RANKING_URL);

			console.log(res);
			setRankingList(res.result);
			setLoading(false);
		};

		fetchRankingData();
	}, [currentCategory]);

	const getRankingCategoryNumber = (currentCategory, categoryType) => {
		console.log(allCategory);
		console.log(currentCategory);

		if (categoryType === "large") {
			return currentCategory.categoryId;
		} else if (categoryType === "medium") {
			const largeCategory = allCategory.large.find(
				(_largeCategory) =>
					currentCategory.parentCategoryId == _largeCategory.categoryId
			);
			return `${largeCategory.categoryId}-${currentCategory.categoryId}`;
		} else if ((categoryType = "small")) {
			const mediumCategory = allCategory.medium.find(
				(_mediumCategory) =>
					currentCategory.parentCategoryId == _mediumCategory.categoryId
			);
			console.log(mediumCategory);
			const largeCategory = allCategory.large.find(
				(_largeCategory) =>
					mediumCategory.parentCategoryId == _largeCategory.categoryId
			);
			return `${largeCategory.categoryId}-${mediumCategory.categoryId}-${currentCategory.categoryId}`;
		}
	};

	return (
		<>
			<Header></Header>
			<CategoryList
				isEmpty={isEmpty}
				loading={loading}
				allCategory={allCategory}
				showCategory={showCategory}
				setSearchWord={setSearchWord}
				setCurrentCategory={setCurrentCategory}
				getRankingCategoryNumber={getRankingCategoryNumber}
			/>
			<RankingList
				currentCategory={currentCategory}
				rankingList={rankingList}
			/>
			<div></div>
		</>
	);
}

export default App;
