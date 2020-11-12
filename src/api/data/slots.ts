export interface ISlot extends INewSlot{
	id: number;
}

export interface INewSlot {
	visitDate: Date;
	status: number;
	scheduleId: number;
	patientId?: number;
	resourceId: number;
	interval: string;
}

const slotList: Array<ISlot> = [
	{
		id: 0,
		visitDate: new Date(2020, 10, 10),
		status: 0,
		scheduleId: 0,
		patientId: 0,
		resourceId: 0,
		interval: '10:00'
	},
	{
		id: 1,
		visitDate: new Date(2020, 10, 10),
		status: 0,
		scheduleId: 0,
		patientId: 1,
		resourceId: 0,
		interval: '10:00'
	},
	{
		id: 2,
		visitDate: new Date(2020, 10, 10),
		status: 0,
		scheduleId: 0,
		patientId: 2,
		resourceId: 0,
		interval: '10:30'
	},
	{
		id: 3,
		visitDate: new Date(2020, 10, 9),
		status: 0,
		scheduleId: 1,
		patientId: 3,
		resourceId: 1,
		interval: '10:30'
	},
];

export default slotList;
