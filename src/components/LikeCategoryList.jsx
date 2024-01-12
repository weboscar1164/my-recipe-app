/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import "./CategoryList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { auth } from "../firebase.config";
import { styles } from "../utils/Styled";
import { isEmpty } from "../utils/helpers";
import {
	getIsCategoryLike,
	useAddCategoryLike,
	useRemoveCategoryLike,
} from "../utils/likes";

const LikeCategoryList = ({
	showLikeCategory,
	setSearchWord,
	setCurrentCategory,
	getRankingCategoryNumber,
	handleOpenModal,
}) => {
	const [isLike, setIsLike] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			// 表示するCategoryリストをアカウント内のお気に入りリストと照合してisLikeに格納
			const likes = await Promise.all(
				Object.keys(showLikeCategory).flatMap((categoryType) =>
					showLikeCategory[categoryType].map(async (category) => ({
						category,
						categoryType,
						isLike: await getIsCategoryLike(category, categoryType),
					}))
				)
			);
			setIsLike(likes);
		};
		fetchData();
	}, [showLikeCategory]);

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

	const onCategoryDeleteHandler = async (category, categoryType) => {
		await useRemoveCategoryLike(category, categoryType);
		const updatedLikeList = Object.keys(showLikeCategory).map(
			(categoryType) => {
				return showLikeCategory[_categoryType].map((category) => {});
			}
		);
	};

	const renderContent = () => {
		if (isEmpty(showLikeCategory) || !showLikeCategory) {
			return (
				<>
					<h2>お気に入り一覧</h2>
					<p className="none-list">登録されたお気に入りはありません。</p>
				</>
			);
		} else {
			return (
				<>
					<h2>お気に入り一覧</h2>
					<ul>
						{Object.keys(showLikeCategory).map((categoryType) => {
							return showLikeCategory[categoryType].map((category) => {
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
												onCategoryDeleteHandler(category, categoryType);
											}}
										>
											<FontAwesomeIcon
												className="app-category-icon "
												icon={faTrash}
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

export default LikeCategoryList;
