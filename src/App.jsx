import { useEffect, useState } from "react";
import { getApiData } from "./utils/recipe";
import "./App.css";
import Header from "./components/Header";
import CategoryList from "./components/CategoryList";
import RankingList from "./components/RankingList";
import { isEmpty } from "./utils/helpers";

function App() {
	const [allCategory, setAllCategory] = useState([]);
	const [rankingLoading, setRankingLoading] = useState(true);
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
		};

		fetchCategoryData();
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
				selectedMediumCategory,
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

	useEffect(() => {
		if (isEmpty(currentCategory)) {
			return;
		}

		const INITIAL_RANKING_URL = `https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20170426?applicationId=${VALUE}&categoryId=${currentCategory.categoryNumber}`;

		const fetchRankingData = async () => {
			try {
				// 楽天APIランキングデータを取得
				let res = await getApiData(INITIAL_RANKING_URL);

				setRankingList(res.result);

				const preloadImages = () => {
					// 画像をプリロードして表示速度を改善
					const imagePromises = res.result.map((item) => {
						return new Promise((resolve) => {
							const img = new Image();
							img.onload = () => resolve();
							img.src = item.foodImageUrl;
						});
					});
					return Promise.all(imagePromises);
				};

				preloadImages().then(() => setRankingLoading(false));
			} catch (error) {
				console.error("Error fetching ranking data:", error);
				setRankingLoading(false); // エラー時もloadingをfalseに設定
			}
		};
		fetchRankingData();
	}, [currentCategory, setRankingLoading]);

	const getRankingCategoryNumber = (currentCategory, categoryType) => {
		// 楽天ランキングAPIのURLに使用するカテゴリ番号を生成する
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
			const largeCategory = allCategory.large.find(
				(_largeCategory) =>
					mediumCategory.parentCategoryId == _largeCategory.categoryId
			);
			return `${largeCategory.categoryId}-${mediumCategory.categoryId}-${currentCategory.categoryId}`;
		}
	};

	return (
		<>
			<Header
				setRankingLoading={setRankingLoading}
				searchWord={searchWord}
				setSearchWord={setSearchWord}
				setCurrentCategory={setCurrentCategory}
				setRankingList={setRankingList}
			/>
			{isEmpty(currentCategory) ? (
				<CategoryList
					isEmpty={isEmpty}
					allCategory={allCategory}
					showCategory={showCategory}
					setSearchWord={setSearchWord}
					setCurrentCategory={setCurrentCategory}
					getRankingCategoryNumber={getRankingCategoryNumber}
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

			<footer>
				<small>このアプリは楽天APIを使用しています。</small>
			</footer>
		</>
	);
}

export default App;
