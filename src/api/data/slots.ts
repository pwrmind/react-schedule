export interface Slot {
	id: number;
	visitDate: Date;
	status: number;
	patientId: number;
	duration: number;
}

const slotList: Array<Slot> = [
	{
		id: 0,
		visitDate: new Date(2020, 11, 5),
		status: 0,
		patientId: 0,
		duration: 30
	},
];

export default slotList;
