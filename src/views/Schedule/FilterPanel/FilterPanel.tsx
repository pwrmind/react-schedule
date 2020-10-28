import React, { Component } from "react";
import "./FilterPanel.scss";

export const FilterPanel: React.FC<any> = () => {
	return (
		<div className="filter-panel">
			<div className="filter-panel__container">
				<h1 className="filter-panel__header">Расписание специалистов</h1>
				<div className="filter-panel__buttons-wrapper">
					<button className="filter-panel__button">1 день</button>
					<button className="filter-panel__button">2 дня</button>
					<button className="filter-panel__button">Неделя</button>
				</div>
			</div>
		</div>
	)
};