myApp.factory('commonFunctions', ['$rootScope', '$location', function($rootScope, $location) {
	var root = {};
    root.redirectTo = function(path){
        $location.url(path);
    };
    
    return root;
}]);