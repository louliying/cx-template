/**
 * Copyright (C), 2015, 上海赛可电子商务有限公司
 * Author:   康明飞
 * Date:     2015-7-10
 * Description: 工具类
 */
;(function(factory) {
	if (typeof define === 'function') {
		if(define.cmd){			
			define("ecar/ECar.utils", [], function(require,exports,module){
				"define:nomunge,require:nomunge,exports:nomunge,module:nomunge";
				var $=require("$");
				return factory($,{});
			});
		}else{
			define([],function(){
				"define:nomunge,require:nomunge,exports:nomunge,module:nomunge";
				return factory($,{});
			});
		}
	}
	else {
		factory(window.ECar||(window.ECar={}));
	}
})(function(ECar){
	if(ECar.utils){
		return ECar.utils;
	}
	ECar.utils = {
		isSupportTouch : "ontouchend" in document,
		isSupportOrientChange : "onorientationchange" in window,
		clickEvent : function(){
			return this.isSupportTouch ? "tap" : "click";
		},
		resizeEvent : function(){
			return this.isSupportOrientChange ? "orientationchange" : "resize";
		},
		getCookie: function(key) {
		    var result = document.cookie.match(new RegExp("(^| )" + key + "=([^;]*)"));
		    return result != null ? decodeURIComponent(result[2]) : null;
		},
		setCookie: function(key, value, expireDay){
			if (expireDay) {
		        var date = new Date();
		        date.setTime(date.getTime() + expireDay * 24 * 3600 * 1000);
		        document.cookie = key + "=" + encodeURIComponent(value) + ";path=/;expires=" + date.toGMTString();
		    } else {
		        document.cookie = key + "=" + encodeURIComponent(value) + ";path=/";
		    }
		}
	};
	return ECar.utils;
});