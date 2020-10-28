import React, { Component } from "react";
import "./LeftPanel.scss";

export const LeftPanel: React.FC<any> = () => {
	return (
		<div className="left-panel">
			<div className="left-panel__container">
				<div className="left-panel__patient">
					<div className="left-panel__patient--header">
						<h1 className="left-panel__patient--header-text">Пациент</h1>
						<button className="left-panel__patient--header-button"></button>
					</div>
					<div className="left-panel__patient--body">
						<input className="left-panel__patient--body-input" placeholder="Введите текст для поиска"/>
						<button className="left-panel__patient--body-button"></button>
					</div>
				</div>
				<div className="left-panel__date">
					<div className="left-panel__date--header">
						<h1 className="left-panel__date--header-text">Дата записи</h1>
					</div>
					<div className="left-panel__date--body">
						<input className="left-panel__date--body-input" placeholder="ДД.ММ.ГГГГ"/>
						<button className="left-panel__date--body-button"></button>
					</div>
				</div>
				<div className="left-panel__specialists">
					<div className="left-panel__specialists--header">
						<h1 className="left-panel__specialists--header-text">Специалисты <span>(0/0)</span></h1>
						<button className="left-panel__specialists--header-button"></button>
					</div>
					<div className="left-panel__specialists--body">
						<input className="left-panel__specialists--body-input" placeholder="Введите текст для поиска"/>
						<button className="left-panel__specialists--body-button"></button>
					</div>
				</div>
			</div>
		</div>
	)
};