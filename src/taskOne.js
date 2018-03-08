/* 
	Есть массив цифр по возрастанию [-2,0,1,2,3,4,5,8,9,11,13,15,18,22,25,28,29,30],
	необходимо написать функцию, которая принимает массив и возвращает результат,
	который выводит все цифры через запятую.
	Однако если цифры идут диапазоном, то вывести их через тире,
	например 21,22,23,24 => 21-24. если только 2 числа то они не являются диапазоном
*/

const sideValue = (arr, index, isTail=false) => {
	const sign = isTail ? -1 : 1;
	const firstStepCompare = (arr[index] + sign) === arr[index + sign];
	const secondStepCompare = arr[index + sign] + sign === arr[index +(2 * sign)];
	return firstStepCompare 
		? Number(firstStepCompare) + Number(secondStepCompare)
		: 0;
} 

export const joinArray = (listOfNumbers) => [...new Set(listOfNumbers)].reduce((acc, item, index, arr) => {
	const righSideValue = sideValue(arr, index);
	const leftSideValue = sideValue(arr, index, true);

	const isRangeStart = leftSideValue === 0 && righSideValue >= 2;
	const isInRange = (leftSideValue + righSideValue) >= 2;
	const isRangeEnd = leftSideValue >= 2 && righSideValue === 0;

	if (isRangeStart) { return !acc ? String(item) : `${acc},${item}`; }

	if (isRangeEnd) { return `${acc}-${item}` }

	if (isInRange) { return acc; }

	return !acc ? String(item) : `${acc},${item}`;
}, '');

