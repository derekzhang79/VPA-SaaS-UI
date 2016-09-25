myApp.controller('viewAllSellingCFEntitiesController', ['$scope', 'dataFactory', 'sharedData', '$rootScope', '$q', '$timeout', function($scope, dataFactory, sharedData, $rootScope, $q, $timeout) {

    $scope.init = function() {
        $timeout(function() {
            $('.footable').trigger('footable_redraw');
        }, 100);
        $scope.tenantId = $scope.sessionStorage.tenantId;
        $scope.brandId = $scope.sessionStorage.brandId;
        $scope.filteredSellingCFEntitiesData = [];
        /*$scope.currentPage = 1;
        $scope.numPerPage = 10;
        $scope.totalItems = 0;*/
        $scope.sellingCFEntitiesData = sharedData.getSellingCFEntitiesDataList();
        if ($scope.sellingCFEntitiesData.length == undefined) {
            dataFactory.getTop3SellingCFEntities($scope.tenantId, $scope.brandId)
                .success(function(res) {
                    if (res != null) {
                        $scope.sellingCFEntitiesData = res;
                        sharedData.setSellingCFEntitiesDataList($scope.sellingCFEntitiesData);
                        $scope.filteredSellingCFEntitiesData = $scope.sellingCFEntitiesData;
                        //$scope.generateTable();
                    }
                })
                .error(function(error) {
                    console.log('Unable to load selling CF entities list: ' + JSON.stringify(error));
                });
        } else {
            $scope.filteredSellingCFEntitiesData = $scope.sellingCFEntitiesData;
            //$scope.generateTable();
        }
    }
    /*$scope.generateTable = function(){
    	//pagination code
    	$scope.totalItems = $scope.sellingCFEntitiesData.length;
    	   $scope.$watch('currentPage + numPerPage', function() {
    		    var begin = (($scope.currentPage - 1) * $scope.numPerPage)
    		    , end = begin + $scope.numPerPage;
    		    $scope.filteredSellingCFEntitiesData = [];
    		    for(var i=begin; i < end; i++){
    		    	$scope.filteredSellingCFEntitiesData.push($scope.sellingCFEntitiesData[i]);
    		    }
    	   });
    }*/
}]);