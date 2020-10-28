import React, { Component } from "react";
import "./Calendar.scss";

export const Calendar: React.FC<any> = () => {
	return (
		<div className="calendar">
			<div className="calendar__container">
				<span>Для просмотра расписания выберите хотя бы один Доступный ресурс.</span>
			</div>
		</div>
	)
};