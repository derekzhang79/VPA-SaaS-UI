describe('thousandSuffixFilter', function () {
	beforeEach(module('myApp'));
	
	var thousandSuffixFilter;
	
	beforeEach(inject(function ($filter) {
		decimalAdjustFilter = $filter('thousandSuffix');
	}));

	it('TEST1 - should format number 3556789 to 3.56M (2 decimal places)', function () {
		expect(decimalAdjustFilter(3556789, 2)).toBe('3.56M');
	});
	
	it('TEST2 - should format number 678 to 678', function () {
		expect(decimalAdjustFilter(678)).toBe(678);
	});
	
	it('TEST3 - should format number 4570000 to 4.570M (3 decimal places)', function () {
		expect(decimalAdjustFilter(4570000, 3)).toBe('4.570M');
	});
});
