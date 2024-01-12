// オブジェクトが空かどうか判定
export const isEmpty = (obj) => {
	if (!obj) {
		return false;
	}
	return Object.keys(obj).length === 0;
};
