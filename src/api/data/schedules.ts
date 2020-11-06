import { Resource } from './resources';

export interface Clinic {
	name: string;
	roomNumber: number;
}

export interface Schedule {
	id: number;
	clinic: Clinic;
	resource: Resource;
	workStart: string;
	workEnd: string;
	workDays: number[];
	workMonth?: number;
	timeGrid: number;
}

const scheduleList: Array<Schedule> = [
	{
		id: 0,
		clinic: {
			name: 'ГП №128',
			roomNumber: 110,
		},
		resource: {
			id: 0,
			name: 'Григорьева Г.Г.',
			specialty: 'Терапевт',
			description: 'description',
		},
		workStart: '10:00',
		workEnd: '20:00',
		workDays: [1, 2, 3, 4, 5],
		workMonth: 2,
		timeGrid: 30
	},
	{
		id: 1,
		clinic: {
			name: 'ГП №128',
			roomNumber: 120,
		},
		resource: {
			id: 1,
			name: 'Сидорова С.С.',
			specialty: 'Терапевт',
			description: 'description',
		},
		workStart: '08:00',
		workEnd: '15:00',
		workDays: [1, 2, 3, 4],
		workMonth: 1,
		timeGrid: 30,
		// quotas: [
		// 	{
		// 		quotaStart: '10:00',
		// 		quotaEnd: '15:00',
		// 		name: 'Запись на прием',
		// 		active: true
		// 	},
		// 	{
		// 		quotaStart: '10:00',
		// 		quotaEnd: '15:00',
		// 		quotaDays: [1],
		// 		name: 'Обучение',
		// 		active: false
		// 	}
		// ]
		// }
	},
	{
		id: 2,
		clinic: {
			name: 'ГП №128',
			roomNumber: 130,
		},
		resource: {
			id: 1,
			name: 'Сидорова С.С.',
			specialty: 'Терапевт',
			description: 'description',
		},
		workStart: '14:00',
		workEnd: '18:00',
		workDays: [5, 6],
		workMonth: 2,
		timeGrid: 10,
		// quotas: [
		// 	{
		// 		quotaStart: '14:00',
		// 		quotaEnd: '18:00',
		// 		name: 'Запись на прием',
		// 		active: true
		// 	}
		// ]
		// }
	},
	{
		id: 3,
		clinic: {
			name: 'ГП №128',
			roomNumber: 140,
		},
		resource: {
			id: 1,
			name: 'Елисеева Е.Е.',
			specialty: 'Офтальмолог',
			description: 'description',
		},
		workStart: '08:00',
		workEnd: '18:00',
		workDays: [1, 2, 3, 4, 5],
		workMonth: 2,
		timeGrid: 30,
		// quotas: [
		// 	{
		// 		quotaStart: '10:00',
		// 		quotaEnd: '17:45',
		// 		name: 'Запись на прием',
		// 		active: true
		// 	},
		// 	{
		// 		quotaStart: '14:30',
		// 		quotaEnd: '14:55',
		// 		name: 'Работа с документами',
		// 		active: false
		// 	},
		// 	{
		// 		quotaStart: '16:20',
		// 		quotaEnd: '16:40',
		// 		name: 'Работа с документами',
		// 		active: false
		// 	}
		// ]
		// }
	},
	{
		id: 4,
		clinic: {
			name: 'ГП №128',
			roomNumber: 150,
		},
		resource: {
			id: 1,
			name: 'Константинова-Щедрина А.А.',
			specialty: 'Офтальмолог',
			description: 'description',
		},
		workStart: '09:00',
		workEnd: '21:00',
		workDays: [2, 3, 4, 5, 6],
		timeGrid: 30,
		// quotas: [
		// 	{
		// 		quotaStart: '09:00',
		// 		quotaEnd: '21:00',
		// 		quotaDays: [3, 4, 5, 6],
		// 		name: 'Запись на прием',
		// 		active: true
		// 	}
		// ]
		// }
	}
];

export default scheduleList;
