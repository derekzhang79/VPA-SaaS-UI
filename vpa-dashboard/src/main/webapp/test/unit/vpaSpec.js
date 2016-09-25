var $scope, globals, httpBackend;
var baseUrl = "/vpa-saas-app/";
var tenantId = 5;
var brandId = 5;

var unprotectedProductsDataResponse = {
	      
    	unProtectedProductPercentage: 62,
    	totalRevenueAtRisk: 131400000,
    	totalProduct: 56,
    	totalUnprotectedProduct: 35,
    	glpDate: "05.11.14",
    	top3UnProtectedProduct: 
    	[{
    	productName: "P48",
    	revenue: 14400000
    	},
    	{
    	productName: "P72",
    	revenue: 14400000
    	},
    	{
    	productName: "P80",
    	revenue: 14400000
    	}],
    	
    	viewAll: 
    	[{
    	id: 197,
    	productName: "P48",
    	productFamily: "PF10",
    	businessUnit: "BU5",
    	revenueRisk: 14400000,
    	glp: "2000"
    	},
    	{
    	id: 231,
    	productName: "P72",
    	productFamily: "PF14",
    	businessUnit: "BU7",
    	revenueRisk: 14400000,
    	glp: "1000"
    	},
    	{
    	id: 242,
    	productName: "P80",
    	productFamily: "PF15",
    	businessUnit: "BU8",
    	revenueRisk: 14400000,
    	glp: "2000"
    	}]
      
  }
var flaggeedProductsDataResponse = {
		totalProduct: 21,
		totalCompromisedProduct: 8,
		projectedRevenueLoss: 784000,
		compromisedProductPercentage: 38,
		glpDate: "05.11.14",
		top3CompromisedProduct: 
		[{
		productName: "P8",
		revenue: 168000
		},
		{
		productName: "P22",
		revenue: 140000
		},
		{
		productName: "P6",
		revenue: 140000
		}],
		
		viewAll:
		[{
		id: 143,
		productName: "P8",
		revenueLoss: 350000,
		projectedRevenueLoss: 168000,
		productFamily: "PF2",
		businessUnit: "BU1",
		glp: "2000"
		},
		{
		id: 168,
		productName: "P22",
		revenueLoss: 100500,
		projectedRevenueLoss: 140000,
		productFamily: "PF5",
		businessUnit: "BU3",
		glp: "1500"
		},
		{
		id: 141,
		productName: "P6",
		revenueLoss: 256000,
		projectedRevenueLoss: 140000,
		productFamily: "PF2",
		businessUnit: "BU1",
		glp: "2000"
		}]
	}

var worldMapTabsDataResponse = {
		id: 0,
		authenticationKpis: [
		{
		authenticationType: "Total",
		totalAuthetncationCount: 53345,
		totalAuthenticationInLast24Hrs: 0
		},
		{
		authenticationType: "Genuine",
		totalAuthetncationCount: 52362,
		totalAuthenticationInLast24Hrs: 0
		},
		{
		authenticationType: "Suspect",
		totalAuthetncationCount: 983,
		totalAuthenticationInLast24Hrs: 0
		}],
		regionWiseEntitiesMap: {}
	}
var worldMapRegionsDataResponse = {
		id: 0,
		authenticationKpis: [],
		regionWiseEntitiesMap: [{
		EMEA: {
			totalCount: 40117,
			genuineCount: 39388,
			suspectedCount: 729,
			totalEntitiesCount: 4,
			totalGenuineEntitiesCount: 4,
			totalSuspectedEntitiesCount: 3
		},
		Americas: {
			totalCount: 4586,
			genuineCount: 4506,
			suspectedCount: 80,
			totalEntitiesCount: 4,
			totalGenuineEntitiesCount: 4,
			totalSuspectedEntitiesCount: 3
		},
		APAC: {
			totalCount: 8642,
			genuineCount: 8468,
			suspectedCount: 174,
			totalEntitiesCount: 4,
			totalGenuineEntitiesCount: 4,
			totalSuspectedEntitiesCount: 3
		}
		}]
	}
var buyingCFEntitiesDataResponse = [
                    			 	{
                    					entityId: 34,
                    					entityName: "Fedaral Govrnment",
                    					revenueLoss: 724700,
                    					formattedRevenueLoss: "$724k",
                    					numberOfSuspectAuthentications: 302,
                    					totalAuthentications: 10553,
                    					entityType: "Channel Partner"
                    				},
                    				{
                    					entityId: 9,
                    					entityName: "Department Of Homeland Security",
                    					revenueLoss: 379000,
                    					formattedRevenueLoss: "$379k",
                    					numberOfSuspectAuthentications: 150,
                    					totalAuthentications: 6965,
                    					entityType: "Channel Partner"
                    				},
                    				{
                    					entityId: 1,
                    					entityName: "Vodafone",
                    					revenueLoss: 297400,
                    					formattedRevenueLoss: "$297k",
                    					numberOfSuspectAuthentications: 115,
                    					totalAuthentications: 6387,
                    					entityType: "Channel Partner"
                    				}]
var sellingCFEntitiesDataResponse = [{
	entityId: 1,
	entityName: "ECOSA, S.A. de C.V.",
	revenueLoss: 1401100,
	formattedRevenueLoss: "$$1.4m",
	numberOfSuspectAuthentications: 567,
	totalAuthentications: 28926,
	sellerCity: "Austin",
	sellerCountry: "USA"
}]

describe('DashboardCtrl', function () {
	beforeEach(module('myApp'));
	beforeEach(inject(function ($controller, $rootScope, _dataFactory_) {
		globals = $rootScope.globals.currentUser;
		$scope = $rootScope.$new();
		$controller('dashboardController', {
			$scope: $scope,
			dataFactory:_dataFactory_
		});
	}));
	
	beforeEach(inject(function ($httpBackend) {
	    httpBackend = $httpBackend;
	}));
		
	it('should fetch all the executive dashboard\'s data', function() {
		
		httpBackend.expectPOST(baseUrl + 'dashboard/unprotected').respond(unprotectedProductsDataResponse);
		
		httpBackend.expectPOST(baseUrl + 'dashboard/compromised').respond(flaggeedProductsDataResponse);
		httpBackend.expectGET(baseUrl + 'dashboard/authentication/kpi').respond(worldMapTabsDataResponse);
		httpBackend.expectGET(baseUrl + 'dashboard/authentication/regions').respond(worldMapRegionsDataResponse);
		httpBackend.expectGET(baseUrl + 'entity/counterfeit/buying/entities/undefined/undefined').respond(buyingCFEntitiesDataResponse);
		httpBackend.expectGET(baseUrl + 'entity/counterfeit/selling/entities/undefined/undefined').respond(sellingCFEntitiesDataResponse);
		httpBackend.expectGET("pages/login.html").respond(201, '');
		
	     $scope.init();
	     
	     httpBackend.flush();
	     expect($scope.unprotectedData.unProtectedProductPercentage).toBe(62);
	     expect($scope.unprotectedData.glpDate).toBe("05.11.14");
	    
	     expect($scope.compromisedData.totalCompromisedProducts).toBe(8);
	     expect($scope.compromisedData.glpDate).toBe("05.11.14");
	     
	     expect($scope.worldMapTabs[0].count).toBe(53345);
	     expect($scope.worldMapTabs[1].count).toBe(52362);
	     expect($scope.worldMapTabs[2].count).toBe(983);
	     
	     expect($scope.worldMapData.Americas).not.toBe({});
	     expect($scope.worldMapData.EMEA).not.toBe({});
	     expect($scope.worldMapData.APAC).not.toBe({});
	     
	     expect($scope.top3BuyingCFEntities.length).not.toBe(0);
	     
	     expect($scope.top3SellingCFEntities.length).not.toBe(0);
	   });
});

describe('viewAllUnprotectedProductsCtrl', function () {
	beforeEach(module('myApp'));
	beforeEach(inject(function ($controller, $rootScope) {
		globals = $rootScope.globals.currentUser;
		$scope = $rootScope.$new();
		$controller('viewAllUnprotectedProductsController', {
			$scope: $scope
		});
	}));
	beforeEach(inject(function ($httpBackend) {
	    httpBackend = $httpBackend;
	}));
	
	it('should fetch unprotected products data', function() {
		httpBackend.expectPOST(baseUrl + 'dashboard/unprotected').respond(unprotectedProductsDataResponse);
		httpBackend.expectGET("pages/login.html").respond(201, '');
		$scope.init();
	     
	     httpBackend.flush();
	     expect($scope.unprotectedData.unProtectedProductPercentage).toBe(62);
	     expect($scope.unprotectedData.glpDate).toBe("05.11.14");
	});
});

describe('viewAllCompromisedProductsCtrl', function () {
	beforeEach(module('myApp'));
	beforeEach(inject(function ($controller, $rootScope) {
		globals = $rootScope.globals.currentUser;
		$scope = $rootScope.$new();
		$controller('viewAllCompromisedProductsController', {
			$scope: $scope
		});
	}));
	beforeEach(inject(function ($httpBackend) {
	    httpBackend = $httpBackend;
	}));
	
	it('should fetch compromised products data', function() {
			httpBackend.expectPOST(baseUrl + 'dashboard/compromised').respond(flaggeedProductsDataResponse);
			httpBackend.expectGET("pages/login.html").respond(201, '');
			$scope.init();
	     
			httpBackend.flush();
			expect($scope.compromisedData.totalCompromisedProduct).toBe(8);
			expect($scope.compromisedData.glpDate).toBe("05.11.14");
	});
});

describe('viewAllBuyingCFEntitiesCtrl', function () {
	beforeEach(module('myApp'));
	beforeEach(inject(function ($controller, $rootScope) {
		globals = $rootScope.globals.currentUser;
		$scope = $rootScope.$new();
		$controller('viewAllBuyingCFEntitiesController', {
			$scope: $scope
		});
	}));
	beforeEach(inject(function ($httpBackend) {
	    httpBackend = $httpBackend;
	}));
	
	it('should fetch entities buying CF data', function() {
		httpBackend.expectGET(baseUrl + 'entity/counterfeit/buying/entities/undefined/undefined').respond(buyingCFEntitiesDataResponse);
			httpBackend.expectGET("pages/login.html").respond(201, '');
			$scope.init();
	     
			httpBackend.flush();
			expect($scope.filteredBuyingCFEntitiesData.length).not.toBe(0);
	});
});

describe('viewAllSellingCFEntitiesCtrl', function () {
	beforeEach(module('myApp'));
	beforeEach(inject(function ($controller, $rootScope) {
		globals = $rootScope.globals.currentUser;
		$scope = $rootScope.$new();
		$controller('viewAllSellingCFEntitiesController', {
			$scope: $scope
		});
	}));
	beforeEach(inject(function ($httpBackend) {
	    httpBackend = $httpBackend;
	}));
	
	it('should fetch entities selling CF data', function() {
		httpBackend.expectGET(baseUrl + 'entity/counterfeit/selling/entities/undefined/undefined').respond(sellingCFEntitiesDataResponse);
			httpBackend.expectGET("pages/login.html").respond(201, '');
			$scope.init();
	     
			httpBackend.flush();
			expect($scope.filteredSellingCFEntitiesData.length).not.toBe(0);
	});
});

