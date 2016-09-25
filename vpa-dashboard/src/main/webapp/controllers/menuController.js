myApp.controller('menuController', ['$scope', '$location', '$rootScope', function($scope, $location, $rootScope) {

    $scope.navList = [{
        text: 'EXECUTIVE DASHBOARD',
        href: ['#/home'],
        addclass: 'fa-bar-chart'
    }, {
        text: 'REVENUE LOSS',
        href: ['#/revenueLoss'],
        addclass: 'fa-usd'
    }, {
        text: 'AUTHENTICATIONS',
        href: ['#/authentications'],
        addclass: 'fa-square-o'
    }, {
        text: 'PRODUCTS',
        href: ['#/viewAllCompromisedProducts'],
        addclass: 'fa-codepen'
    }, {
        text: 'ENTITIES',
        href: ['#/viewAllBuyingCFEntities', '#/viewAllSellingCFEntities'],
        addclass: 'fa-building-o'
    }];

    function detectRoute() {
        var currentRoute = '';
        for (var i = 0; i < $scope.navList.length; i++) {
            for (var j = 0; j < $scope.navList[i].href.length; j++) {
                currentRoute = "#" + $location.path();
                $scope.navList[i].active = currentRoute.match(new RegExp($scope.navList[i].href[j])) ? true : false;
                if ($scope.navList[i].active) {
                    break;
                };
            }
        }
    }
    $scope.$on('$routeChangeSuccess', detectRoute);
}]);