import React, { Component } from 'react';
import { IColumn, IAppointment } from "../Calendar";

import './ScheduleList.scss';

interface ScheduleListProps {
	column: IColumn;
}

export default class ScheduleList extends Component<ScheduleListProps> {
	render() {
		return (
			<div className="schedule-list__container">
				<div className="schedule-list__header">{this.props.column.scheduleStart}-{this.props.column.scheduleEnd}</div>
				{this.props.column.appointment.length ?
					<div className="schedule-list__body">
						{this.props.column.appointment.map((appointment: IAppointment, index: number) => (
								<div key={index}>{appointment.desc} ({appointment.timeStart}-{appointment.timeEnd})</div>
						))}
					</div> :
					null
				}
			</div>
		)
	}
}