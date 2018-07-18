/**
 * Copyright (C), 2015, 上海赛可电子商务有限公司
 * Author:   康明飞
 * Date:     2015-7-12
 * Version:  1.1
 * Description: 弹出层动画效果（四个方位）
 * 2016-05-06 张禀奇修改 160行追加THIS重定向 193行调用
 * 2017-07-18 lwx 优化体验，关闭弹层后可以回到原来的状态
 */
;
(function (factory) {
	if (typeof define === 'function') {
		if (define.cmd) {
			define("ecar/ECar.maskAnimation", ['$', "zepto/touch", "ecar/ECar.utils", "ecar/IScroll"], function (require, exports, module) {
				"define:nomunge,require:nomunge,exports:nomunge,module:nomunge";
				var $ = require("$");
				require("zepto/touch");
				var iScroll = require("ecar/IScroll");
				var utils = require("ecar/ECar.utils");
				return factory($, utils, iScroll, {});
			});
		} else {
			define(['$', "zepto/touch", "ecar/ECar.utils", "ecar/IScroll"], function ($, touch, utils, iScroll) {
				"define:nomunge,require:nomunge,exports:nomunge,module:nomunge";
				return factory($, utils, iScroll, {});
			});
		}
	} else {
		factory($, ECar.utils, window.IScroll, window.ECar || (window.ECar = {}));
	}
})(function ($, utils, iScroll, ECar) {
	if (ECar.maskAnimation) {
		return ECar.maskAnimation;
	}
	ECar.maskAnimation = function (options) {
		// 默认配置
		var defaultCfg = {
			//触发是否事件代理
			delegation: false,
			//记录点击前的lastScrollTop
			lastScrollTop: 0,
			//mask selector
			maskAnimationNode: ".mask-animation",
			//mask showClass
			showClassName: "show",
			//close selector
			closeNode: ".mask-close",
			//scroll-box selector
			scrollBoxNode: ".scroll-box",
			//mappings
			maskMappings: {
				".mask-moveToBottom": {},
				".mask-moveToTop": {},
				".mask-moveToLeft": {},
				".mask-moveToRight": {}
			},
			//动画开始时回调函数
			showCallBack: function () { },
			//动画结束时回调函数
			hideCallBack: function () { }
		};
		// 构造配置
		config = $.extend({}, defaultCfg, options || {});
		new MaskAnimation(config);
	};

	function MaskAnimation(options) {
		this.cfg = options;
		this.init();
	}
	MaskAnimation.prototype = {
		init: function () {
			var self = this,
				cfg = self.cfg,
				mainNode = $('html'),
				maskMappings = cfg.maskMappings,
				maskNode = $(cfg.maskAnimationNode),
				scrollNodes = $(cfg.scrollBoxNode);
			maskNode.hide();
			maskNode.children().hide();
			var resizeEvent = utils.resizeEvent();
			var clickEvent = utils.clickEvent();
			for (var key in maskMappings) {
				(function (key) {
					var animationNode = $(key);
					animationNode.hide();
					animationNode.children().hide();
					var screenHeight = $(window).height();
					var maskMapping = maskMappings[key];
					var scrollNode = animationNode.find(cfg.scrollBoxNode);
					var scrollSelector = key + " " + cfg.scrollBoxNode;
					var swipeEvent = "click";
					if (clickEvent == "tap") {
						switch (key) {
							case ".mask-moveToBottom":
								swipeEvent = "swipeUp";
								break;
							case ".mask-moveToTop":
								swipeEvent = "swipeDown";
								break;
							case ".mask-moveToLeft":
								swipeEvent = "swipeRight";
								break;
							case ".mask-moveToRight":
								swipeEvent = "swipeLeft";
								break;
						}
						animationNode.on(swipeEvent, function (e) {
							$("html").removeClass("sidebar-move");
							animationNode.removeClass(cfg.showClassName);
							setTimeout(function () {
								animationNode.hide();
								animationNode.children().hide();
								maskNode.hide();
								cfg.hideCallBack($(this));
							}, 500);
						});
					};
					animationNode.on("touchmove", _anmiationNotPrevent);

					if (key == ".mask-moveToTop" || key == ".mask-moveToBottom") {
						scrollNode.on("touchmove", function (e) {
							e.stopPropagation();
						});
					}
					animationNode.find(cfg.closeNode).on("click", function () {
						$("html").removeClass("sidebar-move");
						$('body').scrollTop(cfg.lastScrollTop);
						animationNode.removeClass(cfg.showClassName);
						setTimeout(function () {
							animationNode.hide();
							animationNode.children().hide();
							maskNode.hide();
							cfg.hideCallBack($(this));
						}, 500);
					});
					if (scrollNode.length > 0) {
						$(window).on(resizeEvent, function () {
							var _screenHeight = $(window).height();
							if (screenHeight != _screenHeight) {
								screenHeight = _screenHeight;
								scrollNode.css("height", "auto");
								setTimeout(function () {
									var _scrollHeight = self.getScrollHight(scrollNode, animationNode.first());
									if (_scrollHeight < scrollNode.height()) {
										scrollNode.css("height", _scrollHeight);
										setTimeout(function () {
											iScroll.refresh(scrollSelector);
										}, 200)
									}
								}, 600);
							}
						});
					}
					var mappings = maskMapping["mappings"];
					for (var map in mappings) {
						(function (map) {
							var contentNode = $(mappings[map]);
							//事件代理判断，原有方法提取出
							if (cfg.delegation) {
								$(document).on("click", map, function () {
									cfg.lastScrollTop = $('body').scrollTop();
									openContent(this, contentNode, map);
								});
							} else {
								$(map).on("click", function () {
									cfg.lastScrollTop = $('body').scrollTop();
									openContent(this, contentNode, map);
								});
							}
						})(map);
					}
					//添加事件代理
					function openContent(selfClick, contentNode, map) {
						var _self = $(selfClick);
						if (!animationNode.hasClass(cfg.showClassName)) {
							maskNode.show();
							animationNode.show();
							contentNode.show();
							setTimeout(function () {
								//等动画完成再禁止底层的滚动，动画时长400ms
								$("html").addClass("sidebar-move");
							}, 400);
							var contentScrollNode = contentNode.find(cfg.scrollBoxNode);
							setTimeout(function () {
								animationNode.addClass(cfg.showClassName);
								cfg.showCallBack(_self);
								// contentScrollNode.attr("data-height",contentScrollNode.height());
							}, 100);
							if (contentScrollNode.length > 0) {
								setTimeout(function () {
									var _scrollHeight = self.getScrollHight(contentScrollNode, contentNode);
									if (_scrollHeight < contentScrollNode.height()) {
										contentScrollNode.css("height", _scrollHeight);
										setTimeout(function () {
											iScroll.refresh(key + " " + mappings[map] + " " + cfg.scrollBoxNode);
										}, 200)
									}
								}, 1000);
							}
						} else {
							$('body').scrollTop(cfg.lastScrollTop);
							$("html").removeClass("sidebar-move");
							animationNode.removeClass(cfg.showClassName);


							setTimeout(function () {
								animationNode.hide();
								contentNode.hide();
								maskNode.hide();
								(function (_this) {
									cfg.hideCallBack(_this);
								})(_self)
							}, 500);


						}
					}
				})(key);
			}
		},
		//获取滚动区域的高度
		getScrollHight: function (scrollNode, parentNode) {
			var windowHeight = $(window).height();
			var bottom = 30;
			var top = scrollNode.offset().top - parentNode.offset().top;
			return windowHeight - bottom - top;
		}
	};

	//禁止默认事件
	window._anmiationNotPrevent = function () {
		event.preventDefault();
	}

	return ECar.maskAnimation;
});
