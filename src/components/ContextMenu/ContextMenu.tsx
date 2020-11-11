import React, { Component } from 'react';
import { createPortal } from "react-dom";
import './ContextMenu.scss';

const modalRoot = document.getElementById('modal-root');

interface ContextMenuProps {
	delay: number;
	disabled: boolean;
	content: any;
}

export default class ContextMenu extends Component<ContextMenuProps> {
	static defaultProps: ContextMenuProps = {
		delay: 400,
		disabled: false,
		content: 'Content',
	}

	public state = {
		isShow: false,
		positionX: 0,
		positionY: 0
	}

	public timer: any;
	public childrenREF: HTMLDivElement | null = null;

	public setPositions = (positionX: number, positionY: number) => {
		this.setState({
			positionX,
			positionY
		});
	}

	public setVisibility = (isShow: boolean) => {
		this.setState({isShow});
	}

	public get calcPosition(): {x: number, y: number} {
		if (this.childrenREF === null) {
			return {x: 0, y: 0};
		}

		const childrenRect: DOMRect = this.childrenREF.getBoundingClientRect(),
			x: number = Math.round(childrenRect.x),
			y: number = Math.round(childrenRect.y);

		return {x, y};
	}

	public show = (e: MouseEvent) => {
		e.stopPropagation();
		if (this.props.disabled) {
			return;
		}

		this.timer = setTimeout(() => {
			this.setPositions(this.calcPosition.x, this.calcPosition.y);
			this.setVisibility(true);
		}, this.props.delay);
	}
	
	public hide = (e: MouseEvent) => {
		e.stopPropagation();
		clearInterval(this.timer);
		this.setVisibility(false);
	}

	render() {
		const children: any = React.Children.only(this.props.children);
		return (
			<>
				{React.cloneElement(children, {
					ref: ((el: any) => this.childrenREF = el),
					onClick: ((e: any) => {this.show(e)})
				})}

				{this.state.isShow && createPortal(
					<div
						className="context-menu__popup"
						onClick={(e: any) => {this.hide(e)}}
					>
						<div
							className="context-menu__content"
							style={{transform: `translate3d(${this.state.positionX}px, ${this.state.positionY}px, 0)`}}
						>
							{ this.props.content }
						</div>
					</div>,
					modalRoot || document.body
				)}
			</>
		);
	}
}
