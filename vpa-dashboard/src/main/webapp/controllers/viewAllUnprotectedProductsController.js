myApp.controller('viewAllUnprotectedProductsController', ['$scope', 'dataFactory', 'sharedData', '$rootScope', '$q', '$timeout', function($scope, dataFactory, sharedData, $rootScope, $q, $timeout) {

    $scope.init = function() {

        $timeout(function() {
            $('.footable').trigger('footable_redraw');
        }, 100);

        $scope.tenantId = $scope.sessionStorage.tenantId;

        $scope.filteredUnprotectedData = [];
        /*$scope.currentPage = 1;
        $scope.numPerPage = 10;
        $scope.totalItems = 0;*/

        $scope.unprotectedData = sharedData.getUnprotectedProductsDataList();
        if ($scope.unprotectedData.viewAll == undefined) {
            dataFactory.getUnprotectedProductsData($scope.tenantId)
                .success(function(res) {
                    if (res != null) {

                        $scope.unprotectedData = res;
                        sharedData.setUnprotectedProductsDataList($scope.unprotectedData);
                        $scope.filteredUnprotectedData = $scope.unprotectedData.viewAll;
                        //$scope.generateTable();
                    }
                })
                .error(function(error) {
                    console.log('Unable to load unprotected products list: ' + JSON.stringify(error));
                });
        } else {
            $scope.filteredUnprotectedData = $scope.unprotectedData.viewAll;
            //$scope.generateTable();
        }
    }

    /*$scope.generateTable = function(){
    	//pagination code
    	$scope.totalItems = $scope.unprotectedData.viewAll.length;
    	   $scope.$watch('currentPage + numPerPage', function() {
    		    var begin = (($scope.currentPage - 1) * $scope.numPerPage)
    		    , end = begin + $scope.numPerPage;
    		    $scope.filteredUnprotectedData = [];
    		    for(var i=begin; i < end; i++){
    		    	$scope.filteredUnprotectedData.push($scope.unprotectedData.viewAll[i]);
    		    }
    	   });
    }*/
}]);