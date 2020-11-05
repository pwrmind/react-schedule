import React, { Component } from 'react';

import API from 'api/api';
import './Schedule.scss';

import LeftPanel from './LeftPanel/LeftPanel';
import { FilterPanel } from './FilterPanel/FilterPanel';
import { Calendar } from './Calendar/Calendar';

export default class Schedule extends Component<any> {
	private _apiService = API;

	public state = {
		selectDate: '',
		filterDays: 7,
		resources: []
	};

	public componentDidMount(): void {
		this._apiService.getResources()
			.then((resources: any) => {
				console.log('getResources:', resources);

				this.setState({
					resources
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

	render() {
		return (
			<div className="schedule">
				<LeftPanel click={this.selectDate}></LeftPanel>
				<div className="schedule__container">
					<FilterPanel click={this.filterDays}></FilterPanel>
					{this.state.resources.length ? <Calendar resources={this.state.resources} selectDate={this.state.selectDate} filterDays={this.state.filterDays}></Calendar> : null}
				</div>
			</div>
		)
	}
};