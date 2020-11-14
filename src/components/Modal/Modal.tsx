import React, { Component } from 'react';
import { createPortal } from 'react-dom';

import './Modal.scss';

const modalRoot = document.getElementById('modal-root');

interface ModalProps {
	isShow: boolean;
	close?: Function;
}

export default class Modal extends Component<ModalProps> {
	static defaultProps: ModalProps = {
		isShow: false,
	}

	public hide = () => {
		if (this.props.close !== undefined) {
			this.props.close();
		}
	}

	render() {
		return (
			this.props.isShow &&
			createPortal(
				<div
					className="modal__root"
					onClick={this.hide}
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
