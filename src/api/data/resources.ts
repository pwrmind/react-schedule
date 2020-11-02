export interface Resource {
	id: number;
	name: string;
	specialty: string;
	workPlace: string;
	roomNumber: number;
	description: string;
	schedule: Schedule;
}

interface Schedule {
	workStart: string;
	workEnd: string;
	workDays: number[];
	workMonth?: number;
	timeGrid: number;
	quotas?: Quota[];
}

interface Quota {
	quotaStart: string;
	quotaEnd: string;
	quotaDays?: number[];
	name: string;
	active: boolean;
}

const resourceList: Array<Resource> = [
	{
		id: 0,
		name: 'Григорьева Г.Г.',
		specialty: 'Терапевт',
		workPlace: 'ГП №128',
		roomNumber: 110,
		description: 'description',
		schedule: {
			workStart: '10:00',
			workEnd: '20:00',
			workDays: [1, 2, 3, 4, 5],
			workMonth: 2,
			timeGrid: 30,
			quotas: [
				{
					quotaStart: '10:00',
					quotaEnd: '14:00',
					name: 'Запись на прием',
					active: true
				},
				{
					quotaStart: '14:00',
					quotaEnd: '15:00',
					name: 'Врач не работает',
					active: false
				},
				{
					quotaStart: '15:00',
					quotaEnd: '20:00',
					name: 'Запись на прием',
					active: true
				},
			]
		}
	},
	{
		id: 1,
		name: 'Сидорова С.С.',
		specialty: 'Терапевт',
		workPlace: 'ГП №128',
		roomNumber: 120,
		description: 'description',
		schedule: {
			workStart: '08:00',
			workEnd: '15:00',
			workDays: [1, 2, 3, 4],
			workMonth: 2,
			timeGrid: 30,
			quotas: [
				{
					quotaStart: '10:00',
					quotaEnd: '15:00',
					name: 'Запись на прием',
					active: true
				},
				{
					quotaStart: '10:00',
					quotaEnd: '15:00',
					quotaDays: [1],
					name: 'Обучение',
					active: true
				}
			]
		}
	},
	{
		id: 2,
		name: 'Сидорова С.С.',
		specialty: 'Терапевт',
		workPlace: 'ГП №128',
		roomNumber: 130,
		description: 'description',
		schedule: {
			workStart: '14:00',
			workEnd: '18:00',
			workDays: [5, 6],
			workMonth: 2,
			timeGrid: 10,
			quotas: [
				{
					quotaStart: '14:00',
					quotaEnd: '18:00',
					name: 'Запись на прием',
					active: true
				}
			]
		}
	},
	{
		id: 3,
		name: 'Елисеева Е.Е.',
		specialty: 'Офтальмолог',
		workPlace: 'ГП №128',
		roomNumber: 140,
		description: 'description',
		schedule: {
			workStart: '08:00',
			workEnd: '18:00',
			workDays: [1, 2, 3, 4, 5],
			workMonth: 2,
			timeGrid: 30,
			quotas: [
				{
					quotaStart: '10:00',
					quotaEnd: '17:45',
					name: 'Запись на прием',
					active: true
				},
				{
					quotaStart: '14:30',
					quotaEnd: '14:55',
					name: 'Работа с документами',
					active: true
				},
				{
					quotaStart: '16:20',
					quotaEnd: '16:40',
					name: 'Работа с документами',
					active: true
				}
			]
		}
	},
	{
		id: 4,
		name: 'Константинова-Щедрина А.А.',
		specialty: 'Офтальмолог',
		workPlace: 'ГП №128',
		roomNumber: 150,
		description: 'description',
		schedule: {
			workStart: '09:00',
			workEnd: '21:00',
			workDays: [2, 3, 4, 5, 6],
			timeGrid: 30,
			quotas: [
				{
					quotaStart: '09:00',
					quotaEnd: '21:00',
					quotaDays: [3, 4, 5, 6],
					name: 'Запись на прием',
					active: true
				}
			]
		}
	}
];

export default resourceList;