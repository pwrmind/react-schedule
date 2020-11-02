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
		currentDate: new Date(),
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

	public areEqual(a: Date, b: Date | null) {
		if (!a || !b) {
			return false;
		}
	
		return (
			a.getFullYear() === b.getFullYear() &&
			a.getMonth() === b.getMonth() &&
			a.getDate() === b.getDate()
		);
	}

	public isLeapYear(year: number) {
		return !((year % 4) || (!(year % 100) && (year % 400)));
	}

	public getDaysInMonth(date: Date) {
		const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
			February = 1,
			month = date.getMonth(),
			year = date.getFullYear();
		
		if (month === February && this.isLeapYear(year)) {
			return DAYS_IN_MONTH[month] + 1;
		}
	
		return DAYS_IN_MONTH[month];
	}

	public getDayOfWeek(date: Date) {
		return Math.abs(date.getDay() - 6);
	}

	public getMonthData(year: number, month: number) {
		const DAYS_IN_WEEK = 7;
		const result: Array<Array<Date>> = [];
		const date = new Date(year, month);
		const daysInMonth = this.getDaysInMonth(date);
		const monthStartsOn = this.getDayOfWeek(date);
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

	public onDayClick = (date: Date) => {
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
										`date-picker__day ${this.areEqual(date, currentDate) ? 'date-picker__day--today' : ''} ${this.areEqual(date, selectedDate) ? 'date-picker__day--selected' : ''}`
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
