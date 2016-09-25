myApp.controller('notificationController', ['$scope', 'dataFactory', 'sharedData', '$rootScope', '$sessionStorage', '$timeout', function($scope, dataFactory, sharedData, $rootScope, $sessionStorage, $timeout) {

    $scope.init = function() {

        $timeout(function() {
            $('.footable').trigger('footable_redraw');
        }, 100);

        $scope.sessionStorage = $sessionStorage;

        $scope.authenticationList = sharedData.getAuthenticationList();
        if ($scope.authenticationList.length == 0) {
            var loginTimeStamp = $scope.sessionStorage.loginTimeStamp;
            console.log("login timestamp: " + loginTimeStamp);
            dataFactory.getAuthenticationsList(loginTimeStamp)
                .success(function(res) {
                    if (res != null) {
                        console.log(JSON.stringify(res));
                        $scope.authenticationList = res;
                        if (res.length != 0) {
                            $scope.sessionStorage.currentTimeStamp = res[0].createdDateString;
                        }
                        sharedData.setAuthenticationList($scope.authenticationList);
                        console.log(JSON.stringify($scope.authenticationList));
                    }
                })
                .error(function(error) {
                    console.log('Unable to load authentication list: ' + JSON.stringify(error));
                });
        }
    }
}]);