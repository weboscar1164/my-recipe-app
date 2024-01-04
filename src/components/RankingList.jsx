import React from "react";

const RankingList = ({ currentCategory, rankingList }) => {
	return (
		<div>
			<h2>{currentCategory.categoryName}</h2>
			<ul>
				{rankingList.map((item) => (
					<li key={item.recipeId}>
						<h3>{item.recipeTitle}</h3>
					</li>
				))}
			</ul>
		</div>
	);
};

export default RankingList;
