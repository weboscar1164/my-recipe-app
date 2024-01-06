import React from "react";
const RankingList = ({ loading, currentCategory, rankingList }) => {
	return (
		<>
			{loading ? (
				<h2>ロード中...</h2>
			) : (
				<div>
					<h2>{currentCategory.categoryName}</h2>
					<ul>
						{rankingList.map((item) => (
							<li key={item.recipeId}>
								<a
									href={item.recipeUrl}
									target="_blank"
									rel="noopener noreferrer"
								>
									<h3>{item.recipeTitle}</h3>
								</a>
								<img src={item.mediumImageUrl} alt="" />
							</li>
						))}
					</ul>
					<a
						href={currentCategory.categoryUrl}
						target="_blank"
						rel="noopener noreferrer"
					>
						楽天レシピでもっと見る
					</a>
				</div>
			)}
		</>
	);
};

export default RankingList;
