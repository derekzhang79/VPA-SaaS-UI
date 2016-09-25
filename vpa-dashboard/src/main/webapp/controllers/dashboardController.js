myApp.controller('dashboardController', ['$scope', 'dataFactory', 'sharedData', 'commonFunctions', '$rootScope', '$route', '$timeout', '$sessionStorage', function($scope, dataFactory, sharedData, commonFunctions, $rootScope, $route, $timeout, $sessionStorage) {

    // Init
    $scope.init = function() {

        $scope.sessionStorage = $sessionStorage;

        document.body.style.cursor = "default";
        //showLoading(true);
        $scope.location = commonFunctions;

        //Dashboard Popup interaction
        $(function() {
            $('.btn-dashboard').click(function() {
                $('.popup-email-section, .bl_mask').hide();
                $('.mask').fadeIn(300);
                $('.popup_email_dashboard').delay(300).fadeIn(200);
            });
            //Section email popup
            $('.bl_dashboard').each(function() {
                $(this).find('.trigger_email').click(function() {
                    $('.popup-email-section, .bl_mask').hide();
                    $(this).closest('.bl_dashboard').find('.bl_mask').fadeIn(300)
                    $(this).closest('.bl_dashboard').find('.popup-email-section').delay(200).fadeIn(300);
                });
            });
            $('.popup').each(function() {
                $(this).find('.close').click(function() {
                    $(this).closest('.popup').fadeOut(200);
                    $(this).closest('.popup').prev('.mask, .bl_mask').delay(200).fadeOut(300);
                });
            });
            $(document).keyup(function(e) {
                if (e.keyCode == 27) {
                    $('.popup').fadeOut(700);
                    $('.mask').delay(700).fadeOut(700);
                }
            });
        });

        $scope.tenantId = $scope.sessionStorage.tenantId;
        $scope.brandId = $scope.sessionStorage.brandId;

        $scope.colorPallete = ["#f00", "#c2c2c2"];
        $scope.unProtectedChartData = [];
        $scope.unprotectedData = {};

        $scope.compromisedChartData = [];
        $scope.compromisedData = {};

        $scope.worldMapTabs = [
            {authType: "Total", count: "0", authLast24Hrs: "0"}, 
            {authType: "Genuine", count: "0", authLast24Hrs: "0"},
            {authType: "Suspect", count: "0", authLast24Hrs: "0"
        }];

        $scope.worldMapData = {
            Americas: {},
            EMEA: {},
            APAC: {}
        };

        $scope.worldMapData.Americas.totalCount = 0;
        $scope.worldMapData.Americas.genuineCount = 0;
        $scope.worldMapData.Americas.suspectedCount = 0;
        $scope.worldMapData.EMEA.totalCount = 0;
        $scope.worldMapData.EMEA.genuineCount = 0;
        $scope.worldMapData.EMEA.suspectedCount = 0;
        $scope.worldMapData.APAC.totalCount = 0;
        $scope.worldMapData.APAC.genuineCount = 0;
        $scope.worldMapData.APAC.suspectedCount = 0;

        $scope.authTotalChartData = [];
        $scope.authGenuineChartData = [];
        $scope.authSuspectChartData = [];

        $scope.unprotectedProductList();
        $scope.compromisedProductList();
        $scope.generateWorldMapTabs();
        $scope.generateWorldMap();

        $scope.top3BuyingCFEntities();
        $scope.top3SellingCFEntities();
    }

    ////Donut chart
    $scope.generateDonutChart = function(targetElement, targetData, chartType) {

        var chart_auth_unprotected = function() {
            var auth_unprotected = targetData;
            var maxWidth = 100;
            var maxHeight = 100;
            var outerRadius = 50;
            var ringWidth = 8;

            function drawUnprotected(config) {
                var pie = d3.layout.pie().value(function(d) {
                    return d.value;
                }).sort(null).padAngle(0.03);

                var color = d3.scale.ordinal()
                    .range($scope.colorPallete);
                var arc = d3.svg.arc();

                function tweenPie(finish) {
                    var start = {
                        startAngle: 0,
                        endAngle: 0
                    };
                    var i = d3.interpolate(start, finish);
                    return function(d) {
                        return arc(i(d));
                    };
                }
                arc.outerRadius(config.outerRadius || outerRadius)
                    .innerRadius(config.innerRadius || innerRadius);

                d3.select(config.el).selectAll('g').remove();

                var svg = d3.select(config.el)
                    .attr({
                        width: maxWidth,
                        height: maxHeight
                    });
                var tip = d3.tip()
                    .attr('class', 'd3-tip')
                    .offset([-3, 0])
                    .direction('s')
                    .html(function(d) {
                        if (chartType == 'unprotected-chart') {
                            return "<span class='graph_tip graph_tip_btm'><span class='val'>" + d.data.count + "</span> " + d.data.status + " Products</span>";
                        } else if (chartType == 'flagged-chart') {
                            return "<span class='graph_tip graph_tip_btm'><span class='val'>" + d.data.percentage + "%</span>" + d.data.status + " Products</span>";
                        }
                    });
                svg.call(tip);
                var groups = svg.selectAll('g.arc')
                    .data(pie(config.data))
                    .enter()
                    .append('g')
                    .attr({
                        'class': 'arc',
                        'transform': 'translate(' + outerRadius + ', ' + outerRadius + ')'
                    })
                    .on('mouseover', tip.show)
                    .on('mouseout', tip.hide);

                groups.append('path')
                    .attr({
                        'fill': function(d, i) {
                            return color(i);
                        }
                    })
                    .transition()
                    .duration(config.duration || 1000)
                    .attrTween('d', tweenPie);
            }
            drawUnprotected({
                el: targetElement + ' svg',
                outerRadius: outerRadius,
                innerRadius: outerRadius - ringWidth,
                data: auth_unprotected,
                duration: 800
            });
            $(targetElement + ' .content').delay(800).fadeIn(500);
        }();
    };

    $scope.unprotectedProductList = function() {

        dataFactory.getUnprotectedProductsData($scope.tenantId)
            .success(function(res) {
                console.log(JSON.stringify(res));
                if (res != null) {
                    var top3unProtectedProductsList = res.top3UnProtectedProduct;
                    sharedData.setUnprotectedProductsDataList(res);
                    //set unprotected data
                    $scope.unProtectedChartData = [{"status": "Unprotected", "value": res.unProtectedProductPercentage, "count": res.totalUnprotectedProduct},
                                                   {"status": "Protected", "value": Math.abs(100 - res.unProtectedProductPercentage), "count": (res.totalProduct - res.totalUnprotectedProduct)
                    	}];
                    $scope.unprotectedData.unProtectedProductPercentage = res.unProtectedProductPercentage;

                    $scope.colorPallete = ["#f00", "#c2c2c2"];
                    $timeout(function(){
                    	$scope.generateDonutChart('.graph_unprotected', $scope.unProtectedChartData, 'unprotected-chart');
                    }, 0);
                    

                    $scope.unprotectedData.riskRevenuePrice = res.totalRevenueAtRisk;
                    $scope.unprotectedData.glpDate = res.glpDate;
                    var tmpArray = [];
                    if (top3unProtectedProductsList != null) {
                        for (var i = 0; i < 3; i++) {
                            if (i < top3unProtectedProductsList.length) {
                                console.log(top3unProtectedProductsList[i].productName);
                                tmpArray.push({"productName": top3unProtectedProductsList[i].productName, "revenueAtRiskPrice": top3unProtectedProductsList[i].revenue
                                });
                            } else {
                                tmpArray.push({"productName": "", "revenueAtRiskPrice": ""});
                            }
                        }
                        $scope.unprotectedData.top3unProtectedProducts = tmpArray;
                    } else { //if top 3 unprotected products is null
                        $scope.unprotectedData.top3unProtectedProducts = [];
                    }
                } else { //if response is null
                    $scope.unprotectedData.top3unProtectedProducts = [];
                    $scope.unProtectedChartData = [{"status": "Protected", "value": 100, "count": 0}];
                    $scope.colorPallete = ["#c2c2c2", "#f00"];
                    $timeout(function(){
                    	$scope.generateDonutChart('.graph_unprotected', $scope.unProtectedChartData, 'unprotected-chart');
                    }, 0);
                    
                }
            })
            .error(function(error) {
                console.log('Unable to load authentication list: ' + JSON.stringify(error));
                $scope.unprotectedData.top3unProtectedProducts = [];
                $scope.unProtectedChartData = [{"status": "Protected", "value": 100, "count": 0}];
                $scope.colorPallete = ["#c2c2c2", "#f00"];
                $timeout(function(){
                	$scope.generateDonutChart('.graph_unprotected', $scope.unProtectedChartData, 'unprotected-chart');
                }, 0);
            });
    }

    $scope.compromisedProductList = function() {

        dataFactory.getCompromisedProductsData($scope.tenantId)
            .success(function(res) {
                if (res != null) {
                    //showLoading(false);
                    console.log(JSON.stringify(res));
                    var top3CompromisedProductsList = res.top3CompromisedProduct;
                    sharedData.setCompromisedProductsDataList(res);
                    //set unprotected data
                    $scope.compromisedChartData = [{"status": "Flagged", "value": res.totalCompromisedProduct, "percentage": res.compromisedProductPercentage},
                                                   {"status": "Un-flagged", "value": (res.totalProduct - res.totalCompromisedProduct), "percentage": Math.abs(100 - res.compromisedProductPercentage)}
                    ];
                    $scope.compromisedData.totalCompromisedProducts = res.totalCompromisedProduct;

                    $scope.colorPallete = ["#f00", "#c2c2c2"];
                    $timeout(function(){
                    	$scope.generateDonutChart('.graph_compromised', $scope.compromisedChartData, 'flagged-chart');
                    }, 0);
                    

                    $scope.compromisedData.projectedRevenueLossPrice = res.projectedRevenueLoss;
                    $scope.compromisedData.glpDate = res.glpDate;

                    $scope.compromisedData.totalProducts = res.totalProduct;

                    var tmpArray = [];
                    if (top3CompromisedProductsList != null) {
                        for (var i = 0; i < 3; i++) {
                            if (i < top3CompromisedProductsList.length) {
                                console.log(top3CompromisedProductsList[i].productName);
                                tmpArray.push({"productName": top3CompromisedProductsList[i].productName, "revenueLoss": top3CompromisedProductsList[i].revenue});
                            } else {
                                tmpArray.push({"productName": " ", "revenueLoss": ""});
                            }
                        }
                        $scope.compromisedData.top3CompromisedProductsList = tmpArray;
                    } else {
                        $scope.compromisedData.top3CompromisedProductsList = [];
                    }
                } else { //if response is null
                    $scope.compromisedData.top3CompromisedProductsList = [];
                    $scope.compromisedChartData = [{"status": "Total", "value": 100, "percentage": 0}];
                    $scope.colorPallete = ["#c2c2c2", "#f00"];
                    $timeout(function(){
                    	$scope.generateDonutChart('.graph_compromised', $scope.compromisedChartData, 'flagged-chart');
                    }, 0);
                    
                }
            })
            .error(function(error) {
                console.log('Unable to load authentication list: ' + JSON.stringify(error));
                $scope.compromisedData.top3CompromisedProductsList = [];
                $scope.compromisedChartData = [{"status": "Total", "value": 100, "percentage": 0}];
                $scope.colorPallete = ["#c2c2c2", "#f00"];
                $timeout(function(){
                	$scope.generateDonutChart('.graph_compromised', $scope.compromisedChartData, 'flagged-chart');
                }, 0);
                
            });
    }

    //// World map tabs data
    $scope.generateWorldMapTabs = function() {
        dataFactory.getWorldMapTabsData()
            .success(function(res) {
                if (res != null) {
                    var authenticationKpis = res.authenticationKpis;
                    console.log("tabs: " + JSON.stringify(authenticationKpis));
                    for (var i = 0; i < authenticationKpis.length; i++) {
                        $scope.worldMapTabs[i].count = authenticationKpis[i].totalAuthetncationCount;
                        $scope.worldMapTabs[i].authLast24Hrs = authenticationKpis[i].totalAuthenticationInLast24Hrs;
                    }
                }
            })
            .error(function(error) {
                console.log('Unable to load world map tabs data: ' + JSON.stringify(error));
            });
    };

    //// World map data
    $scope.generateWorldMap = function() {
        dataFactory.getWorldMapData()
            .success(function(res) {
                if (res != null) {
                    //Section worldmap email popup
                    $('.bl_main_tabs').each(function() {
                        $(this).find('.trigger_email').click(function() {
                            $('.popup-email-section, .bl_mask').hide();
                            $('.bl_main_tabs').find('.bl_mask').fadeIn(300)
                            $('.bl_main_tabs').find('.popup-email-section').delay(200).fadeIn(300);
                        });
                    });
                    var regionWiseMap = res.regionWiseEntitiesMap;
                    console.log("world map: " + JSON.stringify(regionWiseMap));

                    if (regionWiseMap.Americas != undefined && regionWiseMap.Americas != null) {
                        $scope.worldMapData.Americas.totalCount = regionWiseMap.Americas.totalCount;
                        $scope.worldMapData.Americas.genuineCount = regionWiseMap.Americas.genuineCount;
                        $scope.worldMapData.Americas.suspectedCount = regionWiseMap.Americas.suspectedCount;
                        $scope.worldMapData.Americas.totalEntitiesCount = regionWiseMap.Americas.totalEntitiesCount;
                        $scope.worldMapData.Americas.totalGenuineEntitiesCount = regionWiseMap.Americas.totalGenuineEntitiesCount;
                        $scope.worldMapData.Americas.totalSuspectedEntitiesCount = regionWiseMap.Americas.totalSuspectedEntitiesCount;
                    }
                    if (regionWiseMap.EMEA != undefined && regionWiseMap.EMEA != null) {
                        $scope.worldMapData.EMEA.totalCount = regionWiseMap.EMEA.totalCount;
                        $scope.worldMapData.EMEA.genuineCount = regionWiseMap.EMEA.genuineCount;
                        $scope.worldMapData.EMEA.suspectedCount = regionWiseMap.EMEA.suspectedCount;
                        $scope.worldMapData.EMEA.totalEntitiesCount = regionWiseMap.EMEA.totalEntitiesCount;
                        $scope.worldMapData.EMEA.totalGenuineEntitiesCount = regionWiseMap.EMEA.totalGenuineEntitiesCount;
                        $scope.worldMapData.EMEA.totalSuspectedEntitiesCount = regionWiseMap.EMEA.totalSuspectedEntitiesCount;
                    }
                    if (regionWiseMap.APAC != undefined && regionWiseMap.APAC != null) {
                        $scope.worldMapData.APAC.totalCount = regionWiseMap.APAC.totalCount;
                        $scope.worldMapData.APAC.genuineCount = regionWiseMap.APAC.genuineCount;
                        $scope.worldMapData.APAC.suspectedCount = regionWiseMap.APAC.suspectedCount;
                        $scope.worldMapData.APAC.totalEntitiesCount = regionWiseMap.APAC.totalEntitiesCount;
                        $scope.worldMapData.APAC.totalGenuineEntitiesCount = regionWiseMap.APAC.totalGenuineEntitiesCount;
                        $scope.worldMapData.APAC.totalSuspectedEntitiesCount = regionWiseMap.APAC.totalSuspectedEntitiesCount;
                    }

                    $scope.calculatePercent();

                    $scope.setCirlesSize();

                    $timeout(function(){
                    	$scope.generateAuthChart('.graph_suspect', 'suspectAuth');
                        $scope.generateAuthChart('.graph_genuine', 'genuineAuth');
                        $scope.generateAuthChart('.graph_total', 'totalAuth');
                    }, 0);
                    

                    $scope.sessionStorage.worldMapData = $scope.worldMapData;
                }
            })
            .error(function(error) {
                console.log('Unable to load world map tabs data: ' + JSON.stringify(error));
            });
    };

    $scope.calculatePercent = function() {
        $scope.sumTotalAuth = 0;
        $scope.sumGenuineAuth = 0;
        $scope.sumSuspectAuth = 0;
        $scope.sumTotalAuth = $scope.worldMapData.Americas.totalCount + $scope.worldMapData.EMEA.totalCount + $scope.worldMapData.APAC.totalCount;
        $scope.sumGenuineAuth = $scope.worldMapData.Americas.genuineCount + $scope.worldMapData.EMEA.genuineCount + $scope.worldMapData.APAC.genuineCount;
        $scope.sumSuspectAuth = $scope.worldMapData.Americas.suspectedCount + $scope.worldMapData.EMEA.suspectedCount + $scope.worldMapData.APAC.suspectedCount;
        $scope.worldMapData.Americas.totAuthPercent = ($scope.worldMapData.Americas.totalCount / $scope.sumTotalAuth) * 100;
        $scope.worldMapData.Americas.genuineAuthPercent = ($scope.worldMapData.Americas.genuineCount / $scope.sumGenuineAuth) * 100;
        $scope.worldMapData.Americas.suspectAuthPercent = ($scope.worldMapData.Americas.suspectedCount / $scope.sumSuspectAuth) * 100;
        $scope.worldMapData.EMEA.totAuthPercent = ($scope.worldMapData.EMEA.totalCount / $scope.sumTotalAuth) * 100;
        $scope.worldMapData.EMEA.genuineAuthPercent = ($scope.worldMapData.EMEA.genuineCount / $scope.sumGenuineAuth) * 100;
        $scope.worldMapData.EMEA.suspectAuthPercent = ($scope.worldMapData.EMEA.suspectedCount / $scope.sumSuspectAuth) * 100;
        $scope.worldMapData.APAC.totAuthPercent = ($scope.worldMapData.APAC.totalCount / $scope.sumTotalAuth) * 100;
        $scope.worldMapData.APAC.genuineAuthPercent = ($scope.worldMapData.APAC.genuineCount / $scope.sumGenuineAuth) * 100;
        $scope.worldMapData.APAC.suspectAuthPercent = ($scope.worldMapData.APAC.suspectedCount / $scope.sumSuspectAuth) * 100;
    }

    $scope.setCirlesSize = function() {
        //Total Count
        $scope.maxTotalCount = Math.max($scope.worldMapData.Americas.totalCount, $scope.worldMapData.EMEA.totalCount, $scope.worldMapData.APAC.totalCount);
        $scope.minTotalCount = Math.min($scope.worldMapData.Americas.totalCount, $scope.worldMapData.EMEA.totalCount, $scope.worldMapData.APAC.totalCount);
        //Genuine Count
        $scope.maxGenuineCount = Math.max($scope.worldMapData.Americas.genuineCount, $scope.worldMapData.EMEA.genuineCount, $scope.worldMapData.APAC.genuineCount);
        $scope.minGenuineCount = Math.min($scope.worldMapData.Americas.genuineCount, $scope.worldMapData.EMEA.genuineCount, $scope.worldMapData.APAC.genuineCount);
        //Suspected COunt
        $scope.maxSuspectedCount = Math.max($scope.worldMapData.Americas.suspectedCount, $scope.worldMapData.EMEA.suspectedCount, $scope.worldMapData.APAC.suspectedCount);
        $scope.minSuspectedCount = Math.min($scope.worldMapData.Americas.suspectedCount, $scope.worldMapData.EMEA.suspectedCount, $scope.worldMapData.APAC.suspectedCount);
    }

    //// Display top 3 buying CF entities
    $scope.top3BuyingCFEntities = function() {
        dataFactory.getTop3BuyingCFEntities($scope.tenantId, $scope.brandId)
            .success(function(res) {
                if (res != null) {
                    $scope.top3BuyingCFEntitiesList = res;
                    sharedData.setBuyingCFEntitiesDataList(res);
                    var tmpArray = [];
                    for (var i = 0; i < 3; i++) {
                        if (i < $scope.top3BuyingCFEntitiesList.length) {
                            tmpArray.push({
                                "isEmpty": false,
                                "entityName": $scope.top3BuyingCFEntitiesList[i].entityName,
                                "numberOfSuspectAuthentications": $scope.top3BuyingCFEntitiesList[i].numberOfSuspectAuthentications,
                                "totalAuthentications": $scope.top3BuyingCFEntitiesList[i].totalAuthentications,
                                "revenueLoss": $scope.top3BuyingCFEntitiesList[i].revenueLoss
                            });
                        } else {
                            tmpArray.push({"isEmpty": true, "entityName": "", "noOfSuspectAuth": "", "totalAuthentications": "", "revenuLoss": ""});
                        }
                    }
                    $scope.top3BuyingCFEntities = tmpArray;
                }
            })
            .error(function(error) {
                console.log('Unable to buying CF entities data: ' + JSON.stringify(error));
            });
    }

    //// Display top 3 Selling CF entities
    $scope.top3SellingCFEntities = function() {
        dataFactory.getTop3SellingCFEntities($scope.tenantId, $scope.brandId)
            .success(function(res) {
                if (res != null) {

                    $scope.top3SellingCFEntitiesList = res;
                    sharedData.setSellingCFEntitiesDataList(res);
                    var tmpArray = [];
                    for (var i = 0; i < 3; i++) {
                        if (i < $scope.top3SellingCFEntitiesList.length) {
                            tmpArray.push({
                                "isEmpty": false,
                                "entityName": $scope.top3SellingCFEntitiesList[i].entityName,
                                "numberOfSuspectAuthentications": $scope.top3SellingCFEntitiesList[i].numberOfSuspectAuthentications,
                                "totalAuthentications": $scope.top3SellingCFEntitiesList[i].totalAuthentications,
                                "revenueLoss": $scope.top3SellingCFEntitiesList[i].revenueLoss
                            });
                        } else {
                            tmpArray.push({"isEmpty": true, "entityName": "", "noOfSuspectAuth": "", "totalAuthentications": "", "revenueLoss": ""});
                        }
                    }
                    $scope.top3SellingCFEntities = tmpArray;
                }
            })
            .error(function(error) {
                console.log('Unable to load selling CF entities data: ' + JSON.stringify(error));
            });
    }

    //generate authentication chart
    $scope.generateAuthChart = function(targetElement, authChartType) {

        $scope.authChartData = [];
        if (authChartType == 'totalAuth') {
            $scope.sumAuth = $scope.sumTotalAuth;
            $scope.authType = 'Total';
            if ($scope.worldMapData.Americas.totalCount != 0) {
                $scope.authChartData.push({"Region": "Americas", "value": $scope.worldMapData.Americas.totalCount});
            }
            if ($scope.worldMapData.EMEA.totalCount != 0) {
                $scope.authChartData.push({"Region": "EMEA", "value": $scope.worldMapData.EMEA.totalCount});
            }
            if ($scope.worldMapData.APAC.totalCount != 0) {
                $scope.authChartData.push({"Region": "APAC", "value": $scope.worldMapData.APAC.totalCount});
            }
            if ($scope.authChartData.length == 0) {
                $scope.authChartData.push({"Region": "0", "value": "100"});
            }

        } else if (authChartType == 'genuineAuth') {
            $scope.sumAuth = $scope.sumGenuineAuth;
            $scope.authType = 'Genuine';
            if ($scope.worldMapData.Americas.genuineCount != 0) {
                $scope.authChartData.push({"Region": "Americas", "value": $scope.worldMapData.Americas.genuineCount});
            }
            if ($scope.worldMapData.EMEA.genuineCount != 0) {
                $scope.authChartData.push({"Region": "EMEA", "value": $scope.worldMapData.EMEA.genuineCount});
            }
            if ($scope.worldMapData.APAC.genuineCount != 0) {
                $scope.authChartData.push({"Region": "APAC", "value": $scope.worldMapData.APAC.genuineCount});
            }

        } else if (authChartType == 'suspectAuth') {
            $scope.sumAuth = $scope.sumSuspectAuth;
            $scope.authType = 'Suspect';
            if ($scope.worldMapData.Americas.suspectedCount != 0) {
                $scope.authChartData.push({"Region": "Americas", "value": $scope.worldMapData.Americas.suspectedCount});
            }
            if ($scope.worldMapData.EMEA.suspectedCount != 0) {
                $scope.authChartData.push({"Region": "EMEA", "value": $scope.worldMapData.EMEA.suspectedCount});
            }
            if ($scope.worldMapData.APAC.suspectedCount != 0) {
                $scope.authChartData.push({"Region": "APAC", "value": $scope.worldMapData.APAC.suspectedCount});
            }
        }

        $('.bl_auth_graph .content').hide().delay(800).fadeIn(500);

        var chart_auth = function() {
            var auth_total = $scope.authChartData;
            var maxWidth = 170;
            var maxHeight = 170;
            var outerRadius = 85;
            var ringWidth = 12;
            function drawAuthTotal(config) {
                var pie = d3.layout.pie().value(function(d) {
                    return d.value;
                }).sort(null).padAngle(0.02);

                var color = d3.scale.ordinal()
                    .range(["#000", "#0895df", "#b1b1b1"]);
                var arc = d3.svg.arc();

                function tweenPie(finish) {
                    var start = {
                        startAngle: 0,
                        endAngle: 0
                    };
                    var i = d3.interpolate(start, finish);
                    return function(d) {
                        return arc(i(d));
                    };
                }
                arc.outerRadius(config.outerRadius || outerRadius)
                    .innerRadius(config.innerRadius || innerRadius);

                d3.select(config.el).selectAll('g').remove();
                var svg = d3.select(config.el)
                    .attr({
                        width: maxWidth,
                        height: maxHeight
                    });
                var tip = d3.tip()
                    .attr('class', 'd3-tip')
                    .offset([-3, 0])
                    .html(function(d) {
                        return "<span class='graph_tip'>" + d.data.value + "</span>";
                    });
                svg.call(tip);
                var groups = svg.selectAll('g.arc')
                    .data(pie(config.data))
                    .enter()
                    .append('g')
                    .attr({
                        'class': 'arc',
                        'transform': 'translate(' + outerRadius + ', ' + outerRadius + ')'
                    })
                    .on('mouseover', tip.show)
                    .on('mouseout', tip.hide);
                var paths = groups.append('path');
                paths.attr({
                        'fill': function(d, i) {
                            return color(i);
                        }
                    })
                    .transition()
                    .duration(config.duration || 1000)
                    .attrTween('d', tweenPie);
            }
            drawAuthTotal({
                el: targetElement + ' svg',
                outerRadius: outerRadius,
                innerRadius: outerRadius - ringWidth,
                data: auth_total,
                duration: 800
            });
            $('.bl_auth_graph .content').delay(800).fadeIn(500);
        }();
    }

    $scope.initScreenshot = function(target) {
        $scope.error = '';
        $scope.screenshot.emailAddress = '';
        $('.popup label, .popup_in input, #emailScreenshot').removeClass('error');
        $scope.targetScreenshot = target;
        if (target == '#dashboard_screenshot') {
            $scope.emailDashboardCaption = 'Email Dashboard';
        } else if (target == '#unprotected_screenshot') {
            $scope.emailDashboardCaption = 'Email Unprotected Products';
        } else if (target == '#flagged_screenshot') {
            $scope.emailDashboardCaption = 'Email Flagged Products';
        } else if (target == '#buying_CF_screenshot') {
            $scope.emailDashboardCaption = 'Email Entities Buying Counterfeit';
        } else if (target == '#selling_CF_screenshot') {
            $scope.emailDashboardCaption = 'Email Entities Selling Counterfeit';
        } else if (target == '#map_module_screenshot' || target == '#mobileVewMap_screenshot') {
            $scope.emailDashboardCaption = 'Email Authentications';
        }
    }

    $scope.sendScreenshot = function() {

        if ($scope.screenshot.emailAddress == '') {
            $scope.error = 'Please check your email address.';
            $('.popup label, .popup_in input, #emailScreenshot').addClass('error');
            return false;
        } else if (!$scope.validateEmail($scope.screenshot.emailAddress)) {
            $scope.error = 'Email is invalid.'
            $('.popup label, .popup_in input, #emailScreenshot').addClass('error');
            return false;
        } else {
            $('.popup').css('display', 'none');
            $('.bl_mask').css('display', 'none');
            $scope.error = '';
            $('.popup_in label, .popup_in input, #emailScreenshot').removeClass('error');

            document.body.style.cursor = "wait";
            canvg();
            $($scope.targetScreenshot).html2canvas({
                onrendered: function(canvas) {
                    //Set hidden field's value to image data (base-64 string)
                    $('#img_val').val(canvas.toDataURL("image/png"));
                    console.log($('#img_val').val());
                    $route.reload();
                    dataFactory.sendDashboardScreenshot($scope.screenshot.emailAddress, canvas.toDataURL("image/png"))
                        .success(function(res) {
                            console.log(JSON.stringify(res));
                            document.body.style.cursor = "default";
                        })
                        .error(function(error) {
                            document.body.style.cursor = "default";
                            console.log('unable to send image screenshot');
                        });
                }
            });
        }
    }
    
    //tooltip code
    $scope.cnt = 0;
    $scope.bindTooltip = function() {
        $scope.cnt++;
        if ($scope.cnt == 3) {
            $('.values').hover(function() {
                $(this).find('.ttip').toggle();
            });
        }
    }
}]); //End of dashboardController