import chai from 'chai';

import { joinArray } from '../src/taskOne.js';
import { handleData } from '../src/taskTwo.js';

const { expect } = chai;

describe('Test functions', () => {
	describe('Function joinArray', () => {
		it('return expected string like in task condition', () => {
			expect(joinArray([-2,0,1,2,3,4,5,8,9,11,13,15,18,22,25,28,29,30]))
				.to.equal('-2,0-5,8,9,11,13,15,18,22,25,28-30');
		});

		it('return number as string if array have one element', () => {
			expect(joinArray([3])).to.equal('3');
		});

		it('return range as string [n-n]', () => {
			expect(joinArray([1,2,3,4,5])).to.equal('1-5');
		});

		it('return non-range as string [n,n]', () => {
			expect(joinArray([1,3,5])).to.equal('1,3,5');
		});
	})

	describe('Function handleData', () => {
		it('return expected object like in task condition', () => {
			const inputObject = {
				Red : 1,
				Grey : {
					Task : {
						Dry: 1
					},
					End : {
						Site : null
					},
					module: [
						20, 21, 23
					]
				},
				Type: [ 10, 16, 2048, { IsSale : false } ]
			};
			const expectedObject = {
				Red : 1,
				GreyTaskDry : 1,
				GreyEndSite : null,
				GreyModule : [ 20, 21, 23 ],
				Type10 : 10,
				Type16 : 16,
				Type2048 : 2048,
				TypeIsSale : false
			};
			expect(handleData(inputObject)).to.deep.equal(expectedObject);
		});

		it('return object with primitives', () => {
			const inputObject = {
				key1: 1,
				key2: 'test',
				key3: true,
				key4: null
			};
			const expectedObject = {
				key1: 1,
				key2: 'test',
				key3: true,
				key4: null
			};
			expect(handleData(inputObject)).to.deep.equal(expectedObject);
		});

		it('return object with list of primitives', () => {
			const inputObject = {
				key1: [1, 2],
				key2: ['test', null, true]
			};
			const expectedObject = {
				key1: [1, 2],
				key2: ['test', null, true]
			};
			expect(handleData(inputObject)).to.deep.equal(expectedObject);
		});

		it('return object with objects list', () => {
			const inputObject = {
				key1: [1, 2, { item: 'test item'}],
				key2: ['test', null, true, { item: 'test item'}]
			};
			const expectedObject = {
				key11: 1,
				key12: 2,
				key1Item: 'test item',
				key2Test: 'test',
				key2Null: null,
				key2True: true,
				key2Item: 'test item'
			};
			expect(handleData(inputObject)).to.deep.equal(expectedObject);
		});

		it('return object with nested objects list', () => {
			const inputObject = {
				key1: [1, 2, { item: { data: 'test item' }}],
				key2: ['test', null, true, { item: { data: 'test item' }}]
			};
			const expectedObject = {
				key11: 1,
				key12: 2,
				key1ItemData: 'test item',
				key2Test: 'test',
				key2Null: null,
				key2True: true,
				key2ItemData: 'test item'
			};
			expect(handleData(inputObject)).to.deep.equal(expectedObject);
		});

		it('return object with arrays list', () => {
			const inputObject = {
				key1: [1, 2, [1, 2, 3]],
				key2: ['test', null, true, ['item', null, false]]
			};
			const expectedObject = {
				key11: 1,
				key12: 2,
				['key1[]']: [1, 2, 3],
				key2Test: 'test',
				key2Null: null,
				key2True: true,
				['key2[]']: ['item', null, false]
			};
			expect(handleData(inputObject)).to.deep.equal(expectedObject);
		});

		it('return object with nested arrays list', () => {
			const inputObject = {
				key1: [1, 2, [[null, true], 2, 3]],
				key2: ['test', null, true, ['item', [false], false]]
			};
			const expectedObject = {
				key11: 1,
				key12: 2,
				['key1[][]']: [null, true],
				['key1[]2']: 2,
				['key1[]3']: 3,
				key2Test: 'test',
				key2Null: null,
				key2True: true,
				['key2[][]']: [false],
				['key2[]Item']: 'item',
				['key2[]False']: false
			};
			expect(handleData(inputObject)).to.deep.equal(expectedObject);
		});
	})
})
