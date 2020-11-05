import React, { Component } from 'react';

import { Patient } from 'api/data/patients';
import { Resource } from 'api/data/resources';
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
		resources: []
	};

	public componentDidMount(): void {
		this._apiService.getPatients()
		.then((patients: Patient[]) => {
			console.log('getPatients:', patients);

			this.setState({
				patients
			});
		});

		this._apiService.getResources()
		.then((resources: Resource[]) => {
			console.log('getResources:', resources);

			this.setState({
				resources
			});
		});
	}

	public changeDate = (date: any) => {
		this.props.click(date);
	};

	public setPatient = (patient: any) => {
		this.setState({patient});
	};

	public setResource = (resource: Resource[]) => {
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
							onSetResource={(resources: Array<Resource>) => {this.setResource(resources)}}
						/>
					</div>
				</div>
			</div>
		)
	}
};