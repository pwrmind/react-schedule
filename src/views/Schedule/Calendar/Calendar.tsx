import React, { Component } from 'react';
import { addZero } from 'services/formatter';

import { IResource } from 'api/data/resources';
import { ISchedule } from 'api/data/schedules';

import './Calendar.scss';

interface CalendarProps {
	resources?: Array<IResource>,
	schedules: Array<ISchedule>,
	selectDate: any;
	selectResource: Array<IResource>;
	filterDays: any;
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

	public lastHour: any;

	public makeHour = (column: any, hour: any, index: number) => {
		let returnHour = <span>{hour}</span>, className = '';

		if (hour === '') {
			className = ' not-dashed';
			returnHour = <div className="calendar__schedule--body-column-hour_notwork">Врач не принимает</div>;
		}
		else {
			const hourTime = new Date().setHours(hour.split(':')[0], hour.split(':')[1], 0),
				lastHourTime = new Date(hourTime).setMinutes(new Date(hourTime).getMinutes() - column.scheduleGrid),
				nextHourTime = new Date(hourTime).setMinutes(new Date(hourTime).getMinutes() + column.scheduleGrid),
				quotaTest = {
					hourInQuota: false
				};

			for (let i = 0; i < column.activeQuotas.length; i += 1) {
				const activeQuota = column.activeQuotas[i], quotaTime = {
					timeStart: new Date().setHours(activeQuota.quotaStart.split(':')[0], activeQuota.quotaStart.split(':')[1], 0),
					timeEnd: new Date().setHours(activeQuota.quotaEnd.split(':')[0], activeQuota.quotaEnd.split(':')[1], 0)
				};

				if (hourTime >= quotaTime.timeStart && hourTime < quotaTime.timeEnd) {
					quotaTest.hourInQuota = true;
				}
			}

			if (!quotaTest.hourInQuota) {
				className = ' not-dashed';
				if (!this.lastHour) {
					returnHour = <div className="calendar__schedule--body-column-hour_notwork">Нет записи</div>;
					this.lastHour = returnHour;
				} else {
					return null;
				}
			}

			for (let i = 0; i < column.appointment.length; i += 1) {
				const appointment = column.appointment[i],
					appointmentTime = {
						timeStart: new Date().setHours(appointment.timeStart.split(':')[0], appointment.timeStart.split(':')[1], 0),
						timeEnd: new Date().setHours(appointment.timeEnd.split(':')[0], appointment.timeEnd.split(':')[1], 0)
					};

				if (hourTime >= appointmentTime.timeStart && hourTime < appointmentTime.timeEnd) {
					className = ' not-dashed';
					this.lastHour = false;
					
					if (!(lastHourTime >= appointmentTime.timeStart) && nextHourTime < appointmentTime.timeEnd) {
						returnHour = <div className="calendar__schedule--body-column-hour_notwork">{column.appointment[i].desc}</div>
					}
					else if (!(lastHourTime >= appointmentTime.timeStart)) {
						returnHour = <div className="calendar__schedule--body-column-hour_notwork">{column.appointment[i].desc}</div>

						if (appointmentTime.timeEnd >= hourTime && appointmentTime.timeEnd < nextHourTime) {
							returnHour = (
								<div className="calendar__schedule--body-column-hour_double">
									<div className="calendar__schedule--body-column-hour_notwork">{column.appointment[i].desc}</div>
									<div className="calendar__schedule--body-column-hour_notwork">Нет записи</div>
								</div>
							);
						}
					}
					else {
						return null
					}
				}
				else if (appointmentTime.timeStart >= hourTime && appointmentTime.timeStart < nextHourTime) {
					className = ' not-dashed';
					this.lastHour = false;
					returnHour = <div className="calendar__schedule--body-column-hour_notwork">Нет записи</div>
				}
			}
		}
		return (
			<div className={"calendar__schedule--body-column-hour" + className} key={index}>
				{returnHour}
			</div>
		);
	};

	public makeCalendar = () => {
		const filterDays = this.props.filterDays,
			selectDate: Date = this.props.selectDate,
			columns = [],
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

					timeStart.setHours(+splitStart[0], +splitStart[1], 0);
					timeEnd.setHours(+splitEnd[0], +splitEnd[1], 0);

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
						name: schedules[i].resource.name,
						specialty: schedules[i].resource.specialty.toLowerCase(),
						cabinet: `${schedules[i].clinic.name}, (к. ${schedules[i].clinic.roomNumber})`,
						scheduleStart: schedules[i].workStart,
						scheduleEnd: schedules[i].workEnd,
						scheduleGrid: schedules[i].timeGrid,
						activeQuotas: schedules[i].quotas.filter((quota: any) => quota.active && (!quota.quotaDays || (quota.quotaDays && quota.quotaDays.includes(filterDate.getDay())))),
						appointment: schedules[i].quotas
							.filter((quota: any) => !quota.active && (!quota.quotaDays || (quota.quotaDays && quota.quotaDays.includes(filterDate.getDay()))))
							.map((quota: any) => {
								return {timeStart: quota.quotaStart, timeEnd: quota.quotaEnd, desc: quota.name}
							}),
						status: '',
						hours
					};

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
							{column.status ? '' : column.hours.map((hour: any, index: number) => (
								this.makeHour(column, hour, index)
							))}
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
