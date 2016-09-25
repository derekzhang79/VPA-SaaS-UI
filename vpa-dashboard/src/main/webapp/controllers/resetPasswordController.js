myApp.controller('resetPasswordController', ['$scope', '$routeParams', '$location', 'dataFactory', function($scope, $routeParams, $location, dataFactory) {

    (function initController() {

        $scope.adjustWidth();
    })();

    console.log('token id: ' + $routeParams.tokenId + ' userId: ' + $routeParams.userId);
    $scope.toggleShowHide1 = 1;
    $scope.toggleShowHide2 = 1;
    $scope.tokenId = $routeParams.tokenId;
    $scope.userId = $routeParams.userId;
    $scope.showHide1 = function() {
        if ($scope.toggleShowHide1 == 1) {
            $scope.toggleShowHide1 = 0;
            $('#btnToggleShowHide1').attr('value', 'hide');
            $('#btnToggleShowHide1').closest('.bl_login_pwd').find('.txt-pwd').attr('type', 'text');

        } else {
            $scope.toggleShowHide1 = 1;
            $('#btnToggleShowHide1').attr('value', 'show');
            $('#btnToggleShowHide1').closest('.bl_login_pwd').find('.txt-pwd').attr('type', 'password');
        }
    }
    $scope.showHide2 = function() {
        if ($scope.toggleShowHide2 == 1) {
            $scope.toggleShowHide2 = 0;
            $('#btnToggleShowHide2').attr('value', 'hide');
            $('#btnToggleShowHide2').closest('.bl_login_pwd').find('.txt-pwd').attr('type', 'text');

        } else {
            $scope.toggleShowHide2 = 1;
            $('#btnToggleShowHide2').attr('value', 'show');
            $('#btnToggleShowHide2').closest('.bl_login_pwd').find('.txt-pwd').attr('type', 'password');
        }
    }

    //reset password
    $scope.resetPassword = function() {
        console.log('reset pwd()');
        $scope.error = '';
        if ($scope.pwd1 == '' && $scope.pwd2 == '') {
            $scope.error = 'Both the passwords are empty.';
            $('#pwd1, #pwd2, #frm-reset-pwd label').addClass('error');
            //$('.errors').text(str);
            return false;
        } else if ($scope.pwd1 != $scope.pwd2) {
            $scope.error = 'Passwords does not match.'
            $('#pwd1, #pwd2, #frm-reset-pwd label').addClass('error');
            //$('.errors').text($scope.str);
            return false;
        } else {
            //return true;
            dataFactory.sendResetPassword($scope.pwd1, $scope.tokenId, $scope.userId)
                .success(function(res) {

                    //console.log(JSON.stringify(res));
                    if (res != null) {
                        console.log('response: ' + JSON.stringify(res));
                        $location.url('/login');
                    }

                })
                .error(function(error) {
                    console.log('Unable to load data: ' + JSON.stringify(error));
                });
        }
    }
}])