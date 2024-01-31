import React from "react";
import "./RankingList.css";

const RankingList = ({ rankingLoading, currentCategory, rankingList }) => {
	return (
		<>
			{rankingLoading ? (
				<h2 className="app-lanking-loading">ロード中...</h2>
			) : (
				<div className="container app-ranking-container">
					<h2 className="app-ranking-title">{currentCategory.categoryName}</h2>
					<ul>
						{rankingList.map((item) => (
							<li key={item.recipeId} className="app-ranking-card">
								<a
									href={item.recipeUrl}
									target="_blank"
									rel="noopener noreferrer"
								>
									<h3>{item.recipeTitle}</h3>
									<p className="app-ranking-card-img">
										<img src={item.foodImageUrl} alt="" />
									</p>
								</a>
							</li>
						))}
					</ul>
					<div className="app-ranking-link">
						<a
							href={currentCategory.categoryUrl}
							target="_blank"
							rel="noopener noreferrer"
						>
							楽天レシピでもっと見る
						</a>
					</div>
				</div>
			)}
		</>
	);
};

export default RankingList;
