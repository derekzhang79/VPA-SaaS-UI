myApp.service('sharedData', function() {
    var authenticationList = [];
    var unprotectedProductsDataList = {};
    var compromisedProductsDataList = {};
    var buyingCFEntitiesDataList = {};
    var sellingCFEntitiesDataList = {};

    return {
        //Authentication list
        getAuthenticationList: function() {
            return authenticationList;
        },
        setAuthenticationList: function(authList) {
            authenticationList = authList;
        },
        //UnprotectedProductsData
        getUnprotectedProductsDataList: function() {
            return unprotectedProductsDataList;
        },
        setUnprotectedProductsDataList: function(unprotectedProductsData) {
            unprotectedProductsDataList = unprotectedProductsData;
        },
        //CompromisedProductsData
        getCompromisedProductsDataList: function() {
            return compromisedProductsDataList;
        },
        setCompromisedProductsDataList: function(compromisedProductsData) {
            compromisedProductsDataList = compromisedProductsData;
        },
        //BuyingCFEntitiesData
        getBuyingCFEntitiesDataList: function() {
            return buyingCFEntitiesDataList;
        },
        setBuyingCFEntitiesDataList: function(buyingCFEntitiesData) {
            buyingCFEntitiesDataList = buyingCFEntitiesData;
        },
        //SellingCFEntitiesData
        getSellingCFEntitiesDataList: function() {
            return sellingCFEntitiesDataList;
        },
        setSellingCFEntitiesDataList: function(sellingCFEntitiesData) {
            sellingCFEntitiesDataList = sellingCFEntitiesData;
        }
    };
});