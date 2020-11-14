import React, { Component } from 'react';
import { IColumn, IAppointment } from "../Calendar";

import './ScheduleList.scss';

interface ScheduleListProps {
	column: IColumn;
}

export default class ScheduleList extends Component<ScheduleListProps> {
	public contentREF: HTMLDivElement | null = null;
	public childrenREF: HTMLDivElement | null = null;

	public state = {
		isShow: true,
		isOverShow: false
	};

	public heights = {
		scrollTop: 0,
		headerHeight: 0,
		parentHeight: 0,
		contentHeight: 0,
		childrenHeight: 0
	};

	public handleScroll = (e: any) => {
		if (e.srcElement.dataset.scroll) {
			this.heights.scrollTop = e.srcElement.scrollTop;
			if (this.state.isOverShow) {
				this.setState({isOverShow: false});
			}
			this.checkShow();
		}
	};

	public checkShow = () => {
		if (this.heights.headerHeight) {
			if (this.heights.headerHeight - this.heights.parentHeight < 5) {
				if (this.heights.scrollTop >= this.heights.childrenHeight/2) {
					if (this.state.isShow) {
						this.setState({isShow: false});
					}
					this.heights.contentHeight = 0;
				}
			}
			this.setHeaderHeight();
		}
	};

	public setHeaderHeight = () => {
		if (this.contentREF === null || this.contentREF.parentElement === null) {
			return;
		}

		const parentRect = this.contentREF.parentElement.getBoundingClientRect();

		if (!this.state.isOverShow) {
			this.heights.headerHeight = parentRect.height;
		}

	};

	public setHeights = () => {
		if (this.childrenREF === null || this.contentREF === null || this.contentREF.parentElement === null) {
			return;
		}

		this.setHeaderHeight();

		const contentRect = this.contentREF.getBoundingClientRect(),
			parent = this.contentREF.parentElement,
			childrenRect = this.childrenREF.getBoundingClientRect();

		let parentHeight = 0;

		for (let i = 0; i < parent.children.length; i += 1) {
			parentHeight += parent.children[i].getBoundingClientRect().height;
		}

		if (!this.heights.parentHeight) {
			this.heights.parentHeight = parentHeight;
		}

		if (!this.heights.contentHeight) {
			this.heights.contentHeight = contentRect.height;
		}

		if (!this.heights.childrenHeight) {
			this.heights.childrenHeight = childrenRect.height;
		}
	};

	public overShow = () => {
		this.setState({isOverShow: true});
	};

	public componentDidMount() {
		window.addEventListener('scroll', this.handleScroll, true);
		this.setHeights()
	}

	public componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll, true);
	}
	
	render() {
		return (
			<div className="schedule-list__wrapper" ref={el => (this.contentREF = el)}>
				{this.state.isShow || this.state.isOverShow ?
					<div className={"schedule-list__container" + (this.state.isOverShow ? ' absolute' : '')}>
						<div className="schedule-list__header">{this.props.column.scheduleStart}-{this.props.column.scheduleEnd}</div>
						{this.props.column.appointment.length ?
							<div className={"schedule-list__body"} ref={el => (this.childrenREF = el)}>
								{this.props.column.appointment.map((appointment:IAppointment, index:number) => (
										<div key={index}>{appointment.desc} ({appointment.timeStart}-{appointment.timeEnd})
										</div>
								))}
							</div> :
							null
						}
					</div> :
					<div className="schedule-list__container">
						<div className="schedule-list__header underline" onClick={this.overShow}>‣ Врач работает</div>
					</div>
				}
			</div>
		)
	}
}