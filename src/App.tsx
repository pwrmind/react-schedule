import React, { Component } from "react";
import API from './api/api';

import './App.scss';
import logo from './logo.svg';

import Preloader from './components/Preloader/Preloader';
import Schedule from './views/Schedule/Schedule';

export default class App extends Component {
	private _apiService = API;

	public componentDidMount(): void {
		this._apiService.getPatients()
		.then((data: any) => {
			console.log('getPatients:', data);
		});

		this._apiService.getResources()
		.then((data: any) => {
			console.log('getResources:', data);
		});
	}
	
	render() {
		return (
			<>
				<div className="App">
					<header className="App-header"></header>
					<Schedule/>
				</div>

				{/* { this._apiService ? <Preloader></Preloader> : null} */}
			</>
		);
	}
}
