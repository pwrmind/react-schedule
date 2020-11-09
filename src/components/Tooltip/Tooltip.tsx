import React, { Component } from 'react';
import './Tooltip.scss';

interface TooltipProps {
	disabled: boolean;
	content: string;
}

export default class Tooltip extends Component<TooltipProps> {
	static defaultProps: TooltipProps = {
		disabled: false,
		content: 'Tooltip content',
	}
	
	public state = {
		isShow: false,
	}
	
	public show = () => {
		if (this.props.disabled) {
			return;
		}

		this.setVisibility(true);
	}
	
	public hide = () => {
		if (this.props.disabled) {
			return;
		}

		this.setVisibility(false);
	}
	
	public setVisibility = (isShow: boolean) => {
		this.setState({isShow});
	}

	render() {
		const { isShow } = this.state,
			{ children, content } = this.props;

		return (
			<div
				className="tooltip__root"
				onMouseEnter={this.show}
				onMouseLeave={this.hide}
			>
				{ children }

				{ isShow ? (
					<div className="tooltip__content tooltip__content--top">
						{ content }
					</div>
				): null }
			</div>
		);
	}
}
