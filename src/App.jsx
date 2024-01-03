import { useEffect, useState } from "react";
import { getAllCategory } from "./utils/recipe";
import "./App.css";
import CategoryList from "./components/CategoryList";
import Header from "./components/Header";
import RankingList from "./components/RankingList";

function App() {
	const [allCategory, setAllCategory] = useState([]);
	const [loading, setLoading] = useState(true);
	const [serchWord, setSerchWord] = useState("");
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
		const getSerchCategory = (allCategory, serchWord) => {
			if (allCategory.length == 0) {
				return;
			}
			console.log(allCategory);
			const selectedLargeCategory = allCategory.large.filter(
				(category) => category.categoryName === serchWord
			);
			const selectedMediumCategory = allCategory.medium.filter(
				(category) => category.categoryName === serchWord
			);
			const selectedSmallCategory = allCategory.small.filter(
				(category) => category.categoryName === serchWord
			);
			const serectedCategory = [
				...selectedLargeCategory,
				...selectedMediumCategory,
				...selectedSmallCategory,
			];

			console.log(serectedCategory);
			setShowCategory(serectedCategory);
		};
		getSerchCategory(allCategory, serchWord);
	}, [serchWord, allCategory]);

	return (
		<>
			<Header></Header>
			<CategoryList
				loading={loading}
				allCategory={allCategory}
				showCategory={showCategory}
				setSerchWord={setSerchWord}
			></CategoryList>
			<RankingList></RankingList>
			<div></div>
		</>
	);
}

export default App;
