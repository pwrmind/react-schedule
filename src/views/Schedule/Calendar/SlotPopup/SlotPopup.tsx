import React, { Component } from 'react';
import { dateFormatter } from 'services/formatter';

import { ISlot } from 'api/data/slots';
import { ISchedule } from 'api/data/schedules';
import { IPatient } from 'api/data/patients';

import './SlotPopup.scss';

interface SlotPopupProps {
	slot: ISlot;
	closePopup: Function;
	patients: Array<IPatient>;
	schedules: Array<ISchedule>;
}

export default class SlotPopup extends Component<SlotPopupProps> {

	public onClose = () => {
		this.props.closePopup();
	};


	render() {
		const patient = this.props.patients.find((patient: IPatient) => patient.id === this.props.slot.patientId) as IPatient,
			schedule = this.props.schedules.find((schedule: ISchedule) => schedule.id === this.props.slot.scheduleId) as ISchedule;
		return (
			<div className="slot-popup__content">
				<div className="slot-popup__header">
					{patient.lName} {patient.fName[0]}. {patient.mName[0]}.
					<div className="slot-popup__header-close" onClick={this.onClose}>☓</div>
				</div>
				<table className="slot-popup__table">
					<tbody>
						<tr>
							<td>Дата:</td>
							<td>{dateFormatter(this.props.slot.visitDate)}</td>
						</tr>
						<tr>
							<td>Врач:</td>
							<td>{schedule.resource.name}</td>
						</tr>
						<tr>
							<td>Кабинет:</td>
							<td>{schedule.clinic.roomNumber}</td>
						</tr>
						<tr>
							<td>Полис ОМС:</td>
							<td>{patient.OMS}</td>
						</tr>
					</tbody>
				</table>
			</div>
		)
	}
}