export interface Resource {
	id: number;
	name: string;
	workPlace: string;
	roomNumber: number;
	description: string;
}

const resourceList: Array<Resource> = [
	{
		id: 0,
		name: 'Григорьева Г.Г. Терапевт',
		workPlace: 'ГП №128',
		roomNumber: 110,
		description: 'description'
	},
	{
		id: 1,
		name: 'Григорьева Г.Г. Терапевт',
		workPlace: 'ГП №128',
		roomNumber: 120,
		description: 'description'
	},
	{
		id: 2,
		name: 'Григорьева Г.Г. Терапевт',
		workPlace: 'ГП №128',
		roomNumber: 130,
		description: 'description'
	},
	{
		id: 3,
		name: 'Григорьева Г.Г. Терапевт',
		workPlace: 'ГП №128',
		roomNumber: 140,
		description: 'description'
	},
	{
		id: 4,
		name: 'Григорьева Г.Г. Терапевт',
		workPlace: 'ГП №128',
		roomNumber: 150,
		description: 'description'
	}
];

export default resourceList;