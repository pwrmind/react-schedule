import patientList, { IPatient } from './data/patients';
import resourceList, { IResource } from './data/resources';
import scheduleList, { ISchedule } from './data/schedules';
import slotList, { ISlot } from './data/slots';

class API {
	private _latency: number = 30;
	private _isLoading: {[key: string]: boolean} = {};

	public get isLoading(): boolean {
		for (let key in this._isLoading) {
			if (this._isLoading[key]) {
				return true;
			}
		}

		return false;
	};

	// Patients
	public getPatients(): Promise<Array<IPatient>> {
		this._isLoading['getPatients'] = true;

		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(patientList);
				this._isLoading['getPatients'] = false;
			}, this._latency)
		});
	}

	public postPatient(patient: IPatient): Promise<Array<IPatient>> {
		this._isLoading['postPatient'] = true;

		return new Promise((resolve, reject) => {
			patientList.push(patient);

			setTimeout(() => {
				resolve(patientList);
				this._isLoading['postPatient'] = false;
			}, this._latency)
		});
	}

	public delPatient(id: number): Promise<Array<IPatient>> {
		this._isLoading['delPatient'] = true;

		return new Promise((resolve, reject) => {
			const i: number = patientList.findIndex((patient: IPatient) => patient.id === id);
			patientList.splice(i, 1);

			setTimeout(() => {
				resolve(patientList);
				this._isLoading['delPatient'] = false;
			}, this._latency)
		});
	}

	// Resources
	public getResources(): Promise<Array<IResource>> {
		this._isLoading['getResources'] = true;

		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(resourceList);
				this._isLoading['getResources'] = false;
			}, this._latency)
		});
	}

	public postResource(resource: IResource): Promise<Array<IResource>> {
		this._isLoading['postResource'] = true;

		return new Promise((resolve, reject) => {
			resourceList.push(resource);

			setTimeout(() => {
				resolve(resourceList);
				this._isLoading['postResource'] = false;
			}, this._latency)
		});
	}

	public delResource(id: number): Promise<Array<IResource>> {
		this._isLoading['delResource'] = true;

		return new Promise((resolve, reject) => {
			const i: number = resourceList.findIndex((resource: IResource) => resource.id === id);
			resourceList.splice(i, 1);

			setTimeout(() => {
				resolve(resourceList);
				this._isLoading['delResource'] = false;
			}, this._latency)
		});
	}

	// Schedules
	public getSchedules(): Promise<Array<ISchedule>> {
		this._isLoading['getSchedules'] = true;

		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(scheduleList);
				this._isLoading['getSchedules'] = false;
			}, this._latency)
		});
	}

	public postSchedule(schedule: ISchedule): Promise<Array<ISchedule>> {
		this._isLoading['postSchedule'] = true;

		return new Promise((resolve, reject) => {
			scheduleList.push(schedule);

			setTimeout(() => {
				resolve(scheduleList);
				this._isLoading['postSchedule'] = false;
			}, this._latency)
		});
	}

	public delSchedule(id: number): Promise<Array<ISchedule>> {
		this._isLoading['delSchedule'] = true;

		return new Promise((resolve, reject) => {
			const i: number = scheduleList.findIndex((schedule: ISchedule) => schedule.id === id);
			scheduleList.splice(i, 1);

			setTimeout(() => {
				resolve(scheduleList);
				this._isLoading['delSchedule'] = false;
			}, this._latency)
		});
	}

	// Slots
	public getSlots(): Promise<Array<ISlot>> {
		this._isLoading['getSlots'] = true;

		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(slotList);
				this._isLoading['getSlots'] = false;
			}, this._latency)
		});
	}

	public postSlot(slot: ISlot): Promise<Array<ISlot>> {
		this._isLoading['postSlot'] = true;

		return new Promise((resolve, reject) => {
			slot.id = slotList[slotList.length - 1].id + 1;
			console.log('slot', slot);
			slotList.push(slot);

			setTimeout(() => {
				resolve(slotList);
				this._isLoading['postSlot'] = false;
			}, this._latency)
		});
	}

	public delSlot(id: number): Promise<Array<ISlot>> {
		this._isLoading['delSlot'] = true;

		return new Promise((resolve, reject) => {
			const i: number = slotList.findIndex((slot: ISlot) => slot.id === id);
			slotList.splice(i, 1);

			setTimeout(() => {
				resolve(slotList);
				this._isLoading['delSlot'] = false;
			}, this._latency)
		});
	}
}

export default new API();
