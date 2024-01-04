import { useEffect, useState } from "react";
import { getAllCategory } from "./utils/recipe";
import "./App.css";
import CategoryList from "./components/CategoryList";
import Header from "./components/Header";
import RankingList from "./components/RankingList";

function App() {
	const [allCategory, setAllCategory] = useState([]);
	const [loading, setLoading] = useState(true);
	const [searchWord, setSearchWord] = useState("");
	const [showCategory, setShowCategory] = useState([]);

	const VALUE = import.meta.env.VITE_API_KEY;
	const INITIAL_CATEGORY_URL = `https://app.rakuten.co.jp/services/api/Recipe/CategoryList/20170426?format=json&applicationId=${VALUE}`;
	const INITIAL_RANKING_URL = `https://app.rakuten.co.jp/services/api/Recipe/Ranking/20170426?format=json&applicationId=${VALUE}`;
	useEffect(() => {
		const fetchCategoryData = async () => {
			// 楽天APIデータを取得
			let res = await getAllCategory(INITIAL_CATEGORY_URL);

			console.log("res: " + res);
			setAllCategory(res.result);
			console.log("allCategory:" + allCategory);
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
			const serectedCategory = [
				...selectedLargeCategory,
				...selectedMediumCategory,
				...selectedSmallCategory,
			];

			const uniqueCategory = Array.from(
				new Map(
					serectedCategory.map((category) => [category.categoryName, category])
				).values()
			);
			console.log(serectedCategory);
			console.log(uniqueCategory);
			setShowCategory(uniqueCategory);
		};
		getSerchCategory(allCategory, searchWord);
	}, [searchWord, allCategory]);

	return (
		<>
			<Header></Header>
			<CategoryList
				loading={loading}
				allCategory={allCategory}
				showCategory={showCategory}
				setSearchWord={setSearchWord}
			></CategoryList>
			<RankingList></RankingList>
			<div></div>
		</>
	);
}

export default App;
