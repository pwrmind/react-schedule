import React, { Component } from 'react';
import DatePicker from '../../../../components/DatePicker/DatePicker';

import './DateAppointment.scss';

export default class DateAppointment extends Component {
	public state = {
		showDatePicker: false
	};

	public showToggle = () => {
		this.setState({
			showDatePicker: !this.state.showDatePicker
		});
	}

	render() {
		return (
			<div className="date-appointment__root">
				<input className="date-appointment__input" placeholder="ДД.ММ.ГГГГ"/>
				<button
					className="date-appointment__button"
					onClick={this.showToggle}
				>
					🗓▼
				</button>

				{ this.state.showDatePicker ? (
					<div className="date-appointment__calendar">
						<DatePicker/>
					</div>
				) : null }
			</div>
		);
	}
}
