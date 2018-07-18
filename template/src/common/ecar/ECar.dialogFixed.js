/**
 * Copyright (C), 2015, 上海赛可电子商务有限公司
 * Author:   张卫明
 * Date:     2015-7-8
 * Description: fixed 弹框
 */
;(function(factory) {
	if (typeof define === 'function') {
		if(define.cmd){			
			define("ecar/ECar.dialogFixed", ['$'], function(require,exports,module){
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
	if(ECar.dialogFixed){
		return ECar.dialogFixed;
	}
	
	ECar.dialogFixed = function(options){
		var settings = {
			'anmiType'		:'show',
			'top'			:0,
			'popClass'		:'fixed',
			'touchClose'	:null,
			'showCallback'	: function(){},
			'hideCallback'  : function(){},
			'modeEle'		:".pop-mask",
			'closeEle'		:".pop-close"
		};
		
		config = $.extend({}, settings, options||{});
		
		new fixedPop(config);
	}
	
	function fixedPop(options) {
		
		this.cfg = options;
		this.currentPos = 0; 
		this.X = 0;
	    this.curX = 0;
	    this.Y = 0;
	    this.curY = 0;
		this.isScrolling = false;
		
	    this.init();
	    
	}
	
	fixedPop.prototype = {
		// 初始化 函数
	    init: function() {
			
			//打卡关闭开关
			if($(this.cfg.ele).hasClass(this.cfg.popClass)){
				this.closeFixed();
				return false;
			}
			$(this.cfg.ele).addClass(this.cfg.popClass);
			
			//构建HTML 结构
			this.createMode();
			
			this.editEle();
			
			
			//绑定动画
			this.eleAnimate();
			
			//绑定事件
			this.addEvent();
			
		},
		//创建遮罩层
	    createMode:function(){
	    	
	    	var eleMode = $(this.cfg.modeEle),_this = this;
	    	
	    	//创建遮罩层
			if( eleMode.length <= 0 ){
				
				eleMode = document.createElement('div');
				eleMode.setAttribute('id','popMask');
				eleMode.setAttribute('class','pop-mask');
				document.body.appendChild(eleMode);
				
				eleMode = $(this.cfg.modeEle);
				
			}
			
			eleMode.css({'position':'fixed'});
			eleMode.css({'top':this.cfg.top+'px'});
			eleMode.show();
			
	   },
	   //构建 弹框 样式
	   editEle:function(){
	   		
			$(this.cfg.ele).css({'display':'block'});
			_height = $(window).height() - this.cfg.top;
			
			$(this.cfg.ele).css({'display':'block','background-color':'#fff','top':this.cfg.top+'px','height':_height+'px','overflow-y':'auto'});
			
	   },
	   //绑定事件
	   addEvent:function(){
	   		
	   		var _this = this;
	   		
	   		$(document).on('touchmove',function(e){
		  		e.preventDefault();
		  	});
	   		
	   		$(document).on('wheel',function(e){
		  		e.preventDefault();
		  	});
	   		
	   		$(this.cfg.modeEle).on("click",function(e){
	   			_this.closeFixed();
	   			e.preventDefault();
	   		});
	   		
	   		$(this.cfg.closeEle).on("click",function(){
	   			_this.closeFixed();
	   		});
	   		
	   		if(this.cfg.touchClose != null){
				$(this.cfg.touchClose).on("touchstart", function(e){_this._touchstart(e);});
	        	$(this.cfg.touchClose).on("touchmove", function(e){_this._touchmove(e);});
	        	$(this.cfg.touchClose).on("touchend", function(e){_this._touchend(e);});
			}
	   
	   	},
	   	touchX : function(e){
			if(e.touches){
				return e.touches[0].pageX;
			}else{
				return e.pageX; 
			}
		},
		touchY : function(e){
			if(e.touches){
				return e.touches[0].pageY;
			}else{
				return e.pageY; 
			}
		},
	   	_touchstart:function(e){
	   		this.X = this.touchX(e);
	        this.Y = this.touchY(e);
	   	},
	   	_touchmove:function(e){
	   		var _this = this;
			
	    	_this.curX = _this.touchX(e);
	    	_this.curY = _this.touchY(e);
	   	},
	   	_touchend:function(e){
	   		var _this = this,
			    deltaX,
			    deltaY,
			    ele = document.querySelector(this.cfg.ele);
			
	        deltaX = _this.curX - _this.X;
	        deltaY = _this.curY - _this.Y;
	        
	        if(_this.isScrolling && Math.abs(deltaX) > Math.abs(deltaY) && deltaX>0){
	        	_this.eleAnimate('close');
	    	}
	   	},
	   	//解除绑定
	   	unEvent:function(){
	   	
	   		var _this = this;
	   		
	   		$(this.cfg.modeEle).off("click");
	   		
	   		$(this.cfg.closeEle).off("click");
	   		
	   		$(document).off('touchmove');
	   		$(document).off('wheel');
	   		
	   	},
	   	//关闭弹框
	   	closeFixed:function(){
	   		this.eleAnimate('close');
	   		this.unEvent();
	   	},
	   	slide : function(ele,timer,transform,type){
	   		var style = ele.style;
	   		
	   		style.webkitTransitionDuration = style.MozTransitionDuration = style.msTransitionDuration = style.OTransitionDuration = style.transitionDuration = timer+'ms';
	   		if(type == true){
	   			style.webkitTransitionTimingFunction = style.MozTransitionTimingFunction = style.msTransitionTimingFunction = style.OTransitionTimingFunction = style.transitionTimingFunction = 'ease-in-out';
	   		}
	   		style.webkitTransform = style.MozTransform = style.msTransform = style.OTransform = style.transform = transform;
	        
		},
	   	//动画函数
	   	eleAnimate:function(_type){
	   		var aniName,			//动画类型前缀
	   			aniNum,
	   			_aniNum,			
	   			reaniNum,			//动画运动长度		
	   			ele,
	   			_this = this;		
	   		aniName = 'translateX';	
	        _aniNum = $(this.cfg.ele).children().width()*-1;
			ele = document.querySelector(this.cfg.ele);
	   		_this.isScrolling = false;
			
			if(_type == 'close'){
				aniNum	= 0;
				reaniNum = -1*_aniNum;
				
			} else {
				aniNum = -1*_aniNum;
				reaniNum = 0;
			}
			
			this.slide(ele,0,'translateX('+aniNum+'px)',false);
			
			setTimeout(function(){
				
				_this.slide(ele,300,'translateX('+reaniNum+'px)',true);
				
		        if(_type == 'close'){
		        	_this.clossAnimate()
				} else {
					_this.cfg.showCallback.apply();
					_this.isScrolling = true;
				}
				
			},20);
			
	   	},
	   	//动画从置
	   	clossAnimate:function(){
	   		var _this = this,ele;
	   		ele = document.querySelector(_this.cfg.ele);
			
	   		setTimeout(function(){
	   			
	   			_this.slide(ele,0,'none',false);
				_this.resetClass();
				
	   		},300);
	   	},
	   	//从置样式
	   	resetClass:function(){
	   		
	   		$(this.cfg.ele).removeClass(this.cfg.popClass);
			$(this.cfg.modeEle).css({'display':'none'});
			this.cfg.hideCallback.apply();
			
			$(this.cfg.ele).css({'display':'none'});
			
	  	}
	};
	
	return ECar.dialogFixed;
	
});