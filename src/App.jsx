import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Modal from "react-modal";
import { auth } from "./firebase.config";
import "./App.css";

import Header from "./components/Header";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import SignOut from "./components/SignOut";
import Likes from "./components/Likes";
import Error from "./components/Error";
import ModalComponent from "./components/ModalComponent";
import PopUp from "./components/PopUp";
import Loading from "./components/Loading";

import { getApiData } from "./utils/api";
import { isEmpty } from "./utils/helpers";
import { PopUpProvider } from "./utils/usePopUp";
import { ErrorStateProvider } from "./utils/useErrorState";

const App = () => {
	const [allCategory, setAllCategory] = useState([]);
	const [rankingLoading, setRankingLoading] = useState(true);
	const [searchWord, setSearchWord] = useState("");
	const [showCategory, setShowCategory] = useState([]);
	const [currentCategory, setCurrentCategory] = useState({});
	const [rankingList, setRankingList] = useState([]);
	const [isOpen, setIsOpen] = useState(false);
	const [firebaseInitialized, setFirebaseInitialized] = useState(false);
	const [currentAutherLikeList, setCurrentAutherLikeList] = useState([]);

	Modal.setAppElement("#root");

	const VALUE = import.meta.env.VITE_API_KEY;

	useEffect(() => {
		const INITIAL_CATEGORY_URL = `https://app.rakuten.co.jp/services/api/Recipe/CategoryList/20170426?format=json&applicationId=${VALUE}`;
		const fetchCategoryData = async () => {
			// 楽天APIデータを取得
			let res = await getApiData(INITIAL_CATEGORY_URL);

			setAllCategory(res.result);
		};

		// firebaseが初期化されてから画面を表示する
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setFirebaseInitialized(true);
		});
		fetchCategoryData();
		return () => unsubscribe();
	}, []);

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
	}, [currentCategory]);

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

	const handleCloseModal = () => {
		setIsOpen(false);
	};

	const handleOpenModal = () => {
		setIsOpen(true);
	};

	if (!firebaseInitialized) {
		return <Loading />;
	}
	return (
		<Router>
			<PopUpProvider>
				<Header setSerchWord={setSearchWord} />
				<ErrorStateProvider>
					<Routes>
						<Route
							path="/"
							element={
								<Home
									currentAutherLikeList={currentAutherLikeList}
									setCurrentAutherLikeList={setCurrentAutherLikeList}
									rankingLoading={rankingLoading}
									setRankingLoading={setRankingLoading}
									searchWord={searchWord}
									setSearchWord={setSearchWord}
									setCurrentCategory={setCurrentCategory}
									setRankingList={setRankingList}
									isOpen={isOpen}
									allCategory={allCategory}
									showCategory={showCategory}
									setShowCategory={setShowCategory}
									getRankingCategoryNumber={getRankingCategoryNumber}
									handleOpenModal={handleOpenModal}
									currentCategory={currentCategory}
									rankingList={rankingList}
								/>
							}
						/>
						<Route path="/signup" element={<SignUp />} />
						<Route path="/signin" element={<SignIn />} />
						<Route path="/signout" element={<SignOut />} />
						<Route
							path="/likes"
							element={
								<Likes
									currentAutherLikeList={currentAutherLikeList}
									setCurrentAutherLikeList={setCurrentAutherLikeList}
									rankingLoading={rankingLoading}
									setRankingLoading={setRankingLoading}
									searchWord={searchWord}
									setSearchWord={setSearchWord}
									setCurrentCategory={setCurrentCategory}
									setRankingList={setRankingList}
									isOpen={isOpen}
									allCategory={allCategory}
									showCategory={showCategory}
									setShowCategory={setShowCategory}
									getRankingCategoryNumber={getRankingCategoryNumber}
									handleOpenModal={handleOpenModal}
									currentCategory={currentCategory}
									rankingList={rankingList}
								/>
							}
						/>
						<Route path="/error" element={<Error />} />
					</Routes>
				</ErrorStateProvider>
				<footer>
					<small>このアプリは楽天APIを使用しています。</small>
				</footer>
				<PopUp />
				<ModalComponent isOpen={isOpen} handleCloseModal={handleCloseModal} />
			</PopUpProvider>
		</Router>
	);
};

export default App;
