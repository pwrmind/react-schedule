export interface IResource {
	id: number;
	name: string;
	specialty: string;
}

const resourceList: Array<IResource> = [
	{
		id: 0,
		name: 'Григорьева Г.Г.',
		specialty: 'Терапевт'
	},
	{
		id: 1,
		name: 'Сидорова С.С.',
		specialty: 'Терапевт'
	},
	{
		id: 2,
		name: 'Елисеева Е.Е.',
		specialty: 'Офтальмолог'
	},
	{
		id: 3,
		name: 'Константинова-Щедрина А.А.',
		specialty: 'Офтальмолог'
	}
];

export default resourceList;