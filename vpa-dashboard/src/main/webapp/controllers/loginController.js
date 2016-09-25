myApp.controller('loginController', ['$scope', '$location', 'dataFactory', '$rootScope', '$sessionStorage', function($scope, $location, dataFactory, $rootScope, $sessionStorage) {
    (function initController() {
        // reset login status
        dataFactory.ClearCredentials();

        $scope.adjustWidth();
    })();

    $scope.sessionStorage = $sessionStorage;
    //For login password show/hide
    $scope.toggleShowHide = 1;
    $scope.showHide = function() {
        if ($scope.toggleShowHide == 1) {
            $scope.toggleShowHide = 0;
            $('#btnToggleShowHide').attr('value', 'hide');
            $('#btnToggleShowHide').closest('.bl_login_pwd').find('.txt-pwd').attr('type', 'text');
        } else {
            $scope.toggleShowHide = 1;
            $('#btnToggleShowHide').attr('value', 'show');
            $('#btnToggleShowHide').closest('.bl_login_pwd').find('.txt-pwd').attr('type', 'password');
        }
    }

    //login
    $scope.getLogin = function() {
        showLoading(true);
        $scope.error = '';
        $('.btn-pwd').attr('data-click-state', 1).attr('value', 'show');
        $('.txt-pwd').attr('type', 'password');
        $('#frm_login label, #email, #password').removeClass('error');
        if ($scope.email == '' && $scope.password == '') {
            $scope.error = 'Please check your email address and password.';
            $('#frm_login label, #email, #password').addClass('error');
            showLoading(false);
            return false;
        } else if ($scope.email == '' && $scope.password != '') {
            $scope.error = 'Please check your email address.';
            $('#frm_login label.lbl_email, #email').addClass('error');
            showLoading(false);
            return false
        } else if (!$scope.validateEmail($scope.email)) {
            $scope.error = 'Email is invalid.'
            $('#frm_login label.lbl_email, #email').addClass('error');
            showLoading(false);
            return false;
        }
        if ($scope.password == '' && $scope.email != '') {
            $scope.error = 'Please check your password.';
            $('#frm_login label.lbl_pwd, #password').addClass('error');
            showLoading(false);
            return false
        } else {
            //return true;
            dataFactory.login($scope.email, $scope.password)
                .success(function(res) {
                    dataFactory.SetCredentials($scope.email, $scope.password);
                    console.log(JSON.stringify(res));
                    if (res != null) {
                        $scope.sessionStorage.currentTimeStamp = res.currentTimeStamp;
                        $scope.sessionStorage.loginTimeStamp = res.currentTimeStamp;
                        $scope.sessionStorage.tenantId = res.brandOwnerUser.tenant.id;
                        $scope.sessionStorage.brandId = res.brandOwnerUser.tenant.brands[0].id;

                        showLoading(false);
                        $location.url('/home');
                    } else {
                        showLoading(false);
                        console.log('Invalid credentials');
                    }
                })
                .error(function(error) {
                    showLoading(false);
                    if (error.message) {
                        $scope.error = error.message;
                        $('#frm_login label, #email, #password').addClass('error');
                    }
                    console.log('Unable to load data: ' + JSON.stringify(error));
                });
        }
    }
}])