const pageType = process.env.NODE_ENV == 'development' ? '.html' : '.jsp';
const menus = [{
  name: '首页',
  icon: 'app',
  html: 'app' + pageType,
  activeHtml: ['app', 'hdzm']
}, {
  name: '通知公告',
  icon: 'tzgg',
  html: 'tzgg' + pageType,
  activeHtml: ['tzgg']
}, {
  name: '志愿排行',
  icon: 'zyph',
  html: 'zyph' + pageType,
  activeHtml: ['zyph']
}, {
  name: '个人中心',
  icon: 'grzx',
  html: 'grzx' + pageType,
  activeHtml: ['grzx', 'jfdh']
}];

const pathname = location.pathname;
let bottomDiv = $(`<div class="bottom-menu"></div>`);
menus.forEach((item) => {
  var element = $(`<div class="item" onclick="location.href='./${item.html}';">
    <div class="iconbox in-active"><img src="/static/imgs/${item.icon}.png"></div>
    <div class="iconbox is-active"><img src="/static/imgs/${item.icon}a.png"></div>
    <div>${item.name}</div>
  </div>`);
  for (let i of item.activeHtml) {
    if (pathname.includes(i)) {
      element.addClass('active');
      break;
    }
  }
  bottomDiv.append(element);
});
$('body').append(bottomDiv);