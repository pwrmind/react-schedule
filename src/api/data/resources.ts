export interface Resource {
	id: number;
	name: string;
	specialty: string;
	workPlace: string;
	roomNumber: number;
	description: string;
}

const resourceList: Array<Resource> = [
	{
		id: 0,
		name: 'Григорьева Г.Г.',
		specialty: 'Терапевт',
		workPlace: 'ГП №128',
		roomNumber: 110,
		description: 'description'
	},
	{
		id: 1,
		name: 'Сидорова С.С.',
		specialty: 'Терапевт',
		workPlace: 'ГП №128',
		roomNumber: 120,
		description: 'description'
	},
	{
		id: 2,
		name: 'Сидорова С.С.',
		specialty: 'Терапевт',
		workPlace: 'ГП №128',
		roomNumber: 130,
		description: 'description'
	},
	{
		id: 3,
		name: 'Елисеева Е.Е.',
		specialty: 'Офтальмолог',
		workPlace: 'ГП №128',
		roomNumber: 140,
		description: 'description'
	},
	{
		id: 4,
		name: 'Константинова-Щедрина А.А.',
		specialty: 'Офтальмолог',
		workPlace: 'ГП №128',
		roomNumber: 150,
		description: 'description'
	}
];

export default resourceList;