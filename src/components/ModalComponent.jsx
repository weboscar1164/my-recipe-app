import React from "react";
import Modal from "react-modal";
import "./ModalComponent.css";
import { useNavigate } from "react-router-dom";

const customStyles = {
	// react-modal仕様で、overlay,contentで括られる
	overlay: {
		zIndex: 100,
	},
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
		boxShadow: "0px 5px 15px 0px rgba(0, 0, 0, 0.15)",
	},
};
const ModalComponent = ({ isOpen, handleCloseModal }) => {
	const navigate = useNavigate();

	const onLogin = () => {
		navigate("/signin");
		handleCloseModal();
	};
	return (
		<Modal isOpen={isOpen} style={customStyles}>
			<p className="modal-text">
				お気に入り機能を使用するには、
				<br />
				ログインしてください。
			</p>
			<div className="modal-button-wrapper">
				<button
					className="modal-button modal-button-close"
					onClick={() => handleCloseModal()}
				>
					キャンセル
				</button>
				<button className="modal-button modal-button-action" onClick={onLogin}>
					ログイン
				</button>
			</div>
		</Modal>
	);
};

export default ModalComponent;
