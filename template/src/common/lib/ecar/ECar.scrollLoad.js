/**
 * Copyright (C), 2015, 上海赛可电子商务有限公司
 * Author:   康明飞
 * Date:     2015-7-5
 * Description: 滚动分页加载
 */
;(function(factory) {
	if (typeof define === 'function') {
		if(define.cmd){
			define("ecar/ECar.scrollLoad", ['$', "zepto/touch", "ecar/ECar.utils"], function(require,exports,module){
				"define:nomunge,require:nomunge,exports:nomunge,module:nomunge";
				var $=require("$");
				require("zepto/touch");
				var utils = require("ecar/ECar.utils");
				return factory($,utils,{});
			});
		}else{
			define(['$', "zepto/touch", "ecar/ECar.utils"],function($,touch,utils){
				"define:nomunge,require:nomunge,exports:nomunge,module:nomunge";
				return factory($,utils,{});
			});
		}
	}
	else {
		factory($,window.ECar||(window.ECar={}));
	}
})(function($,utils,ECar){
	if(ECar.scrollLoad){
		return ECar.scrollLoad;
	}
	ECar.scrollLoad = function(options){
		// 默认配置
		var defaultCfg = {
			//loading selector
			loadNode:".scrollLoding",
			//ajax url 例如： http://car.chexiang.com/a.html?cur={#PAGENUM}
			url: null,
		    //总页数
		    totalPage: 1,
		    // 滚动容器
		    wrapNode: 'body',
		    //当前页码
		    curPage: 1,
		    //滚动到的距离（离底部）
		    bottom: 80,
		    //成功回调函数
		    successCallback:function(data){},
		    //发送请求前
		    beforeSendCallback:function(){},
		    // 结束回调
		    endSendCallBack:function(){}
		};
	    // 构造配置
	    config = $.extend({}, defaultCfg, options||{});
		new ScrollLoad(config);
	};
	function ScrollLoad(options) {
	    this.cfg = options;
	    this.init();
	}
	ScrollLoad.prototype = {
	    init: function() {
	    	var self=this;
	    	var cfg=self.cfg;
	    	//是否执行加载
	    	var scrollFlag = true;
	    	var loadNode=$(cfg.loadNode);
		    if(cfg.totalPage<=1){
				loadNode.hide();
				scrollFlag = false;
		    }else{
		    	cfg.curPage=2;
		    }

		//滚动到页面底部时，自动加载更多
		if (cfg.wrapNode == 'body'){
			window.addEventListener("scroll",function scrollHandler(){
				var scrollh = $(document).height();
				var bua = navigator.userAgent.toLowerCase();
				if(bua.indexOf('iphone') != -1 || bua.indexOf('ios') != -1){
					scrollh = scrollh-60-cfg.bottom;
				}else{
					scrollh = scrollh-cfg.bottom;
				}
				var scrollTop=Math.max(document.documentElement.scrollTop||document.body.scrollTop);
				if((scrollTop + $(window).height()) >= scrollh){
					if(cfg.curPage>parseInt(cfg.totalPage)){
						loadNode.hide();
					}else{
						load();
					}
				}
			},100);
		} else {
			$(cfg.wrapNode).on("scroll",function(){
				var scrollh = $(cfg.wrapNode)[0].scrollHeight;
				var bua = navigator.userAgent.toLowerCase();
				var scrollTop=$(cfg.wrapNode).scrollTop();

				if((scrollTop + $(cfg.wrapNode).height()) >= scrollh){
					if(cfg.curPage>parseInt(cfg.totalPage)){
						loadNode.hide();
					}else{
						load();
					}
				}
			});
		}


		    var clickEvent = utils.clickEvent();
		    loadNode.on(clickEvent,function(){
		    	load();
		    });
		    function load(){
		    	if(scrollFlag){
		    		// 加滚动前 前置条件 如果beforeSendCallback 返回false 则不进入滚动 author:zhangweiming
		    		var isScroll = cfg.beforeSendCallback();

		    		if(!isScroll && isScroll != undefined){
		    			return false;
		    		}

			    	scrollFlag = false;
			    	var url=cfg.url.replace("{#PAGENUM}",cfg.curPage);
			      	$.ajax({
				         type: "GET",
				         url: url,
				         dataType: "html",
				         success: function(data){
				            cfg.successCallback(data);
				            if(cfg.curPage>=parseInt(cfg.totalPage)){
				            	loadNode.hide();
				             	scrollFlag = false;
				             	cfg.endSendCallBack();
				            }else{
					            cfg.curPage=cfg.curPage+1;
					            scrollFlag = true;
				            }
				         },
				         error: function(){
				            scrollFlag = true;
			    			loadNode.html("网络不给力,请点击重新加载");
				        }
		      		});

		      	}
	    	}
	    }
	};
	return ECar.scrollLoad;
});