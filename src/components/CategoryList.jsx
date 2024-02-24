import { useEffect, useState } from "react";
import "./CategoryList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../firebase.config";
import { collection, onSnapshot } from "firebase/firestore";
import { isEmpty } from "../utils/helpers";
import {
	getIsCategoryLike,
	getCategoryLikeList,
	useAddCategoryLike,
	useRemoveCategoryLike,
} from "../utils/useHandleData";
import { usePopUpContext } from "../utils/usePopUp";
import { useErrorState } from "../utils/useErrorState";

const CategoryList = ({
	showCategory,
	setSearchWord,
	setCurrentCategory,
	getRankingCategoryNumber,
	handleOpenModal,
	currentAutherLikeList,
	setCurrentAutherLikeList,
}) => {
	const [isLike, setIsLike] = useState([]);
	const [currentItem, setCurrentitem] = useState({});
	const navigate = useNavigate();
	const { setIsPopUp } = usePopUpContext();
	const { setErrorState } = useErrorState();

	useEffect(() => {
		const fetchData = async () => {
			// 表示するCategoryリストをアカウント内のお気に入りリストと照合してisLikeに格納
			const likes = await Promise.all(
				Object.keys(showCategory).flatMap((categoryType) =>
					showCategory[categoryType].map(async (category) => ({
						category,
						categoryType,
						firebaseId: await getIsCategoryLike(
							category,
							categoryType,
							currentAutherLikeList
						),
					}))
				)
			);
			setIsLike(likes);
			console.log(likes);
		};
		fetchData();
		// console.log(currentAutherLikeList);
		console.log(showCategory);
	}, [showCategory, currentAutherLikeList]);

	useEffect(() => {
		// firebase内の更新を確認してからユーザーのお気に入りを更新する
		const unsubscribe = onSnapshot(
			collection(db, "likeCategory"),
			async (snapshot) => {
				// console.log("changed");
				const fetchedData = await getCategoryLikeList();

				setCurrentAutherLikeList(fetchedData);
				console.log(fetchedData);
			}
		);
		const currentItemFirebaseId = currentAutherLikeList.map((fetchedItem) => {
			if (
				fetchedItem.categoryType === currentItem.categoryType &&
				fetchedItem.categoryId === currentItem.category.categoryId
			) {
				return fetchedItem.id;
			}
		});
		setIsLike((prevIsLike) =>
			prevIsLike.map((_item) =>
				_item.categoryType === currentItem.categoryType &&
				_item.category.categoryId === currentItem.category.categoryId
					? { ..._item, firebaseId: currentItemFirebaseId }
					: _item
			)
		);
		return () => unsubscribe();
	}, [currentItem]);

	const onCategoryClickHandler = (category, categoryType) => {
		// 楽天レシピランキングAPIのURL生成用カテゴリ番号を付与
		const categoryNumber = getRankingCategoryNumber(category, categoryType);
		const getUrlCategory = {
			...category,
			categoryNumber: categoryNumber,
		};
		setCurrentCategory(getUrlCategory);
		setSearchWord("");
	};

	const onCategoryLikeHandler = async (item) => {
		setCurrentitem(item);
		// お気に入り追加・削除の切り替え
		if (!auth.currentUser) {
			handleOpenModal();
			return;
		}

		let updatedIsLike;
		if (item.firebaseId) {
			updatedIsLike = item.firebaseId;
		} else {
			updatedIsLike = false;
		}

		console.log("clicked");
		try {
			if (!updatedIsLike) {
				await useAddCategoryLike(item.category, item.categoryType);
				setIsPopUp("addlike");
			} else {
				await useRemoveCategoryLike(item);
				setIsPopUp("removelike");
			}
		} catch (error) {
			setErrorState(error.code);
			navigate("/error");
		}
	};

	const renderContent = () => {
		if (isEmpty(showCategory)) {
			return (
				<>
					<h2>カテゴリ一覧</h2>
					<p className="none-list"> 検索スペースに入力してください。</p>
				</>
			);
		} else {
			return (
				<>
					<h2>カテゴリ一覧</h2>
					<ul>
						{isLike.map((item) => {
							return (
								<li
									className="app-category-card"
									key={item.category.categoryId}
								>
									<h3
										onClick={(e) => {
											e.stopPropagation();
											onCategoryClickHandler(item.category, item.categoryType);
										}}
									>
										{item.category.categoryName}
									</h3>
									<div
										className="app-category-like"
										onClick={(e) => {
											e.stopPropagation();
											onCategoryLikeHandler(item);
										}}
									>
										<FontAwesomeIcon
											className={`app-category-icon ${
												item.firebaseId
													? "app-category-icon-active"
													: "app-category-icon-inactive"
											}`}
											icon={faStar}
										/>
									</div>
								</li>
							);
						})}
					</ul>
				</>
			);
		}
	};

	return (
		<div className="container app-category-container">{renderContent()}</div>
	);
};

export default CategoryList;
