import { useEffect, useState } from "react";
import { getAllrecipe } from "./utils/recipe";
import "./App.css";

function App() {
	const PARAMETER = "applicationId";
	const VALUE = "1006516241708194777";
	const INITIAL_URL = `https://app.rakuten.co.jp/services/api/Recipe/CategoryList/20170426?${PARAMETER}=${VALUE}`;

	useEffect(() => {
		const fetchRecipeData = async () => {
			// 楽天APIデータを取得
			let res = await getAllrecipe(INITIAL_URL);
			// //
			// loadPokemon(res.results);
			// // console.log(res.next);
			// setPrevURL(res.previous);
			// setNextURL(res.next);
			// setLoading(false);
			console.log(res);
		};

		fetchRecipeData();
	}, []);

	return (
		<>
			<h1>hello react</h1>
		</>
	);
}

export default App;
