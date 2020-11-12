import React, { Component } from 'react';

import { ISlot } from 'api/data/slots';
import { IPatient } from 'api/data/patients';
import { ISchedule } from 'api/data/schedules';

import Modal from 'components/Modal/Modal';
import Tooltip from 'components/Tooltip/Tooltip';
import SlotPopup from '../SlotPopup/SlotPopup';

import './SlotMenu.scss';

interface SlotMenuProps {
	title: string;
	slot: boolean | ISlot;
	freeSlot: boolean;
	close?: Function;
	selectPatient: IPatient;
	patients: Array<IPatient>;
	schedules: Array<ISchedule>;
}

export default class SlotMenu extends Component<SlotMenuProps> {
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

	public createSlot = () => {
		console.log('slot created');
	};

	public renderRemoveSlot = () => {
		this.setState({
			removeSlotActive: true
		});
	};

	public onClose = (e: MouseEvent) => {
		if (this.props.close === undefined) {
			return;
		}

		this.props.close(e);
	};

	render() {
		const renderListSlot = (
			<div className="slot-menu__content" onClick={(e: any) => {e.stopPropagation()}}>
				<div className={"slot-menu__content-title" + (this.props.slot ? ' user' : ' slot')}>{this.props.title}</div>
				<div className="slot-menu__content-menu">
					<div className={"slot-menu__content-menu-item" + (this.props.slot ? ' black' : ' disabled')} onClick={this.toggleModal}>Посмотреть запись</div>
					<div className={"slot-menu__content-menu-item" + (this.props.freeSlot && this.props.selectPatient ? ' blue' : ' disabled')} onClick={this.createSlot}>Создать запись</div>
					<div className={"slot-menu__content-menu-item" + (this.props.slot ? ' red' : ' disabled')} onClick={() => {this.renderRemoveSlot()}}>Отменить запись</div>
				</div>
			</div>
		), renderPopupSlot = (
				<Modal isShow={this.state.slotPopupActive}><SlotPopup closePopup={this.toggleModal} slot={this.props.slot as ISlot} patients={this.props.patients} schedules={this.props.schedules}/></Modal>
		), renderRemoveSlot = (
			<div className="slot-menu__content cancel" onClick={(e: any) => {e.stopPropagation()}}>
				<div className="slot-menu__content-header">Отмена записи</div>
				<div className="slot-menu__content-text">Врач и пациент будут уведомлены об отмене записи.</div>
				<button className="slot-menu__content-button" onClick={this.renderRemoveSlot}>Отменить</button>
				<div className="slot-menu__content-cancel" onClick={(e: any) => this.onClose(e)}>Вернуться к расписанию</div>
			</div>
		);
		return this.state.removeSlotActive ? renderRemoveSlot : (this.state.slotPopupActive ? renderPopupSlot : renderListSlot);
	}
}
