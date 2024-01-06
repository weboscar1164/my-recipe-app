import React from "react";

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
			return <h2>検索スペースに入力してください。</h2>;
		} else {
			return Object.keys(showCategory).map((categoryType) => {
				return showCategory[categoryType].map((category) => {
					return (
						<li
							className="app-category-list-card"
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
		<div className="app-category-list-container">
			<ul>{renderContent()}</ul>
		</div>
	);
};

export default CategoryList;
