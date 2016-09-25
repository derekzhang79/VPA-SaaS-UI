module.exports = function(config) {
config.set({
frameworks: ['jasmine'],
basePath: '../../',
files: [
"resources/js/jquery-1.11.2.js",
"resources/js/html2canvas.js",
"resources/js/jquery.plugin.html2canvas.js",
"resources/js/rgbcolor.js",
"resources/js/StackBlur.js",
"resources/js/canvg.js",

"resources/js/angular.min.js",
"test/lib/angular-mocks.js",
"resources/js/angular-route.min.js",
"resources/js/ngStorage.min.js",
"resources/js/ui-bootstrap-tpls-0.13.0.min.js",
"resources/js/angular-footable.js",
"resources/js/angular-vertilize.min.js",
"resources/js/d3.v3.min.js", 
"resources/js/d3.tip.v0.6.3.js",
"resources/js/footable.js",
"resources/js/angular-footable.js",

"main.js",
"services/sharedData.js",
"factories/factory.js",
"factories/commonFunctions.js",
"filters/filters.js",
"directives/directives.js",
"controllers/menuController.js",
"controllers/mainController.js",
"controllers/loginController.js",
"controllers/forgotPasswordController.js",
"controllers/dashboardController.js",
"controllers/notificationController.js",
"controllers/viewAllUnprotectedProductsController.js",
"controllers/viewAllCompromisedProductsController.js",
"controllers/viewAllBuyingCFEntitiesController.js",
"controllers/viewAllSellingCFEntitiesController.js",
"controllers/authenticationsController.js",
"controllers/resetPasswordController.js",

"test/unit/vpaSpec.js"
],
autoWatch: true,
browsers: ['Chrome']
});
};