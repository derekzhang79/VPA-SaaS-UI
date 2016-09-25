var $scope, globals, httpBackend;
var baseUrl = "/vpa-saas-app/";
var tenantId = 5;
var brandId = 5;

var loginDataResponse = {
	      
		brandOwnerUser: {
			tenant: {
				id: 9,
				brands: [
				         {
				        	 id: "9"
				         }
				       ]
			}
		},
		
    	  
  }
describe('LoginCtrl', function () {
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
		
	it('should login successful', function() {
		
		httpBackend.expectPOST(baseUrl + 'user/brandowner/login').respond(loginDataResponse);
		httpBackend.expectGET("pages/login.html").respond(201, '');
		
		$scope.email = "";
		$scope.password = "";
		$scope.getLogin();
	     
	     httpBackend.flush();
	     expect($scope.tenantId).toBe("9");
	     expect($scope.brandId).toBe("9");
	    
	   });
});