export interface IPatient {
	id: number;
	name?: string;
	lName: string;
	fName: string;
	mName: string;
	bDay: Date;
	OMS: number;
}

const patientList: Array<IPatient> = [
	{
		id: 0,
		lName: 'Иванов',
		fName: 'Иван',
		mName: 'Иванович',
		bDay: new Date(2011, 10, 11),
		OMS: 1111111111111111
	},
	{
		id: 1,
		lName: 'Алексеев',
		fName: 'Алексей',
		mName: 'Алексеевич',
		bDay: new Date(1922, 11, 12),
		OMS: 2222222222222222
	},
	{
		id: 2,
		lName: 'Петров',
		fName: 'Петр',
		mName: 'Петрович',
		bDay: new Date(1990, 0, 1),
		OMS: 3333333333333333
	},
	{
		id: 3,
		lName: 'Сергеев',
		fName: 'Сергей',
		mName: 'Сергеевич',
		bDay: new Date(2002, 1, 2),
		OMS: 4444444444444444
	},
	{
		id: 4,
		lName: 'Васильев',
		fName: 'Василий',
		mName: 'Васильевич',
		bDay: new Date(1949, 8, 9),
		OMS: 5555555555555555
	}
];

export default patientList;