import React, { Component } from 'react';
import { dateFormatter } from 'services/formatter';

import DatePicker from 'components/DatePicker/DatePicker';
import Tooltip from 'components/Tooltip/Tooltip';

import './DateAppointment.scss';

interface DateAppointmentProps {
	resource: any;
	date: Date | null;
	setDate: Function;
}

export default class DateAppointment extends Component<DateAppointmentProps> {
	static defaultProps: DateAppointmentProps = {
		resource: [],
		date: null,
		setDate: Function.prototype
	};

	public state = {
		resource: this.props.resource,
		showDatePicker: false,
		date: this.props.date,
		selectedDate: this.props.date
	};

	public dateFormat(date: Date) {
		return 
	}

	public showToggle = () => {
		this.setState({
			showDatePicker: !this.state.showDatePicker
		});
	};

	public setSelectedDate = (selectedDate: Date) => {
		this.setState({selectedDate});
	};

	public okClick = () => {
		console.log('okClick', this.state.selectedDate);
		this.showToggle();

		this.setState({date: this.state.selectedDate});
		this.props.setDate(this.state.selectedDate);
	};

	public componentDidUpdate(prevProps: DateAppointmentProps) {
		if (prevProps.resource !== this.props.resource) {
			this.setState({
				resource: this.props.resource
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
					<input disabled className="date-appointment__input" placeholder="ДД.ММ.ГГГГ" value={dateFormatter(this.state.date)}/>
					<Tooltip disabled={this.state.resource.length > 0} content="Выберите доступный ресурс">
						<button
							className="date-appointment__button"
							disabled={this.state.resource.length === 0}
							onClick={this.showToggle}
						>
							🗓▼
						</button>
					</Tooltip>
				</div>

				<div className="date-appointment__calendar-wrapper">
					{ this.state.showDatePicker ? (
						<div className="date-appointment__calendar">
							<DatePicker selectedDate={this.state.date} onChange={(date: Date) => this.setSelectedDate(date)}/>

							<div className="date-appointment__button-row">
								<button className="date-appointment__button-footer" onClick={this.showToggle}>Отменить</button>
								<button className="date-appointment__button-footer" onClick={this.okClick}>Ок</button>
							</div>
						</div>
					) : null }
				</div>
			</div>
		);
	}
}
