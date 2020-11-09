import React, { Component } from 'react';

import { IResource } from 'api/data/resources';
import { ISchedule } from 'api/data/schedules';
import API from 'api/api';

import LeftPanel from './LeftPanel/LeftPanel';
import { FilterPanel } from './FilterPanel/FilterPanel';
import Calendar from './Calendar/Calendar';

import './Schedule.scss';

interface IScheduleState {
	selectDate: any;
	filterDays: number;
	resources: Array<IResource>,
	schedules: Array<ISchedule>,
	selectResource: Array<IResource>
}

export default class Schedule extends Component {
	private _apiService = API;

	public state: IScheduleState = {
		selectDate: '',
		filterDays: 7,
		resources: [],
		schedules: [],
		selectResource: []
	};

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

				this.setState({
					schedules
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

	render() {
		return (
			<div className="schedule">
				<LeftPanel
					resources={this.state.resources}
					schedules={this.state.schedules}
					click={this.selectDate}
					selectResource={this.selectResource}
				/>

				<div className="schedule__container">
					<FilterPanel
						click={this.filterDays}
						filter={this.state.filterDays}
						enabled={!!this.state.selectDate}
					/>

					{this.state.resources.length ? (
						<Calendar
							// resources={this.state.resources}
							schedules={this.state.schedules}
							selectDate={this.state.selectDate}
							selectResource={this.state.selectResource}
							filterDays={this.state.filterDays}
						/>
					 ) : null}
				</div>
			</div>
		)
	}
};