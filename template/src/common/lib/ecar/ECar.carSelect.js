/**
 * Copyright (C), 2018, 上海赛可电子商务有限公司
 * Author:
 * Date:
 * Description:
 * Update
 */

//plugin
;
(function(factory) {
  if (typeof define === 'function') {
    if (define.cmd) {
      define("ecar/ECar.carSelect", ['$'], function(require, exports, module) {
        "define:nomunge,require:nomunge,exports:nomunge,module:nomunge";
        var $ = require("$");
        return factory($, {});
      });
    } else {
      define(['$'], function($) {
        "define:nomunge,require:nomunge,exports:nomunge,module:nomunge";
        return factory($, {});
      });
    }
  } else {
    factory($, window.ECar || (window.ECar = {}));;
  }
})(function($, ECar) {
  if (ECar.carSelect) {
    return ECar.carSelect;
  }
  var CarSelect;
  ECar.carSelect = function(options) {
    // 默认配置
    var defaultCfg = {
      //触发是否事件代理
      brandUrl: (options.brandUrl)?  options.brandUrl:'/msmallmobile/mockdata/getBrand.htm',
      seriesUrl: (options.seriesUrl) ?  options.seriesUrl:'/msmallmobile/mockdata/getSeries.htm',
      modelUrl: (options.modelUrl) ?  options.modelUrl:'/msmallmobile/mockdata/getModel.htm',
      // 触发弹窗目标元素
      triggerTargetNode: null,
      showClass: 'sel-car-show',
      popWrap: '#js-pop-wrap',
      imgUrl: '//i3.cximg.com/images',
      cacheObjDate: {},
      loadType: null, //默认null 选车工具， 2为车型库
      userCtrlMain:false,//默认false
      //完成品牌、车系、车系选择后回调
      completeSelected: function(data) {

      },
      //动画开始时回调函数
      showPopCallBack: function() {

      },
      //动画结束时回调函数
      hidePopCallBack: function() {

      }
    };
    // 构造配置
    config = $.extend(true, defaultCfg, options || {});
    if (CarSelect === undefined) {
      CarSelect = new carSelect(config);
    } else {
      CarSelect.init(config);
    }

    return CarSelect;
  };

  function carSelect(options) {
    this.cfg = options;
    this.init();
  }

  carSelect.prototype = {
    debug: false,
    isFirstOpen: true,
    tempDataObj: {
      "checked": 0
    },
    cacheObjDate: {},
    init: function() {
      var _this = this,
        _cfg = _this.cfg;
      // 先将基本的结构添加进去；
      this.renderHtmlFirst(function() {
        // 再cfg中挂载dom；
        _cfg.$popWrap = $(_cfg.popWrap);
        _cfg.$brandCont = _cfg.$popWrap.find('#brand-cont');
        _cfg.$seriesCont = _cfg.$popWrap.find('#series-cont');
        _cfg.$modelCont = _cfg.$popWrap.find('#model-cont');
        _cfg.$letterNav = _cfg.$popWrap.find('#js-letter-nav');
      });
      // 修正iOS10.3.2及以下的safari版本；
      $(_this.cfg.triggerTargetNode).css('cursor',' pointer');
      //打开品牌弹层；
      _this.bindEvent();
      //选择参数功能；
      _this.triggerSelect();
      //回退功能；
      _this.goBackFn();
    },
    reOpen:function(){
      this.openBrand(1);
    },
    bindEvent:function(){
      var _this = this,
        _cfg = _this.cfg;
       $('body').on('click', this.cfg.triggerTargetNode, function() {
          // 缓存到clickedTriggerNode上
          _cfg.clickedTriggerNode = $(this);
          if(!_cfg.userCtrlMain){
            _this.openBrand();
          }
       });
    },
    //打开品牌弹层
    openBrand: function(argus) {
      var _this = this,
        _cfg = _this.cfg;
        // 用户想要做的逻辑
        var ctrl = (arguments.length)>0;
        if(ctrl? '': _cfg.userCtrlMain){
          return
        }
        _this.animateFn(_cfg.$popWrap, 'open');
        _this.animateFn(_cfg.$brandCont, 'open');
        if (_this.isFirstOpen) {
          // 拉品牌数据 渲染,只走一次
          _this.getData(_cfg.brandUrl, {"loadType":_cfg.loadType}, function(data) {
            _this.renderBrandHtml(data);
          });
        }

    },
    renderHtmlFirst: function(callback) {
      var _html = '<section class="select-car-wrap" id="' + this.cfg.popWrap.substring(1) + '" >  <div class="select-car-cont car-brand" id="brand-cont"  >     <h3>      <div class="return-icon js-return-icon">        <i class="sub-back"></i>      </div>       品牌     </h3> <div id="js-letter-nav" class="letter-nav">   </div><div class="dl-pos">    <ul class="list js-list">     </ul>     </div>  </div>  <div class="select-car-cont car-series" id="series-cont"  >     <h3>      <div class="return-icon js-return-icon">        <i class="sub-back"></i>      </div>       车系     </h3>   <div class="dl-pos">    <ul class="list js-list">     </ul> </div>  </div>  <div class="select-car-cont car-model" id="model-cont">     <h3>    <div class="return-icon js-return-icon">      <i class="sub-back"></i>    </div> 车型     </h3>   <div class="dl-pos">    <ul class="list js-list">     </ul> </div>  </div></section>';
      $('body').append(_html);
      (typeof callback === 'function') && callback();
    },
    renderBrandHtml: function(data) {
      var _this = this,
        _html = '',
        _letterGroup = '',
        letterGroupSortVoList = data.letterGroupSortVoList,
        sortFirstCharList = data.sortFirstCharList;
      // 品牌html 渲染
      for (var i = 0; i < letterGroupSortVoList.length; i++) {
        _html += '<li class="sub-list" id="' + letterGroupSortVoList[i].firstChar + '"><h4 class="item-tit">' + letterGroupSortVoList[i].firstChar + '</h4>';
        var velBrandList = letterGroupSortVoList[i].velBrandList;
        for (var j = 0; j < velBrandList.length; j++) {
          _html += '<div class="item-name" cValue=' + velBrandList[j].value + ' cText=' + velBrandList[j].text + '>\
                <div class="img-box">\
                  <img src="' + _this.cfg.imgUrl + velBrandList[j].imgUrl + '">\
                </div>\
                <p class="tit-txt">' + velBrandList[j].text + '</p>\
              </div>';
        }
        _html += '</li>';
      }
      // 快捷字母html 渲染
      for (var k = 0; k < sortFirstCharList.length; k++) {
        _letterGroup += '<a href="#' + sortFirstCharList[k] + '" class="anchors-item">' + sortFirstCharList[k] + '</a>';
      }
      var $brandContList = _this.cfg.$brandCont.find('.js-list');
      //添加dom
      $brandContList.html(_html);
      _this.cfg.$letterNav.html(_letterGroup);
    },
    animateFn: function(ele, closeOrOpenFlag, callback) {
      _showClass = this.cfg.showClass;
      if (closeOrOpenFlag === 'close') {
        ele.removeClass(_showClass);
      } else {
        ele.addClass(_showClass);
      }
      (typeof callback === 'function') && callback();
    },
    triggerSelect: function() {
      var _this = this,
        _cfg = _this.cfg;
      // 负责选 品牌、车系、车型
      $(document.body).on('click', _cfg.popWrap + ' .item-name', function() {
        var $this = $(this),
          cValue = $this.attr('cvalue'),
          lab = $this.parents('.select-car-cont').attr('id').replace('-cont', ''),
          dataParam = {};
          dataParam.loadType = _cfg.loadType;
          dataParam[lab + 'Id'] = cValue;

        switch (lab) {
          case "brand":
            // 拉数据，渲染，打开车系弹层，
            _this.getData(_cfg.seriesUrl, dataParam, function(data) {
              _this.renderSeriesHtml(data);
            });
            _this.animateFn(_cfg.$seriesCont, 'open');
            break;
          case "series":
            // 打开车型
            _this.getData(_cfg.modelUrl, dataParam, function(data) {
              _this.renderModleHtml(data);
            });
            _this.animateFn(_cfg.$modelCont, 'open');
            break;
          case "model":
            // 关闭所有弹层，并赋值；
            _this.animateFn(_cfg.$brandCont, 'close');
            _this.animateFn(_cfg.$seriesCont, 'close');
            _this.animateFn(_cfg.$modelCont, 'close');
            _this.animateFn(_cfg.$popWrap, 'close');
            break;
        }
        // 改变cacheObjData
        _this.changeCacheObjData(lab, $this);
      });
    },
    changeCacheObjData: function(_type, $this) {
      var _this = this,
        _cfg = _this.cfg,
        _cacheObjDate = _this.tempDataObj,
        cValue = $this.attr('cvalue'),
        cText = $this.attr('ctext'),
        cPrice = $this.attr('cprice');
      switch (_type) {
        case "brand":
          _cacheObjDate.velBrandId = cValue;
          _cacheObjDate.velBrandText = cText;

          _cacheObjDate.velSeriseId = '';
          _cacheObjDate.velSeriseText = '';

          _cacheObjDate.velModelId = '';
          _cacheObjDate.velModelText = '';
          _cacheObjDate.guidePriceTxt = '';

          break;
        case "series":
          _cacheObjDate.velSeriseId = cValue;
          _cacheObjDate.velSeriseText = cText;

          _cacheObjDate.velModelId = '';
          _cacheObjDate.velModelText = '';
          _cacheObjDate.guidePriceTxt = '';
          break;
        case "model":
          _cacheObjDate.velModelId = cValue;
          _cacheObjDate.velModelText = cText;
          _cacheObjDate.guidePriceTxt = cPrice;
          break;
      }
      _cfg.cacheObjDate = _cacheObjDate;
      // 添加选中样式; 只有回退的时候能够看得到；
      $this.parents('.js-list').find('.selected').removeClass('selected');
      $this.addClass('selected');
      // console.log('_cfg.cacheObjDate',JSON.stringify(_cfg.cacheObjDate));
      if (_type == "model") {
        _cfg.completeSelected(_cfg.cacheObjDate);
        _cfg.cacheObjDate = null;
      }
    },
    goBackFn: function() {
      var _this = this,
        _cfg = _this.cfg;
      //回退
      _cfg.$popWrap.on('click', '.js-return-icon', function() {
        var $this = $(this),
          $ele = $this.parents('.select-car-cont'),
          _type = $ele.attr('id').replace('-cont', ''),
          callback = null;
        switch (_type) {
          case "brand":
            //  关闭弹层，
            callback = function() {
              _this.animateFn(_cfg.$popWrap, 'close');
            };
            break;
          case "series":
            //  关闭车系弹层，
            break;
          case "model":
            // 关闭车型弹层
            break;
        }
        _this.animateFn($ele, 'close', function() {
          (typeof callback === 'function') && callback();
        });
      });
    },
    //渲染车系fn
    renderSeriesHtml: function(data) {
      var _this = this,
        _cfg = _this.cfg,
        _html = '';
      for (var i = 0; i < data.length; i++) {
        _html += '<li class="sub-list">\
              <div class="item-name" cValue="' + data[i].value + '" cText=' + data[i].text + '>\
                <div class="img-box">\
                  <img src="' + _cfg.imgUrl +'/210x140/'+ data[i].seriesImgUrl + '">\
                </div>\
                <p class="tit-txt">' + data[i].text + '</p>\
                <span class="right-part">\
                  <i class="right-arrow"></i>\
                </span>\
              </div>\
            </li>';
      }
      _cfg.$seriesCont.find('.js-list').html(_html);
    },
    // 渲染车型fn
    renderModleHtml: function(data) {
      var _this = this,
        _cfg = _this.cfg,
        _html = '';
      for (var i = 0; i < data.length; i++) {
        _html += '<li class="sub-list">\
                <div class="item-name"  cValue="' + data[i].value + '" cText="' + data[i].text + '" cPrice="' + data[i].guidePriceTxt + '">\
                  <p class="tit-txt">' + data[i].text + '</p>\
                </div>\
              </li>'
      }
      _cfg.$modelCont.find('.js-list').html(_html);
    },
    // 获取数据
    getData: function(url, dataParam, callback, ajaxConfig) {
      var _this = this,
        defaultData = {
          "type": "get",
          "datatype": "jsonp",
          "cache": false,
          "async": true
        },
        dataParam = dataParam || {};
      ajaxConfig = ajaxConfig || {};
      ajaxConfig = $.extend(true, defaultData, ajaxConfig);
      _this.debug && (ajaxConfig.datatype = "json");
      ajaxConfig.jsonp = ajaxConfig.datatype == "jsonp" ? "jsonpCallback" : ""; //服务端用于接收callback调用的function名的参数
      $.ajax({
        url: url,
        type: ajaxConfig.type,
        dataType: ajaxConfig.datatype,
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        data: dataParam,
        cache: ajaxConfig.cache,
        jsonp: ajaxConfig.jsonp,
        success: function(data) {
          data && "function" == typeof callback && callback(data)
        },
        error: function(xhr, type) {
          if (type === "timeout") {
            console.log("连接超时!请稍后再试");
          } else if (type == "error") {
            console.log("系统繁忙,请稍后再试");
          } else {
            console.log("请求404");
          }
        },
        complete: function(arguments) {

        },
      });
    }

  }
  // 自执行函数 返回ECar.carSelect函数；
  return ECar.carSelect;
});
