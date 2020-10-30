import React, { Component } from "react";
import { LeftPanel } from "./LeftPanel/LeftPanel"
import { FilterPanel } from "./FilterPanel/FilterPanel"
import { Calendar } from "./Calendar/Calendar"
import "./Schedule.scss";

export default class Schedule extends Component<any> {
	render() {
		return (
			<div className="schedule">
				<LeftPanel></LeftPanel>
				<div className="schedule__container">
					<FilterPanel></FilterPanel>
					<Calendar></Calendar>
				</div>
			</div>
		)
	}
};