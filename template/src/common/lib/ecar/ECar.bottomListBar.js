/**
 * Copyright (C), 2015, 上海赛可电子商务有限公司
 * Author:   贺鑫伟
 * Date:     2016-5-3
 * Description: 底部list弹层
 */
;(function(factory) {
	if (typeof define === 'function') {
		if(define.cmd){
			define("ecar/ECar.bottomListBar", ['$'], function(require,exports,module){
				"define:nomunge,require:nomunge,exports:nomunge,module:nomunge";
				var $=require("$");
				return factory($,window.ECar||(window.ECar={}));
			});
		}else{
			define(['$'],function($){
				"define:nomunge,require:nomunge,exports:nomunge,module:nomunge";
				return factory($,window.ECar||(window.ECar={}));
			});
		}
	}
	else {
		factory($,window.ECar||(window.ECar={}));;
	}
})(function($,ECar){

	if(ECar.bottomListBar){
		return ECar.bottomListBar;
	}
	
	ECar.bottomListBar = function(options) {
		var settings = {
				showBtn:'',
				fatherDiv: '',
				ul: '',
				animate: 'false',
				bottomGap: '0.6'
			};
		
		var config = $.extend({}, settings, options||{});
		
		$(config.showBtn).on('click', function() {
			$(config.fatherDiv).css('display', 'block');
			$(config.ul).css("margin-bottom", "-" + $(config.ul + " li").length*($(config.ul + " li").height()+1) + "px");
			//高度+0.6rem
			if (config.animate == true || config.animate == "true") {
				$(config.ul).animate({bottom: $(config.ul).height() + $("html").css("font-size").replace("px", "")*config.bottomGap + 'px'});
				$(config.fatherDiv).animate({opacity:'1'});
			}
			else {
				$(config.ul).css('bottom', $(config.ul).height() + $("html").css("font-size").replace("px", "")*config.bottomGap + 'px');
				$(config.fatherDiv).css('opacity', '1');
			}
		});
		
		$(config.fatherDiv).on('click', function() {
			if (config.animate == true || config.animate == "true") {
				$(config.ul).animate({bottom: '0'});
				$(config.fatherDiv).animate({opacity:'0'}, function() {
					$(config.fatherDiv).css('display', 'none');
				});
			}
			else {
				$(config.fatherDiv).css('display', 'none');
			}
		});
	}
	
	return ECar.bottomListBar;
	
});