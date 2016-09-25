myApp.controller('authenticationsController', ['$scope', 'dataFactory', 'sharedData', 'commonFunctions', '$rootScope', '$route', '$sessionStorage', '$filter', '$timeout', function($scope, dataFactory, sharedData, commonFunctions, $rootScope, $route, $sessionStorage, $filter, $timeout) {

	$scope.authOverTimeChartData = [];
	$scope.authByEntityTypeChartData = [
				{"name": "Channel Partner", "value": 10},
				{"name": "Distributor", "value": 0},
				{"name": "Law Enfo. Agency", "value": 0},
				{"name": "End Customer", "value": 0},
				{"name": "Manufacturer", "value": 0},
				{"name": "Brand Owner", "value": 0}
			];
	$scope.authLayerPCBA = 0;
	$scope.authLayerProduct = 0;
	$scope.authLayerPackaging = 0;
	
	//$scope.sysDateForFilter = '8/15';
	$scope.arrFilterRegions = 
							[{"name": "World-Wide", "value": ""},
							 {"name": "EMEA", "value": "EMEA"},
							 {"name": "Americas", "value": "Americas"},
							 {"name": "APAC", "value": "APAC"}
							 ];
	$scope.arrFilterTime = 
							[{"name": "To Date", "value": ""},
							 {"name": "Last Month", "value": "1"},
							 {"name": "Last 3 Months", "value": "3"},
							 {"name": "Last 6 Months", "value": "6"},
							 {"name": "Year to Date", "value": "YearToDate"}
							 ];
	$scope.arrFilterEntitiyType = 
							[{"name": "All", "value": ""},
							 {"name": "Channel Partner", "value": "Channel Partner"},
							 {"name": "Distributor", "value": "Distributor"},
							 {"name": "Law Enforcement Agency", "value": "Law Enforcement Agency"},
							 {"name": "End Customer", "value": "End Customer"},
							 {"name": "Manufacturer", "value": "Manufacturer"},
							 {"name": "Brand Owner", "value": "Brand Owner"}
							 ];
	$scope.arrFilterLayer = 
							[{"name": "All", "value": ""},
							 {"name": "Packaging", "value": "Box"},
							 {"name": "Product", "value": "Chassis"},
							 {"name": "PCBA", "value": "PCBA"},
							 ];
	
    // Init
    $scope.init = function() {
    	
    	$scope.selectedRegion = $scope.arrFilterRegions[0];
    	$scope.selectedTime = $scope.arrFilterTime[0];
    	$scope.selectedEntityType = $scope.arrFilterEntitiyType[0];
    	$scope.selectedLayer = $scope.arrFilterLayer[0];
    	
    	$scope.selectedAuthType = "";
    	
    	//Authentication Total chart
/*    	var data_auth_total = [{"Region": "Americas", "value" : 22140}, {"Region": "EMEA", "value" : 14685}, {"Region": "APAC", "value" : 17455}];
    	
    	var chart_auth_total = function(){
    		var auth_total= data_auth_total;
    		var maxWidth = 170;
    		var maxHeight = 170;
    		var outerRadius = 85;
    		var ringWidth = 12;
    		
    	function drawAuthTotal(config) {
    		var pie = d3.layout.pie().value(function (d) {
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
    			return function(d) { return arc(i(d)); };
    		}
    		arc.outerRadius(config.outerRadius || outerRadius)
    			.innerRadius(config.innerRadius || innerRadius);
    	
    		d3.select(config.el).selectAll('g').remove();
    	
    		var svg = d3.select(config.el)
    			.attr({
    				width : maxWidth,
    				height: maxHeight
    			});
    		
    		var tip = d3.tip()
    				  .attr('class', 'd3-tip')
    				  .offset([-3, 0])
    				  .html(function(d) 
    				  {
    					return "<span class='graph_tip'><span class='val'>" + d.data.value + "</span> of Total</span>";
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
    				'fill': function (d, i) {
    					return color(i);
    				}
    			})
    			.transition()
    			.duration(config.duration || 1000)
    			.attrTween('d', tweenPie);
    		}

    		drawAuthTotal({
    			el: '.graph_total svg',
    			outerRadius: outerRadius,
    			innerRadius: outerRadius - ringWidth,
    			data: auth_total,
    			duration: 800
    		});
    		
    		document.getElementById('trigger_auth_total').onclick = function() {
    			$('.bl_auth_graph .content').hide().delay(800).fadeIn(500);
    			drawAuthTotal({
    				el: '.graph_total svg',
    				outerRadius: outerRadius,
    				innerRadius: outerRadius - ringWidth,
    				data: auth_total,
    				duration: 800
    			});
    		};
    		$('.bl_auth_graph .content').delay(800).fadeIn(500);
    	}();
    	
    	
    	//Authentication Genuine chart
    	var data_auth_genuine = [{"Region": "Americas", "value" : 21485}, {"Region": "EMEA", "value" : 14505}, {"Region": "APAC", "value" : 17090}];
    		var chart_auth_genuine = function(){
    			var auth_genuine = data_auth_genuine;
    			var maxWidth = 170;
    			var maxHeight = 170;
    			var outerRadius = 85;
    			var ringWidth = 12;
    			
    		function drawAuthGenuine(config) {
    			var pie = d3.layout.pie().value(function (d) {
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
    				return function(d) { return arc(i(d)); };
    			}
    			arc.outerRadius(config.outerRadius || outerRadius)
    				.innerRadius(config.innerRadius || innerRadius);
    		
    			d3.select(config.el).selectAll('g').remove();
    		
    			var svg = d3.select(config.el)
    				.attr({
    					width : maxWidth,
    					height: maxHeight
    				});
    			
    			var tip = d3.tip()
    					  .attr('class', 'd3-tip')
    					  .offset([-3, 0])
    					  .html(function(d) 
    					  {
    						return "<span class='graph_tip'><span class='val'>" + d.data.value + "</span> of Genuine</span>";
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
    					'fill': function (d, i) {
    						return color(i);
    					}
    				})
    				.transition()
    				.duration(config.duration || 1000)
    				.attrTween('d', tweenPie);
    			}
    	
    			drawAuthGenuine({
    				el: '.graph_genuine svg',
    				outerRadius: outerRadius,
    				innerRadius: outerRadius - ringWidth,
    				data: auth_genuine,
    				duration: 800
    			});
    			
    			document.getElementById('trigger_auth_genuine').onclick = function() {
    				$('.bl_auth_graph .content').hide().delay(800).fadeIn(500);
    				drawAuthGenuine({
    					el: '.graph_genuine svg',
    					outerRadius: outerRadius,
    					innerRadius: outerRadius - ringWidth,
    					data: auth_genuine,
    					duration: 800
    				});
    			};
    			$('.bl_auth_graph .content').delay(800).fadeIn(500);
    		}();
    	
    	//Authentication Suspect chart for Mobile view
    	var data_auth_suspect = [{"Region": "Americas", "value" : 655}, {"Region": "EMEA", "value" : 180}, {"Region": "APAC", "value" : 365}];
    		var chart_auth_suspect = function(){
    			var auth_suspect = data_auth_suspect;
    			var maxWidth = 170;
    			var maxHeight = 170;
    			var outerRadius = 85;
    			var ringWidth = 12;
    			
    		function drawAuthSuspect(config) {
    			var pie = d3.layout.pie().value(function (d) {
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
    				return function(d) { return arc(i(d)); };
    			}
    			arc.outerRadius(config.outerRadius || outerRadius)
    				.innerRadius(config.innerRadius || innerRadius);
    		
    			d3.select(config.el).selectAll('g').remove();
    		
    			var svg = d3.select(config.el)
    				.attr({
    					width : maxWidth,
    					height: maxHeight
    				});
    			
    			var tip = d3.tip()
    					  .attr('class', 'd3-tip')
    					  .offset([-3, 0])
    					  .html(function(d) 
    					  {
    						return "<span class='graph_tip'><span class='val'>" + d.data.value + "</span> of Suspect</span>";
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
    					'fill': function (d, i) {
    						return color(i);
    					}
    				})
    				.transition()
    				.duration(config.duration || 1000)
    				.attrTween('d', tweenPie)
    				.call(endAll, showValues);
    			}
    			
    			drawAuthSuspect({
    				el: '.graph_suspect svg',
    				outerRadius: outerRadius,
    				innerRadius: outerRadius - ringWidth,
    				data: auth_suspect,
    				duration: 800
    			});
    			
    			document.getElementById('trigger_auth_suspect').onclick = function() {
    				$('.bl_auth_graph .content').hide().delay(800).fadeIn(500);
    				drawAuthSuspect({
    					el: '.graph_suspect svg',
    					outerRadius: outerRadius,
    					innerRadius: outerRadius - ringWidth,
    					data: auth_suspect,
    					duration: 800
    				});
    			};
    			
    			//show numbers after transition complete
    			function endAll (transition, callback) {
    				var n;
    			
    				if (transition.empty()) {
    					showValues();
    				}
    				else {
    					n = transition.size();
    					transition.each("end", function () {
    						n--;
    						if (n === 0) {
    							showValues();
    						}
    					});
    				}
    			};
    			function showValues(){
    				$('.bl_auth_graph .content').delay(0).fadeIn(500);
    			};
    			
    		}();
    		
    		//Horizontal Bar chart
    		
    		*/
    	$timeout(function(){
    		//horBarChart();
        }, 0);
    	
    		
    	$(window).resize(function(){
    		$timeout(function(){
        		$scope.drawBarChart();
        		//horBarChart();
            }, 0);
    		
    	});
    	
    	//Dashboard Popup interaction
    	$(function(){
    		
    		$('.btn-dashboard').click(function(){
    			$('.popup-email-section, .bl_mask').hide();
    			$('.mask').fadeIn(300);
    			$('.popup_email_dashboard').delay(300).fadeIn(200);
    		});
    		$('.popup').each(function(){
    			$(this).find('.close').click(function(){
    				$(this).closest('.popup').fadeOut(200);
    				$(this).closest('.popup').prev('.mask, .bl_mask').delay(200).fadeOut(300)
    			});
    		});
    		$(document).keyup(function(e) {
    		  if(e.keyCode == 27){
    			$('.popup').fadeOut(200);
    			$('.mask, .bl_mask').delay(200).fadeOut(300);
    		  }
    		});
    		
    		//Top 3 CF hoer bubble
    		$('.tbl_db_bl .values').each(function(){
    			$(this).hover(function(){
    				$(this).find('.ttip').toggle();
    			});
    		});
    		
    		//Section email popup
    		$('.bl_dashboard').each(function(){
    			$(this).find('.trigger_email').click(function(){
    				$('.popup-email-section, .bl_mask').hide();
    				$(this).closest('.bl_dashboard').find('.bl_mask').fadeIn(300);
    				$(this).closest('.bl_dashboard').find('.popup-email-section').delay(200).fadeIn(300);
    			});
    		});
    		
    		//Section worldmap email popup
    		/*$('.bl_main_tabs .tab-pane').each(function(){
    			$(this).find('.trigger_email').click(function(){
    				$('.popup-email-section, .bl_mask').hide();
    				$(this).closest('.tab-pane').find('.bl_mask').fadeIn(300)
    				$(this).closest('.tab-pane').find('.popup-email-section').delay(200).fadeIn(300);
    			});
    		});*/
    		
    		//$('#name').prop('selectedIndex',0);
    		$('.pg_filters').each(function(){
    			$(this).find('.clear_filter').click(function(){
    				$(this).closest('.pg_filters').find('select').prop('selectedIndex',0);
    				$('.bl_world_map.inside.apac, .bl_world_map.inside.emea, .bl_world_map.inside.americas').fadeOut(100);
    				$('.bl_world_map.inside.world').delay(100).fadeIn(100);
    			});
    		});
    		
    		$('.bl_world_map.inside.americas, .bl_world_map.inside.emea, .bl_world_map.inside.apac').hide();
    		$('.selRegion').change(function(){
    			if($(this).val() == 'Americas') {
    				$('.bl_world_map.inside.world, .bl_world_map.inside.emea, .bl_world_map.inside.apac').fadeOut(100);
    				$('.bl_world_map.inside.americas').delay(100).fadeIn(100);
    			} else if($(this).val() == 'EMEA') {
    				$('.bl_world_map.inside.world, .bl_world_map.inside.americas, .bl_world_map.inside.apac').fadeOut(100);
    				$('.bl_world_map.inside.emea').delay(100).fadeIn(100);
    			} else if($(this).val() == 'APAC') {
    				$('.bl_world_map.inside.world, .bl_world_map.inside.emea, .bl_world_map.inside.americas').fadeOut(100);
    				$('.bl_world_map.inside.apac').delay(100).fadeIn(100);
    			} else {
    				$('.bl_world_map.inside.apac, .bl_world_map.inside.emea, .bl_world_map.inside.americas').fadeOut(100);
    				$('.bl_world_map.inside.world').delay(100).fadeIn(100);
    			}
    		});
    	});
    	
    	$scope.getCurrentMonth();
    	
    } // end of init()
    
    $scope.getCurrentMonth = function(){
    	dataFactory.getCurrentMonth()
        .success(function(res) {
            if (res != null) {
            	$scope.sysDateForFilter = res.currentMonthYear;
            	$scope.generateAuthenticationsOverTime();
            }
        })
        .error(function(error) {
            console.log('Unable to get current month: ' + JSON.stringify(error));
        });

    	/*$scope.sysDateForFilter = '2/15';
    	$scope.generateAuthenticationsOverTime();*/
    }
    
    $scope.setAuthType = function(authType){
    	$scope.selectedAuthType = authType;
    	$scope.updateFilters();
    }
    
    $scope.generateAuthenticationsOverTime = function(){
    	dataFactory.getAuthsOverTime()
        .success(function(res) {
            if (res != null) {
            	$scope.originalauthOverTimeChartData = res;
            	var arrAuthOverTimeChartData = $scope.applyFilter($scope.originalauthOverTimeChartData, '', '', '', '');
            	generateAuthOverTimeChartData(arrAuthOverTimeChartData);
            	$timeout(function(){
            		$scope.drawBarChart();
                }, 0);
                    	
            	generateAuthByEntityTypeChartData(arrAuthOverTimeChartData);
            	$timeout(function(){
            		$scope.horBarChart();
                }, 0);
            	
            	//generateTop3CountriesData(arrAuthOverTimeChartData);
            }
        })
        .error(function(error) {
            console.log('Unable to load authentications over time data: ' + JSON.stringify(error));
        });
    	
    	/*$scope.originalauthOverTimeChartData = [
        	{
     		month_yr: "8/14",
     		region_name: "Americas",
     		entity_type_name: "End Customer",
     		level_name: "Box",
     		authentication_type: "Genuine",
     		total_Authentication: "5",
     		country_name: "Argentina"
     	},
     	{
     		month_yr: "8/14",
     		region_name: "Americas",
     		entity_type_name: "Manufacturer",
     		level_name: "Box",
     		authentication_type: "Genuine",
     		total_Authentication: "6",
     		country_name: "Argentina"
     	},
     	{
     		month_yr: "9/14",
     		region_name: "EMEA",
     		entity_type_name: "Manufacturer",
     		level_name: "Packaging",
     		authentication_type: "Genuine",
     		total_Authentication: "5",
     		country_name: "Argentina"
     	},
     	{
     		month_yr: "10/14",
     		region_name: "APAC",
     		entity_type_name: "Brand Owner",
     		level_name: "Packaging",
     		authentication_type: "Genuine",
     		total_Authentication: "5",
     		country_name: "Argentina"
     	},
     	{
     		month_yr: "11/14",
     		region_name: "Americas",
     		entity_type_name: "Channel Partner",
     		level_name: "PCBA",
     		authentication_type: "Genuine",
     		total_Authentication: "5",
     		country_name: "Argentina"
     	},
     	{
     		month_yr: "12/14",
     		region_name: "EMEA",
     		entity_type_name: "Distributor",
     		level_name: "Product",
     		authentication_type: "Genuine",
     		total_Authentication: "5",
     		country_name: "Kenya"
     	},
     	{
     		month_yr: "1/15",
     		region_name: "APAC",
     		entity_type_name: "Law Enforcement Agency",
     		level_name: "Chassis",
     		authentication_type: "Genuine",
     		total_Authentication: "5",
     		country_name: "Argentina"
     	},
     	{
     		month_yr: "2/15",
     		region_name: "Americas",
     		entity_type_name: "End Customer",
     		level_name: "PCBA",
     		authentication_type: "Genuine",
     		total_Authentication: "5",
     		country_name: "Argentina"
     	},
     	{
     		month_yr: "3/15",
     		region_name: "EMEA",
     		entity_type_name: "End Customer",
     		level_name: "PCBA",
     		authentication_type: "Genuine",
     		total_Authentication: "5",
     		country_name: "Argentina"
     	},
     	{
     		month_yr: "4/15",
     		region_name: "APAC",
     		entity_type_name: "Manufacturer",
     		level_name: "Packaging",
     		authentication_type: "Genuine",
     		total_Authentication: "5",
     		country_name: "Argentina"
     	},
     	{
     		month_yr: "5/15",
     		region_name: "Americas",
     		entity_type_name: "Brand Owner",
     		level_name: "Box",
     		authentication_type: "Counterfeit",
     		total_Authentication: "5",
     		country_name: "Argentina"
     	},
     	{
     		month_yr: "6/15",
     		region_name: "EMEA",
     		entity_type_name: "Channel Partner",
     		level_name: "Box",
     		authentication_type: "Genuine",
     		total_Authentication: "5",
     		country_name: "India"
     	},
     	{
     		month_yr: "7/15",
     		region_name: "APAC",
     		entity_type_name: "Law Enforcement Agency",
     		level_name: "Box",
     		authentication_type: "Genuine",
     		total_Authentication: "5",
     		country_name: "Argentina"
     	},
     	{
     		month_yr: "8/15",
     		region_name: "Americas",
     		entity_type_name: "End Customer",
     		level_name: "Box",
     		authentication_type: "Genuine",
     		total_Authentication: "5",
     		country_name: "India"
     	}

     ];
    	
    	var arrAuthOverTimeChartData = $scope.applyFilter($scope.originalauthOverTimeChartData, '', '', '', '', '');
    	generateAuthOverTimeChartData(arrAuthOverTimeChartData);
    	$timeout(function(){
    		$scope.drawBarChart();
        }, 0);
    	generateAuthByEntityTypeChartData(arrAuthOverTimeChartData);
    	$timeout(function(){
    		$scope.horBarChart();
        }, 0);
    	generateTop3CountriesData(arrAuthOverTimeChartData);*/
    }
    
    function generateAuthOverTimeChartData(arrAuthOverTimeChartData){
    	
    	$scope.authLayerPCBA = 0;
    	$scope.authLayerProduct = 0;
    	$scope.authLayerPackaging = 0;
    	
    	for(i=0; i<arrAuthOverTimeChartData.length; i++) {
    	  
    	   if(lookup(arrAuthOverTimeChartData[i].month_yr)){
    		   for(var j=($scope.authOverTimeChartData.length-1); j >= 0; j--){
    			   if($scope.authOverTimeChartData[j].date === arrAuthOverTimeChartData[i].month_yr){
    				   $scope.authOverTimeChartData[j].authentications = parseFloat($scope.authOverTimeChartData[j].authentications +  parseFloat(arrAuthOverTimeChartData[i].total_Authentication));
    			   }
    		   }
    	   }
    	   
    	   //Authentications by layers data
    	   if(arrAuthOverTimeChartData[i].level_name == "PCBA"){
    		   $scope.authLayerPCBA += parseFloat(arrAuthOverTimeChartData[i].total_Authentication);
    	   }else if(arrAuthOverTimeChartData[i].level_name == "Chassis"){
    		   $scope.authLayerProduct += parseFloat(arrAuthOverTimeChartData[i].total_Authentication);
    	   }else if(arrAuthOverTimeChartData[i].level_name == "Box"){
    		   $scope.authLayerPackaging += parseFloat(arrAuthOverTimeChartData[i].total_Authentication);
    	   }
    	}
    }
    
    function lookup( date ) {
        for(var i = 0, len = $scope.authOverTimeChartData.length; i < len; i++) {
            if( $scope.authOverTimeChartData[ i ].date === date )
                return true;
        }
        return false;
    }
    
    function generateAuthByEntityTypeChartData(arrAuthOverTimeChartData){
    	$scope.authByEntityTypeChartData = [];
    	
    	if($scope.selectedEntityType.value == ""){
    		for(var i = 1; i < $scope.arrFilterEntitiyType.length; i++){
    			$scope.authByEntityTypeChartData.push({"name": $scope.arrFilterEntitiyType[i].value, "value": 0});
        	}
    	}else{
    		for(var i = 1; i < $scope.arrFilterEntitiyType.length; i++){
    			if($scope.selectedEntityType.value == $scope.arrFilterEntitiyType.value){
    				$scope.authByEntityTypeChartData.push({"name": $scope.arrFilterEntitiyType[i].value, "value": 0});
    			}else{
    				$scope.authByEntityTypeChartData.push({"name": $scope.arrFilterEntitiyType[i].value, "value": ""});
    			}
    			
        	}
    		//$scope.authByEntityTypeChartData.push({"name": $scope.selectedEntityType.value, "value": 0});
    	}
    	for(i = 0; i < arrAuthOverTimeChartData.length; i++){
    		for(var j = 0; j < $scope.authByEntityTypeChartData.length; j++){
    			if(arrAuthOverTimeChartData[i].entity_type_name == $scope.authByEntityTypeChartData[j].name){
    				if($scope.authByEntityTypeChartData[j].value == ""){
    					$scope.authByEntityTypeChartData[j].value = 0;
    				}
    				$scope.authByEntityTypeChartData[j].value += parseFloat(arrAuthOverTimeChartData[i].total_Authentication);
    			}
    		}
    	}
    }
    
    //Generate Top 3 countries data
/*    function generateTop3CountriesData(arrAuthOverTimeChartData){
    	$scope.arrTop3CountriesData = [];
    	var index;
    	for(var i=0; i < arrAuthOverTimeChartData.length; i++){
    		index = getCountryIndex(arrAuthOverTimeChartData[i].country_name);
    		if(index == -1){
    			$scope.arrTop3CountriesData.push({ "countryName": arrAuthOverTimeChartData[i].country_name, "regionName": arrAuthOverTimeChartData[i].region_name, "totalAuthentications": parseFloat(arrAuthOverTimeChartData[i].total_Authentication)});
    		}else{
    			$scope.arrTop3CountriesData[index].totalAuthentications += parseFloat(arrAuthOverTimeChartData[i].total_Authentication);
    		}
    	}
    	alert($scope.arrTop3CountriesData.length);
    }*/
    
    function getCountryIndex(strCountry){
    	if($scope.arrTop3CountriesData.length){
	    	for(var j=0; j < $scope.arrTop3CountriesData.length; j++){
	    		if($scope.arrTop3CountriesData[j].countryName == strCountry){
	    			return j;
	    		}
	    	}
	    	if(j == ($scope.arrTop3CountriesData.length)){
	    		return -1;
	    	}
    	}else{
    		return -1;
    	}
    }
    
    $scope.applyFilter = function(filterArray, fltrRegion, fltrEntityType, fltrLayer, fltrDate, fltrAuthType){
    	//Filter Authentications Data starts
    	var filteredData = $filter('filter')(filterArray, {region_name: fltrRegion, entity_type_name: fltrEntityType, level_name: fltrLayer, authentication_type: fltrAuthType });
    	$scope.authOverTimeChartData = [];
    	var arrcurrDate = $scope.sysDateForFilter.split("/");
    	var loopSize;
		//loopSize = fltrDate != ""? fltrDate:12;
		
		if(fltrDate != ""){
			if(fltrDate == "YearToDate"){
				loopSize = (arrcurrDate[0] - 1);
			}else{
				loopSize = fltrDate;
			}
		}else{
			loopSize = 12;
		}
		for(var t=1; t<=loopSize; t++){
			if((arrcurrDate[0] - t) <= 0){
				$scope.authOverTimeChartData.unshift({"date": (12-Math.abs(arrcurrDate[0] - t)) + "/" + (arrcurrDate[1]-1), "authentications": 0});
			}else{
				$scope.authOverTimeChartData.unshift({"date": (arrcurrDate[0] - t) + "/" + arrcurrDate[1], "authentications": 0});
			}
		}
		
		if(fltrDate != ""){
			var resData=[];
			
			if(fltrDate == "YearToDate"){
				for(var i=0; i<filteredData.length; i++){

					dt = filteredData[i].month_yr.split("/");
					if(dt[1] == arrcurrDate[1]){
						resData.push(filteredData[i]);
					}
				}
				console.log(JSON.stringify(resData));
				return resData;
			}else{

				var minMonth, minYear;
				minMonth = arrcurrDate[0] - fltrDate;
				if(minMonth <= 0){
					minMonth = (12-Math.abs(minMonth));
					minYear = (arrcurrDate[1]-1);
				}else{
					minYear = arrcurrDate[1];
				}
				for(var i=0; i<filteredData.length; i++){
					var dt = filteredData[i].month_yr.split("/");

					dt[0] = parseFloat(dt[0]);
					dt[1] = parseFloat(dt[1]);
					if(minYear < dt[1] && dt[1] < arrcurrDate[1]){
						resData.push(filteredData[i]);
					}else if(minYear == arrcurrDate[1]){
						if(dt[1] == arrcurrDate[1]){
							if(dt[0] >= minMonth && dt[0] < arrcurrDate[0]){
								resData.push(filteredData[i]);
							}
						}
					}else if(minYear == (arrcurrDate[1] - 1)){
						if(dt[1] == minYear){
							if(dt[0] >= minMonth){
								resData.push(filteredData[i]);
							}
						}else if(dt[1] == arrcurrDate[1]){
							if(dt[0] < arrcurrDate[0]){
								resData.push(filteredData[i]);
							}
						}
					}
				}
				console.log(JSON.stringify(resData));
				return resData;
			}
		}else{
			return filteredData;
		}
		//Filter Authentications Data ends
    }
    
    //Select box change events
    $scope.updateFilters = function(){
    	var arrAuthOverTimeChartData = $scope.applyFilter($scope.originalauthOverTimeChartData, $scope.selectedRegion.value, $scope.selectedEntityType.value, $scope.selectedLayer.value, $scope.selectedTime.value, $scope.selectedAuthType);
    	generateAuthOverTimeChartData(arrAuthOverTimeChartData);
    	$timeout(function(){
    		$scope.drawBarChart();
        }, 0);
    	
    	generateAuthByEntityTypeChartData(arrAuthOverTimeChartData);
    	$timeout(function(){
    		$scope.horBarChart();
        }, 0);
    	
    }
    
    $scope.clearFilters = function(){
    	if(!($scope.selectedRegion == $scope.arrFilterRegions[0] && $scope.selectedTime == $scope.arrFilterTime[0] && $scope.selectedEntityType == $scope.arrFilterEntitiyType[0] && $scope.selectedLayer == $scope.arrFilterLayer[0])){
    		var arrAuthOverTimeChartData = $scope.applyFilter($scope.originalauthOverTimeChartData, '', '', '', '');
        	$scope.selectedRegion = $scope.arrFilterRegions[0];
        	$scope.selectedTime = $scope.arrFilterTime[0];
        	$scope.selectedEntityType = $scope.arrFilterEntitiyType[0];
        	$scope.selectedLayer = $scope.arrFilterLayer[0];
        	generateAuthOverTimeChartData(arrAuthOverTimeChartData);
        	$timeout(function(){
        		$scope.drawBarChart();
            }, 0);
        	generateAuthByEntityTypeChartData(arrAuthOverTimeChartData);
        	$timeout(function(){
        		$scope.horBarChart();
            }, 0);
    	}else{
    		return false;
    	}
    }
    
	//Bar chart - authentications over time
	$scope.drawBarChart = function(){
		$('.bl_bar_chart svg').remove();
		var mobile = $(window).width() < 480;
		var bl_width = $('.bl_bar_chart').width(),
		bl_height = $('.bl_bar_chart').height();
		var margin = {top: 20, right: 0, bottom: 25, left: 20},
			width = bl_width - margin.left - margin.right,
			height = bl_height - margin.top - margin.bottom;
		
		var gapVal = 0.1;
		
		var x = d3.scale.ordinal()
			.rangeRoundBands([0, width], gapVal);
		
		var y = d3.scale.linear()
			.range([height, 0]);
		
		var xAxis = d3.svg.axis()
			.scale(x)
			.orient("bottom");
		
		var yAxis = d3.svg.axis()
			.scale(y)
			.orient("left")
			.ticks(5, "0")
			.tickSize(-width, 100, 0)
			.tickFormat(d3.format("s"));
		
		var svg = d3.select(".bl_bar_chart").append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
		 
		var data = $scope.authOverTimeChartData;
		//var data = [{"date" : "04/15", "authentications" : 3000, "abbr" : "3k"},{"date" : "05/15", "authentications" : 4000, "abbr" : "4k"},{"date" : "06/15", "authentications" : 4500, "abbr" : "4.5k"},{"date" : "07/15", "authentications" : 4500, "abbr" : "4.5k"},{"date" : "08/15", "authentications" : 5100, "abbr" : "5.1k"},{"date" : "09/15", "authentications" : 4000, "abbr" : "4k"},{"date" : "10/15", "authentications" : 2300, "abbr" : "2.3k"},{"date" : "11/15", "authentications" : 7000, "abbr" : "7k"},{"date" : "12/15", "authentications" : 8000, "abbr" : "8k"},{"date" : "01/16", "authentications" : 8000, "abbr" : "8k"},{"date" : "02/16", "authentications" : 7000, "abbr" : "7k"},{"date" : "03/16", "authentications" : 7000, "abbr" : "7k"}];
		
		x.domain(data.map(function(d) { return d.date; }));
		y.domain([0, d3.max(data, function(d) { return d.authentications; })]);
		var colors = d3.scale.ordinal()
			.range(["#344665", "#b2b2b2"]);
		
		svg.append("g")
			.attr("class", "y axis")
			.call(yAxis)
			.append("text")
			.attr("transform", "rotate(-90)")
			.attr("y", 6)
			.attr("dy", ".71em")
			.style("text-anchor", "end");
	
		svg.selectAll(".bar")
			.data(data)
			.enter().append("rect")
			.attr("class", "bar")
			.attr("x", function(d) { return x(d.date); })
			.attr("width", x.rangeBand())
			.attr("height", function(d) { return height - y(d.authentications); })
			.attr("fill", function(d, i){
					return colors(i);
			})
			.attr("y", function(d) {
				return height;
			})
			.transition()
			.duration(500)
			.ease('quad')
			.attr("y", function(d) { return y(d.authentications); });
		
		svg.append('rect')
			.attr('x', 0)
			.attr('y', height)
			.attr('fill', "#ffffff")
			.attr('width', width)
			.attr('height', "40");
			
		var xGroup = svg.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + height + ")")
			.call(xAxis);
		  
		var barText = svg.selectAll(".bartext")
		.data(data)
		.enter()
		.append("text")
		.attr("class", "bartext")
		.attr("fill", "black")
		.attr("x", function(d) { return x(d.date)+(x.rangeBand()/2); })
		.attr("y", function(d) { return y(d.authentications)-5; })
		.text(function(d){
			var parseData = d3.format("s");
			return parseData(d.authentications);
		})
		.attr("text-anchor", "middle")
		.attr("opacity", 0)
		.transition()
		.delay(500)
		.duration(300)
		.attr("opacity", 1);
		
		if(mobile==true){
			xGroup.selectAll("text")
				.attr("y", 0)
				.attr("x", -3)
				.attr("dy", ".35em")
				.attr("transform", "rotate(-90)")
				.style("text-anchor", "end");
			
			svg.selectAll(".bartext")
				.attr("y", function(d) { return x(d.date)+(x.rangeBand()/2); })
				.attr("x", function(d) { return height/60 - y(d.authentications); })
				.attr("dy", ".35em")
				.attr("transform", "rotate(-90)")
				.style("text-anchor", "start");
		}
	};
	
	//Bar chart - authentications by Entity type
	$scope.horBarChart = function(){
		$('#entity_chart svg').remove();
		var mobile = $(window).width() < 480;
		var data;
		if($scope.authByEntityTypeChartData.length == 0){
			data.push({"name": "-", "value": "NA"});
		}else{
			data = $scope.authByEntityTypeChartData;
		}
		/*var data = [
				{"name": "Channel Partner", "value": 2000},
				{"name": "Distributor", "value": 28000},
				{"name": "Law Enfo. Agency", "value": 4000},
				{"name": "End Customer", "value": 500},
				{"name": "Manufacturer", "value": 9500},
				{"name": "Brand Owner", "value": 6000}
			];*/
	
		var chart = document.getElementById("entity_chart"),
			axisMargin = 12,
			margin = 0,
			marginR = 35,
			chartHeight = $('#entity_chart').height(),
			width = chart.offsetWidth,
			height = chart.offsetHeight,
			barHeight = (height - axisMargin * 2) * 0.7 / data.length,
			barPadding = (height - axisMargin * 2) * 0.3 / data.length,
			//barPaddingRight = 50,
			data, bar, svg, scale, xAxis, labelWidth = 0;
		if(mobile==true){
			var axisMargin = 30;
		}
		else{
			var axisMargin = 12;
		};
		max = d3.max(data.map(function(i) {
			return i.value;
		}));
	
		svg = d3.select(chart)
			.append("svg")
			.attr("width", width)
			.attr("height", chartHeight);
	
		bar = svg.selectAll("g")
			.data(data)
			.enter()
			.append("g");
	
		bar.attr("class", "bar")
			.attr("cx", 0)
			.attr("transform", function(d, i) {
				if(mobile==false){
					return "translate(" + margin + "," + (i * (barHeight + barPadding) + barPadding + axisMargin) + ")";
				}
				else{
					return "translate(" + margin + "," + (i * (barHeight + barPadding) + barPadding + axisMargin/1.5) + ")";
				}
		});
	
		bar.append("text")
			.attr("class", "label")
			.attr("y", barHeight / 2)
			.attr("dy", ".35em") //vertical align middle
			.text(function(d) {
				return d.name;
			})
			.each(function() {
				labelWidth = Math.ceil(Math.max(labelWidth, this.getBBox().width)) + 5;
			});
	  
		scale = d3.scale.linear()
			.domain([0, max])
			.range([0, width - margin * 2 - labelWidth - marginR]);
	
		xAxis = d3.svg.axis()
			.scale(scale)
			.ticks(5)
			.tickFormat(d3.format("s"))
			.tickSize(-height + 2 * margin + axisMargin)
			.orient("top");
					
		var color = d3.scale.ordinal()
			.domain(["Channel Partner","Distributor","Law Enforcement Agency","End Customer","Manufacturer","Brand Owner"])
			.range(["#aeb5c1", "#858fa3" , "#5d6a84", "#344565", "#d6dae0", "#717c93"]);
	
		bar.append("rect")
			.attr("transform", "translate(" + labelWidth + ", 0)")
			.attr("height", barHeight)
			.attr("fill", function(d, i){
				return color(d.name);
			})
			.attr("width", 0)
			.transition()
			.duration(500)
			.ease('quad')
			.attr("width", function(d) {
				return scale(d.value);
			});
	
		bar.append("text")
			.attr("class", "value")
			.attr("y", barHeight / 2)
			.attr("dx", function(d){
			var barW = scale(d.value);
				return labelWidth + barW + 5;
			})
			.attr("dy", ".35em") //vertical align middle
			.attr("text-anchor", "start")
			.text(function(d) {
				var parseData = d3.format("s");
				return parseData(d.value);
			})
			.attr("opacity", 0)
			.transition()
			.delay(500)
			.duration(300)
			.attr("opacity", 1);
		
		var axisG = svg.insert("g", ":first-child")
			.attr("class", "axis")
			.attr("transform", "translate(" + (margin + labelWidth) + "," + axisMargin + ")")
			.call(xAxis);
		
		axisG.append('line')
			.attr('x1', 0)
			.attr('x2', width - margin - labelWidth);
		
		axisG.append('line')
			.attr('x1', 0)
			.attr('x2', width - margin - labelWidth)
			.attr('y1', height-axisMargin)
			.attr('y2', height-axisMargin);
		
		if(mobile==true){
			d3.select('#entity_chart .axis')
				.selectAll('.tick')
				.select('text')
				.attr("y", 0)
				.attr("x", 5)
				.attr("dy", ".35em")
				.attr("transform", "rotate(-90)")
				.style("text-anchor", "start");
		}
	};
}]); //End of authenticationsController