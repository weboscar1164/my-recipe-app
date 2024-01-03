import React from "react";
const onEditSerch = (value) => {
	setSerchWord(value);
};
const CategoryList = ({ loading, allCategory }) => {
	return (
		<div className="app-category-list-container">
			<input type="text" onChange={(e) => onEditSerch(e.target.value)} />
			{loading ? (
				<h2>ロード中...</h2>
			) : (
				allCategory.map((category) => {
					return (
						<div>
							<a href={category.categoryUrl}>{category.categoryName}</a>
						</div>
					);
				})
			)}
		</div>
	);
};

export default CategoryList;
