import {
	addDoc,
	getDocs,
	deleteDoc,
	collection,
	serverTimestamp,
	query,
	where,
} from "firebase/firestore";
import useErrorState from "./useErrorState";
import { db, auth } from "../firebase.config";
import { v4 as uuidv4 } from "uuid";
import { FirebaseError } from "firebase/app";
import { useNavigate } from "react-router-dom";

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
	// const navigate = useNavigate();
	// const { setError } = useErrorState();
	try {
		throw new FirebaseError("simulated-firebase-error", {
			code: "simulated-firebase-error1",
			message: "Simulated Firebase error message.",
		});

		const id = uuidv4();
		await addDoc(collection(db, "likeCategory"), {
			id: id,
			userId: auth.currentUser.uid,
			categoryId: category.categoryId,
			categoryType: categoryType,
			updateAt: serverTimestamp(),
		});
	} catch (error) {
		// 	setError("Failed to add category like");
		// 	navigate("/error");
		// alert(error);
		console.log(error);
	}
};

export const useRemoveCategoryLike = async (category, categoryType) => {
	const q = query(
		collection(db, "likeCategory"),
		where("userId", "==", auth.currentUser.uid),
		where("categoryId", "==", category.categoryId),
		where("categoryType", "==", categoryType)
	);
	const querySnapshot = await getDocs(q);
	querySnapshot.forEach((doc) => {
		const docRef = doc.ref;
		deleteDoc(docRef);
	});
};

export const getIsCategoryLike = async (category, categoryType) => {
	if (!auth.currentUser) {
		return false;
	} else {
		const q = query(
			collection(db, "likeCategory"),
			where("userId", "==", auth.currentUser.uid),
			where("categoryId", "==", category.categoryId),
			where("categoryType", "==", categoryType)
		);
		const querySnapshot = await getDocs(q);
		return !querySnapshot.empty;
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
