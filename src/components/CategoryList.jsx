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
		const categoryNumber = getRankingCategoryNumber(category, categoryType);
		const getUrlCategory = {
			...category,
			categoryNumber: categoryNumber,
			categoryType: categoryType,
		};
		console.log(getUrlCategory);
		setCurrentCategory(getUrlCategory);
		setSearchWord("");
	};

	const renderContent = () => {
		if (isEmpty(showCategory)) {
			return <p className="none-list">検索スペースに入力してください。</p>;
		} else {
			return Object.keys(showCategory).map((categoryType) => {
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
			});
		}
	};

	return (
		<div className="container app-category-container">
			<ul>{renderContent()}</ul>
		</div>
	);
};

export default CategoryList;
