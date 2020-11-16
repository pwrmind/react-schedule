import React, { Component } from 'react';

import { IResource } from 'api/data/resources';
import { ISchedule, IQuota } from 'api/data/schedules';

import './DatePicker.scss';

export interface DatePickerProps {
	date: Date;
	schedules: Array<ISchedule>;
	selectResource: Array<IResource>;
	selectedDate: Date | null;
	monthNames: Array<string>;
	weekDayNames: Array<string>;
	onChange: Function;
}

export default class DatePicker extends Component<DatePickerProps> {
	static defaultProps: DatePickerProps = {
		date: new Date(),
		schedules: [],
		selectResource: [],
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

	public get schedules(): Array<ISchedule> {
		return this.props.schedules.filter((schedule: ISchedule) => {
			for (const resource of this.props.selectResource) {
				if (resource.id === schedule.resourceId) {
					return true;
				}
			}

			return false;
		});
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

	public getActiveDate(date: Date): boolean {
		for (const i in this.schedules) {
			const schedule: ISchedule = this.schedules[i],
				dayNum: number = date.getDay();

			if (schedule.workDays.includes(dayNum)) {
				if (schedule.workMonth) {
					const today = new Date(new Date().setHours(0, 0, 0, 0));

					if (date.getTime() > new Date(today.setMonth(today.getMonth() + (schedule.workMonth || 0))).getTime()) {
						continue;
					}
				}

				const activeQuotas = schedule.quotas.filter(
					(quota: IQuota) => {
						return quota.active &&
							(!quota.quotaDays || (quota.quotaDays && quota.quotaDays.includes(dayNum)));
					}
				);

				if (activeQuotas.length > 0) {
					return true;
				}
			}
		}

		return false;
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

	public getDayClass(date: Date): string {
		const { currentDate, selectedDate } = this.state;
		let out: string = '';

		if (this.diffDate(date, currentDate) < 0) {
			return ' date-picker__day--disabled';
		}

		if (this.diffDate(date, selectedDate) > 13) {
			out += ' date-picker__day--grey';
		}

		if (
			this.diffDate(date, selectedDate) >= 0 &&
			this.getActiveDate(date)
		) {
			out += ' date-picker__day--can-set'
		} else {
			out += ' date-picker__day--active'
		}

		if (this.diffDate(date, selectedDate) === 0) {
			out += ' date-picker__day--selected'
		}

		return out;
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

					<button className="date-picker__month-btn">
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
									className={`date-picker__day ${this.getDayClass(date)}`}
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
