import {
	addDoc,
	getDocs,
	collection,
	serverTimestamp,
	query,
	where,
} from "firebase/firestore";
import { db, auth } from "../firebase.config";
import { v4 as uuidv4 } from "uuid";

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

export const getIsCategoryLike = async (category, categoryType) => {
	const q = query(
		collection(db, "likeCategory"),
		where("userId", "==", auth.currentUser.uid),
		where("categoryId", "==", category.categoryId),
		where("categoryType", "==", categoryType)
	);
	const querySnapshot = await getDocs(q);
	return !querySnapshot.empty;
};
