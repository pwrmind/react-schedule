import patientList, { Patient } from './data/patients';
import resourceList, { Resource } from './data/resources';
import scheduleList, { Schedule } from './data/schedules';
import slotList, { Slot } from './data/slots';

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
	public getPatients(): Promise<Array<Patient>> {
		this._isLoading['getPatients'] = true;

		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(patientList);
				this._isLoading['getPatients'] = false;
			}, this._latency)
		});
	}

	public postPatient(patient: Patient): Promise<Array<Patient>> {
		this._isLoading['postPatient'] = true;

		return new Promise((resolve, reject) => {
			patientList.push(patient);

			setTimeout(() => {
				resolve(patientList);
				this._isLoading['postPatient'] = false;
			}, this._latency)
		});
	}

	public delPatient(id: number): Promise<Array<Patient>> {
		this._isLoading['delPatient'] = true;

		return new Promise((resolve, reject) => {
			const i: number = patientList.findIndex((patient: Patient) => patient.id === id);
			patientList.splice(i, 1);

			setTimeout(() => {
				resolve(patientList);
				this._isLoading['delPatient'] = false;
			}, this._latency)
		});
	}

	// Resources
	public getResources(): Promise<Array<Resource>> {
		this._isLoading['getResources'] = true;

		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(resourceList);
				this._isLoading['getResources'] = false;
			}, this._latency)
		});
	}

	public postResource(resource: Resource): Promise<Array<Resource>> {
		this._isLoading['postResource'] = true;

		return new Promise((resolve, reject) => {
			resourceList.push(resource);

			setTimeout(() => {
				resolve(resourceList);
				this._isLoading['postResource'] = false;
			}, this._latency)
		});
	}

	public delResource(id: number): Promise<Array<Resource>> {
		this._isLoading['delResource'] = true;

		return new Promise((resolve, reject) => {
			const i: number = resourceList.findIndex((resource: Resource) => resource.id === id);
			resourceList.splice(i, 1);

			setTimeout(() => {
				resolve(resourceList);
				this._isLoading['delResource'] = false;
			}, this._latency)
		});
	}

	// Schedules
	public getSchedules(): Promise<Array<Schedule>> {
		this._isLoading['getSchedules'] = true;

		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(scheduleList);
				this._isLoading['getSchedules'] = false;
			}, this._latency)
		});
	}

	public postSchedule(schedule: Schedule): Promise<Array<Schedule>> {
		this._isLoading['postSchedule'] = true;

		return new Promise((resolve, reject) => {
			scheduleList.push(schedule);

			setTimeout(() => {
				resolve(scheduleList);
				this._isLoading['postSchedule'] = false;
			}, this._latency)
		});
	}

	public delSchedule(id: number): Promise<Array<Schedule>> {
		this._isLoading['delSchedule'] = true;

		return new Promise((resolve, reject) => {
			const i: number = scheduleList.findIndex((schedule: Schedule) => schedule.id === id);
			scheduleList.splice(i, 1);

			setTimeout(() => {
				resolve(scheduleList);
				this._isLoading['delSchedule'] = false;
			}, this._latency)
		});
	}

	// Slots
	public getSlots(): Promise<Array<Slot>> {
		this._isLoading['getSlots'] = true;

		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(slotList);
				this._isLoading['getSlots'] = false;
			}, this._latency)
		});
	}

	public postSlot(slot: Slot): Promise<Array<Slot>> {
		this._isLoading['postSlot'] = true;

		return new Promise((resolve, reject) => {
			slotList.push(slot);

			setTimeout(() => {
				resolve(slotList);
				this._isLoading['postSlot'] = false;
			}, this._latency)
		});
	}

	public delSlot(id: number): Promise<Array<Slot>> {
		this._isLoading['delSlot'] = true;

		return new Promise((resolve, reject) => {
			const i: number = slotList.findIndex((slot: Slot) => slot.id === id);
			slotList.splice(i, 1);

			setTimeout(() => {
				resolve(slotList);
				this._isLoading['delSlot'] = false;
			}, this._latency)
		});
	}
}

export default new API();
