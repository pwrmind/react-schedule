import React, {Component, ReactElement} from 'react';
import { addZero } from 'services/formatter';

import { IResource } from 'api/data/resources';
import { ISchedule } from 'api/data/schedules';
import { IQuota } from 'api/data/schedules';
import { ISlot } from 'api/data/slots';
import { IPatient } from 'api/data/patients';

import './Calendar.scss';

interface CalendarProps {
	resources?: Array<IResource>,
	schedules: Array<ISchedule>,
	slots: Array<ISlot>,
	patients: Array<IPatient>,
	selectDate: any;
	selectResource: Array<IResource>;
	filterDays: any;
}

interface IAppointment {
	timeStart: string;
	timeEnd: string;
	desc: string;
}

interface IHourState {
	quota: IQuota | boolean;
	slots: ISlot[];
	appointment: IAppointment | boolean;
	intervalStart: boolean;
	intervalEnd: boolean;
}

export default class Calendar extends Component<CalendarProps> {
	public DAYS = ['Вс.', 'Пн.', 'Вт.', 'Ср.', 'Чт.', 'Пт.', 'Сб.'];
	public MONTHS = ['янв.', 'февр.', 'март', 'апр.', 'май', 'июнь', 'июль', 'авг.', 'сен.', 'окт.', 'нояб.', 'дек.'];
	public MESSAGES = {
		c007: 'На выбранный период отсутствуют свободные временные интервалы для записи. Выберите другой период.',
		c008: 'Для просмотра расписания выберите хотя бы один Доступный ресурс.',
		c009: 'Запись создана'
	};
	public WORK_TIME = {
		workStart: '08:00',
		workEnd: '21:00'
	};

	public getPatient = (id: number): string => {
		const patient = this.props.patients.filter((patient: IPatient) => patient.id === id)[0];
		return `${patient.lName} ${patient.fName[0]}. ${patient.mName[0]}.`
	};

	public makeHours = (column: any, hours: string[]) => {
		let lastRender: string = '';

		const renderHours = [],
			renderAppointment = (hourState: IHourState, index: number) => {
				const appointment = hourState.appointment as IAppointment;
				if (lastRender === appointment.desc) {
					return null
				}
				lastRender = appointment.desc;
				if (!hourState.intervalStart || !hourState.intervalEnd) {
					return (
						<div key={index} className="calendar__schedule--body-column-hour_double">
							{ hourState.intervalStart ? null : <div className="calendar__schedule--body-column-hour_notwork">Нет записи</div>}
							<div className="calendar__schedule--body-column-hour_notwork">{appointment.desc}</div>
							{ hourState.intervalEnd ? null : <div className="calendar__schedule--body-column-hour_notwork">Нет записи</div>}
						</div>
					);
				}
				return <div key={index} className="calendar__schedule--body-column-hour_notwork">{appointment.desc}</div>
			},
			renderSlot = (slots: ISlot[], hour: string, index: number) => {
				const patients = column.slots.map((slot: ISlot) => {
					if (slot.interval === hour) {
						return <span key={slot.id}>{this.getPatient(slot.patientId)}</span>
					}
				});
				lastRender = patients;
				return (
					<div key={index} className="calendar__schedule--body-column-hour solid">
						<div className="calendar__schedule--body-column-hour_patients">
							<div className="calendar__schedule--body-column-hour_patients-time">{hour}</div>
							<div className="calendar__schedule--body-column-hour_patients-list">{patients}</div>
						</div>
					</div>
				)
			},
			renderQuota = (hour: string, index: number) => {
				lastRender = hour;
				return (
					<div key={index} className="calendar__schedule--body-column-hour">
						<div className="calendar__schedule--body-column-hour_time">{hour}</div>
					</div>
				)
			},
			renderEmpty = (index: number) => {
				const text = 'Нет записи';
				if (lastRender === text) {
					return null
				}
				lastRender = text;
				return <div key={index} className="calendar__schedule--body-column-hour_notwork">{text}</div>
			};

		for (let i = 0; i < hours.length; i += 1) {
			const hour: any = hours[i],
				hourState: IHourState = {
					quota: false,
					slots: [],
					appointment: false,
					intervalStart: true,
					intervalEnd: true
				};

			let renderHour;

			if (hour === '') {
				renderHour = (
					<div className="calendar__schedule--body-column-hour not-dashed" key={i}>
						<div className="calendar__schedule--body-column-hour_notwork">Врач не принимает</div>
					</div>
				);
			}
			else {
				const hourTime = new Date().setHours(hour.split(':')[0], hour.split(':')[1], 0, 0),
					lastHourTime = new Date(hourTime).setMinutes(new Date(hourTime).getMinutes() - column.scheduleGrid, 0, 0),
					nextHourTime = new Date(hourTime).setMinutes(new Date(hourTime).getMinutes() + column.scheduleGrid, 0, 0);

				column.activeQuotas.filter((quota: IQuota) => {
					const quotaTime = {
						timeStart: new Date().setHours(+quota.quotaStart.split(':')[0], +quota.quotaStart.split(':')[1], 0, 0),
						timeEnd: new Date().setHours(+quota.quotaEnd.split(':')[0], +quota.quotaEnd.split(':')[1], 0, 0)
					};

					if ((hourTime >= quotaTime.timeStart || (quotaTime.timeStart >= hourTime && quotaTime.timeStart < nextHourTime)) &&
						(quotaTime.timeEnd >= nextHourTime || (quotaTime.timeEnd > hourTime && quotaTime.timeEnd < nextHourTime))) {
						hourState.quota = quota;
					}
				});

				column.slots.filter((slot: ISlot) => {
					if (slot.interval === hour) {
						hourState.slots.push(slot);
					}
				});

				column.appointment.filter((appointment: IAppointment) => {
					const appointmentTime = {
						timeStart: new Date().setHours(+appointment.timeStart.split(':')[0], +appointment.timeStart.split(':')[1], 0, 0),
						timeEnd: new Date().setHours(+appointment.timeEnd.split(':')[0], +appointment.timeEnd.split(':')[1], 0, 0)
					};

					if ((hourTime >= appointmentTime.timeStart || (appointmentTime.timeStart >= hourTime && appointmentTime.timeStart < nextHourTime)) &&
						(appointmentTime.timeEnd >= nextHourTime || (appointmentTime.timeEnd > hourTime && appointmentTime.timeEnd < nextHourTime))) {
						hourState.intervalStart = hours.includes(appointment.timeStart);
						hourState.intervalEnd = hours.includes(appointment.timeEnd) || column.scheduleEnd === appointment.timeEnd;

						hourState.appointment = appointment;
					}
				});


				if (hourState.appointment) {
					if (!hourState.slots.length) {
						renderHour = renderAppointment(hourState, i)
					}
					else {
						renderHour = renderSlot(hourState.slots, hour, i);
					}
				}
				else if (hourState.quota) {
					if (!hourState.slots.length) {
						renderHour = renderQuota(hour, i)
					}
					else {
						renderHour = renderSlot(hourState.slots, hour, i);
					}
				}
				else if (hourState.slots.length) {
					renderHour = renderSlot(hourState.slots, hour, i)
				}
				else {
					renderHour = renderEmpty(i);
				}
			}

			renderHours.push(renderHour);
		}

		return renderHours;
	};

	public makeCalendar = () => {
		const filterDays = this.props.filterDays,
			selectDate: Date = this.props.selectDate,
			columns = [], slots = this.props.slots,
			schedules: Array<ISchedule> = this.props.schedules.filter((schedule: ISchedule) => {
				for (const resource of this.props.selectResource) {
					if (resource.id === schedule.resource.id) {
						return true;
					}
				}

				return false;
			});
		
		console.log('makeCalendar', this.props.schedules, schedules);

		for (let j = 0; j < filterDays; j += 1) {
			const filterDate = new Date(selectDate.getTime());
			filterDate.setDate(filterDate.getDate() + j);

			for (let i = 0; i < schedules.length; i += 1) {
				if (schedules[i].workDays.includes(filterDate.getDay())) {
					if (schedules[i].workMonth) {
						const today = new Date(new Date().setHours(0, 0, 0, 0));

						if (filterDate.getTime() > new Date(today.setMonth(today.getMonth() + (schedules[i].workMonth || 0))).getTime()) {
							continue;
						}
					}

					const splitStart = schedules[i].workStart.split(':'), timeStart = new Date(),
							splitWorkStart = this.WORK_TIME.workStart.split(':'), splitWorkEnd = this.WORK_TIME.workEnd.split(':'),
							splitEnd = schedules[i].workEnd.split(':'), timeEnd = new Date(), hours = [];

					timeStart.setHours(+splitStart[0], +splitStart[1], 0, 0);
					timeEnd.setHours(+splitEnd[0], +splitEnd[1], 0, 0);

					if ((splitStart[0] >= splitWorkStart[0] && splitStart[1] > splitWorkStart[1]) || splitStart[0] > splitWorkStart[0]) {
						hours.push('');
					}

					while (timeStart.getTime() < timeEnd.getTime()) {
						hours.push(`${addZero(timeStart.getHours())}:${addZero(timeStart.getMinutes())}`);

						timeStart.setMinutes(timeStart.getMinutes() + schedules[i].timeGrid);
					}

					if (splitEnd[0] < splitWorkEnd[0]) {
						hours.push('');
					}

					const column: any = {
						id: columns.length + 1,
						date: `${this.DAYS[filterDate.getDay()]} ${filterDate.getDate()} ${this.MONTHS[filterDate.getMonth()]}`,
						dateTest: filterDate,
						name: schedules[i].resource.name,
						specialty: schedules[i].resource.specialty.toLowerCase(),
						cabinet: `${schedules[i].clinic.name}, (к. ${schedules[i].clinic.roomNumber})`,
						scheduleStart: schedules[i].workStart,
						scheduleEnd: schedules[i].workEnd,
						scheduleGrid: schedules[i].timeGrid,
						slots: slots.filter((slot: ISlot) => (slot.visitDate.getTime() === filterDate.getTime() && slot.scheduleId === schedules[i].id)),
						activeQuotas: schedules[i].quotas.filter((quota: IQuota) => quota.active && (!quota.quotaDays || (quota.quotaDays && quota.quotaDays.includes(filterDate.getDay())))),
						appointment: schedules[i].quotas
							.filter((quota: IQuota) => !quota.active && (!quota.quotaDays || (quota.quotaDays && quota.quotaDays.includes(filterDate.getDay()))))
							.map((quota: IQuota) => {
								return {timeStart: quota.quotaStart, timeEnd: quota.quotaEnd, desc: quota.name}
							}),
						status: '',
						hours: []
					};

					column.hours = this.makeHours(column, hours);

					columns.push(column);
				}
			}
		}

		if (!columns.length) {
			return <span>{this.MESSAGES.c007}</span>
		}

		return (
			<div className="calendar__schedule">
				<div className="calendar__schedule--header" style={ {width: (columns.length * 210 + 30) + 'px'} }>
					{columns.map((column) => (
						<div className={"calendar__schedule--header-column" + (column.status ? ' warning' : '')} key={column.id}>
							<div className="calendar__schedule--header-column-day">{column.date}</div>
							<div className="calendar__schedule--header-column-name">{column.name}</div>
							<div className="calendar__schedule--header-column-specialty">{column.specialty}</div>
							<div className="calendar__schedule--header-column-cabinet">{column.cabinet}</div>
							<div className="calendar__schedule--header-column-schedule">{column.scheduleStart}-{column.scheduleEnd}</div>
							{column.appointment.length ?
								<div className="calendar__schedule--header-column-schedule">{column.appointment.map((appointment: any, index: number) => (
										<div key={index}>{appointment.desc} ({appointment.timeStart}-{appointment.timeEnd})</div>
								))}</div> :
								''
							}
							{column.status ?
								<div className="calendar__schedule--header-column-status">{column.status}</div> :
								''
							}
						</div>
					))}
				</div>
				<div className="calendar__schedule--body">
					{columns.map((column) => (
						<div className={"calendar__schedule--body-column" + (column.status ? ' warning' : '')} key={column.id} style={ {minHeight: column.hours.length * 30 + 'px'} }>
							{column.status ? null : column.hours}
						</div>
					))}
				</div>
			</div>
		);
	};

	render() {
		return (
			<div className="calendar">
				<div className="calendar__container">
					{ !this.props.selectDate || !this.props.selectResource.length ?
						<span>{this.props.selectResource.length ? this.MESSAGES.c007 : this.MESSAGES.c008}</span> :
						this.makeCalendar()
					}
				</div>
			</div>
		)
	}
};
