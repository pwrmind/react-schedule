import React, { Component } from 'react';
import { addZero } from 'services/formatter';

import { IResource } from 'api/data/resources';
import { ISchedule, IQuota, IDayOff } from 'api/data/schedules';
import { ISlot, INewSlot } from 'api/data/slots';
import { IPatient } from 'api/data/patients';

import ContextMenu from 'components/ContextMenu/ContextMenu';
import Tooltip from 'components/Tooltip/Tooltip';
import Modal from 'components/Modal/Modal';
import SlotMenu from './SlotMenu/SlotMenu';
import ScheduleList from './ScheduleList/ScheduleList';

import './Calendar.scss';

interface CalendarProps {
	resources?: Array<IResource>;
	schedules: Array<ISchedule>;
	slots: Array<ISlot>;
	patients: Array<IPatient>;
	selectDate: any;
	selectResource: Array<IResource>;
	selectPatient: IPatient | null;
	filterDays: any;
	reload: Function;
}

export interface IAppointment {
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

export interface IColumn {
	id: number;
	dateString: string;
	date: Date;
	name: string;
	specialty: string;
	cabinet: string;
	schedule: ISchedule,
	scheduleStart: string;
	scheduleEnd: string;
	scheduleGrid: number;
	slots: ISlot[];
	activeQuotas: IQuota[];
	appointment: IAppointment[];
	status: string,
	hours: Array<JSX.Element | null>
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

	public state: any = {
		createPopupActive: false
	};

	public modalTimer: any;

	public openModal = () => {
		this.setState({createPopupActive: true});

		this.modalTimer = setTimeout(() => {
			this.closeModal();
		}, 3000)
	};

	public closeModal = () => {
		clearInterval(this.modalTimer);
		this.setState({createPopupActive: false});
	};

	public getPatient = (id: number | any): string => {
		const patient = this.props.patients.filter((patient: IPatient) => patient.id === id)[0];
		return `${patient.lName} ${patient.fName[0]}. ${patient.mName[0]}.`
	};

	public makeHours = (column: any, hours: string[]) => {
		let lastRender: string = '';

		const renderHours = [],
			renderMenu = (title: string, slot: ISlot | boolean, freeSlot: boolean, newSlot: INewSlot, patientsInSlotId: number | null, oldHour: boolean) => {
				return (
					<SlotMenu
						title={title} slot={slot} freeSlot={freeSlot} newSlot={newSlot} patientsInSlotId={patientsInSlotId}
						selectPatient={this.props.selectPatient as IPatient} oldHour={oldHour}
						schedules={this.props.schedules}
						patients={this.props.patients}
						reload={this.props.reload}
						create={this.openModal}
					/>
				)
			},
			renderAppointment = (hourState: IHourState, index: number) => {
				const appointment = hourState.appointment as IAppointment;
				if (lastRender === appointment.desc) {
					return null
				}
				lastRender = appointment.desc;
				if (!hourState.intervalStart || !hourState.intervalEnd) {
					return (
						<div key={index} className="calendar__schedule--body-column-hour_double">
							{ hourState.intervalStart ? null : (
								<Tooltip content="Запись недоступна" delay={1000}>
									<div className="calendar__schedule--body-column-hour_notwork">Нет записи</div>
								</Tooltip>
							)}
							<div className="calendar__schedule--body-column-hour_notwork">{appointment.desc}</div>
							{ hourState.intervalEnd ? null : (
								<Tooltip content="Запись недоступна" delay={1000}>
									<div className="calendar__schedule--body-column-hour_notwork">Нет записи</div>
								</Tooltip>
							)}
						</div>
					);
				}
				return <div key={index} className="calendar__schedule--body-column-hour_notwork">{appointment.desc}</div>
			},
			renderSlot = (slots: ISlot[], hour: string, index: number, schedule: ISchedule, date: Date) => {
				const nowDate = new Date(), quotaDate = new Date(date).setHours(+hour.split(':')[0], +hour.split(':')[1], 0, 0),
				newSlot: INewSlot = {
					visitDate: column.date,
					status: 0,
					scheduleId: schedule.id,
					resourceId: schedule.resource.id,
					interval: hour
				}, patients = column.slots.map((slot: ISlot) => {
					if (slot.interval === hour) {
						const slotsInHour = column.slots.filter((slot: ISlot) => slot.interval === hour);
						return (
							<ContextMenu
								key={slot.id}
								content={
									renderMenu(this.getPatient(slot.patientId), slot, slotsInHour.length < 2, newSlot, slotsInHour[0].patientId, quotaDate <= nowDate.getTime())
								}
							>
								<div className="calendar__schedule--body-column-hour_patients-list_patient" >
									<Tooltip content={this.getPatient(slot.patientId)} delay={1000}>
										<span>{this.getPatient(slot.patientId)}</span>
									</Tooltip>
								</div>
							</ContextMenu>
						)
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
			renderQuota = (hour: string, index: number, nextHour: string, schedule: ISchedule, date: Date) => {
				lastRender = hour;
				const nowDate: Date = new Date();
				nowDate.setMinutes(nowDate.getMinutes() + schedule.timeGrid);
				const quotaDate = new Date(date).setHours(+hour.split(':')[0], +hour.split(':')[1], 0, 0),
				tooltipText = quotaDate > nowDate.getTime() ? 'Время доступно для записи' : 'Запись на прошедший временной интервал недоступна',
				newSlot: INewSlot = {
					visitDate: column.date,
					status: 0,
					scheduleId: schedule.id,
					resourceId: schedule.resource.id,
					interval: hour
				};
				return (
					<ContextMenu
						// disabled={quotaDate <= nowDate.getTime()}
						key={index}
						content={
							renderMenu(`Выбран интервал времени\n ${hour} - ${nextHour}`, false, true, newSlot, null, quotaDate <= nowDate.getTime())
						}
					>
						<div>
							<Tooltip content={tooltipText} delay={1000}>
								<div className="calendar__schedule--body-column-hour">
									<div className="calendar__schedule--body-column-hour_time">{hour}</div>
								</div>
							</Tooltip>
						</div>
					</ContextMenu>
				)
			},
			renderEmpty = (index: number) => {
				const text = 'Нет записи';
				if (lastRender === text) {
					return null
				}
				lastRender = text;
				return <Tooltip key={index} content="Запись недоступна" delay={1000}><div className="calendar__schedule--body-column-hour_notwork">{text}</div></Tooltip>
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
					<div key={i}  className="calendar__schedule--body-column-hour not-dashed">
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
						renderHour = renderSlot(hourState.slots, hour, i, column.schedule, column.date);
					}
				}
				else if (hourState.quota) {
					if (!hourState.slots.length) {
						renderHour = renderQuota(hour, i, (hours[i + 1] ? hours[i + 1] : column.scheduleEnd), column.schedule, column.date)
					}
					else {
						renderHour = renderSlot(hourState.slots, hour, i, column.schedule, column.date);
					}
				}
				else if (hourState.slots.length) {
					renderHour = renderSlot(hourState.slots, hour, i, column.schedule, column.date)
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
			}).sort((scheduleA: ISchedule, scheduleB: ISchedule) => scheduleA.resource.name.toLowerCase() > scheduleB.resource.name.toLowerCase() ? 1 : -1);

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

					const dayOff: IDayOff = schedules[i].dayOff as IDayOff;

					const column: IColumn = {
						id: columns.length + 1,
						dateString: `${this.DAYS[filterDate.getDay()]} ${filterDate.getDate()} ${this.MONTHS[filterDate.getMonth()]}`,
						date: filterDate,
						name: schedules[i].resource.name,
						specialty: schedules[i].resource.specialty.toLowerCase(),
						cabinet: `${schedules[i].clinic.name}, (к. ${schedules[i].clinic.roomNumber})`,
						schedule: schedules[i],
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

					if (dayOff && dayOff.dayOffStart.getTime() <= filterDate.getTime() && dayOff.dayOffEnd.getTime() >= filterDate.getTime()) {
						column.status = dayOff.reason;
					}

					column.hours = this.makeHours(column, hours);

					columns.push(column);
				}
			}
		}

		if (!columns.length) {
			return <span>{this.MESSAGES.c007}</span>
		}

		return (
			<div className="calendar__schedule" data-scroll="true">
				<div className="calendar__schedule--header" style={ {width: (columns.length * 210 + 30) + 'px'} }>
					{columns.map((column: IColumn, index: number) => (
						<div className={"calendar__schedule--header-column" + (column.status ? ' warning' : '')} key={column.name + column.schedule.id + column.id + index}>
							<div className="calendar__schedule--header-column-day">{column.dateString}</div>
							<div className="calendar__schedule--header-column-name">{column.name}</div>
							<div className="calendar__schedule--header-column-specialty">{column.specialty}</div>
							<div className="calendar__schedule--header-column-cabinet">{column.cabinet}</div>
							{!column.status && <ScheduleList column={column}/>}
							{column.status ?
								<div className="calendar__schedule--header-column-status">{column.status}</div> :
								''
							}
						</div>
					))}
				</div>
				<div className="calendar__schedule--body">
					{columns.map((column: IColumn, index: number) => (
						<div className={"calendar__schedule--body-column" + (column.status ? ' warning' : '')} key={column.name + column.schedule.id + column.id + index} style={ {minHeight: column.hours.length * 30 + 'px'} }>
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

				<Modal isShow={this.state.createPopupActive} close={this.closeModal}>
					<div className="create-popup__content">
						<div className="create-popup__header">Запись создана</div>
						<div className="create-popup__body">
							<div className="create-popup__body-icon">✓</div>
						</div>
					</div>
				</Modal>
			</div>
		)
	}
};
