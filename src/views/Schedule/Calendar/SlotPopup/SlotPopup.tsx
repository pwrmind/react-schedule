import React, { Component } from 'react';

import { ISlot } from 'api/data/slots';
import { ISchedule } from 'api/data/schedules';

import './SlotPopup.scss';

interface SlotPopupProps {
	slot: ISlot;
}

export default class SlotPopup extends Component<SlotPopupProps> {
	render() {
		return <div>popup slot</div>
	}
}