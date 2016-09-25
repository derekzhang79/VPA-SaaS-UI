myApp.controller('viewAllBuyingCFEntitiesController', ['$scope', 'dataFactory', 'sharedData', '$rootScope', '$q', '$timeout', function($scope, dataFactory, sharedData, $rootScope, $q, $timeout) {
    
	$scope.init = function() {
        $timeout(function() {
            $('.footable').trigger('footable_redraw');
        }, 100);
        $scope.tenantId = $scope.sessionStorage.tenantId;
        $scope.brandId = $scope.sessionStorage.brandId;
        $scope.filteredBuyingCFEntitiesData = [];
        /*$scope.currentPage = 1;
        $scope.numPerPage = 10;
        $scope.totalItems = 0;*/
        $scope.buyingCFEntitiesData = sharedData.getBuyingCFEntitiesDataList();
        if ($scope.buyingCFEntitiesData.length == undefined) {
            dataFactory.getTop3BuyingCFEntities($scope.tenantId, $scope.brandId)
                .success(function(res) {
                    if (res != null) {
                        $scope.buyingCFEntitiesData = res;
                        sharedData.setBuyingCFEntitiesDataList($scope.buyingCFEntitiesData);
                        $scope.filteredBuyingCFEntitiesData = $scope.buyingCFEntitiesData;
                        //$scope.generateTable();
                    }
                })
                .error(function(error) {
                    console.log('Unable to load buying CF entities list: ' + JSON.stringify(error));
                });
        } else {
            $scope.filteredBuyingCFEntitiesData = $scope.buyingCFEntitiesData;
            //$scope.generateTable();
        }
    }
    $scope.generateTable = function() {
        //pagination code
        $scope.totalItems = $scope.buyingCFEntitiesData.length;
        $scope.$watch('currentPage + numPerPage', function() {
            var begin = (($scope.currentPage - 1) * $scope.numPerPage),
                end = begin + $scope.numPerPage;
            $scope.filteredBuyingCFEntitiesData = [];
            for (var i = begin; i < end; i++) {
                $scope.filteredBuyingCFEntitiesData.push($scope.buyingCFEntitiesData[i]);
            }
        });
    }
}]);