import "../style/style.scss";
import $ from "jquery";
let div = $(
  `<div id="currentInfo">
    <div class="p p1">今天是<span class="num year"></span>年<span class="num month"></span>月<span class="num day"></span>日</div>
    <div class="p p2">星期</div>
    <div class="p p3"><span class="num time"></span></div>
    <div class="p p4">9°C/16°C</div>
</div>`
);
Date.prototype.Format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份   
    "d+": this.getDate(), //日   
    "h+": this.getHours(), //小时   
    "m+": this.getMinutes(), //分   
    "s+": this.getSeconds(), //秒   
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度   
    "S": this.getMilliseconds() //毫秒   
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
};
$('body').append(div);
const DAT_ARRAY = ['日', '一', '二', '三', '四', '五', '六'];
var spaceBetween = (v) => ' ' + v + ' ';
var updateCurrentInfo = function () {
  var date = new Date();
  div.find('.year').text(spaceBetween(date.getFullYear()));
  div.find('.month').text(spaceBetween(date.getMonth() + 1));
  div.find('.day').text(spaceBetween(date.getDate()));
  div.find('.p2').text('星期' + DAT_ARRAY[date.getDay()]);
  div.find('.time').text(date.Format("hh:mm"));
};
updateCurrentInfo();
setInterval(updateCurrentInfo, 60000);

// "http://t.weather.sojson.com/api/weather/city/101190201?callback=callback";
