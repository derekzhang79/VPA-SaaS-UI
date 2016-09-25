describe('Testing routes', function() {
beforeEach(module('myApp'));

var location, route, rootScope;

beforeEach(inject(
    function( _$location_, _$route_, _$rootScope_ ) {
        location = _$location_;
        route = _$route_;
        rootScope = _$rootScope_;
}));

 describe('Login route', function() {
    beforeEach(inject(
        function($httpBackend) {
        	$httpBackend.expectGET('pages/login.html').respond(200);
        }));

    it('should load the login page on successful load of /login', function() {
        location.path('/login');
        rootScope.$digest();
        expect(route.current.controller).toBe('loginController')
    });
 }); 
 
 describe('Dashboard route', function() {
	    beforeEach(inject(
	        function($httpBackend) {
	            $httpBackend.expectGET('pages/dashboard.html').respond(200);     
	        }));

	    it('should load the dashboard page on successful load of /home', function() {
	        location.path('/home');
	        rootScope.$digest();
	        expect(route.current.controller).toBe('dashboardController')
	    });
 });
    
 describe('reset password route', function() {
	    beforeEach(inject(
	        function($httpBackend) {
	            $httpBackend.expectGET('pages/resetPassword.html').respond(200);     
	        }));
    it('should load the resetPassword page on successful load of /reset/:userId/:tokenId', function() {
        location.path('/reset/1/1');
        rootScope.$digest();
        expect(route.current.controller).toBe('resetPasswordController')
    });
 }); 
 
 describe('forgot password route', function() {
	    beforeEach(inject(
	        function($httpBackend) {
	            $httpBackend.expectGET('pages/forgotPassword.html').respond(200);     
	        }));
    it('should load the forgot password page on successful load of /forgotPassword', function() {
        location.path('/forgotPassword');
        rootScope.$digest();
        expect(route.current.controller).toBe('forgotPasswordController')
    });
});
 
 describe('Notification route', function() {
	    beforeEach(inject(
	        function($httpBackend) {
	            $httpBackend.expectGET('pages/notification.html').respond(200);     
	        }));
    it('should load the Notification page on successful load of /notification', function() {
        location.path('/notification');
        rootScope.$digest();
        expect(route.current.controller).toBe('notificationController')
    });
 });
 
 describe('viewAll Unprotected products route', function() {
	    beforeEach(inject(
	        function($httpBackend) {
	            $httpBackend.expectGET('pages/viewAllUnprotectedProducts.html').respond(200);     
	        }));
    it('should load the viewAll Unprotected products page on successful load of /viewAllUnprotectedProducts', function() {
        location.path('/viewAllUnprotectedProducts');
        rootScope.$digest();
        expect(route.current.controller).toBe('viewAllUnprotectedProductsController')
    });
 });
 
 describe('viewAll Flagged products route', function() {
	    beforeEach(inject(
	        function($httpBackend) {
	            $httpBackend.expectGET('pages/viewAllCompromisedProducts.html').respond(200);     
	        }));
    it('should load the viewAll FLagged products page on successful load of /viewAllCompromisedProducts', function() {
        location.path('/viewAllCompromisedProducts');
        rootScope.$digest();
        expect(route.current.controller).toBe('viewAllCompromisedProductsController')
    });
 });
 
 describe('viewAll Buying CF Entities route', function() {
	    beforeEach(inject(
	        function($httpBackend) {
	            $httpBackend.expectGET('pages/viewAllBuyingCFEntities.html').respond(200);     
	        }));
    it('should load the viewAll Buying CF Entities page on successful load of /viewAllBuyingCFEntities', function() {
        location.path('/viewAllBuyingCFEntities');
        rootScope.$digest();
        expect(route.current.controller).toBe('viewAllBuyingCFEntitiesController')
    });
 });
 
 describe('viewAll Selling CF Entities route', function() {
	    beforeEach(inject(
	        function($httpBackend) {
	            $httpBackend.expectGET('pages/viewAllSellingCFEntities.html').respond(200);     
	        }));
    it('should load the viewAll Selling CF Entities page on successful load of /viewAllSellingCFEntities', function() {
        location.path('/viewAllSellingCFEntities');
        rootScope.$digest();
        expect(route.current.controller).toBe('viewAllSellingCFEntitiesController')
    });
 });
});