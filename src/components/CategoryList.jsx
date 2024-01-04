import React from "react";

const CategoryList = ({
	showCategory,
	setSearchWord,
	setCurrentCategory,
	getRankingCategoryNumber,
}) => {
	const onEditSerch = (value) => {
		setSearchWord(value);
		// console.log(value);
	};

	const onCategoryClickHandler = (category) => {
		const categoryNumber = getRankingCategoryNumber(category);
		const getUrlCategory = { ...category, categoryNumber: categoryNumber };
		setCurrentCategory(getUrlCategory);
	};

	const renderContent = () => {
		if (showCategory.length == 0) {
			return <h2>検索スペースに入力してください。</h2>;
		} else {
			return showCategory.map((category) => {
				return (
					<li
						className="app-category-list-card"
						key={category.categoryId}
						onClick={() => onCategoryClickHandler(category)}
					>
						<h3>{category.categoryName}</h3>
					</li>
				);
			});
		}
	};

	return (
		<div className="app-category-list-container">
			<input type="text" onChange={(e) => onEditSerch(e.target.value)} />
			<ul>{renderContent()}</ul>
		</div>
	);
};

export default CategoryList;
