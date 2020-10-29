import React, { Component } from "react";
import "./Calendar.scss";

export const Calendar: React.FC<any> = () => {
	const columns = [
		{
			id: 1,
			date: 'Пт. 30 окт.',
			name: 'Григорьева Г.Г.',
			specialty: 'терапевт',
			cabinet: 'ГП №128, (к. 110)'
		}, {
			id: 2,
			date: 'Пт. 30 окт.',
			name: 'Сидорова С.С.',
			specialty: 'терапевт',
			cabinet: 'ГП №128, (к. 120)'
		}, {
			id: 3,
			date: 'Пт. 30 окт.',
			name: 'Елисеева Е.Е.',
			specialty: 'офтальмолог',
			cabinet: 'ГП №128, (к. 130)'
		}, {
			id: 4,
			date: 'Пт. 30 окт.',
			name: 'Константинова-Щедрина А.А.',
			specialty: 'офтальмолог',
			cabinet: 'ГП №128, (к. 140)'
		}, {
			id: 5,
			date: 'Пн. 2 нояб.',
			name: 'Григорьева Г.Г.',
			specialty: 'терапевт',
			cabinet: 'ГП №128, (к. 110)'
		}, {
			id: 6,
			date: 'Пн. 2 нояб.',
			name: 'Сидорова С.С.',
			specialty: 'терапевт',
			cabinet: 'ГП №128, (к. 120)'
		}, {
			id: 7,
			date: 'Вт. 3 нояб.',
			name: 'Григорьева Г.Г.',
			specialty: 'терапевт',
			cabinet: 'ГП №128, (к. 110)'
		}, {
			id: 8,
			date: 'Ср 4 нояб.',
			name: 'Григорьева Г.Г.',
			specialty: 'терапевт',
			cabinet: 'ГП №128, (к. 110)'
		}, {
			id: 9,
			date: 'Ср 4 нояб.',
			name: 'Сидорова С.С.',
			specialty: 'терапевт',
			cabinet: 'ГП №128, (к. 120)'
		}, {
			id: 10,
			date: 'Пт. 6 нояб.',
			name: 'Григорьева Г.Г.',
			specialty: 'терапевт',
			cabinet: 'ГП №128, (к. 110)'
		}
	];

	const hours = [
		'4:00', '4:30', '5:00', '5:30', '6:00', '6:30', '7:00', '7:30', '8:00', '8:30',
		'9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
		'14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30',
		'19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30'
	];

	const scroll = (e: any) => {
		const header: any = document.getElementById('header');
		if (e.currentTarget.scrollTop > 0) {
			if (e.currentTarget.style.marginTop === '' || parseInt(e.currentTarget.style.marginTop) === 0) {
				e.currentTarget.style.marginTop = header.offsetHeight + 'px';
				header.style.position = 'absolute';
				header.style.top = '0';
			}
		}
		else {
			e.currentTarget.style.marginTop = 0;
			header.style.position = 'relative';
		}
	};

	return (
		<div className="calendar">
			<div className="calendar__container">
				{ 0 ?
					<span>Для просмотра расписания выберите хотя бы один Доступный ресурс.</span> :
					<div className="calendar__schedule">
						<div className="calendar__schedule--header" id="header">
						{columns.map((column, index) => (
							<div className="calendar__schedule--header-column" key={column.id}>
								<div className="calendar__schedule--header-column-day">{column.date}</div>
								<div className="calendar__schedule--header-column-name">{column.name}</div>
								<div className="calendar__schedule--header-column-specialty">{column.specialty}</div>
								<div className="calendar__schedule--header-column-cabinet">{column.cabinet}</div>
							</div>
						))}
						</div>
						<div className="calendar__schedule--body" id="body">
							{columns.map((column, index) => (
								<div className="calendar__schedule--body-column" key={column.id}>
									{hours.map((hour, index) => (
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