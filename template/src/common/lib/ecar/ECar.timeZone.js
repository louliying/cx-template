/**
 * Copyright (C), 2015, 上海赛可电子商务有限公司
 * Author:   康明飞
 * Date:     2015-4-24
 * Description: 倒计时功能
 */
/**
 * Copyright (C), 2015, 上海赛可电子商务有限公司
 * Author:   张卫明
 * Date:     2015-7-8
 * Description: 提示框 弹框
 */
;(function(factory) {
	if (typeof define === 'function') {
		if(define.cmd){
			define("ecar/ECar.timeZone", ['$'], function(require,exports,module){
				"define:nomunge,require:nomunge,exports:nomunge,module:nomunge";
				var $=require("$");
				return factory($,{});
			});
		}else{
			define(['$'],function($){
				"define:nomunge,require:nomunge,exports:nomunge,module:nomunge";
				return factory($,{});
			});
		}
	}
	else {
		factory($,window.ECar||(window.ECar={}));;
	}
})(function($,ECar){

	if(ECar.timeZone){
		return ECar.timeZone;
	}

	ECar.timeZone = function(options){
		// 默认配置
		var defaultCfg = {
		    //当前系统时间(单位毫秒数)
		    serverTime: null,
		    //倒计时开始时间(单位毫秒数)
		    startTime: null,
		    //倒计时结束时间(单位毫秒数)
		    stopTime: null,
		    //未开始回调函数
		    notStartCallBack: function(){
		    },
		    //开始时回调函数
		    startCallBack: function(timeStampObj){
		    },
		    //结束时回调函数
		    stopCallBack: function(){
		    }
		};
	    // 构造配置
	    config = $.extend({}, defaultCfg, options||{});
		new TimeZone(config);
	};
	function TimeZone(options) {
	    this.cfg = options;
	    this.init();
	}
	TimeZone.prototype = {
	    init: function() {
	    	var self = this,
	            cfg = self.cfg,
	        	serverTime = cfg.serverTime,
	        	startTime = cfg.startTime,
	        	stopTime = cfg.stopTime;
	        if(serverTime&&startTime&&stopTime){
			    var startTimeStamp = startTime - serverTime;
			    var stopTimeStamp = stopTime - serverTime;
			    function timeCutDown(){
		    		var timeStampObj = self.formatTimeStamp(stopTimeStamp);
		    		if(stopTimeStamp>0){
			        	if(startTimeStamp<0){
			        		cfg.startCallBack(timeStampObj);
			        	}else{
			        		cfg.notStartCallBack();
			        	}
			        }else{
			        	cfg.stopCallBack();
			        	clearInterval(timeInterval);
			        }
		        	startTimeStamp -= 1000;
		        	stopTimeStamp -= 1000;
		    	}
			    if(stopTimeStamp>0){
			    	timeCutDown();
			    	var timeInterval = setInterval(function(){
			    		timeCutDown();
			    	},1000)
			    }else{
		        	cfg.stopCallBack();
			    }
	        }
	    },
	    formatTimeStamp: function(timeStamp) {
	        var d, h, m, s;
	        timeStamp = timeStamp / 1000;
	        d = parseInt(timeStamp / 3600 / 24, 10); // 天数
	        h = parseInt(timeStamp / 3600 % 24, 10); // 小时
	        m = parseInt(timeStamp % 3600 / 60, 10); // 分钟
	        s = parseInt(timeStamp % 3600 % 60, 10); // 秒
	 		return {
	 			day: d,
	 			hour: h,
	 			minute: m,
	 			second: s
	 		}
	    }
	}

	return ECar.timeZone;

});