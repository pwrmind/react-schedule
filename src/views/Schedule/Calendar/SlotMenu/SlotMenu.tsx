import React, { Component } from 'react';

import { ISlot } from 'api/data/slots';
import { IPatient } from 'api/data/patients';
import { ISchedule } from 'api/data/schedules';
import API from 'api/api';

import Modal from 'components/Modal/Modal';
import Tooltip from 'components/Tooltip/Tooltip';
import SlotPopup from '../SlotPopup/SlotPopup';

import './SlotMenu.scss';

interface SlotMenuProps {
	title: string;
	slot: boolean | ISlot;
	freeSlot: boolean;
	close?: Function;
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

	public createSlot = (e: any) => {
		this.setState({
			createPopupActive: true
		});

		setTimeout(() => {
			this.setState({
				createPopupActive: false
			});

			this.onClose(e);
		}, 3000)
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
		this.onClose(e);
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
		), renderPopupCreate = (
				<Modal isShow={this.state.createPopupActive}>
					<div className="create-popup__content">
						<div className="create-popup__header">Запись создана</div>
						<div className="create-popup__body">
							<div className="create-popup__body-icon">✓</div>
						</div>
					</div>
				</Modal>
		), renderRemoveSlot = (
			<div className="slot-menu__content cancel" onClick={(e: any) => {e.stopPropagation()}}>
				<div className="slot-menu__content-header">Отмена записи</div>
				<div className="slot-menu__content-text">Врач и пациент будут уведомлены об отмене записи.</div>
				<button className="slot-menu__content-button" onClick={this.removeSlot}>Отменить</button>
				<div className="slot-menu__content-cancel" onClick={(e: any) => this.onClose(e)}>Вернуться к расписанию</div>
			</div>
		);
		return this.state.removeSlotActive ? renderRemoveSlot : (this.state.slotPopupActive ? renderPopupSlot : (this.state.createPopupActive ? renderPopupCreate : renderListSlot));
	}
}
