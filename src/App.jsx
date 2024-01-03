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

	const VALUE = import.meta.env.VITE_API_KEY;
	const INITIAL_CATEGORY_URL = `https://app.rakuten.co.jp/services/api/Recipe/CategoryList/20170426?format=json&applicationId=${VALUE}`;
	const INITIAL_RANKING_URL = `https://app.rakuten.co.jp/services/api/Recipe/Ranking/20170426?format=json&applicationId=${VALUE}`;
	console.log(INITIAL_CATEGORY_URL);
	useEffect(() => {
		const fetchCategoryData = async () => {
			// 楽天APIデータを取得
			let res = await getAllCategory(INITIAL_CATEGORY_URL);
			// //
			// loadPokemon(res.results);
			// // console.log(res.next);
			// setPrevURL(res.previous);
			// setNextURL(res.next);
			// setLoading(false);
			console.log(res);
			setAllCategory(res.result.small);
			console.log("categoryList:" + allCategory);
			setLoading(false);
		};

		fetchCategoryData();
	}, []);

	return (
		<>
			<Header></Header>
			<CategoryList
				loading={loading}
				allCategory={allCategory}
				setSerchWord={setSerchWord}
			></CategoryList>
			<RankingList></RankingList>
			<div></div>
		</>
	);
}

export default App;
