import React, { Component } from 'react';

import './DatePicker.scss';

export interface DatePickerProps {
	date: Date;
	selectedDate: Date | null;
	monthNames: Array<string>;
	weekDayNames: Array<string>;
	onChange: Function;
}

export default class DatePicker extends Component<DatePickerProps> {
	static defaultProps: DatePickerProps = {
		date: new Date(),
		selectedDate: null,
		monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
		weekDayNames: ['Пн', 'Вт', 'Ср', 'Чт' , 'Пт', 'Сб', 'Вс'],
		onChange: Function.prototype
	};

	public state = {
		date: this.props.date,
		currentDate: this.getCurrentDate(),
		selectedDate: this.props.selectedDate
	};

	public yearSelect: any;

	public monthSelect: any;

	public get year(): number {
		return this.state.date.getFullYear();
	}

	public get month(): number {
		return this.state.date.getMonth();
	}

	public get monthName(): string {
		return this.props.monthNames[this.month];
	}

	public get day(): number {
		return this.state.date.getDate();
	}

	public getCurrentDate(): Date {
		const date: Date = new Date();
		return new Date(date.getFullYear(), date.getMonth(), date.getDate());
	}

	public diffDate(a: Date, b: Date | null) {
		if (!a || !b) {
			return false;
		}

		const MILSEC_DAY: number = 86400000;
		return (a.getTime() - b.getTime()) / MILSEC_DAY;
	}

	public getDaysInMonth(date: Date): number {
		return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
	}

	public getDayOfWeek(date: Date): number {
		return (date.getDay() || 7) - 1;
	}

	public getMonthData(year: number, month: number): Array<Array<Date>> {
		const DAYS_IN_WEEK = 7,
			result: Array<Array<Date>> = [],
			date = new Date(year, month),
			daysInMonth = this.getDaysInMonth(date),
			monthStartsOn = this.getDayOfWeek(date);
		let day = 1 - monthStartsOn;
	
		for (let i = 0; i < (daysInMonth + monthStartsOn) / DAYS_IN_WEEK; i++) {
			result[i] = [];
	
			for (let j = 0; j < DAYS_IN_WEEK; j++) {
				result[i][j] = new Date(year, month, day++);
			}
		}
	
		return result;
	}

	public onClickPrevMonth = () => {
		const date = new Date(this.year, this.month - 1);
		this.setState({ date });
	};

	public onClickNextMonth = () => {
		const date = new Date(this.year, this.month + 1);
		this.setState({ date });
	};

	public onDayClick = (date: Date | null) => {
		if (date === null) {
			return;
		}

		this.setState({ selectedDate: date });
		this.props.onChange(date);
	};

	render() {
		const { weekDayNames } = this.props;
		const { currentDate, selectedDate } = this.state;
		const monthData: Array<Array<Date>> = this.getMonthData(this.year, this.month);

		return (
			<div className="date-picker">
				<div className="date-picker__header">
					<div
						className="date-picker__prev-btn"
						onClick={this.onClickPrevMonth}
					>
						{'<'}
					</div>

					<button>
						{this.monthName} {this.year}
					</button>

					<div
						className="date-picker__next-btn"
						onClick={this.onClickNextMonth}
					>
						{'>'}
					</div>
				</div>

				<div className="date-picker__body">
					<div className="date-picker__week">
						{weekDayNames.map(name =>
							<div
								key={name}
								className="date-picker__day"
							>
								{name}
							</div>
						)}
					</div>

					{monthData.map((week, index) =>
						<div key={index} className="date-picker__week">
							{week.map((date, index) =>
								<div
									key={index}
									className={
										` date-picker__day ${(this.diffDate(date, currentDate) < 0 || this.diffDate(date, currentDate) > 13) ? 'date-picker__day--disabled' : 'date-picker__day--active'} ${this.diffDate(date, currentDate) === 0 ? 'date-picker__day--today' : ''} ${this.diffDate(date, selectedDate) === 0 ? 'date-picker__day--selected' : ''}`
									}
									onClick={() => this.onDayClick(date)}
								>
									{date.getDate()}
								</div>
							)}
						</div>
					)}
				</div>
			</div>
		);
	}
}
