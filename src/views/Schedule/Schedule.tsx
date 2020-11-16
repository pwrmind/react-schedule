import React, { Component } from 'react';

import { IResource } from 'api/data/resources';
import { ISchedule } from 'api/data/schedules';
import { ISlot } from 'api/data/slots';
import { IPatient } from 'api/data/patients';
import API from 'api/api';

import LeftPanel from './LeftPanel/LeftPanel';
import { FilterPanel } from './FilterPanel/FilterPanel';
import Calendar from './Calendar/Calendar';

import './Schedule.scss';

interface IScheduleState {
	selectDate: any;
	filterDays: number;
	resources: Array<IResource>;
	schedules: Array<ISchedule>;
	slots: Array<ISlot>;
	patients: Array<IPatient>;
	selectResource: Array<IResource>;
	selectPatient: IPatient | null;
}

export default class Schedule extends Component {
	private _apiService = API;

	public state: IScheduleState = {
		selectDate: '',
		filterDays: 7,
		resources: [],
		schedules: [],
		slots: [],
		patients: [],
		selectResource: [],
		selectPatient: null
	};

	public reloadSlots = (): void => {
		this._apiService.getSlots()
			.then((slots: ISlot[]) => {
				console.log('getSlots:', slots);

				this.setState({
					slots
				});
			});
	}

	public componentDidMount(): void {
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

				const resources = this.state.resources as IResource[];

				schedules.forEach((schedule: any) => schedule.resource = resources.find((resource: IResource) => resource.id === schedule.resourceId));

				this.setState({
					schedules
				});
			});

		this._apiService.getSlots()
			.then((slots: ISlot[]) => {
				console.log('getSlots:', slots);

				this.setState({
					slots
				});
			});

		this._apiService.getPatients()
			.then((patients: IPatient[]) => {
				console.log('getPatients:', patients);

				this.setState({
					patients
				});
			});
	}

	private filterDays = (day: number) => {
		this.setState({
			filterDays: day
		});
	};

	private selectDate = (date: any) => {
		this.setState({
			selectDate: date
		});
	};

	private selectResource = (date: any) => {
		this.setState({
			selectResource: date
		});
	};

	private selectPatient = (patient: IPatient) => {
		this.setState({
			selectPatient: patient
		});
	};

	render() {
		return (
			<div className="schedule">
				<LeftPanel
					resources={this.state.resources}
					schedules={this.state.schedules}
					click={this.selectDate}
					selectResource={this.selectResource}
					selectPatient={this.selectPatient}
				/>

				<div className="schedule__container">
					<FilterPanel
						click={this.filterDays}
						filter={this.state.filterDays}
						enabled={!!this.state.selectDate}
					/>

					{this.state.resources.length ? (
						<Calendar
							resources={this.state.resources}
							schedules={this.state.schedules}
							slots={this.state.slots}
							patients={this.state.patients}
							selectDate={this.state.selectDate}
							selectResource={this.state.selectResource}
							selectPatient={this.state.selectPatient}
							filterDays={this.state.filterDays}
							reload={this.reloadSlots}
						/>
					 ) : null}
				</div>
			</div>
		)
	}
};