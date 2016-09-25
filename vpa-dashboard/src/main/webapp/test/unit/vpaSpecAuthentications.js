var $scope, globals, httpBackend;
var baseUrl = "/vpa-saas-app/";
var tenantId = 5;
var brandId = 5;

var authOvertimeDataResponse = [
	{
		month_yr: "8/14",
		region_name: "Americas",
		entity_type_name: "End Customer",
		level_name: "Box",
		authentication_type: "Genuine",
		total_Authetication: "5",
		country_name: "Argentina"
	},
	{
		month_yr: "8/14",
		region_name: "Americas",
		entity_type_name: "Manufacturer",
		level_name: "Box",
		authentication_type: "Genuine",
		total_Authetication: "6",
		country_name: "Argentina"
	},
	{
		month_yr: "9/14",
		region_name: "EMEA",
		entity_type_name: "Manufacturer",
		level_name: "Packaging",
		authentication_type: "Genuine",
		total_Authetication: "5",
		country_name: "Argentina"
	},
	{
		month_yr: "10/14",
		region_name: "APAC",
		entity_type_name: "Brand Owner",
		level_name: "Packaging",
		authentication_type: "Genuine",
		total_Authetication: "5",
		country_name: "Argentina"
	},
	{
		month_yr: "11/14",
		region_name: "Americas",
		entity_type_name: "Channel Partner",
		level_name: "PCBA",
		authentication_type: "Genuine",
		total_Authetication: "5",
		country_name: "Argentina"
	},
	{
		month_yr: "12/14",
		region_name: "EMEA",
		entity_type_name: "Distributor",
		level_name: "Product",
		authentication_type: "Genuine",
		total_Authetication: "5",
		country_name: "Argentina"
	},
	{
		month_yr: "1/15",
		region_name: "APAC",
		entity_type_name: "Law Enforcement Agency",
		level_name: "Product",
		authentication_type: "Genuine",
		total_Authetication: "5",
		country_name: "Argentina"
	},
	{
		month_yr: "2/15",
		region_name: "Americas",
		entity_type_name: "End Customer",
		level_name: "PCBA",
		authentication_type: "Genuine",
		total_Authetication: "5",
		country_name: "Argentina"
	},
	{
		month_yr: "3/15",
		region_name: "EMEA",
		entity_type_name: "End Customer",
		level_name: "PCBA",
		authentication_type: "Genuine",
		total_Authetication: "5",
		country_name: "Argentina"
	},
	{
		month_yr: "4/15",
		region_name: "APAC",
		entity_type_name: "Manufacturer",
		level_name: "Packaging",
		authentication_type: "Genuine",
		total_Authetication: "5",
		country_name: "Argentina"
	},
	{
		month_yr: "5/15",
		region_name: "Americas",
		entity_type_name: "Brand Owner",
		level_name: "Box",
		authentication_type: "Genuine",
		total_Authetication: "5",
		country_name: "Argentina"
	},
	{
		month_yr: "6/15",
		region_name: "EMEA",
		entity_type_name: "Channel Partner",
		level_name: "Box",
		authentication_type: "Genuine",
		total_Authetication: "5",
		country_name: "Argentina"
	},
	{
		month_yr: "7/15",
		region_name: "APAC",
		entity_type_name: "Law Enforcement Agency",
		level_name: "Box",
		authentication_type: "Genuine",
		total_Authetication: "5",
		country_name: "Argentina"
	},
	{
		month_yr: "8/15",
		region_name: "Americas",
		entity_type_name: "End Customer",
		level_name: "Box",
		authentication_type: "Genuine",
		total_Authetication: "5",
		country_name: "Argentina"
	}

];

describe('AuthenticationsCtrl', function () {
	beforeEach(module('myApp'));
	beforeEach(inject(function ($controller, $rootScope, _dataFactory_) {
		globals = $rootScope.globals.currentUser;
		$scope = $rootScope.$new();
		$controller('authenticationsController', {
			$scope: $scope,
			dataFactory:_dataFactory_
		});
	}));
	
	beforeEach(inject(function ($httpBackend) {
	    httpBackend = $httpBackend;
	}));
		
	it('should fetch authentication data and apply filters appropriately', function() {
		
		httpBackend.expectGET(baseUrl + 'auth/totalAuth').respond(authOvertimeDataResponse);
		httpBackend.expectGET("pages/login.html").respond(201, '');
		
	     $scope.init();
	     
	     httpBackend.flush();
	     expect($scope.authOverTimeChartData.length).toBe(12);
	     
	     $scope.selectedTime.value = "3";
	     $scope.updateFilters();
	     expect($scope.authOverTimeChartData.length).toBe(3);
	     
	     $scope.selectedTime.value = "";
	     $scope.selectedRegion.value = "Americas";
	     $scope.updateFilters();
	     
	     //expect($scope.authOverTimeChartData[$scope.authOverTimeChartData.length - 1].authentications).toBe(11);
	     expect($scope.authOverTimeChartData).toBe(11);
	});
	
	
});

