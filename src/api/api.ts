import patientList, { Patient } from './data/patients';
import resourceList, { Resource } from './data/resources';

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
}

export default new API();
