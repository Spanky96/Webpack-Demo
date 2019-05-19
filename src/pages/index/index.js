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
  keys.forEach(function (n) {
    $(`[in18=${n}]`).text(language[n]);
  });
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
