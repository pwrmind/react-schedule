import React, { Component } from "react";
import './App.scss';
import Schedule from './views/Schedule/Schedule';

export default class App extends Component {
	render() {
		return (
			<>
				<div className="App">
					<header className="App-header"></header>
					<Schedule/>
				</div>
			</>
		);
	}
}
