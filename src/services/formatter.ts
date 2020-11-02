export function dateFormatter(date: Date | null): string {
	if (date === null) {
		return '';
	}

	return `${addZero(date.getDate())}.${addZero(date.getMonth() + 1)}.${addZero(date.getFullYear())}`;
}

function addZero(number: number): string | number {
	return number < 10 ? '0' + number : number;
}