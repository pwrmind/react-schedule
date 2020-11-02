import React, { Component } from 'react';
import { dateFormatter } from '../../../../services/formatter';

import DatePicker from '../../../../components/DatePicker/DatePicker';

import './DateAppointment.scss';

interface DateAppointmentProps {
	patient: any;
	date: Date | null;
	setDate: Function;
}

export default class DateAppointment extends Component<DateAppointmentProps> {
	static defaultProps: DateAppointmentProps = {
		patient: null,
		date: null,
		setDate: Function.prototype
	};

	public state = {
		patient: this.props.patient,
		showDatePicker: false,
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

	public setDate = (selectedDate: Date) => {
		this.setState({selectedDate});
	};

	public okClick = () => {
		console.log('okClick', this.state.selectedDate);
		this.showToggle();
		this.props.setDate(this.state.selectedDate);
	};

	render() {
		return (
			<div className="date-appointment__root">
				<input disabled className="date-appointment__input" placeholder="ДД.ММ.ГГГГ" value={dateFormatter(this.state.selectedDate)}/>
				<button
					className="date-appointment__button"
					disabled={!Boolean(this.props.patient)}
					onClick={this.showToggle}
				>
					🗓▼
				</button>

				{ this.state.showDatePicker ? (
					<div className="date-appointment__calendar">
						<DatePicker onChange={(date: Date) => this.setDate(date)}/>

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
