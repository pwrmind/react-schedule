import React, { Component } from 'react';
// import DatePicker from '../../../../components/DatePicker/DatePicker';

import './DateAppointment.scss';

export default class DateAppointment extends Component {
	render() {
		return (
			<div className="date-appointment__root">
				<input className="date-appointment__input" placeholder="ДД.ММ.ГГГГ"/>
				<button className="date-appointment__button">🗓▼</button>

				<div className="date-appointment__calendar">
					{/* <DatePicker/> */}
				</div>
			</div>
		);
	}
}
