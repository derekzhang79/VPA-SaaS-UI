"use strict";

describe("dataFactory api service", function () {
  var dataFactory, httpBackend;
  var baseUrl = "/vpa-saas-app/";
  var tenantId = 5;
  var brandId = 5;

  beforeEach(module("myApp"));

  beforeEach(inject(function (_dataFactory_, $httpBackend) {
	  dataFactory = _dataFactory_;
    httpBackend = $httpBackend;
  }));
  
  it("should call login", function () {
	  	var email = 'user@domain.com';
	  	var password = '1234';
	    httpBackend.expectPOST(baseUrl + "user/login", {  "emailAddress" : email , "password" : password  }).respond({status: 'SUCCESS'});
	    httpBackend.expectGET("pages/login.html").respond(201, '');
	    dataFactory.login(email, password).then(function(res) {
	      expect(res.data.status).toEqual("SUCCESS");
	    });
	    httpBackend.flush();
  });
  
  it("should send forgot password link", function () {
	  	var email = 'user@domain.com';
	    httpBackend.expectPOST(baseUrl + "user/password/forgot", { "emailAddress" : email }).respond({status: 'SUCCESS'});
	    httpBackend.expectGET("pages/login.html").respond(201, '');
	    dataFactory.sendForgotPassword(email).then(function(res) {
	      expect(res.data.status).toEqual("SUCCESS");
	    });
	    httpBackend.flush();
  });
  
  it("should send reset password link", function () {
	  	var password = '1234';
	  	var tokenId = 'abcd';
	  	var userId = '9';
	    httpBackend.expectPOST(baseUrl + "user/password/reset", { "tokenId" : tokenId, "userId" : userId, "password" : password }).respond({status: 'SUCCESS'});
	    httpBackend.expectGET("pages/login.html").respond(201, '');
	    dataFactory.sendResetPassword(password, tokenId, userId).then(function(res) {
	      expect(res.data.status).toEqual("SUCCESS");
	    });
	    httpBackend.flush();
  });

  it("should call unprotected products data", function () {
    httpBackend.expectPOST(baseUrl + "dashboard/unprotected", {"tenantId" :tenantId}).respond({status: 'SUCCESS'});
    httpBackend.expectGET("pages/login.html").respond(201, '');
    dataFactory.getUnprotectedProductsData(tenantId).then(function(res) {
      expect(res.data.status).toEqual("SUCCESS");
    });
    httpBackend.flush();
  });
  
  it("should call flagged products data", function () {
	    httpBackend.expectPOST(baseUrl + "dashboard/compromised", {"tenantId" :tenantId}).respond({status: 'SUCCESS'});
	    httpBackend.expectGET("pages/login.html").respond(201, '');
	    dataFactory.getCompromisedProductsData(tenantId).then(function(res) {
	      expect(res.data.status).toEqual("SUCCESS");
	    });
	    httpBackend.flush();
  });
  
  it("should call worldmap tabs data", function () {
	    httpBackend.expectGET(baseUrl + "dashboard/authentication/kpi").respond({status: 'SUCCESS'});
	    httpBackend.expectGET("pages/login.html").respond(201, '');
	    dataFactory.getWorldMapTabsData().then(function(res) {
	      expect(res.data.status).toEqual("SUCCESS");
	    });
	    httpBackend.flush();
  });
  
  it("should call worldmap region-wise data", function () {
	    httpBackend.expectGET(baseUrl + "dashboard/authentication/regions").respond({status: 'SUCCESS'});
	    httpBackend.expectGET("pages/login.html").respond(201, '');
	    dataFactory.getWorldMapData().then(function(res) {
	      expect(res.data.status).toEqual("SUCCESS");
	    });
	    httpBackend.flush();
  });
  
  it("should get Top3 Buying CF Entities", function () {
	    httpBackend.expectGET(baseUrl + "entity/counterfeit/buying/entities/" + tenantId + "/" + brandId).respond({status: 'SUCCESS'});
	    httpBackend.expectGET("pages/login.html").respond(201, '');
	    dataFactory.getTop3BuyingCFEntities(tenantId, brandId).then(function(res) {
	      expect(res.data.status).toEqual("SUCCESS");
	    });
	    httpBackend.flush();
  });
  
  it("should get Top3 Selling CF Entities", function () {
	    httpBackend.expectGET(baseUrl + "entity/counterfeit/selling/entities/" + tenantId + "/" + brandId).respond({status: 'SUCCESS'});
	    httpBackend.expectGET("pages/login.html").respond(201, '');
	    dataFactory.getTop3SellingCFEntities(tenantId, brandId).then(function(res) {
	      expect(res.data.status).toEqual("SUCCESS");
	    });
	    httpBackend.flush();
  });
});