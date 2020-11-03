import React, { Component } from "react";
import "./FilterPanel.scss";

export const FilterPanel: React.FC<any> = (props) => {
	const {
		click,
		filter
	} = props;

	const daysFilter = (num: number) => {
		props.click(num);
	};

	return (
		<div className="filter-panel">
			<div className="filter-panel__container">
				<h1 className="filter-panel__header">Расписание специалистов</h1>
				<div className="filter-panel__buttons-wrapper">
					<button className={"filter-panel__button" + (props.filter === 1 ? ' active' : '')} onClick={() => {daysFilter(1)}}>1 день</button>
					<button className={"filter-panel__button" + (props.filter === 2 ? ' active' : '')} onClick={() => {daysFilter(2)}}>2 дня</button>
					<button className={"filter-panel__button" + (props.filter === 7 ? ' active' : '')} onClick={() => {daysFilter(7)}}>Неделя</button>
				</div>
			</div>
		</div>
	)
};