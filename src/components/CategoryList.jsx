import React from "react";
import "./CategoryList.css";

const CategoryList = ({
	isEmpty,
	showCategory,
	setSearchWord,
	setCurrentCategory,
	getRankingCategoryNumber,
}) => {
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

	const renderContent = () => {
		if (isEmpty(showCategory)) {
			return <p className="none-list">検索スペースに入力してください。</p>;
		} else {
			return (
				<ul>
					{Object.keys(showCategory).map((categoryType) => {
						return showCategory[categoryType].map((category) => {
							return (
								<li
									className="app-category-card"
									key={category.categoryId}
									onClick={() => onCategoryClickHandler(category, categoryType)}
								>
									<h3>{category.categoryName}</h3>
								</li>
							);
						});
					})}
				</ul>
			);
		}
	};

	return (
		<div className="container app-category-container">{renderContent()}</div>
	);
};

export default CategoryList;
