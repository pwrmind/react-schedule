export interface Patient {
	id: number;
	name: string;
	bDay: Date;
	OMS: number;
}

const patientList: Array<Patient> = [
	{
		id: 0,
		name: 'Иванов Иван Иванович',
		bDay: new Date('11.11.2011'),
		OMS: 1111111111111111
	},
	{
		id: 1,
		name: 'Алексеев Алексей Алексеевич',
		bDay: new Date('12.12.1922'),
		OMS: 2222222222222222
	},
	{
		id: 2,
		name: 'Петров Петр Петрович',
		bDay: new Date('01.01.1990'),
		OMS: 3333333333333333
	},
	{
		id: 3,
		name: 'Сергеев Сергей Сергеевич',
		bDay: new Date('02.02.2002'),
		OMS: 4444444444444444
	},
	{
		id: 4,
		name: 'Васильев Василий Васильевич',
		bDay: new Date('09.09.1949'),
		OMS: 5555555555555555
	}
];

export default patientList;