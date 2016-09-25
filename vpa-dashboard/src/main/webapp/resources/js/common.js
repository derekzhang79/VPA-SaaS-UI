$(function(){
	//For login password show/hide
	$('.bl_login_pwd').each(function(){
		$(this).find('.btn-pwd').on('click',function(){
			if($(this).attr('data-click-state') == 1) {
				$(this).attr('data-click-state', 0).attr('value', 'hide');
				$(this).closest('.bl_login_pwd').find('.txt-pwd').attr('type', 'text');
			 
			} else {
				$(this).attr('data-click-state', 1).attr('value', 'show');
				$(this).closest('.bl_login_pwd').find('.txt-pwd').attr('type', 'password');
			}
		});
		$('.bl_login input[type="submit"]').click(function(){
			$('.btn-pwd').attr('data-click-state', 1).attr('value', 'show');
			$('.txt-pwd').attr('type', 'password');
		});
	});
	
	// Login validation
	function validateEmail(sEmail) {
		var filter = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
		if (filter.test(sEmail)) {
			return true;
		}
		else {
			return false;
		}
	};
	$('#frm_login').submit(function(){
		var str = '';
		$('#frm_login label, #email, #password').removeClass('error');
		var email = $.trim($('#email').val());
		var password = $.trim($('#password').val());
		if(email == '' && password == ''){
			str = 'Please check your email address and password.';
			$('.errors').text(str);
			$('#frm_login label, #email, #password').addClass('error');
			return false;
		}
		else if(email == '' && password != ''){
			str = 'Please check your email address.';
			$('#frm_login label.lbl_email, #email').addClass('error');
			$('.errors').text(str);
			return false
		}
		else if(!validateEmail(email)){
			str = 'Email is invalid.'
			$('#frm_login label.lbl_email, #email').addClass('error');
			$('.errors').text(str);
			return false;
		}
		if(password == '' && email != ''){
			str = 'Please check your password.';
			$('#frm_login label.lbl_pwd, #password').addClass('error');
			$('.errors').text(str);
			return false
		}
		else{
			return true;
		}
	});
	
	//Forgot password email validation
	$('#frm-forgot-pwd').submit(function(){
		var email = $.trim($('#fp_email').val());
		if(email== '' || !validateEmail(email)){
			$('.errors').text('Please check your email address.');
			$('#frm-forgot-pwd label, #fp_email').addClass('error');
			return false;
		}
		else{
			return true;
		}
	});
	
	//Reset password validation
	$('#frm-reset-pwd').submit(function(){
		var str = '';
		var pwd1 = $.trim($('#pwd1').val());
		var pwd2 = $.trim($('#pwd2').val());
		if(pwd1 == '' && pwd2 == ''){
			str = 'Both the passwords are empty.'
			$('#pwd1, #pwd2, #frm-reset-pwd label').addClass('error');
			$('.errors').text(str);
			return false;
		}
		else if(pwd1 != pwd2){
			str = 'Passwords does not match.'
			$('#pwd1, #pwd2, #frm-reset-pwd label').addClass('error');
			$('.errors').text(str);
			return false;
		}
		else{
			return true;
		}
	});
	
	// Top bar multi level navigation
	$('.ribbon ul li').click(function(){
		if($(this).find('ul').length){
			$(this).find('ul').slideToggle();
			$(this).toggleClass('act');
		}
	});
	$('.ribbon > .flag > ul > li').click(function(){
		if($(this).find('.sub_nav').length){
			$(this).find('.sub_nav').slideToggle();
			$(this).toggleClass('act');
		}
	});
	
	//Main navigation
	$('.nav_trigger').click(function(){
		$('.wrapper').toggleClass('show_nav');
		$(this).toggleClass('act').find('.icon').toggleClass('open');
		$(this).find('span.label').text(function(i, text){
			return text === "Menu" ? "Hide Menu" : "Menu";
		});
	});
	
	$('.search_trigger').click(function(){ $('.bl_search_in').addClass('show');	});
	$('.hide_search').click(function(){ $('.bl_search_in').removeClass('show');	});
	
	
	//Auto close
	$(document).on('click', function(event){
		var target = event.target;
		if(!$(target).hasClass('flag') && !$(target).parents().hasClass('flag')) {
			$('.flag .sub_nav').slideUp(500);
			$('.flag ul li.act').removeClass('act');
		}
		else{
			return false;
		};
	});
	$(document).on('click', function(event){
		var target = event.target;
		if(!$(target).parents().hasClass('user_nav')) {
			$('.user_nav ul ul').slideUp(500);
			$('.user_nav ul li.act').removeClass('act');
		}
		else{
			return false;
		};
	});
	
	//Navigation
	$('.bl_nav li').click(function(){
		$('.bl_nav li').removeClass('act');
		$(this).addClass('act');
	});
	
	//Section info block
	$('.trigger_info').click(function(){
		$(this).parent('.bl_icons').next('.section_info').fadeIn(300);
	});
	$('.close_section_info').click(function(){
		$(this).closest('.section_info').fadeOut(300);
	});
	$(document).keyup(function(e) {
	  if(e.keyCode == 27){
	  	$('.section_info').fadeOut(300);
	  }
	});
	
	//Left Sidebar Filters
	/*$('.filter_group').each(function(){
		$(this).find('.parent a').click(function(){
			$(this).closest('ul').addClass('hide').next('.child').addClass('show');
			$(this).closest('ul').prev('.filter_label').hide();
		});
		$(this).find('.child').each(function(){
			$(this).find('a').click(function(){
				$(this).closest('.child').find('li.current').removeClass('current');
				$(this).parent('li').addClass('current');
				var iconClass = $(this).closest('.child').prev('.parent').find('span.fa').attr('class');
				$(this).closest('.child').find('.fa').removeClass(iconClass).addClass('fa');
				$(this).find('.fa').addClass(iconClass);
				var current = $(this).html();
				$(this).closest('.child').prev('.parent').find('a').html(current);
				$(this).closest('.child').removeClass('show');
				$(this).closest('.child').prev('.parent').removeClass('hide');
				$(this).closest('ul.child').prevAll('.filter_label').show();
			});
		});
		$(this).find('.child').find('span.lbl').click(function(){
			$(this).closest('.child').removeClass('show').prev('.parent').removeClass('hide').prev('.filter_label').show();
			
		});
	});*/
	$('.footable').footable({
		breakpoints: {
			phone: 480,
			tablet: 779
		}
	});
	$('.footable').trigger('footable_expand_first_row');
	
	$('.footable').each(function(){
		
	});
});

//Equal Height blocks
equalheight = function(container){

	var currentTallest = 0,
		currentRowStart = 0,
		rowDivs = new Array(),
		$el,
		topPosition = 0;
	
	$(container).each(function() {
		$el = $(this);
		$($el).height('auto')
		topPostion = $el.position().top;

		if (currentRowStart != topPostion) {
			for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
				rowDivs[currentDiv].height(currentTallest);
			}
			rowDivs.length = 0; // empty the array
			currentRowStart = topPostion;
			currentTallest = $el.height();
			rowDivs.push($el);
		} else {
			rowDivs.push($el);
			currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
		}
		for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
			rowDivs[currentDiv].height(currentTallest);
		}
 	});
};
$(window).load(function() {
	equalheight('.top_block');
});
$(window).resize(function(){
	equalheight('.top_block');
});

function printBlock(){
	var page = require('webpage').create(),
		system = require('system'),
		address, output, size;
	
	if (system.args.length < 3 || system.args.length > 5) {
		console.log('Usage: rasterize.js URL filename [paperwidth*paperheight|paperformat] [zoom]');
		console.log('  paper (pdf output) examples: "5in*7.5in", "10cm*20cm", "A4", "Letter"');
		console.log('  image (png/jpg output) examples: "1920px" entire page, window width 1920px');
		console.log('                                   "800px*600px" window, clipped to 800x600');
		phantom.exit(1);
	} else {
		address = system.args[1];
		output = system.args[2];
		page.viewportSize = { width: 600, height: 600 };
		if (system.args.length > 3 && system.args[2].substr(-4) === ".pdf") {
			size = system.args[3].split('*');
			page.paperSize = size.length === 2 ? { width: size[0], height: size[1], margin: '0px' }
											   : { format: system.args[3], orientation: 'portrait', margin: '1cm' };
		} else if (system.args.length > 3 && system.args[3].substr(-2) === "px") {
			size = system.args[3].split('*');
			if (size.length === 2) {
				pageWidth = parseInt(size[0], 10);
				pageHeight = parseInt(size[1], 10);
				page.viewportSize = { width: pageWidth, height: pageHeight };
				page.clipRect = { top: 0, left: 0, width: pageWidth, height: pageHeight };
			} else {
				console.log("size:", system.args[3]);
				pageWidth = parseInt(system.args[3], 10);
				pageHeight = parseInt(pageWidth * 3/4, 10);
				console.log ("pageHeight:",pageHeight);
				page.viewportSize = { width: pageWidth, height: pageHeight };
			}
		}
		if (system.args.length > 4) {
			page.zoomFactor = system.args[4];
		}
		page.open(address, function (status) {
			if (status !== 'success') {
				console.log('Unable to load the address!');
				phantom.exit(1);
			} else {
				window.setTimeout(function () {
					page.render(output);
					phantom.exit();
				}, 200);
			}
		});
	}
};