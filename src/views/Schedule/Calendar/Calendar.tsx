import React, { Component } from "react";
import "./Calendar.scss";

export const Calendar: React.FC<any> = () => {
	const columns = [
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
				{ 0 ?
					<span>Для просмотра расписания выберите хотя бы один Доступный ресурс.</span> :
					<div className="calendar__schedule">
						<div className="calendar__schedule--header">
						{columns.map((column) => (
							<div className={"calendar__schedule--header-column" + (column.status ? ' warning' : '')} key={column.id}>
								<div className="calendar__schedule--header-column-day">{column.date}</div>
								<div className="calendar__schedule--header-column-name">{column.name}</div>
								<div className="calendar__schedule--header-column-specialty">{column.specialty}</div>
								<div className="calendar__schedule--header-column-cabinet">{column.cabinet}</div>
								<div className="calendar__schedule--header-column-schedule">{column.schedule}</div>
								{column.appointment.length ?
									<div className="calendar__schedule--header-column-schedule">{column.appointment.map((appointment, index) => (
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
						<div className="calendar__schedule--body" style={ {width: columns.length * 211 + 'px'} }>
							{columns.map((column) => (
								<div className={"calendar__schedule--body-column" + (column.status ? ' warning' : '')} key={column.id} style={ {height: hours.length * 30 + 'px'} }>
									{column.status ? '' : hours.map((hour, index) => (
										<div className="calendar__schedule--body-column-hour" key={index}>{hour}</div>
									))}
								</div>
							))}
						</div>
					</div>
				}
			</div>
		</div>
	)
};