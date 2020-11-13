import React, { Component } from 'react';
import { createPortal } from "react-dom";
import './Tooltip.scss';

interface TooltipProps {
	delay: number;
	disabled: boolean;
	content: string;
}

export default class Tooltip extends Component<TooltipProps> {
	static defaultProps: TooltipProps = {
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
	public contentREF: HTMLDivElement | null = null;

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
		if (this.childrenREF === null || this.contentREF === null) {
			return {x: 0, y: 0};
		}

		const childrenRect: DOMRect = this.childrenREF.getBoundingClientRect(),
			contentRect: DOMRect = this.contentREF.getBoundingClientRect(),
			x: number = Math.round(childrenRect.x - ((contentRect.width / 2) - (childrenRect.width / 2))),
			y: number = Math.round(childrenRect.y - contentRect.height - 6);

		// console.log('onMouseEnter', this.contentREF, contentRect);
		// console.log('onMouseEnter', this.childrenREF, childrenRect);

		return {x, y};
	}

	public show = () => {
		if (this.props.disabled) {
			return;
		}

		this.timer = setTimeout(() => {
			this.setPositions(this.calcPosition.x, this.calcPosition.y);
			this.setVisibility(true);
		}, this.props.delay);
	}
	
	public hide = () => {
		clearInterval(this.timer);
		this.setVisibility(false);
	}

	public handleScroll = () => {
		if (!this.state.isShow) {
			return;
		}

		this.hide();
	}

	public componentDidMount() {
		window.addEventListener('scroll', this.handleScroll, true);
	}

	public componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll, true);
	}

	render() {
		const children: any = React.Children.only(this.props.children);
		return (
			<>
				{React.cloneElement(children, {
					ref: (el: any) => this.childrenREF = el,
					onMouseEnter: this.show,
					onMouseLeave: this.hide,
				})}

				{createPortal(
					<div
						ref={el => (this.contentREF = el)}
						style={{transform: `translate3d(${this.state.positionX}px, ${this.state.positionY}px, 0)`}}
						className={`tooltip__content tooltip__content--top ${!this.state.isShow && 'tooltip__content--hidden'}`}
					>
						{ this.props.content }
					</div>,
					document.body
				)}
			</>
		);
	}
}
