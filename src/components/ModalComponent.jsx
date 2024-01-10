import React from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

const customStyles = {
	content: {
		top: "30%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
		minWidth: "40%",
		background: "#fae4a7",
		border: "none",
		zIndex: "999",
	},
};
const ModalComponent = ({ isOpen, handleCloseModal }) => {
	const navigate = useNavigate();

	const onLogin = () => {
		navigate("/signin");
	};
	return (
		<Modal isOpen={isOpen} style={customStyles}>
			<p>
				お気に入り機能を使用するには、
				<br />
				ログインしてください。
			</p>
			<button onClick={() => handleCloseModal()}>キャンセル</button>
			<button onClick={onLogin}>ログイン</button>
		</Modal>
	);
};

export default ModalComponent;
