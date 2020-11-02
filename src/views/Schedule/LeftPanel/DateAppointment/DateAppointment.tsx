import React, { Component } from 'react';
import { dateFormatter } from '../../../../services/formatter';

import DatePicker from '../../../../components/DatePicker/DatePicker';

import './DateAppointment.scss';

interface DateAppointmentProps {
	resource: any;
	date: Date | null;
	setDate: Function;
}

export default class DateAppointment extends Component<DateAppointmentProps> {
	static defaultProps: DateAppointmentProps = {
		resource: null,
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
		this.props.setDate(this.state.date);
	};

	render() {
		return (
			<div className="date-appointment__root">
				<input disabled className="date-appointment__input" placeholder="ДД.ММ.ГГГГ" value={dateFormatter(this.state.date)}/>
				<button
					className="date-appointment__button"
					// disabled={!Boolean(this.props.resource)}
					onClick={this.showToggle}
				>
					🗓▼
				</button>

				{ this.state.showDatePicker ? (
					<div className="date-appointment__calendar">
						<DatePicker selectedDate={this.state.date} onChange={(date: Date) => this.setSelectedDate(date)}/>

						<div className="date-appointment__button-row">
							<button className="date-appointment__button" onClick={this.showToggle}>Отменить</button>
							<button className="date-appointment__button" onClick={this.okClick}>Ок</button>
						</div>
					</div>
				) : null }
			</div>
		);
	}
}
