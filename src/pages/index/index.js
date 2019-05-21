import '@assets/style.scss';
import $ from 'jQuery';
const in18 = require('../../language.js');

Date.prototype.Format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "h+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3), 
    "S": this.getMilliseconds()  
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
};
function browserRedirect() {
  var sUserAgent = navigator.userAgent.toLowerCase();
  var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
  var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
  var bIsMidp = sUserAgent.match(/midp/i) == "midp";
  var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
  var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
  var bIsAndroid = sUserAgent.match(/android/i) == "android";
  var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
  var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
  if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
    return true;
  };
  return false;
}
function updateTimer() {
  var time = new Date().Format('hh:mm:ss');
  $('#lyTimer').text(time);
}
// 语言切换
global.toggleLanguage = function (el) {
  var active = $(el).hasClass('layui-form-onswitch');
  $(el).toggleClass('layui-form-onswitch');
  var language = in18[active ? 1 : 0]
  var keys = Object.keys(language);
  $('.one_third .service-item').addClass('hide');
  keys.forEach(function (n) {
    $(`[in18=${n}]`).html(language[n]);
    $(`[in18_ph=${n}]`).prop('placeholder', language[n]);
  });
  // 修复浏览器不支持 transparent 颜色bug
  setTimeout(function () {
    $('.one_third .service-item').removeClass('hide');
  }, 100)
}
$(function(){
  if (!browserRedirect()) {
    // 如果是电脑端
    $('#video').attr('src', '/static/video.mp4');
    $('#video').show();
    $('#videoImg').hide();
  }

  // 适配移动端 复制一个dialog
  var dialog = $('.account-dialog');
  var cloneDialog = $('.account-dialog').clone();

  $('#toggle').prepend(cloneDialog);
  
  var hideDialog = function (ele) {
    $('.account-dialog').addClass('hide');
  }
  // header
  $('.account-dialog').click(function (event) {
    event.stopPropagation();
  });
  $('#accountQuick').click(function () {
    var dialog;
    if (window.innerWidth < 1020) {
      dialog = $('#toggle .account-dialog');
    } else {
      dialog = $('#header-main-menu .account-dialog');
    }

    if (dialog.hasClass('hide')) {
      dialog.removeClass('hide');
      window.addEventListener('click', hideDialog);
      return false;
    } else {
      hideDialog();
      window.removeEventListener('click', hideDialog);
    }
  });

  $('.elbtns .btn').click(function (e) {
    if ($(e.currentTarget).hasClass('active')) {
      return;
    }
    $('.elbtns .btn').removeClass('active');
    $(e.currentTarget).addClass('active')
    var bondType = $(e.currentTarget).attr('type');
    $('.section3 .slider-wrapper').hide();
    $('.' + bondType).show();

  });



  // section5 时间刷新
  setInterval(updateTimer, 1000);

  // section7 手机在手机端显示在第一个
  var dom = $('.section7 .main-center').clone();
  dom.addClass('mobile-only');
  $('.section7 .main-part').prepend(dom);

  // section8
  function customWayPoint(className, addClassName, customOffset) {
    jQuery(className).waypoint({
      handler: function(direction) {
        if (direction == "down") {
          $(className).addClass(addClassName);
        } else {
          $(className).removeClass(addClassName);
        }
      },
      offset: customOffset
    });
  }
  
  var defaultOffset = '50%';
  
  for (var i = 0; i < 5; i++) {
    customWayPoint('.timeline__item--' + i, 'timeline__item-bg', defaultOffset);
  }

});

(function($){

	$.fn.et_simple_slider = function( options ) {
		var settings = $.extend( {
			slide         			: '.et-slide',				 	// slide class
			arrows					: '.et-slider-arrows',			// arrows container class
			prev_arrow				: '.et-arrow-prev',				// left arrow class
			next_arrow				: '.et-arrow-next',				// right arrow class
			controls 				: '.et-controllers a',			// control selector
			control_active_class	: 'et-active-control',			// active control class name
			previous_text			: 'Previous',					// previous arrow text
			next_text				: 'Next',						// next arrow text
			fade_speed				: 500,							// fade effect speed
			use_arrows				: true,							// use arrows?
			use_controls			: true,							// use controls?
			manual_arrows			: '',							// html code for custom arrows
			append_controls_to		: '',							// controls are appended to the slider element by default, here you can specify the element it should append to
			controls_class			: 'et-controllers',				// controls container class name
			slideshow				: false,						// automattic animation?
			slideshow_speed			: 7000							// automattic animation speed
		}, options );

		return this.each( function() {
			var $et_slider 			= $(this),
				$et_slide			= $et_slider.find( settings.slide ),
				et_slides_number	= $et_slide.length,
				et_fade_speed		= settings.fade_speed,
				et_active_slide		= 0,
				$et_slider_arrows,
				$et_slider_prev,
				$et_slider_next,
				$et_slider_controls,
				et_slider_timer,
				controls_html = '';

			if ( settings.use_arrows && et_slides_number > 1 ) {
				if ( settings.manual_arrows == '' )
					$et_slider.append( '<div class="et-slider-arrows"><a class="et-arrow-prev" href="#">' + settings.previous_text + '</a><a class="et-arrow-next" href="#">' + settings.next_text + '</a></div>' );
				else
					$et_slider.append( settings.manual_arrows );

				$et_slider_arrows 	= $( settings.arrows );
				$et_slider_prev 	= $et_slider_arrows.find( settings.prev_arrow );
				$et_slider_next 	= $et_slider_arrows.find( settings.next_arrow );

				$et_slider_next.click( function(){
					et_slider_move_to( 'next' );

					return false;
				} );

				$et_slider_prev.click( function(){
					et_slider_move_to( 'previous' );

					return false;
				} );
			}

			if ( settings.use_controls && et_slides_number > 1 ) {
				for ( var i = 1; i <= et_slides_number; i++ ) {
					controls_html += '<a href="#"' + ( i == 1 ? ' class="' + settings.control_active_class + '"' : '' ) + '>' + i + '</a>';
				}

				controls_html =
					'<div class="' + settings.controls_class + '">' +
						controls_html +
					'</div>';

				if ( settings.append_controls_to == '' )
					$et_slider.append( controls_html );
				else
					$( settings.append_controls_to ).append( controls_html );

				$et_slider_controls	= $et_slider.find( settings.controls ),

				$et_slider_controls.click( function(){
					et_slider_move_to( $(this).index() );

					return false;
				} );
			}

			et_slider_auto_rotate();

			function et_slider_auto_rotate(){
				if ( settings.slideshow && et_slides_number > 1 ) {
					et_slider_timer = setTimeout( function() {
						et_slider_move_to( 'next' );
					}, settings.slideshow_speed );
				}
			}

			function et_slider_move_to( direction ) {
				var $active_slide = $et_slide.eq( et_active_slide ),
					$next_slide;

				if ( direction == 'next' || direction == 'previous' ){

					if ( direction == 'next' )
						et_active_slide = ( et_active_slide + 1 ) < et_slides_number ? et_active_slide + 1 : 0;
					else
						et_active_slide = ( et_active_slide - 1 ) >= 0 ? et_active_slide - 1 : et_slides_number - 1;

				} else {

					if ( et_active_slide == direction ) return;

					et_active_slide = direction;

				}

				$next_slide	= $et_slide.eq( et_active_slide );

				$et_slider_controls.removeClass( settings.control_active_class ).eq( et_active_slide ).addClass( settings.control_active_class );

				$active_slide.animate( { opacity : 0 }, et_fade_speed, function(){
					$(this).css('display', 'none');

					$next_slide.css( { 'display' : 'block', opacity : 0 } ).animate( { opacity : 1 }, et_fade_speed );
				} );

				if ( typeof et_slider_timer != 'undefined' ) {
					clearInterval( et_slider_timer );
					et_slider_auto_rotate();
				}
			}
		} );
	}

	$(document).ready( function(){
		var $featured_slider 	= $( '.slider-wrapper' );

		if ( $featured_slider.length ){
			$featured_slider.append( '<div id="et-slider-controls"><div class="container"></div></div>' );

			et_slider_settings = {
				append_controls_to : '#et-slider-controls .container'
			}

			if ( $featured_slider.hasClass('et_slider_auto') ) {
				var et_slider_autospeed_class_value = /et_slider_speed_(\d+)/g;

				et_slider_settings.slideshow = true;

				et_slider_autospeed = et_slider_autospeed_class_value.exec( $featured_slider.attr('class') );

				et_slider_settings.slideshow_speed = et_slider_autospeed[1];
			}

			$featured_slider.et_simple_slider( et_slider_settings );
		}
	});
})($)