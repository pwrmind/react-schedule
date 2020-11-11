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

	public element = document.createElement( 'div' );

	componentDidMount() {
		if (modalRoot === null) {
			return;
		}
		modalRoot.appendChild(this.element);
	}

	componentWillUnmount() {
		if (modalRoot === null) {
			return;
		}
		modalRoot.removeChild(this.element);
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
				this.element
			)
		);
	}
}
