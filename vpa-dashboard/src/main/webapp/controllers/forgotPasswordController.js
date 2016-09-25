myApp.controller('forgotPasswordController', ['$scope', '$location', 'dataFactory', function($scope, $location, dataFactory) {

    (function initController() {

        $scope.adjustWidth();
    })();

    $scope.error = '';
    $scope.send = function() {
        if ($scope.fp_email == '' || !$scope.validateEmail($scope.fp_email)) {
            //$('.errors').text('Please check your email address.');
            $scope.error = 'Please check your email address.';
            $('#frm-forgot-pwd label, #fp_email').addClass('error');
            return false;
        } else {
            //return true;
            dataFactory.sendForgotPassword($scope.fp_email)
                .success(function(res) {

                    console.log(JSON.stringify(res));
                    if (res != null) {
                        $scope.error = 'We will email a link to allow you to re-set your password.';
                        $('#frm-forgot-pwd label, #fp_email').removeClass('error');
                        console.log('response: ' + JSON.stringify(res));
                    } else {
                        console.log('Email Id not found');
                    }
                })
                .error(function(error) {
                    if (error.message) {
                        $scope.error = error.message;
                        $('#frm-forgot-pwd label, #fp_email').addClass('error');
                    }
                    console.log('Unable to load data: ' + JSON.stringify(error));
                });
        }
    }
}])