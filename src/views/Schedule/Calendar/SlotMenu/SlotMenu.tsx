import React, { Component } from 'react';
import { ISlot } from 'api/data/slots';

import './SlotMenu.scss';

interface SlotMenuProps {
	title: string;
	slot: boolean | ISlot;
	freeSlot: boolean;
	close?: Function;
}
export default class SlotMenu extends Component<SlotMenuProps> {
	public state: any = {
		removeSlotActive: false
	};

	public watchSlot = (slot: ISlot) => {
		console.log(slot);
	};

	public createSlot = () => {
		console.log('slot created');
	};

	public renderRemoveSlot = () => {
		this.setState({
			removeSlotActive: !this.state.removeSlotActive
		});
	};

	public onClose = (e: MouseEvent) => {
		if (this.props.close === undefined) {
			return;
		}

		this.props.close(e);
	}

	render() {
		const renderRemoveSlot = (
			<>
				<div className={"slot-menu__content-title" + (this.props.slot ? ' user' : ' slot')}>{this.props.title}</div>
				<div className="slot-menu__content-menu">
					<div className={"slot-menu__content-menu-item" + (this.props.slot ? ' black' : ' disabled')} onClick={() => {this.watchSlot(this.props.slot as ISlot)}}>Посмотреть запись</div>
					<div className={"slot-menu__content-menu-item" + (this.props.freeSlot ? ' blue' : ' disabled')} onClick={this.createSlot}>Создать запись</div>
					<div className={"slot-menu__content-menu-item" + (this.props.slot ? ' red' : ' disabled')} onClick={this.renderRemoveSlot}>Отменить запись</div>
					<div className="slot-menu__content-cancel" onClick={(e: any) => this.onClose(e)}>Вернуться к расписанию</div>
				</div>
			</>
		), renderListSlot = (
			<>
				<div className="slot-menu__content-header">Отмена записи</div>
				<div className="slot-menu__content-text">Врач и пациент будут уведомлены об отмене записи</div>
				<button className="slot-menu__content-button">Отменить</button>
				<div className="slot-menu__content-cancel" onClick={(e: any) => this.onClose(e)}>Вернуться к расписанию</div>
			</>
		);
		return (
			<div className="slot-menu__content" onClick={(e: any) => {e.stopPropagation()}}>
				{this.state.removeSlotActive ? renderListSlot : renderRemoveSlot}
			</div>
		);
	}

}