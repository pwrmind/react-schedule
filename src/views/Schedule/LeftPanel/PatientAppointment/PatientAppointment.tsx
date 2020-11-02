import React, { Component } from 'react';

import './PatientAppointment.scss';

interface PatientAppointmentProps {
	patients: any[];
}

export default class PatientAppointment extends Component<PatientAppointmentProps> {
	static defaultProps: PatientAppointmentProps = {
		patients: []
	};
	
	public state = {
		patients: [],
		searchPatients: [],
		patient: null,
		panelOpened: false,
		logoutOpened: false
	};

	public componentDidMount(): void {
		this.setState({
			patients: this.props.patients,
			searchPatients: this.props.patients
		})
	}

	public togglePanel = () => {
		this.setState({
			panelOpened: !this.state.panelOpened
		})
	};

	public openPanel = () => {
		this.setState({
			panelOpened: true
		})
	};

	public toggleLogout = () => {
		this.setState({
			logoutOpened: !this.state.logoutOpened
		})
	};

	public searchPatient = (e: any) => {
		const search = e.currentTarget.value;
		if (search === '') {
			this.setState({
				searchPatients: this.state.patients
			});
		}
		else {
			this.setState({
				searchPatients: this.state.patients.filter((patient: any) => patient.name.includes(search))
			});
		}
	};

	public selectPatient = (patient: any) => {
		this.setState({
			patient: patient
		});
		this.togglePanel();
	};

	public logoutPatient = () => {
		this.setState({
			patient: null
		});
		this.toggleLogout();
	};

	public makeBody = () => {
		const patient: any = this.state.patient;

		if (patient === null) {
			return (
				<div className="patient-appointment__body">
					<input className="patient-appointment__body-input" placeholder="Введите текст для поиска" onFocus={this.openPanel} onChange={this.searchPatient}/>
					<button className="patient-appointment__body-button" onClick={this.togglePanel}>🔍</button>
				</div>
			)
		}
		else {
			return (
				<div className="patient-appointment__body">
					<div className="patient-appointment__body-result">
						<p>{patient.name},</p>
						<p>{patient.bDay.getDate()}.{patient.bDay.getMonth()}.{patient.bDay.getFullYear()} г.р.</p>
						<p>Полис ОМС: {patient.OMS}</p>
					</div>
				</div>
			)
		}


	}
	
	render() {
		return (
			<div className="patient-appointment__root">
				<div className="patient-appointment__header">
					<h1 className="patient-appointment__header-text">Пациент</h1>
					<button className="patient-appointment__header-button" disabled={!this.state.patient} onClick={this.toggleLogout}>▼</button>
					<div className={"patient-appointment__header-list" + (this.state.logoutOpened ? '' : ' closed')}>
						<div className="patient-appointment__header-list_option" onClick={this.logoutPatient}>✖ Завершить работу с пациентом</div>
					</div>
				</div>
				{this.makeBody()}
				<div className={"patient-appointment__footer" + (this.state.panelOpened ? '' : ' closed')}>
					<div className="patient-appointment__footer-list">
						{this.state.searchPatients.map((patient: any) => (
							<div className="patient-appointment__footer-list_patient" key={patient.id} onClick={() => {this.selectPatient(patient)}}>{patient.name}</div>
						))}
						{this.state.searchPatients.length ? null : <div className="patient-appointment__footer-list_nopatient">Пациент не найден</div>}
					</div>
				</div>
			</div>
		);
	}
}
