import { IResource } from './resources';

export interface IClinic {
	name: string;
	roomNumber: number;
}

export interface IQuota {
	quotaStart: string;
	quotaEnd: string;
	quotaDays?: number[];
	name: string;
	active: boolean;
}

export interface IDayOff {
	reason: string;
	dayOffStart: Date;
	dayOffEnd: Date;
}

export interface ISchedule {
	id: number;
	clinic: IClinic;
	resourceId: number;
	resource?: IResource;
	workStart: string;
	workEnd: string;
	workDays: number[];
	workMonth?: number;
	timeGrid: number;
	quotas: IQuota[];
	dayOff?: IDayOff;
}

const scheduleList: Array<ISchedule> = [
	{
		id: 0,
		clinic: {
			name: 'ГП №128',
			roomNumber: 110,
		},
		resourceId: 0,
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
			}
		]
	},
	{
		id: 1,
		clinic: {
			name: 'ГП №128',
			roomNumber: 120,
		},
		resourceId: 1,
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
				active: false
			}
		]
	},
	{
		id: 2,
		clinic: {
			name: 'ГП №128',
			roomNumber: 130,
		},
		resourceId: 1,
		workStart: '14:00',
		workEnd: '18:00',
		workDays: [5, 6],
		workMonth: 1,
		timeGrid: 10,
		quotas: [
			{
				quotaStart: '14:00',
				quotaEnd: '18:00',
				name: 'Запись на прием',
				active: true
			}
		]
	},
	{
		id: 3,
		clinic: {
			name: 'ГП №128',
			roomNumber: 140,
		},
		resourceId: 2,
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
				active: false
			},
			{
				quotaStart: '16:20',
				quotaEnd: '16:40',
				name: 'Работа с документами',
				active: false
			}
		],
		dayOff: {
			reason: 'Врач на больничном',
			dayOffStart: new Date(2020, 10, 25),
			dayOffEnd: new Date(2020, 10, 25)
		}
	},
	{
		id: 4,
		clinic: {
			name: 'ГП №128',
			roomNumber: 150,
		},
		resourceId: 3,
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
		],
		dayOff: {
			reason: 'Врач в отпуске',
			dayOffStart: new Date(2020, 10, 27),
			dayOffEnd: new Date(2020, 10, 28)
		}
	}
];

export default scheduleList;
