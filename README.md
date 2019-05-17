# Webpack 多页面实用性框架
项目的运行与安装
``` bash
# 1. 安装node.js(npm) Git
# 2. 克隆代码至本地
git clone git@github.com:Spanky96/Webpack-Demo.git
# 3. 进入项目目录
cd GPA
# 4. 安装依赖
npm install
# 5. 运行项目
npm run dev
# 6. 推荐使用Chrome浏览器开发和调试
http://localhost:8888/app.html

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

```

### 特性

> 1. 支持多页面，src/pages/页面名   Done
> 2. 支持scss, postcss            Done
> 3. Vue精简风格的控制台           Done
> 4. Eslint                      In processing
-----

node ./node_modules/uglify-js/bin/uglifyjs ./static/js/jquerys.js ./static/js/jquery.sticky.js ./static/js/imagesloaded.pkgd.js ./static/js/jquery.fitvids.js ./static/js/jquery.smartmenus.min.js ./static/js/isotope.pkgd.js ./static/js/jquery.easing.1.3.js ./static/js/jquery.prettyPhoto.js ./static/js/countUp.min.js ./static/js/slick.min.js ./static/js/main.js ./static/js/superfish.js ./static/js/jquery.fitvidss.js ./static/js/custom.js ./static/js/modernizr.js -o all.min.js