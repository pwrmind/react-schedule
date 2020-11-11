import React, { Component } from 'react';
import { createPortal } from 'react-dom';

import './Modal.scss';

const modalRoot = document.getElementById('modal-root');

interface ModalProps {
	isShow: boolean;
}

export default class Modal extends Component<ModalProps> {
	static defaultProps: ModalProps = {
		isShow: false,
	}

	render() {
		return (
			this.props.isShow &&
			createPortal(
				<div
					className="modal__root"
				>
					<div
						className="modal__wrapper"
					>
						{this.props.children}
					</div>
				</div>,
				modalRoot || document.body
			)
		);
	}
}
