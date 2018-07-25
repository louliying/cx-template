;(function(factory) {
	if (typeof define === 'function') {
		if(define.cmd){
			define("ecar/ECar.popWin", ['$'], function(require,exports,module){
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

	if(ECar.popWin){
		return ECar.popWin;
	}
	var popW;

	ECar.popWin = function(options){
		// 默认配置
		var settings = {
			// 蒙层
			configMask: true,
			// 出发弹窗元素
			triggerNode: "body",
			// 蒙层存放的容器
			container: ".js-flex-wrap-body",
			// 触发发弹窗目标元素（用于事件委托）
			triggerTargetNode: null,
			// 弹窗容器
			wrapNode: ".js-mui-pop-module",
			// 动画容器
			animateNode: ".js-mui-pop-module",
			// 显示class
			showClass: "show",
			// 屏幕禁止滚动
			deviceTouch: false,
			// 取消
			cancelNode: ".js-pop-close",
			// 确定
			confirmNode: ".js-btn",
			// 蒙层
			maskNode: ".js-mui-cover",
			// 显示弹窗之前的回调函数
			showPopBeforeCallback:function(){
				return true;
			},
			// 显示弹窗之后的回调函数
			showPopCallback:function(){
			},
			// 校验函数
			validatePopCallback:function(){
				return true;
			},
			// 确定关闭弹窗之后的回调函数
			closePopCallback:function(){
			},
			// 取消关闭弹窗之后的回调函数
			cancelPopCallback:function(){
			}
		};
		var config = $.extend(true, settings, options || {});
		if( popW === undefined ){
			popW = new popWin(settings);
		} else {
			popW.init(settings);
		}

		return popW;
	};

	function popWin(settings){
		this.init(settings);
	};

	popWin.prototype = {
		init:function(settings){
			var that = this;
			if(this.popsObj[settings.wrapNode]){
				return;
			}
			// 保存页面上所有弹窗配置
			this.popsObj[settings.wrapNode] = settings;
			// 打开状态
			this.popsObj['opened'] = false;
			// 为元素绑定事件
			that.addEvent(settings);
		},
		// 弹窗配置集合
		popsObj: {},
		// 打开中的弹窗及属性
		openedObj: [],
		// 事件绑定
		addEvent:function(settings){
			var that = this,
			// 弹窗容器
			$wrapNode = $(settings.wrapNode),
			// 侧罩层
			$maskNode = $(settings.maskNode),
			// 触发节点
			$triggerNode = $(settings.triggerNode),
			// 取消节点
			$cancelNode = $wrapNode.find(settings.cancelNode),
			// 确认节点
			$confirmNode = $wrapNode.find(settings.confirmNode),
			// 相应的单个弹窗配置
			popObj = that.popsObj[settings.wrapNode],
			// 蒙层存放容器
			$maskContainer = $(document.body);

			if($(settings.container).length){
				$maskContainer = $(settings.container);
			}
			// 创建侧罩层
			if ($(settings.maskNode).length <= 0){
				$maskContainer.append('<div class="mui-cover-bg js-mui-cover" style="display: none;"></div>');
				$maskNode = $(settings.maskNode);
			}
			// 处理侧罩层可以促发下面层的滚动
			$maskNode.on('touchmove',function(e){
				e.stopPropagation();
				e.preventDefault();
			});

			// 触发节点事件
			if(settings.triggerTargetNode){
				$triggerNode.on('click', settings.triggerTargetNode, function () {
					that.openPop(settings, $wrapNode, $maskNode, popObj, that, $(this));
				});
			} else {
				$triggerNode.on('click', function () {
					that.openPop(settings, $wrapNode, $maskNode, popObj, that, $(this));
				});
			}

			// 取消节点事件
			$cancelNode.length && $cancelNode.off('click').on('click',function(){
				popObj.cancelPopCallback && popObj.cancelPopCallback();
				that.closePop(settings);
			});

			// 遮罩层节点事件
			$maskNode.length && $maskNode.off('click').on('click', function(e){
				var target = $(e.target);
				if(target.closest(popObj.animateNode).length){
					return;
				}
				popObj.cancelPopCallback && popObj.cancelPopCallback();
				that.closePop(settings);
			});

			// 确认节点事件
			$confirmNode.length && $confirmNode.off('click').on('click',function(){

				var status = popObj.validatePopCallback();
				if(status){
					popObj.closePopCallback && popObj.closePopCallback();
					that.closePop(settings);
				}
			});
		},
		// 打开弹窗
		openPop: function(settings, $wrapNode, $maskNode, popObj, that, triggerNode){

			if(popObj.opened){
				return false;
			}
			popObj.opened = true;

			//执行打开弹窗前回调函数
			if (popObj.showPopBeforeCallback && !popObj.showPopBeforeCallback(triggerNode)) {
				return;
			}
			$wrapNode = $wrapNode || $(popObj.wrapNode);
			$maskNode = $maskNode || $(popObj.maskNode);
			triggerNode = triggerNode || $(popObj.triggerNode);

			that.zIndex.value = that.zIndex.value + 2;
			var openObj = {
				name: settings.wrapNode || popObj.wrapNode,
				zIndex: that.zIndex.value
			}
			// 为了记录打开弹窗时的滚动位置
			if(popObj.deviceTouch && popObj.configMask){
				var lastScrollTop = $(document.body).scrollTop();
				openObj.lastScrollTop = lastScrollTop;
				settings.lastScrollTop = lastScrollTop;
				$('html').addClass('sidebar-move');
			};
			if(that.openedObj){

			}
			that.openedObj.push(openObj);

			$wrapNode.css({'z-index': that.zIndex.value}).show();
			$maskNode.css({'z-index': that.zIndex.value -1});
			if(popObj.configMask){
				$maskNode.show();
			};
			setTimeout(function() {
				$wrapNode.addClass(popObj.showClass);
			}, 0);
			settings.timer && clearTimeout(settings.timer);
			//执行打开弹窗后回调函数
			settings.timer = setTimeout(function() {
				popObj.showPopCallback && popObj.showPopCallback(triggerNode);
			}, 200);

		},
		open: function (popName) {
			var popObj = this.popsObj[popName];
			popObj.opened = false;
			this.openPop({}, null, null, popObj, this, null);
		},
		// 关闭弹窗
		closePop:function(settings){
			if (this.openedObj.length > 0) {
				var arrLen = this.openedObj.length,
				$wrapNodeName = this.openedObj[arrLen - 1].name,
				$wrapNode = $(this.openedObj[arrLen - 1].name),
				lastScrollTop = this.openedObj[arrLen - 1].lastScrollTop || 0,
				popObj = this.popsObj[$wrapNodeName],
				that = this,
				$maskNode = $(settings.maskNode);

				$wrapNode.removeClass(settings.showClass);
				this.openedObj.splice(this.openedObj.length - 1, 1);

				settings.timer && clearTimeout(settings.timer);
				settings.timer = setTimeout(function() {
					var newArrLen = that.openedObj.length;

					if(newArrLen <= 0){
						$maskNode.hide();
					} else {
						$wrapNodeName = that.openedObj[newArrLen - 1].name;
						var newPopObj = that.popsObj[$wrapNodeName];
						if(newPopObj.configMask){
							$maskNode.css('z-index', that.openedObj[newArrLen - 1].zIndex -1);
						} else {
							$maskNode.hide();
						}
					}

					if(popObj.deviceTouch && popObj.configMask){
						$('html').removeClass('sidebar-move');
						$(document.body).scrollTop(lastScrollTop);
					}

					$wrapNode.hide();
					popObj.opened = false;
				}, 200);
			}else{
				var $wrapNode = $(settings.wrapNode),
				$maskNode = $(settings.maskNode),
				lastScrollTop = settings.lastScrollTop;
				$wrapNode.removeClass(settings.showClass);
				if(settings.configMask){
					$maskNode.hide();
				}

				if(settings.deviceTouch && settings.configMask){
					$('html').removeClass('sidebar-move');
					$(document.body).scrollTop(lastScrollTop);
				}

				$wrapNode.hide();
			}
		},
		// 关闭当前弹窗
		closeCurPop: function(objName){
			var arrLen = this.openedObj.length;
			if(arrLen <= 0){
				return;
			}

			var $wrapNodeName = objName || this.openedObj[arrLen - 1].name,
			popObj = this.popsObj[$wrapNodeName];
			if(popObj){
				this.closePop(popObj);
			}
		},
		zIndex: {
			value: 50
		}
	};

	return ECar.popWin;

});