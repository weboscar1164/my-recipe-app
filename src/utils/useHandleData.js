import {
	addDoc,
	getDocs,
	deleteDoc,
	collection,
	serverTimestamp,
	query,
	where,
} from "firebase/firestore";
import { db, auth } from "../firebase.config";
import { v4 as uuidv4 } from "uuid";

// serchData
export const useGetSerchCategory = (targetCategoryList, searchWord) => {
	const getSerchSelectedCategory = (searchWord, categoryName) => {
		return new RegExp(searchWord).test(categoryName);
	};
	const selectedLargeCategory = targetCategoryList.large.filter((category) => {
		return getSerchSelectedCategory(searchWord, category.categoryName);
	});
	const selectedMediumCategory = targetCategoryList.medium.filter(
		(category) => {
			return getSerchSelectedCategory(searchWord, category.categoryName);
		}
	);
	const selectedSmallCategory = targetCategoryList.small.filter((category) => {
		return getSerchSelectedCategory(searchWord, category.categoryName);
	});

	// カテゴリ名の重複を削除
	const getUniqueCategory = (targetSelectedCategory, useSelectedCategory) => {
		return targetSelectedCategory.filter(
			(targetCategory) =>
				!useSelectedCategory.some(
					(useCategory) =>
						targetCategory.categoryName === useCategory.categoryName
				)
		);
	};

	const uniqueMediumCategory = getUniqueCategory(
		selectedMediumCategory,
		selectedSmallCategory
	);
	const uniqueLargeCategory = getUniqueCategory(
		selectedLargeCategory,
		selectedMediumCategory
	);

	const selectedCategory = {
		large: uniqueLargeCategory,
		medium: uniqueMediumCategory,
		small: selectedSmallCategory,
	};

	return selectedCategory;
};

// likes
export const useAddCategoryLike = async (category, categoryType) => {
	const id = uuidv4();
	await addDoc(collection(db, "likeCategory"), {
		id: id,
		userId: auth.currentUser.uid,
		categoryId: category.categoryId,
		categoryType: categoryType,
		updateAt: serverTimestamp(),
	});
};

export const useRemoveCategoryLike = async (category) => {
	const q = query(
		collection(db, "likeCategory"),

		where("id", "==", category.firebaseId)
	);
	const querySnapshot = await getDocs(q);
	querySnapshot.forEach((doc) => {
		const docRef = doc.ref;
		deleteDoc(docRef);
	});
};

export const getIsCategoryLike = async (category, categoryType, likeList) => {
	if (!auth.currentUser) {
		return false;
	} else {
		const foundObject = likeList.find(
			(obj) =>
				obj.categoryId === category.categoryId &&
				obj.categoryType === categoryType
		);
		if (foundObject !== undefined) {
			return foundObject.id;
		} else {
			return false;
		}
	}
};

export const getCategoryLikeList = async () => {
	if (!auth.currentUser) {
		return false;
	} else {
		const q = query(
			collection(db, "likeCategory"),
			where("userId", "==", auth.currentUser.uid)
		);
		const querySnapshot = await getDocs(q);

		return querySnapshot.docs.map((doc) => ({
			...doc.data(),
		}));
	}
};
