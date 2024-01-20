import "./CategoryList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { isEmpty } from "../utils/helpers";
import { useRemoveCategoryLike } from "../utils/handleData";

const LikeCategoryList = ({
	showLikeCategory,
	setShowLikeCategory,
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

	const onCategoryDeleteHandler = async (category, categoryType) => {
		try {
			const updatedLikeCategory = { ...showLikeCategory };
			updatedLikeCategory[categoryType] = updatedLikeCategory[
				categoryType
			].filter(
				(categoryItem) => categoryItem.categoryId !== category.categoryId
			);

			// もし updatedLikeCategory がすべてのカテゴリが空であれば、空のオブジェクトに設定
			if (
				Object.values(updatedLikeCategory).every(
					(categoryArray) => categoryArray.length === 0
				)
			) {
				setShowLikeCategory({});
			} else {
				setShowLikeCategory(updatedLikeCategory);
			}

			// Firestore からの削除
			useRemoveCategoryLike(category, categoryType);
		} catch (error) {
			console.error("お気に入りリストを削除できませんでした。:", error);
		}
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
