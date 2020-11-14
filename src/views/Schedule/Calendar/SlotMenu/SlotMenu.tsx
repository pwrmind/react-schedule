import React, { Component } from 'react';

import { ISlot, INewSlot } from 'api/data/slots';
import { IPatient } from 'api/data/patients';
import { ISchedule } from 'api/data/schedules';
import API from 'api/api';

import Modal from 'components/Modal/Modal';
import SlotPopup from '../SlotPopup/SlotPopup';

import './SlotMenu.scss';

interface SlotMenuProps {
	title: string;
	slot: boolean | ISlot;
	newSlot: INewSlot;
	freeSlot: boolean | ISlot;
	patientsInSlotId: number | null;
	oldHour: boolean;
	close?: Function;
	create?: Function;
	reload: Function;
	selectPatient: IPatient;
	patients: Array<IPatient>;
	schedules: Array<ISchedule>;
}

export default class SlotMenu extends Component<SlotMenuProps> {
	private _apiService = API;

	public state: any = {
		removeSlotActive: false,
		slotPopupActive: false,
		createPopupActive: false
	};

	public toggleModal = () => {
		this.setState({
			slotPopupActive: !this.state.slotPopupActive
		});
	};

	public finishCreateSlot = () => {
		if (this.props.create !== undefined) {
			this.props.create();
		}

		if (this.props.reload !== undefined) {
			this.props.reload();
		}

		this.onClose();
	}

	public createSlot = () => {
		const newSlot = this.props.newSlot;
		newSlot.patientId = this.props.selectPatient.id;

		this._apiService.postSlot(newSlot);

		this.finishCreateSlot();
	};

	public renderRemoveSlot = () => {
		this.setState({
			removeSlotActive: true
		});
	};

	public removeSlot = (e: any) => {
		const slot: ISlot = this.props.slot as ISlot;

		this._apiService.delSlot(slot.id);

		this.props.reload();
		this.onClose();
	};

	public onClose = () => {
		if (this.props.close === undefined) {
			return;
		}

		this.props.close();
	};

	render() {
		const renderListSlot = (
			<div className="slot-menu__content" onClick={(e: any) => {e.stopPropagation()}}>
				<div className={"slot-menu__content-title" + (this.props.slot ? ' user' : ' slot')}>{this.props.title}</div>
				<div className="slot-menu__content-menu">
					<div className={"slot-menu__content-menu-item" + (this.props.slot ? ' black' : ' disabled')} onClick={this.toggleModal}>Посмотреть запись</div>
					<div className={"slot-menu__content-menu-item" + (!this.props.oldHour && this.props.freeSlot && this.props.selectPatient && this.props.patientsInSlotId !== this.props.selectPatient.id ? ' blue' : ' disabled')} onClick={this.createSlot}>Создать запись</div>
					<div className={"slot-menu__content-menu-item" + (this.props.slot ? ' red' : ' disabled')} onClick={() => {this.renderRemoveSlot()}}>Отменить запись</div>
				</div>
			</div>
		), renderPopupSlot = (
				<Modal isShow={this.state.slotPopupActive}><SlotPopup closePopup={this.toggleModal} slot={this.props.slot as ISlot} patients={this.props.patients} schedules={this.props.schedules}/></Modal>
		), renderRemoveSlot = (
			<div className="slot-menu__content cancel" onClick={(e: any) => {e.stopPropagation()}}>
				<div className="slot-menu__content-header">Отмена записи</div>
				<div className="slot-menu__content-text">Врач и пациент будут уведомлены об отмене записи.</div>
				<button className="slot-menu__content-button" onClick={this.removeSlot}>Отменить</button>
				<div className="slot-menu__content-cancel" onClick={this.onClose}>Вернуться к расписанию</div>
			</div>
		);
		return (
			<>
				{this.state.removeSlotActive ? renderRemoveSlot : renderListSlot}
				{this.state.slotPopupActive ? renderPopupSlot : null}
			</>
		);
		
	}
}
