import React from "react";

const CategoryList = ({ loading, showCategory, setSerchWord }) => {
	const onEditSerch = (value) => {
		setSerchWord(value);
		console.log(value);
	};

	const renderContent = () => {
		if (
			showCategory.length == 0
			// Object.keys(showCategory.large).length == 0 &&
			// Object.keys(showCategory.medium).length == 0 &&
			// Object.keys(showCategory.small).length == 0
		) {
			return <h1>検索スペースに入力してください。</h1>;
		} else {
			return showCategory.map((category) => {
				return (
					<div className="app-category-list-card" key={category.categoryName}>
						<h3>{category.categoryName}</h3>
					</div>
				);
			});
		}
	};

	return (
		<div className="app-category-list-container">
			<input type="text" onChange={(e) => onEditSerch(e.target.value)} />
			{renderContent()}
		</div>
	);
};

export default CategoryList;
