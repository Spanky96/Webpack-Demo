import '@assets/style.scss';
import $ from 'jQuery';
const in18 = require('../../language.js');
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

/**
 * Created by lizhenya on 2018/6/28.
 */

// 数字效果

$.fn.countTo = function (options) {
  options = options || {};

  return $(this).each(function () {
      // 设置当前元素的选项
      var settings = $.extend({}, $.fn.countTo.defaults, {
          from:            $(this).data('from'),
          to:              $(this).data('to'),
          speed:           $(this).data('speed'),
          refreshInterval: $(this).data('refresh-interval'),
          decimals:        $(this).data('decimals')
      }, options);

      // 多少次更新的值，以及每个更新的值增加多少
      var loops = Math.ceil(settings.speed / settings.refreshInterval),
          increment = (settings.to - settings.from) / loops;

      // references & variables that will change with each update
      var self = this,
          $self = $(this),
          loopCount = 0,
          value = settings.from,
          data = $self.data('countTo') || {};

      $self.data('countTo', data);

      // 如果可以找到现有的间隔，请先清除
      if (data.interval) {
          clearInterval(data.interval);
      }
      data.interval = setInterval(updateTimer, settings.refreshInterval);

      // 用起始值初始化元素
      render(value);

      function updateTimer() {
          value += increment;
          loopCount++;

          render(value);

          if (typeof(settings.onUpdate) == 'function') {
              settings.onUpdate.call(self, value);
          }

          if (loopCount >= loops) {
              // 删除间隔
              $self.removeData('countTo');
              clearInterval(data.interval);
              value = settings.to;

              if (typeof(settings.onComplete) == 'function') {
                  settings.onComplete.call(self, value);
              }
          }
      }

      function render(value) {
          var formattedValue = settings.formatter.call(self, value, settings);
          $self.html(formattedValue);
      }
  });
};

$.fn.countTo.defaults = {
  from: 0,               // 元素开始的数字
  to: 0,                 // 元素结束的数字
  speed: 1,           // 在目标号码之间计算多长时间
  refreshInterval: 0.5,  //  更新元素的频率
  decimals: 0,           // 要显示的小数位数
  formatter: formatter,  // 处理程序用于格式化渲染前的值
  onUpdate: null,        // 每次元素更新时的回调方法
  onComplete: null       // 元素完成更新时的回调方法
};

function formatter(value, settings) {
  return value.toFixed(settings.decimals);
}

function count(options) {
  var $this = $(this);
  options = $.extend({}, options || {}, $this.data('countToOptions') || {});
  $this.countTo(options);
}

$(function(){
  $('.count-title').countTo();
  $('.balance-num').countTo({decimals: 2});
  let canvas = document.querySelector('canvas');
  let ctx = canvas.getContext('2d');

  canvas.width = document.body.clientWidth;
  canvas.height = 150;

  let centerX = canvas.width / 2;
  let lines = [];

  for (let i = 0; i < 3; i++) {
    lines.push({y: i * canvas.height / 3});
  }

  function update() {  
    for (let i = 0; i < lines.length; i++) {
      lines[i].y += 1.4;
      
      if (lines[i].y >= canvas.height) {
        lines[i].y = 0;
      }
    }
  }

  function draw() {
    requestAnimationFrame(draw);
    update();
    
    ctx.fillStyle = "#24241f";
    ctx.strokeStyle = "#dd5277";
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.shadowColor = '#dd5277';
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 20;
    
    for (let i = lines.length - 1; i >= 0; i--) {
      ctx.beginPath();
      ctx.moveTo(0, lines[i].y);
      ctx.lineWidth = 0.8 + (lines[i].y * (1.5  - 0.8) / canvas.height)
      ctx.lineTo(canvas.width, lines[i].y);
      ctx.stroke();
    }
    
    ctx.lineWidth = 3.0;  
    
    // middle line
    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, canvas.height);
    ctx.stroke();
    
    let spacing = 80;
    let verticalLines = Math.round(canvas.width / spacing / 2);
    
    for (let i = 1; i <= verticalLines; i++) {    
      ctx.beginPath();
      ctx.moveTo(centerX - (i * spacing), -1);
      ctx.bezierCurveTo(
        centerX - (i * spacing) * 1.5, 10,
        centerX - (i * spacing) * 2.5, canvas.height,
        centerX - (i * spacing) * 2.5, canvas.height,
      );
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(centerX + (i * spacing), -1);
      ctx.bezierCurveTo(
        centerX + (i * spacing) * 1.5, 10,
        centerX + (i * spacing) * 2.5, canvas.height,
        centerX + (i * spacing) * 2.5, canvas.height,
      );
      ctx.stroke();
    }
  }

  draw();
});
