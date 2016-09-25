var myApp = angular.module('myApp', ['ngRoute', 'ngStorage', 'ui.bootstrap', 'ui.footable', 'angular.vertilize']);

myApp.config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'pages/login.html',
                controller: 'loginController',
                isAccessible: true
            })
            .when('/login', {
                templateUrl: 'pages/login.html',
                controller: 'loginController',
                isAccessible: true
            })
            .when('/home', {
                templateUrl: 'pages/dashboard.html',
                controller: 'dashboardController',
                isAccessible: false
            })
            .when('/reset/:userId/:tokenId', {
                templateUrl: 'pages/resetPassword.html',
                controller: 'resetPasswordController',
                isAccessible: true
            })
            .when('/forgotPassword', {
                templateUrl: 'pages/forgotPassword.html',
                controller: 'forgotPasswordController',
                isAccessible: true
            })
            .when('/notification', {
                templateUrl: 'pages/notification.html',
                controller: 'notificationController',
                isAccessible: false
            })
            .when('/viewAllUnprotectedProducts', {
                templateUrl: 'pages/viewAllUnprotectedProducts.html',
                controller: 'viewAllUnprotectedProductsController',
                isAccessible: false
            })
            .when('/viewAllCompromisedProducts', {
                templateUrl: 'pages/viewAllCompromisedProducts.html',
                controller: 'viewAllCompromisedProductsController',
                isAccessible: false
            })
            .when('/viewAllBuyingCFEntities', {
                templateUrl: 'pages/viewAllBuyingCFEntities.html',
                controller: 'viewAllBuyingCFEntitiesController',
                isAccessible: false
            })
            .when('/viewAllSellingCFEntities', {
                templateUrl: 'pages/viewAllSellingCFEntities.html',
                controller: 'viewAllSellingCFEntitiesController',
                isAccessible: false
            })
            .when('/authentications', {
            	templateUrl: 'pages/authentications.html',
                controller: 'authenticationsController',
                isAccessible: false
            })
            .when('/revenueLoss', {})
            .when('/products', {

            })
            .otherwise({
                redirectTo: '/login'
            });
    })
    .run(['$rootScope', '$location', '$sessionStorage', '$http', '$route', function($rootScope, $location, $sessionStorage, $http, $route, loaderService) {
        $rootScope.sessionStorage = $sessionStorage;
        $rootScope.globals = $rootScope.sessionStorage.globals || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
        }

        $rootScope.$on('$routeChangeStart', function(event, next) {
            var userAuthenticated = $rootScope.globals.currentUser;
            console.log("userAuthenticated = " + userAuthenticated);
            if (!userAuthenticated && !next.isAccessible) {
                $rootScope.savedLocation = $location.url();
                $location.path('/login');
            }
        });
    }]);