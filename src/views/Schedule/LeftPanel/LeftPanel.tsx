import React, { Component } from 'react';

import { IPatient } from 'api/data/patients';
import { IResource } from 'api/data/resources';
import { ISchedule } from 'api/data/schedules';
import API from 'api/api';

import DateAppointment from './DateAppointment/DateAppointment';
import PatientAppointment from './PatientAppointment/PatientAppointment';
import ResourceAppointment from './ResourceAppointment/ResourceAppointment';

import './LeftPanel.scss';

interface LeftPanelProps {
	click: Function;
	selectResource: Function;
}

export default class LeftPanel extends Component<LeftPanelProps> {
	private _apiService = API;

	static defaultProps: LeftPanelProps = {
		click: Function.prototype,
		selectResource: Function.prototype
	};

	public state = {
		patient: null,
		patients: [],
		resource: [],
		resources: [],
		schedules: [],
	};

	public componentDidMount(): void {
		this._apiService.getPatients()
		.then((patients: IPatient[]) => {
			console.log('getPatients:', patients);

			this.setState({
				patients
			});
		});

		this._apiService.getResources()
		.then((resources: IResource[]) => {
			console.log('getResources:', resources);

			this.setState({
				resources
			});
		});

		this._apiService.getSchedules()
		.then((schedules: ISchedule[]) => {
			console.log('getSchedules:', schedules);

			this.setState({
				schedules
			});
		});
	}

	public changeDate = (date: any) => {
		this.props.click(date);
	};

	public setPatient = (patient: any) => {
		this.setState({patient});
	};

	public setResource = (resource: IResource[]) => {
		this.setState({resource});
		this.props.selectResource(resource);
	};

	render() {
		return (
			<div className="left-panel">
				<div className="left-panel__container">
					<div className="left-panel__patient">
						<PatientAppointment
							patients={this.state.patients}
							onSetPatient={(patient: any) => {this.setPatient(patient)}}
						/>
					</div>

					<div className="left-panel__date">
						<DateAppointment
							resource={this.state.resource}
							setDate={this.changeDate}
						/>
					</div>

					<div className="left-panel__specialists">
						<ResourceAppointment
							resources={this.state.resources}
							onSetResource={(resources: Array<IResource>) => {this.setResource(resources)}}
						/>
					</div>
				</div>
			</div>
		)
	}
};