import React, { Component } from 'react';

import { ISlot } from 'api/data/slots';
import { IPatient } from 'api/data/patients';
import { ISchedule } from 'api/data/schedules';

import Modal from 'components/Modal/Modal';
import SlotPopup from '../SlotPopup/SlotPopup';

import './SlotMenu.scss';

interface SlotMenuProps {
	title: string;
	slot: boolean | ISlot;
	freeSlot: boolean;
	close?: Function;
	selectPatient: IPatient;
	schedules: Array<ISchedule>;
}

export default class SlotMenu extends Component<SlotMenuProps> {
	public state: any = {
		removeSlotActive: false,
		slotPopupActive: false
	};

	public watchSlot = (e: MouseEvent, slot: ISlot) => {
		this.setState({
			slotPopupActive: true
		});

		//this.onClose(e);
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
		console.log(this.props.slot);
		const renderRemoveSlot = (
				<div className="slot-menu__content" onClick={(e: any) => {e.stopPropagation()}}>
					<div className={"slot-menu__content-title" + (this.props.slot ? ' user' : ' slot')}>{this.props.title}</div>
					<div className="slot-menu__content-menu">
						<div className={"slot-menu__content-menu-item" + (this.props.slot ? ' black' : ' disabled')} onClick={(e: any) => {this.watchSlot(e, this.props.slot as ISlot)}}>Посмотреть запись</div>
						<div className={"slot-menu__content-menu-item" + (this.props.freeSlot && this.props.selectPatient ? ' blue' : ' disabled')} onClick={this.createSlot}>Создать запись</div>
						<div className={"slot-menu__content-menu-item" + (this.props.slot ? ' red' : ' disabled')} onClick={() => {this.renderRemoveSlot()}}>Отменить запись</div>
					</div>
					<Modal isShow={this.state.slotPopupActive}><SlotPopup slot={this.props.slot as ISlot}/></Modal>
				</div>
			), renderListSlot = (
				<div className="slot-menu__content cancel" onClick={(e: any) => {e.stopPropagation()}}>
					<div className="slot-menu__content-header">Отмена записи</div>
					<div className="slot-menu__content-text">Врач и пациент будут уведомлены об отмене записи.</div>
					<button className="slot-menu__content-button" onClick={this.renderRemoveSlot}>Отменить</button>
					<div className="slot-menu__content-cancel" onClick={(e: any) => this.onClose(e)}>Вернуться к расписанию</div>
				</div>
			);
		return this.state.removeSlotActive ? renderListSlot : renderRemoveSlot;
	}
}
