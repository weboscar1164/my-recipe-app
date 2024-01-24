import { css } from "@emotion/react";

export const styles = {
	hideHeader: css`
		transform: translateY(-75px);
	`,
	upNav: css`
		transform: translateY(-20px);
	`,
	activeLike: css`
		color: rgb(255, 242, 0);
	`,
	inActiveLike: css`
		color: #999;
	`,
	activeNavigation: css`
		transform: translateX(0) rotate3d(0, 1, 0, 0);
	`,
	navigationButtonActive: css`
		transform: translateY(-53px);
	`,
	authErrorMessageActive: css`
		display: block;
	`,
};
