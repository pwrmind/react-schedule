import React, { Component } from 'react';
import API from '../../../api/api';

import DateAppointment from './DateAppointment/DateAppointment';

import './LeftPanel.scss';

export default class LeftPanel extends Component {
	private _apiService = API;

	public state = {
		patients: [],
		resources: []
	};

	public componentDidMount(): void {
		this._apiService.getPatients()
		.then((patients: any) => {
			console.log('getPatients:', patients);

			this.setState({
				patients
			});
		});

		this._apiService.getResources()
		.then((resources: any) => {
			console.log('getResources:', resources);

			this.setState({
				resources
			});
		});
	}

	render() {
		return (
			<div className="left-panel">
				<div className="left-panel__container">
					<div className="left-panel__patient">
						{this.state.patients.length}
						<div className="left-panel__patient--header">
							<h1 className="left-panel__patient--header-text">Пациент</h1>
							<button className="left-panel__patient--header-button">▼</button>
						</div>
						<div className="left-panel__patient--body">
							<input className="left-panel__patient--body-input" placeholder="Введите текст для поиска"/>
							<button className="left-panel__patient--body-button">🔍</button>
						</div>
					</div>
					<div className="left-panel__date">
						<div className="left-panel__date--header">
							<h1 className="left-panel__date--header-text">Дата записи</h1>
						</div>

						<div className="left-panel__date--body">
							<DateAppointment/>
						</div>
					</div>
					<div className="left-panel__specialists">
						<div className="left-panel__specialists--header">
							<h1 className="left-panel__specialists--header-text">Специалисты <span>(0/0)</span></h1>
							<button className="left-panel__specialists--header-button">▼</button>
						</div>
						<div className="left-panel__specialists--body">
							<input className="left-panel__specialists--body-input" placeholder="Введите текст для поиска"/>
							<button className="left-panel__specialists--body-button">🔍</button>
						</div>
						<div className="left-panel__specialists--footer">
							<div className="left-panel__specialists--footer__buttons-wrapper">
								<button className="left-panel__specialists--footer-button">По специальностям</button>
								<button className="left-panel__specialists--footer-button">По алфавиту</button>
							</div>
							<div className="left-panel__specialists--footer__search-wrapper">
								<ul>
									<li>
										<label><input type="checkbox"/>Терапевты</label>
										<ul>
											<li><label><input type="checkbox"/>Григорьева Г.Г.</label></li>
											<li><label><input type="checkbox"/>Сидорова С.С.</label></li>
											<li><label><input type="checkbox"/>Сидорова С.С.</label></li>
										</ul>
									</li>
									<li>
										<label><input type="checkbox"/>Офтальмологи</label>
										<ul>
											<li><label><input type="checkbox"/>Елисеева Е.Е.</label></li>
											<li><label><input type="checkbox"/>Константинова-Щедрина А.А.</label></li>
										</ul>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
};