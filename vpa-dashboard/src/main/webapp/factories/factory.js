myApp.factory('dataFactory', ['$http', '$rootScope', '$sessionStorage', function($http, $rootScope, $sessionStorage) {

    var urlBase = '/vpa-saas-app/';
    var dataFactory = {};

    //login
    dataFactory.login = function(email, password) {

        return $http.post(urlBase + 'user/brandowner/login', {
            "emailAddress": email,
            "password": password
        });
    };

    //ClearCredentials
    dataFactory.ClearCredentials = function() {

        $rootScope.globals = {};
        // $cookieStore.remove('globals');
        $sessionStorage.globals = undefined;

        $http.defaults.headers.common.Authorization = 'Basic';
    };

    //SetCredentials
    dataFactory.SetCredentials = function(username, password) {

        var authdata = Base64.encode(username + ':' + password);

        $rootScope.globals = {
            currentUser: {
                username: username,
                authdata: authdata
            }
        };

        $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
        $sessionStorage.globals = $rootScope.globals;
    };

    //forgot password
    dataFactory.sendForgotPassword = function(email) {

        return $http.post(urlBase + 'user/password/forgot', {
            "emailAddress": email
        });
    };

    //reset password
    dataFactory.sendResetPassword = function(password, tokenId, userId) {
        console.log("" + password + tokenId + password);
        return $http.post(urlBase + 'user/password/reset', {
            "tokenId": tokenId,
            "userId": userId,
            "password": password
        });
    };

    //registration failed re-send token
    dataFactory.regFailedSendToken = function(rfEmail) {

        return $http.get(urlBase + 'user/token/regenerate/' + rfEmail + '/', {});
    };


    //get notification count
    dataFactory.getNotificationCount = function(currentTimeStamp) {

        return $http.get(urlBase + 'dashboard/authentication/flag/count/' + currentTimeStamp, {});
    };

    //get notification list (list of authentications)
    dataFactory.getAuthenticationsList = function(loginTimeStamp) {

        return $http.get(urlBase + 'dashboard/authentication/live/details/' + loginTimeStamp, {});
    };

    //get unprotected products data
    dataFactory.getUnprotectedProductsData = function(tenantId) {

        return $http.post(urlBase + 'dashboard/unprotected', {
            "tenantId": tenantId
        });
    };

    //get compromised products data
    dataFactory.getCompromisedProductsData = function(tenantId) {

        return $http.post(urlBase + 'dashboard/compromised', {
            "tenantId": tenantId
        });
    };

    //get world map data
    dataFactory.getWorldMapTabsData = function() {

        return $http.get(urlBase + 'dashboard/authentication/kpi', {});
    };

    //get world map data
    dataFactory.getWorldMapData = function() {

        return $http.get(urlBase + 'dashboard/authentication/regions', {});
    };

    //get top 3 buying CF entities
    dataFactory.getTop3BuyingCFEntities = function(tenantId, brandId) {

        return $http.get(urlBase + 'entity/counterfeit/buying/entities/' + tenantId + '/' + brandId, {});
    };

    //get top 3 selling CF entities
    dataFactory.getTop3SellingCFEntities = function(tenantId, brandId) {

        return $http.get(urlBase + 'entity/counterfeit/selling/entities/' + tenantId + '/' + brandId, {});
    };

  //send dashboard screenshot
	dataFactory.sendDashboardScreenshot = function (emailAddress, stringOfHtml) {
		var imgBase64 = Base64.encode(stringOfHtml);
		return $http.post(urlBase + 'user/mail/image', { "emailAddress" : emailAddress, "dashBoardBase64" : imgBase64 });
	};
	
	//get current month and year
	dataFactory.getCurrentMonth = function () {
		
		return $http.get(urlBase + 'auth/currentMonth', {});
	};
	
	//get authentications over time
	dataFactory.getAuthsOverTime = function () {
		
		return $http.get(urlBase + 'auth/totalAuth', {});
	};

    // Base64 encoding service used by AuthenticationService
    var Base64 = {

        keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',

        encode: function(input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;

            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);

                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;

                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }

                output = output +
                    this.keyStr.charAt(enc1) +
                    this.keyStr.charAt(enc2) +
                    this.keyStr.charAt(enc3) +
                    this.keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);

            return output;
        },

        decode: function(input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;

            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
            var base64test = /[^A-Za-z0-9\+\/\=]/g;
            if (base64test.exec(input)) {
                window.alert("There were invalid base64 characters in the input text.\n" +
                    "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                    "Expect errors in decoding.");
            }
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

            do {
                enc1 = this.keyStr.indexOf(input.charAt(i++));
                enc2 = this.keyStr.indexOf(input.charAt(i++));
                enc3 = this.keyStr.indexOf(input.charAt(i++));
                enc4 = this.keyStr.indexOf(input.charAt(i++));

                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;

                output = output + String.fromCharCode(chr1);

                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }

                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";

            } while (i < input.length);

            return output;
        }
    };

    return dataFactory;
}]);