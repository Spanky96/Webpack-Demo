import "./style/bottom.scss";

const menus = [{
  name: '首页',
  icon: 'app',
  html: 'app.html'
}, {
  name: '通知公告',
  icon: 'tzgg',
  html: 'tzgg.html'
}, {
  name: '志愿排行',
  icon: 'zyph',
  html: 'zyph.html'
}, {
  name: '个人中心',
  icon: 'grzx',
  html: 'grzx.html'
}];

const pathname = location.pathname;
let bottomDiv = $(`<div class="bottom-menu"></div>`);
menus.forEach((item) => {
  var element = $(`<div class="item" onclick="location.href='./${item.html}';">
    <div class="iconbox in-active"><img src="/static/imgs/${item.icon}.png"></div>
    <div class="iconbox is-active"><img src="/static/imgs/${item.icon}a.png"></div>
    <div>${item.name}</div>
  </div>`);
  if (pathname.includes(item.html)) {
    element.addClass('active');
  }
  bottomDiv.append(element);
});
$('body').append(bottomDiv);