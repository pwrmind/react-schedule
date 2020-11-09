export interface IResource {
	id: number;
	name: string;
	specialty: string;
	// workPlace: string;
	// roomNumber: number;
	description: string;
}

// interface Schedule {
// 	workStart: string;
// 	workEnd: string;
// 	workDays: number[];
// 	workMonth?: number;
// 	timeGrid: number;
// }

const resourceList: Array<IResource> = [
	{
		id: 0,
		name: 'Григорьева Г.Г.',
		specialty: 'Терапевт',
		// workPlace: 'ГП №128',
		// roomNumber: 110,
		description: 'description'
	},
	{
		id: 1,
		name: 'Сидорова С.С.',
		specialty: 'Терапевт',
		// workPlace: 'ГП №128',
		// roomNumber: 120,
		description: 'description'
	},
	{
		id: 2,
		name: 'Елисеева Е.Е.',
		specialty: 'Офтальмолог',
		// workPlace: 'ГП №128',
		// roomNumber: 140,
		description: 'description'
	},
	{
		id: 3,
		name: 'Константинова-Щедрина А.А.',
		specialty: 'Офтальмолог',
		// workPlace: 'ГП №128',
		// roomNumber: 150,
		description: 'description'
	}
];

export default resourceList;