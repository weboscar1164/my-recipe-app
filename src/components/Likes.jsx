import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase.config";
import "./Likes.css";
import SearchBar from "./SearchBar";
import LikeCategoryList from "./LikeCategoryList";
import RankingList from "./RankingList";

import { isEmpty } from "../utils/helpers";
import {
	getCategoryLikeList,
	useGetSerchCategory,
} from "../utils/useHandleData";

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
	getRankingCategoryNumber,
	handleOpenModal,
	rankingList,
	currentAutherLikeList,
	setCurrentAutherLikeList,
}) => {
	const [fetchedShowLikeCategory, setFetchedShowLikeCategory] = useState([]);
	const [showLikeCategory, setShowLikeCategory] = useState([]);
	const navigate = useNavigate();

	const updateLikeData = async () => {
		try {
			const fetchedData = await getCategoryLikeList();
			setCurrentAutherLikeList(fetchedData);
		} catch (error) {
			console.error("Error fetching data:", error);
			setErrorState(error.code);
			navigate("/Error");
		}
	};

	useEffect(() => {
		if (!auth.currentUser) {
			// 未ログイン時にログイン画面にリダイレクト
			navigate("/signin");
		} else {
			// コンポーネントがマウントされたときに一度だけ updateLikeData を呼び出す
			setSearchWord("");
			updateLikeData();
		}
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
						const filteredArray = filteredData[key].filter((obj) => {
							return filterArray.some((filterObj) => {
								if (
									filterObj.categoryId === obj.categoryId &&
									filterObj.categoryType === key
								) {
									return true;
								}
								return false;
							});
						});
						filteredData[key] = filteredArray;
					}
					return filteredData;
				};

				const changeArrayAndAddId = (data, addArray) => {
					const changedData = { ...data };
					for (const key in changedData) {
						changedData[key] = changedData[key].map((obj) => {
							const matchngChangeObj = addArray.find((changeObj) => {
								return (
									changeObj.categoryId === obj.categoryId &&
									changeObj.categoryType === key
								);
							});
							if (matchngChangeObj) {
								return {
									...obj,
									categoryType: key,
									firebaseId: matchngChangeObj.id,
								};
							} else {
								return obj;
							}
						});
					}
					return changedData;
				};

				const filteredData = filterObjects(allCategory, currentAutherLikeList);
				const updatedData = changeArrayAndAddId(
					filteredData,
					currentAutherLikeList
				);
				console.log(updatedData);
				setFetchedShowLikeCategory(updatedData);
				setShowLikeCategory(updatedData);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		}
	}, [currentAutherLikeList, allCategory]);

	useEffect(() => {
		// 検索機能
		if (fetchedShowLikeCategory.length === 0) {
			return;
		}
		if (!searchWord) {
			// serchWordが空になったらすべてのお気に入りを表示
			setShowLikeCategory(fetchedShowLikeCategory);
			return;
		} else {
			const selectedCategory = useGetSerchCategory(
				fetchedShowLikeCategory,
				searchWord
			);
			setShowLikeCategory(selectedCategory);
		}
	}, [searchWord, fetchedShowLikeCategory]);

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
