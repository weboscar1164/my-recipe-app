/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import "./CategoryList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase.config";
import { styles } from "../utils/Styled";
import { isEmpty } from "../utils/helpers";
import {
	getIsCategoryLike,
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
}) => {
	const [isLike, setIsLike] = useState([]);
	const navigate = useNavigate();
	const { isPopUp, setIsPopUp } = usePopUpContext();
	const { setErrorState } = useErrorState();

	useEffect(() => {
		const fetchData = async () => {
			// 表示するCategoryリストをアカウント内のお気に入りリストと照合してisLikeに格納
			const likes = await Promise.all(
				Object.keys(showCategory).flatMap((categoryType) =>
					showCategory[categoryType].map(async (category) => ({
						category,
						categoryType,
						isLike: await getIsCategoryLike(category, categoryType),
					}))
				)
			);
			setIsLike(likes);
		};
		fetchData();
	}, [showCategory, isPopUp]);

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

	const onCategoryLikeHandler = async (category, categoryType) => {
		if (!auth.currentUser) {
			handleOpenModal();
			return;
		}
		const currentIsLike = await getIsCategoryLike(category, categoryType);
		if (currentIsLike) {
			try {
				await useRemoveCategoryLike(category, categoryType);
				setIsPopUp("removelike");
			} catch (error) {
				setErrorState(error.code);
				navigate("/error");
			}
		} else {
			try {
				await useAddCategoryLike(category, categoryType);
				setIsPopUp("addlike");
			} catch (error) {
				setErrorState(error.code);
				navigate("/error");
			}
		}
		// 更新されたいいね状態を取得
		const updatedIsLike = await getIsCategoryLike(category, categoryType);
		// 現在の状態をコピーして、該当する要素を更新
		setIsLike((prevIsLike) =>
			prevIsLike.map((item) =>
				item.categoryType === categoryType &&
				item.category.categoryId === category.categoryId
					? { ...item, isLike: updatedIsLike }
					: item
			)
		);
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
						{Object.keys(showCategory).map((categoryType) => {
							return showCategory[categoryType].map((category) => {
								const likeData = isLike.find(
									(item) =>
										item.categoryType === categoryType &&
										item.category.categoryId === category.categoryId
								);
								return (
									<li className="app-category-card" key={category.categoryId}>
										<h3
											onClick={(e) => {
												e.stopPropagation();
												onCategoryClickHandler(category, categoryType);
											}}
										>
											{category.categoryName}
										</h3>
										<div
											className="app-category-like"
											onClick={(e) => {
												e.stopPropagation();
												onCategoryLikeHandler(category, categoryType);
											}}
										>
											<FontAwesomeIcon
												className="app-category-icon "
												css={[likeData?.isLike && styles.activeLike]}
												icon={faStar}
											/>
										</div>
									</li>
								);
							});
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
