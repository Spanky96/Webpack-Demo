// 天地图
class LwMap {
  /**
   * 全局对象：
   * this.map 真实的map对象
   * this.mapBox map中存放覆盖物的容器
   */

  /**
   * 构造方法
   * container: DOM ID
   * center: 中心点 eg: [116.404, 39.915] 北京
   * zoom: 缩放级别 {Number | Array(3)[zoom, minZoom, maxZoom]}
   */
  constructor(container, center = [116.404, 39.915], zoom = 13, extraConfig = {}) {
    var url = [
      'http://t0.tianditu.gov.cn/DataServer?T=vec_c&tk=c27c613115979d179e2794dcb248c29d&x={x}&y={y}&l={z}', // 84 矢量
      'http://t0.tianditu.gov.cn/DataServer?T=img_c&tk=c27c613115979d179e2794dcb248c29d&x={x}&y={y}&l={z}', // 84 影像
      'http://2.20.101.180:32457/serviceaccess/service/ogcservice/wmts/wuxi_vector?service=WMTS&request=GetTile&version=1.0.0&layer=vec&style=default&tileMatrixSet=c&format=tiles&height=256&width=256&tilematrixSet=c&tk=56e2ef8967b3a0dbb746b7a40b7faa94&tilematrix={z}&tilerow={y}&&tilecol={x}', // 无锡 矢量
      'http://2.20.101.180:32457/serviceaccess/service/ogcservice/wmts/image2016?SERVICE=WMTS&REQUEST=GetTile&id=baseLayer_img&tk=a86c2aa4fe3f4d6c8c834dd01a75731d&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}'
    ];
    var isNy = getQueryString('inner') ? 1 : 0;
    var layerurl = url[isNy ? 2 : 0];
    var map = new T.Map(container, {
      layers: [new T.TileLayer(layerurl, {
        minZoom: isNy ? 10 : 6,
        maxZoom: 18
      })], // 无锡矢量
      projection: 'EPSG:4326'
    });
    var p84 = coordtransform.gcj02towgs84(center[0], center[1]);
    map.centerAndZoom(new T.LngLat(p84[0], p84[1]), zoom[0]);
    var vm = this;
    vm.map = map;
    try {
      vm.map.setStyle('indigo');
    } catch (e) {
      // 过滤样式错误
    }
    vm.mapBox = {}; // 所有地图元素的数组
    vm.obj3DBoundBox = [];

    T.Marker.prototype.show = function () {
      this.setOpacity(1);
    };
    T.Marker.prototype.hide = function () {
      this.setOpacity(0);
    };
    vm.addPolygon();
    vm.loadPromise = new Promise((resolve) => {
      resolve();
    });
  }

  addPolygon(boundArray, strokeColor = '#00eeff', fillColor = '#71B3ff', fillOpacity = 0.5) {
    var data = window.$Config.AREA_BIANJIE;
    if (!data) {
      return;
    }
    // var kml = '';
    data = data.split(';');
    var outer = [
      new T.LngLat(-360, 90),
      new T.LngLat(-360, -90),
      new T.LngLat(360, -90),
      new T.LngLat(360, 90)
    ];
    var pathArray = [
      outer
    ];
    pathArray.push(data.map((lnglat) => {
      var lng = lnglat.split(',')[0];
      var lat = lnglat.split(',')[1];
      var gcj = coordtransform.bd09togcj02(lng, lat);
      var p84 = coordtransform.gcj02towgs84(gcj[0], gcj[1]);
      // kml += p84[0] + ',' + p84[1] + ' ';
      return new T.LngLat(p84[0], p84[1]);
    }));
    // console.log(kml);
    var mesh = new T.Polygon(pathArray, {
      color: 'cyan',
      weight: 0,
      opacity: 1,
      fillColor: '#0a3473',
      fillOpacity: 1
    });
    this.map.addOverLay(mesh);
    // polygon.setPath(pathArray);
    // this.map.add(polygon);
  }

  // 需要实现的方法
  /**
   * 地图移动
   * 参数 二维坐标
   */
  panTo(point) {
    this.map.panTo(point);
  }

  addControlBar(offset = [0, 0], zoom = 1) {}

  /**
   * 设置地图缩放级别
   * 参数 zoom
   */
  setZoom(zoom) {
    this.map.setZoom(zoom);
  }

  getZoom() {
    return this.map.getZoom();
  }

  /**
   * 设置地图缩放级别
   */
  setCenterAndZoom(point, zoom) {
    var p84 = coordtransform.gcj02towgs84(point[0], point[1]);
    this.map.centerAndZoom(new T.LngLat(p84[0], p84[1]), zoom);
  }

  /**
   * 增加标注物
   * 参数 id，url, 坐标点, 图片偏移，点击事件
   */
  addMarker(id, url, point, size, offset, onclick, params, labelName) {
    var p84 = coordtransform.gcj02towgs84(point[0], point[1]);
    var icon = new T.Icon({
      iconUrl: url,
      iconSize: new T.Point(size[0], size[1]),
      iconAnchor: new T.Point(offset[0], offset[1])
    });
    var marker = new T.Marker(new T.LngLat(p84[0], p84[1]), {
      icon: icon
    });
    onclick && marker.on('click', onclick);
    marker = $.extend(marker, params);
    if (labelName) {
      var text = new T.Label({
        text: labelName,
        position: new T.LngLat(p84[0], p84[1])
      });
      text.setFontSize(12);
      text.setFontColor('rgb(255, 33, 33)');
      text.setBackgroundColor('#ff000000');
      text.setBorderLine('none');
      text.setBorderColor('#ff000000');
      text.setOffset(new T.Point(0, 12));
      this.__addObject('MarkerLabel' + id, text);
      marker.linkObject = [text];
    }

    this.__addObject(id, marker);
  }

  addBreatheMarker(id, url, point, size, offset, defaultShow, onclick, params, labelName) {
    var vm = this;
    var p84 = coordtransform.gcj02towgs84(point[0], point[1]);
    var icon = new T.Icon({
      iconUrl: url,
      iconSize: new T.Point(size[0], size[1])
    });
    var marker = new T.Marker(new T.LngLat(p84[0], p84[1]), {
      icon: icon
    });
    onclick && marker.on('click', onclick);
    marker = $.extend(marker, params);
    if (!defaultShow) {
      marker.hide();
    }
    vm.__addObject(id, marker);
  }

  // 移除物体 参数 name : 需要删除物体的ID
  removeObject(name) {
    var obj = this.mapBox[name];
    if (obj) {
      obj.linkObject && obj.linkObject.forEach(lo => {
        this.map.removeOverLay(lo);
      });
      this.map.removeOverLay(obj);
    }
    delete this.mapBox[name];
  }

  add3DBoundaryByFeatureV2(feature, rgb, opacity = 0.7, height = 2000, zooms = '', onclick = '', type = '') {
    var bounds = [];
    feature.geometry.coordinates[0].forEach(function (i) {
      var p84 = coordtransform.gcj02towgs84(i[0], i[1]);
      bounds.push(new T.LngLat(p84[0], p84[1]));
    });
    var color = this.__getRandomRgbColor();
    color = `rgb(${color[0]},${color[1]},${color[2]})`;
    // rgb || feature.properties.fillColor || this.__getRandomRgbColor();
    var mesh = new T.Polygon(bounds, {
      color: 'cyan',
      weight: 4,
      opacity: opacity,
      fillColor: color,
      fillOpacity: 0.8
    });
    var cp84 = coordtransform.gcj02towgs84(feature.properties.cp[0], feature.properties.cp[1]);
    var cpp = new T.LngLat(cp84[0], cp84[1]);
    // var cpp = new T.LngLat(feature.properties.cp[0], feature.properties.cp[1]);
    var text = new T.Label({
      text: feature.properties.name.replace('网格', '<br>网格'),
      position: cpp,
      height: height * 1.2
    });
    text.setFontSize(14);
    text.setFontColor('rgb(255, 255, 255)');
    text.setBackgroundColor('#ff000000');
    text.setBorderLine('none');
    text.setBorderColor('#ff000000');

    mesh.zooms = zooms;
    mesh.type = type || feature.type;
    mesh.linkObject = [text];
    mesh.lwcolor = color;
    if (onclick) {
      mesh.addEventListener("click", onclick);
      mesh.addEventListener("mouseover", function () {
        mesh.setFillColor('yellow');
      });
      mesh.addEventListener("mouseout", function () {
        mesh.setFillColor(mesh.lwcolor);
      });
    }
    this.obj3DBoundBox.push(mesh);
    this.__addObject(feature.id + '_mesh', mesh);
    this.__addObject(feature.id + '_text', text);
  }

  __clientPointToVector(p) {
    var p1 = new T.Pixel(p[0], p[1]);
    var o1 = this.map.containerToLngLat(p1);
    return this.map.lngLatToGeodeticCoord([o1.lng, o1.lat]);
  }
  /**
   * 清除类型为type的所有网格
   */
  removeFeature(type) {
    var vm = this;
    vm.obj3DBoundBox.forEach(function (obj) {
      // if (obj.type == type) {
      if (obj.linkObject) {
        obj.linkObject.forEach(o => {
          // vm.object3Dlayer.remove(o);
          vm.map.removeLayer(o);
        });
      }
      vm.map.removeLayer(obj);
      // }
    });
    vm.obj3DBoundBox = [];
    // $.remove(vm.obj3DBoundBox, (n) => { return n.type == type; });
  }

  /**
   * 设置轨迹路线
   * 轨迹数组 pathArr: [[a,b], [a,b]],
   * 图片路径 imgPath: url,
   * 图片大小 imgSize: [num,num],
   * 图片锚点 imgAncher: [num,num],
   * 图片标签名称 lableName: 'abc',
   * 图片标签偏移 labelOffset: [num,num],
   * 图片与锚点的位置 position: /BL、BM、BR、ML、MR、TL、TM、TR分别代表左下角、底部中央、右下角、左侧中央、右侧中央、左上角、顶部中央、右上角,
   * 轨迹线 lineColor: '#aaaa',
   * 轨迹线宽 lineWeight : num,
   * 点移动速度 speed : num,
   * return 点操控办法:start, pause, resume, stop, setSpeed, setPassLine
   */
  addMarkerAndPath(pathArr, imgPath, imgSize, imgAncher, lableName = '', labelOffset = [-35, 0], position = 'BM', lineColor = '#1104c7', lineWeight = 10, speed = 1000) {
    var vm = this;
    var marker = this.__buildElasticMarker(pathArr[0][0], imgPath, imgSize, imgAncher, lableName, labelOffset, position);
    !marker.linkObject && (marker.linkObject = []);
    // 删掉老的
    this.removeMarkerAndPath();
    var points = [];
    pathArr.forEach((apath) => {
      apath.forEach(point => {
        var p84 = coordtransform.gcj02towgs84(point[0], point[1]);
        points.push(new T.LngLat(p84[0], p84[1]));
      });
    });
    var line = new T.Polyline(points);
    this.map.addOverLay(line);
    marker.linkObject.push(line);
    this.__addObject('pathAndMarker', marker);
    return {
      marker: marker,
      map: this.map,
      status: 0, // 0 停止   1: 在跑  2: 暂停,
      speed: speed,
      pathArr: points,
      afterMoveAlongEnd: function () {
        console.log('跑完第' + ++this.pathIndex + '段');
        var nextPath = this.path[this.pathIndex];
        if (nextPath) {
          this.run(this.speed, this.pathIndex);
        }
      },
      afterMoveTo: function () {
        this.run(this.speed);
      },
      init: function () {
        this.pathArr = vm.__getDelicatePoints(points);
        this.pointIndex = [0, 0];
      },
      run: function (v) {
        if (v) {
          this.speed = 100000 / v;
          this.status = 1;
        }
        var nextPointIndex = this.pointIndex[0] + 1;
        if (this.pathArr[nextPointIndex]) {
          this.pointIndex = [nextPointIndex, 0];
          var nextPoint = this.pathArr[nextPointIndex];
          if (this.status == 1) {
            setTimeout(() => {
              this.marker.setLngLat(nextPoint);
              this.run();
            }, this.speed);
          }
        } else {
          // 结束了
          this.pointIndex = [0, 0];
          this.status = 0;
        }
      },
      setSpeed: function (speed) {
        this.speed = 100000 / speed;
      },
      /**
       * 设置点暂停
       */
      pause: function () {
        if (this.status == 2) {
          return;
        }
        this.status = 2;
      },
      changeStep: function (offset) {
        offset *= 2;
        var status = this.status;
        if (this.status != 0) {
          var pointIndex = this.pointIndex[0] + offset;
          var point = this.pathArr[pointIndex];
          if (!point) {
            pointIndex = offset > 0 ? this.pathArr.length - 1 : 1;
            point = this.pathArr[pointIndex];
          }
          this.pointIndex[0] = pointIndex;
          if (status == 2) {
            this.marker.setLngLat(point);
          }
        }
      },
      /**
       * 设置点继续移动
       */
      resume: function () {
        if (this.status == 1) {
          return;
        }
        if (this.status == 2) {
          this.status = 1;
          this.run();
        }
      },
      /**
       * 设置点停止
       */
      stop: function () {
        if (this.status == 0) {
          return;
        }
        this.status = 0;
        this.pointIndex = [0, 0];
      },
      /**
       * 设置已经行驶的路线
       * 已行驶路线颜色 lineColor
       * 已行驶路线透明度 lineopacity
       * 已行驶路线线宽 lineWeight
       * 已行驶路线直线样式 lineStyle
       */
      setPassLine: function (lineColor = '#AF5', lineopacity = 1, lineWeight = 6, lineStyle = 'solid') {
        var passedPolyline = new T.Polyline({
          map: this.map,
          strokeColor: lineColor,
          strokeOpacity: lineopacity,
          strokeWeight: lineWeight,
          strokeStyle: lineStyle
        });
        this.marker.on('moving', function (e) {
          passedPolyline.setPath(e.passedPath);
        });
      }
    };
  }
  __getDelicatePoints(points, delicate = 0.01) {
    var result = [];
    // x1, x2, x3, x4, x5, x6
    // o
    for (let i = 0; i < points.length - 1; i++) {
      result.push(points[i]);
      let lng0 = points[i].lng;
      let lat0 = points[i].lat;
      let lng1 = points[i + 1].lng;
      let lat1 = points[i + 1].lat;
      var distance = (lng0 - lng1) ** 2 + (lat0 - lat1) ** 2;
      var dx = Math.round(distance / 2e-8); // 要切割dx段  o     1    1    o
      if (dx > 1) {
        dx > 100 && (dx = 100);
        var dltlng = (lng1 - lng0) / dx;
        var dltlat = (lat1 - lat0) / dx;
        for (let j = 1; j < dx; j++) {
          result.push(new T.LngLat(lng0 + j * dltlng, lat0 + j * dltlat));
        }
      }
    }
    if (points.length > 1) {
      // 把最后一个点补进去
      result.push(points[points.length - 1]);
    }
    return result;
  }

  addMarkerAndPathV2(pathArr, imgPath, imgSize, imgAncher, lableName = '', labelOffset = [-35, 0], position = 'BM', lineColor = '#1104c7', lineWeight = 10, speed = 1000) {
    var vm = this;
    var marker = this.__buildElasticMarker(pathArr[0], imgPath, imgSize, imgAncher, lableName, labelOffset, position);
    !marker.linkObject && (marker.linkObject = []);
    // 删掉老的
    this.removeMarkerAndPath();
    var points = [];
    pathArr.forEach(point => {
      var p84 = coordtransform.gcj02towgs84(point[0], point[1]);
      points.push(new T.LngLat(p84[0], p84[1]));
    });
    var line = new T.Polyline([]);
    this.map.addOverLay(line);
    marker.linkObject.push(line);
    this.__addObject('pathAndMarker', marker);

    return {
      map: vm.map,
      marker,
      speed: speed,
      historyArr: [points[0]],
      pathArr: points,
      pointIndex: 0,
      line,
      afterMove: function (foo) {
        this.afterMoveCallback = foo;
      },
      start: function (speed) {
        if (speed) {
          this.speed = speed;
        }
        if (this.pointIndex == 0) {
          this.pointIndex = 0;
          this.map.centerAndZoom(this.pathArr[0], 18);
        }
        var nextPoint = this.pathArr[this.pointIndex + 1];
        if (nextPoint) {
          this.pointIndex += 1;
          var vm = this;
          setTimeout(() => {
            console.log('跑到' + this.pointIndex);
            vm.marker.setLngLat(nextPoint);
            vm.historyArr.push(nextPoint);
            vm.line.setLngLats(vm.historyArr);
            vm.start(); // 跑完继续跑
          }, this.speed);
        } else {
          console.log(this.pointIndex + '再获取');
          this.afterMoveCallback();
        }
      },
      addPath: function (arr) {
        arr.forEach(point => {
          var p84 = coordtransform.gcj02towgs84(point[0], point[1]);
          this.pathArr.push(new T.LngLat(p84[0], p84[1]));
        });
        this.start();
      }
    };
  }

  // 移除
  removeMarkerAndPath() {
    var oldMarker = this.mapBox.pathAndMarker;
    if (oldMarker) {
      // oldMarker.stopMove();
      var linkObjs = oldMarker.linkObject;
      oldMarker.status = 0;
      if (linkObjs) {
        var map = this.map;
        linkObjs.forEach((n) => {
          map.removeOverLay(n);
        });
        map.removeOverLay(oldMarker);
      }
    }
  }

  getRandomPoint(pathArr) {
    var lngArr = pathArr.map((n) => n[0]);
    var latArr = pathArr.map((n) => n[1]);
    var maxX = $.max(lngArr);
    var minX = $.min(lngArr);
    var maxY = $.max(latArr);
    var minY = $.min(latArr);
    let result = [];
    while (result.length != 50) {
      let lng = minX + (maxX - minX) * Math.random();
      let lat = minY + (maxY - minY) * Math.random();
      let isPointInRing = T.GeometryUtil.isPointInRing([lng, lat], pathArr);
      if (isPointInRing) {
        result.push([lng, lat]);
      }
    }
    return result;
  }

  /**
   * 清除类型为type的所有网格
   * 删除的3D物体
   */
  removeObjByTypename(type) {
    var vm = this;
    vm.obj3DBoundBox.forEach(function (obj) {
      if (obj.type == type) {
        if (obj.linkObject) {
          obj.linkObject.forEach(o => {
            vm.map.remove(o);
            vm.object3Dlayer.remove(o);
          });
        }
        vm.object3Dlayer.remove(obj);
      }
    });
    $.remove(vm.obj3DBoundBox, (n) => {
      return n.type == type;
    });
  }

  /**
   * 清除地图图标
   */
  clearActivities(foo) {
    var vm = this;
    !foo && (foo = (n) => n.lwType == 'activity' || (n.lwType && n.lwType.includes('Marker')));
    if (foo instanceof Function) {
      var keys = Object.keys(vm.mapBox);
      keys.forEach((key) => {
        let obj = vm.mapBox[key];
        if (foo(obj)) {
          vm.removeObject(key);
        }
      });
    }
  }

  showInfoWindow(content, position, anchor = 'bottom-center') {
    if (this.infoWindow) {
      this.infoWindow.closeInfoWindow();
    }
    if (!content) return;
    var p84 = coordtransform.gcj02towgs84(position[0], position[1]);
    var infoWin = new T.InfoWindow();
    infoWin.setLngLat(new T.LngLat(p84[0], p84[1]));
    infoWin.setContent(content);
    this.map.addOverLay(infoWin);
    this.infoWindow = infoWin;
  }

  showCustomInfoWindow(content, position, anchor = 'bottom-left yymtest') {
    var infoWindow = new T.InfoWindow({
      isCustom: true,
      showShadow: true,
      autoMove: true,
      closeWhenClickMap: true,
      content,
      anchor
    });
    this.infoWindow = infoWindow;
    infoWindow.open(this.map, position);
  }

  closeInfoWindow() {
    this.infoWindow && this.infoWindow.close();
  }

  // 增加动画效果 物体 动画名称 持续时间
  setAnimation(obj, name = 'DROP', time) {
    var vm = this;
    if (obj && obj.setAnimation) {
      obj.setAnimation('T_ANIMATION_' + name);
      if (time) {
        setTimeout(function () {
          vm.removeAnimation(obj);
        }, time);
      }
    }
  }

  removeAnimation(obj) {
    obj.setAnimation('T_ANIMATION_NONE');
  }

  setRotationAndPitch(rotation, pitch) {
    this.map.setRotation(rotation);
    this.map.setPitch(pitch);
  }

  getRotationAndPitch() {
    // return {
    //   rotation: this.map.getRotation(),
    //   pitch: this.map.getPitch()
    // };
  }

  __bd2decrypt = function (lng, lat) {
    var X_PI = Math.PI * 3000.0 / 180.0;
    var x = lng - 0.0065;
    var y = lat - 0.006;
    var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * X_PI);
    var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * X_PI);
    return new T.LngLat(z * Math.cos(theta), z * Math.sin(theta));
  };

  // 私有方法
  __addObject(id, marker) {
    var obj = this.mapBox[id];
    if (obj) {
      // 已经有了
      var linkObjs = obj.linkObject;
      if (linkObjs) {
        var map = this.map;
        linkObjs.forEach((n) => {
          map.removeOverLay(n);
        });
      }
      this.map.removeOverLay(obj);
    }
    this.map.addOverLay(marker);
    this.mapBox[id] = marker;
  }
  __getRandomRgbColor() {
    return new Array(3).fill(255).map((o) => {
      return o * Math.random();
    });
  }
  __buildElasticMarker(position, imgPath, imgSize, imgAncher, lableName = '', labelOffset = [-35, 0], labelPosition = 'BM') {
    var p84 = coordtransform.gcj02towgs84(position[0], position[1]);
    var icon = new T.Icon({
      iconUrl: imgPath,
      iconSize: new T.Point(imgSize[0], imgSize[1]),
      iconAnchor: new T.Point(imgAncher[0], imgAncher[1])
    });
    var marker = new T.Marker(new T.LngLat(p84[0], p84[1]), {
      icon: icon
    });
    onclick && marker.on('click', onclick);

    if (lableName) {
      var text = new T.Label({
        text: lableName,
        position: new T.LngLat(p84[0], p84[1])
      });
      text.setFontSize(12);
      text.setFontColor('rgb(255, 33, 33)');
      text.setBackgroundColor('#ff000000');
      text.setBorderLine('none');
      text.setBorderColor('#ff000000');
      text.setOffset(new T.Point(0, 12));
      this.__addObject('GuijiLabel', text);
      marker.linkObject = [text];
    }
    return marker;
    // this.__addObject('GuijiMarker', marker);
  }
}
window.LwMap = LwMap;