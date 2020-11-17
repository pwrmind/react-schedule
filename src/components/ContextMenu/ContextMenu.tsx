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
		hidden: true,
		positionX: 0,
		positionY: 0
	}

	public timer: any;
	public childrenREF: HTMLDivElement | null = null;
	public contentREF: HTMLDivElement | null = null;

	public setPositions = (positionX: number, positionY: number) => {
		this.setState({
			positionX,
			positionY,
			hidden: false
		});
	}

	public setVisibility = (isShow: boolean) => {
		this.setState({isShow});
	}

	public get calcPosition(): {x: number, y: number} {
		if (this.childrenREF === null || this.contentREF === null) {
			return {x: 0, y: 0};
		}

		const childrenRect: DOMRect = this.childrenREF.getBoundingClientRect(),
			contentRect: DOMRect = this.contentREF.getBoundingClientRect();
		let x: number = Math.round(childrenRect.x);
		let y: number = Math.round(childrenRect.y);

		if (childrenRect.y + contentRect.height > window.innerHeight) {
			const diff = childrenRect.y + contentRect.height - window.innerHeight;
			y = Math.round(childrenRect.y - diff);
		}

		return {x, y};
	}

	public show = (e: MouseEvent) => {
		e.stopPropagation();
		if (this.props.disabled) {
			return;
		}

		this.setVisibility(true);
		this.timer = setTimeout(() => {
			this.setPositions(this.calcPosition.x, this.calcPosition.y);
		}, this.props.delay);
	}
	
	public hide = () => {
		clearInterval(this.timer);
		this.setVisibility(false);
		this.setState({hidden: true})
	}

	render() {
		const children: any = React.Children.only(this.props.children);
		const content: any = React.Children.only(this.props.content);
		return (
			<>
				{React.cloneElement(children, {
					ref: ((el: any) => this.childrenREF = el),
					onClick: ((e: any) => {this.show(e)}),
					...children.props,
				})}

				{this.state.isShow && createPortal(
					<div
						className="context-menu__popup"
						onClick={this.hide}
					>
						<div
							className={`context-menu__container ${this.state.hidden && 'context-menu__container--hide'}`}
							ref={el => (this.contentREF = el)}
							style={{transform: `translate3d(${this.state.positionX}px, ${this.state.positionY}px, 0)`}}
						>
							{React.cloneElement(content, {
								close: (() => this.hide())
							})}
						</div>
					</div>,
					modalRoot || document.body
				)}
			</>
		);
	}
}
