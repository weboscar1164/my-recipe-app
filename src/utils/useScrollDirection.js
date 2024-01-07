import { useEffect, useState } from "react";

export const useScrollDirection = () => {
	const [direction, setDirection] = useState("up");
	let beforeScrollPosition = 0,
		nowScrollPosition = 0;

	// スクロール方向を検知する処理
	const handleScroll = () => {
		nowScrollPosition = document.documentElement.scrollTop;

		if (beforeScrollPosition === nowScrollPosition) return;
		if (beforeScrollPosition < nowScrollPosition) {
			setDirection("down");
		} else {
			setDirection("up");
		}

		beforeScrollPosition = nowScrollPosition;
	};

	// スクロールイベントを追加
	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return {
		direction,
	};
};
