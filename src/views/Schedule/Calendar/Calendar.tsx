import React, { Component } from "react";
import { addZero } from 'services/formatter';

import "./Calendar.scss";

export const Calendar: React.FC<any> = (props) => {
	const {
		resources,
		selectDate,
		filterDays
	} = props;

	const days = ['Вс.', 'Пн.', 'Вт.', 'Ср.', 'Чт.', 'Пт.', 'Сб.'];
	const month = ['янв.', 'февр.', 'март',  'апр.',  'май',  'июнь',  'июль',  'авг.',  'сен.',  'окт.',  'нояб.',  'дек.'];
	const workTime = {
		workStart: '08:00',
		workEnd: '21:00'
	};

	const makeHour = (column: any, hour: any, index: number) => {
		let returnHour = <span>{hour}</span>, className = ' ';

		if (hour === '') {
			className = ' not-dashed';
			returnHour = <div className="calendar__schedule--body-column-hour_notwork">Врач не принимает</div>;
		}
		else {
			for (let i = 0; i < column.appointment.length; i += 1) {
				const appointmentTimeSplit = column.appointment[i].time.split('-'),
					hourTime = new Date().setHours(hour.split(':')[0], hour.split(':')[1], 0),
					lastHourTime = new Date(hourTime).setMinutes(new Date(hourTime).getMinutes() - column.scheduleGrid),
					nextHourTime = new Date(hourTime).setMinutes(new Date(hourTime).getMinutes() + column.scheduleGrid),
					appointmentTime = {
						timeStart: new Date().setHours(appointmentTimeSplit[0].split(':')[0], appointmentTimeSplit[0].split(':')[1], 0),
						timeEnd: new Date().setHours(appointmentTimeSplit[1].split(':')[0], appointmentTimeSplit[1].split(':')[1], 0)
					};

				/*console.log(' ');
				console.log('***********************');
				console.log('LastHour:', (addZero(new Date(lastHourTime).getHours()) + ':' + addZero(new Date(lastHourTime).getMinutes())), 'Hour:', hour, 'NextHour:', (addZero(new Date(nextHourTime).getHours()) + ':' + addZero(new Date(nextHourTime).getMinutes())),  ', apTimeStart:', appointmentTimeSplit[0], ', apTimeEnd:', appointmentTimeSplit[1]);
				console.log('LastHour >= apTimeStart:', lastHourTime >= appointmentTime.timeStart, ', LastHour < apTimeEnd:', lastHourTime < appointmentTime.timeEnd);
				console.log('Hour >= apTimeStart:', hourTime >= appointmentTime.timeStart, 'Hour < apTimeEnd:', hourTime < appointmentTime.timeEnd);
				console.log('NextHour >= apTimeStart:', nextHourTime >= appointmentTime.timeStart, ', NextHour < apTimeEnd:', nextHourTime <= appointmentTime.timeEnd);
				console.log('***********************');*/

				if (hourTime >= appointmentTime.timeStart && hourTime < appointmentTime.timeEnd) {
					className = ' not-dashed';
					if (!(lastHourTime >= appointmentTime.timeStart) && nextHourTime < appointmentTime.timeEnd) {
						returnHour = <div className="calendar__schedule--body-column-hour_notwork">{column.appointment[i].desc}</div>
					}
					else if (!(lastHourTime >= appointmentTime.timeStart)) {
						returnHour = <div className="calendar__schedule--body-column-hour_notwork">{column.appointment[i].desc}</div>

						if (appointmentTime.timeEnd >= hourTime && appointmentTime.timeEnd < nextHourTime) {
							returnHour = (
								<div className="calendar__schedule--body-column-hour_double">
									<div className="calendar__schedule--body-column-hour_notwork">{column.appointment[i].desc}</div>
									<div className="calendar__schedule--body-column-hour_notwork">Нет записии</div>
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
					returnHour = <div className="calendar__schedule--body-column-hour_notwork">Нет записии</div>
				}
			}
		}
		return (
			<div className={"calendar__schedule--body-column-hour" + className} key={index}>
				{returnHour}
			</div>
		);
	};

	const makeCalendar = () => {
		const filterDays = props.filterDays, selectDate: Date = props.selectDate, resources = props.resources, columns = [];

		for (let j = 0; j < filterDays; j += 1) {
			const filterDate = new Date(selectDate.getTime());
			filterDate.setDate(filterDate.getDate() + j);

			for (let i = 0; i < resources.length; i += 1) {
				if (resources[i].schedule.workDays.includes(filterDate.getDay())) {
					if (resources[i].schedule.workMonth) {
						const today = new Date(new Date().setHours(0, 0, 0, 0));

						if (filterDate.getTime() > new Date(today.setMonth(today.getMonth() + resources[i].schedule.workMonth)).getTime()) {
							continue;
						}
					}

					const splitStart = resources[i].schedule.workStart.split(':'), timeStart = new Date(),
							splitWorkStart = workTime.workStart.split(':'), splitWorkEnd = workTime.workEnd.split(':'),
							splitEnd = resources[i].schedule.workEnd.split(':'), timeEnd = new Date(), hours = [];

					timeStart.setHours(splitStart[0], splitStart[1], 0);
					timeEnd.setHours(splitEnd[0], splitEnd[1], 0);

					if ((splitStart[0] >= splitWorkStart[0] && splitStart[1] > splitWorkStart[1]) || splitStart[0] > splitWorkStart[0]) {
						hours.push('');
					}

					while (timeStart.getTime() < timeEnd.getTime()) {
						hours.push(`${addZero(timeStart.getHours())}:${addZero(timeStart.getMinutes())}`);

						timeStart.setMinutes(timeStart.getMinutes() + resources[i].schedule.timeGrid);
					}

					if (splitEnd[0] < splitWorkEnd[0]) {
						hours.push('');
					}

					const column: any = {
						id: columns.length + 1,
						date: `${days[filterDate.getDay()]} ${filterDate.getDate()} ${month[filterDate.getMonth()]}`,
						name: resources[i].name,
						specialty: resources[i].specialty.toLowerCase(),
						cabinet: `${resources[i].workPlace}, (к. ${resources[i].roomNumber})`,
						schedule: `${resources[i].schedule.workStart}-${resources[i].schedule.workEnd}`,
						scheduleGrid: resources[i].schedule.timeGrid,
						appointment: resources[i].schedule.quotas
							.filter((quota: any) => !quota.active && (!quota.quotaDays || (quota.quotaDays && quota.quotaDays.includes(filterDate.getDay()))))
							.map((quota: any) => {
								return {time: `${quota.quotaStart}-${quota.quotaEnd}`, desc: quota.name}
							}),
						status: '',
						hours
					};

					columns.push(column);
				}
			}
		}

		if (!columns.length) {
			return <span>На выбранный период отсутствуют свободные временные интервалы для записи. Выберите другой период</span>
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
							<div className="calendar__schedule--header-column-schedule">{column.schedule}</div>
							{column.appointment.length ?
								<div className="calendar__schedule--header-column-schedule">{column.appointment.map((appointment: any, index: number) => (
										<div key={index}>{appointment.desc} ({appointment.time})</div>
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
								makeHour(column, hour, index)
							))}
						</div>
					))}
				</div>
			</div>
		);
	};

	const columnsTest = [
		{
			id: 1,
			date: 'Пт. 30 окт.',
			name: 'Григорьева Г.Г.',
			specialty: 'терапевт',
			cabinet: 'ГП №128, (к. 110)',
			schedule: '08:00-18:00',
			appointment: [
				{
					time: '14:30-14:55',
					desc: 'Работа с документами'
				},
				{
					time: '16:20-16:40',
					desc: 'Работа с документами'
				},
			],
			status: ''
		}, {
			id: 2,
			date: 'Пт. 30 окт.',
			name: 'Сидорова С.С.',
			specialty: 'терапевт',
			cabinet: 'ГП №128, (к. 120)',
			schedule: '09:00-21:00',
			appointment: [

			],
			status: ''
		}, {
			id: 3,
			date: 'Пт. 30 окт.',
			name: 'Елисеева Е.Е.',
			specialty: 'офтальмолог',
			cabinet: 'ГП №128, (к. 130)',
			schedule: '14:00-18:00',
			appointment: [

			],
			status: ''
		}, {
			id: 4,
			date: 'Пт. 30 окт.',
			name: 'Константинова-Щедрина А.А.',
			specialty: 'офтальмолог',
			cabinet: 'ГП №128, (к. 140)',
			schedule: '',
			appointment: [

			],
			status: 'Врач на больничном'
		}, {
			id: 5,
			date: 'Пн. 2 нояб.',
			name: 'Григорьева Г.Г.',
			specialty: 'терапевт',
			cabinet: 'ГП №128, (к. 110)',
			schedule: '10:00-20:00',
			appointment: [
				{
					time: '14:00-15:00',
					desc: 'Врач не работает'
				}

			],
			status: ''
		}, {
			id: 6,
			date: 'Пн. 2 нояб.',
			name: 'Сидорова С.С.',
			specialty: 'терапевт',
			cabinet: 'ГП №128, (к. 120)',
			schedule: '08:00-15:00',
			appointment: [

			],
			status: ''
		}, {
			id: 7,
			date: 'Вт. 3 нояб.',
			name: 'Григорьева Г.Г.',
			specialty: 'терапевт',
			cabinet: 'ГП №128, (к. 110)',
			schedule: '08:00-18:00',
			appointment: [

			],
			status: ''
		}, {
			id: 8,
			date: 'Ср 4 нояб.',
			name: 'Григорьева Г.Г.',
			specialty: 'терапевт',
			cabinet: 'ГП №128, (к. 110)',
			schedule: '10:00-21:00',
			appointment: [

			],
			status: ''
		}, {
			id: 9,
			date: 'Ср 4 нояб.',
			name: 'Сидорова С.С.',
			specialty: 'терапевт',
			cabinet: 'ГП №128, (к. 120)',
			schedule: '11:00-16:00',
			appointment: [

			],
			status: ''
		}, {
			id: 10,
			date: 'Пт. 6 нояб.',
			name: 'Григорьева Г.Г.',
			specialty: 'терапевт',
			cabinet: 'ГП №128, (к. 110)',
			schedule: '09:00-21:00',
			appointment: [

			],
			status: ''
		}
	];

	const hours = [
		'4:00', '4:30', '5:00', '5:30', '6:00', '6:30', '7:00', '7:30', '8:00', '8:30',
		'9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
		'14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30',
		'19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30'
	];

	return (
		<div className="calendar">
			<div className="calendar__container">
				{ !props.selectDate ?
					<span>Для просмотра расписания выберите хотя бы один Доступный ресурс.</span> :
					makeCalendar()
				}
			</div>
		</div>
	)
};