import React, { Component } from 'react';
import { dateFormatter } from 'services/formatter';

import DatePicker from 'components/DatePicker/DatePicker';
import Tooltip from 'components/Tooltip/Tooltip';

import { IResource } from 'api/data/resources';
import { ISchedule } from 'api/data/schedules';

import './DateAppointment.scss';

interface DateAppointmentProps {
	schedules: Array<ISchedule>;
	selectResource: Array<IResource>;
	date: Date | null;
	setDate: Function;
}

export default class DateAppointment extends Component<DateAppointmentProps> {
	static defaultProps: DateAppointmentProps = {
		schedules: [],
		selectResource: [],
		date: null,
		setDate: Function.prototype
	};

	public state = {
		schedules: this.props.schedules,
		selectResource: this.props.selectResource,
		showDatePicker: false,
		date: this.props.date,
		selectedDate: this.props.date
	};

	public getCurrentDate(): Date {
		const date: Date = new Date();
		return new Date(date.getFullYear(), date.getMonth(), date.getDate());
	}

	public showToggle = () => {
		this.setState({
			showDatePicker: !this.state.showDatePicker,
			selectedDate: this.state.date
		});
	};

	public setSelectedDate = (selectedDate: Date) => {
		this.setState({selectedDate});
	};

	public okClick = () => {
		console.log('okClick', this.state.selectedDate);

		this.setState({
			date: this.state.selectedDate,
			showDatePicker: false,
		});
		this.props.setDate(this.state.selectedDate);
	};

	public componentDidUpdate(prevProps: DateAppointmentProps) {
		if (prevProps.selectResource !== this.props.selectResource) {
			this.setState({
				selectResource: this.props.selectResource
			});

			if (this.state.date === null) {
				const date = this.getCurrentDate();
				this.setState({
					date,
					selectedDate: date
				});
				this.props.setDate(date);
			}
		}

		if (prevProps.schedules !== this.props.schedules) {
			this.setState({
				schedules: this.props.schedules
			})
		}
	}

	render() {
		return (
			<div className="date-appointment__root">
				<div className="date-appointment__header">
					<h1 className="date-appointment__header-text">Дата записи</h1>
				</div>

				<div className="date-appointment__body">
					<input disabled className="date-appointment__body-input" placeholder="ДД.ММ.ГГГГ" value={dateFormatter(this.state.selectedDate)}/>
					<Tooltip disabled={this.state.selectResource.length > 0} content="Выберите доступный ресурс">
						<div>
							<button
								className={"date-appointment__body-button" + (this.state.showDatePicker ? ' active' : '')}
								disabled={this.state.selectResource.length === 0}
								onClick={this.showToggle}
							>
								<span>▼</span>
							</button>
						</div>
					</Tooltip>
				</div>

				<div className="date-appointment__calendar-wrapper">
					{ this.state.showDatePicker ? (
						<div className="date-appointment__calendar">
							<DatePicker
								schedules={this.state.schedules}
								selectResource={this.state.selectResource}
								selectedDate={this.state.date}
								onChange={(date: Date) => this.setSelectedDate(date)}
							/>

							<div className="date-appointment__button-row">
								<button className="date-appointment__button-footer cancel" onClick={this.showToggle}>✖ Отменить</button>
								<button className="date-appointment__button-footer" onClick={this.okClick}>✓ Ок</button>
							</div>
						</div>
					) : null }
				</div>
			</div>
		);
	}
}
