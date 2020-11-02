import React, { Component } from "react";
import "./FilterPanel.scss";

export const FilterPanel: React.FC<any> = (props) => {
	const {
		click
	} = props;

	const daysFilter = (e: any) => {
		props.click(e.currentTarget.dataset.days);
	};

	return (
		<div className="filter-panel">
			<div className="filter-panel__container">
				<h1 className="filter-panel__header">Расписание специалистов</h1>
				<div className="filter-panel__buttons-wrapper">
					<button className="filter-panel__button" data-days="1" onClick={daysFilter}>1 день</button>
					<button className="filter-panel__button" data-days="2" onClick={daysFilter}>2 дня</button>
					<button className="filter-panel__button" data-days="7" onClick={daysFilter}>Неделя</button>
				</div>
			</div>
		</div>
	)
};