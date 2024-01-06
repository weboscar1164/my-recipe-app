import React from "react";

const Header = ({ searchWord, setSearchWord, setCurrentCategory }) => {
	const onEditSerch = (value) => {
		setSearchWord(value);
		// console.log(value);
		setCurrentCategory({});
	};
	return (
		<div>
			<small>楽天レシピ検索を簡単に！</small>
			<h1>R-Recipeeee!</h1>
			<input
				type="text"
				onChange={(e) => onEditSerch(e.target.value)}
				placeholder="検索カテゴリ候補を入力してください"
				value={searchWord}
			/>
		</div>
	);
};

export default Header;
