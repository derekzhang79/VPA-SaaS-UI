myApp.controller('viewAllCompromisedProductsController', ['$scope', 'dataFactory', 'sharedData', '$rootScope', '$q', '$timeout', function($scope, dataFactory, sharedData, $rootScope, $q, $timeout) {

    $scope.init = function() {

        $timeout(function() {
            $('.footable').trigger('footable_redraw');
        }, 100);

        $scope.tenantId = $scope.sessionStorage.tenantId;

        $scope.filteredCompromisedData = [];
        $scope.currentPage = 1;
        $scope.numPerPage = 10;
        $scope.totalItems = 0;

        $scope.compromisedData = sharedData.getCompromisedProductsDataList();
        if ($scope.compromisedData.viewAll == undefined) {
            dataFactory.getCompromisedProductsData($scope.tenantId)
                .success(function(res) {
                    if (res != null) {
                        $scope.compromisedData = res;
                        sharedData.setCompromisedProductsDataList($scope.compromisedData);
                        $scope.filteredCompromisedData = $scope.compromisedData.viewAll;
                        //$scope.generateTable();
                    }
                })
                .error(function(error) {
                    console.log('Unable to load compromised products list: ' + JSON.stringify(error));
                });
        } else {
            $scope.filteredCompromisedData = $scope.compromisedData.viewAll;
            //$scope.generateTable();
        }
    }

    /*$scope.generateTable = function(){
    	//pagination code
    	$scope.totalItems = $scope.compromisedData.viewAll.length;
    	   $scope.$watch('currentPage + numPerPage', function() {
    		    var begin = (($scope.currentPage - 1) * $scope.numPerPage)
    		    , end = begin + $scope.numPerPage;
    		    $scope.filteredCompromisedData = [];
    		    for(var i=begin; i < end; i++){
    		    	$scope.filteredCompromisedData.push($scope.compromisedData.viewAll[i]);
    		    }
    	   });
    }*/
}]);