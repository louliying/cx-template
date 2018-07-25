/**
 * Copyright (C), 2015, 上海赛可电子商务有限公司
 * Author:   张卫明
 * Date:     2015-7-8
 * Description: 提示框 弹框
 */
;(function(factory) {
	if (typeof define === 'function') {
		if(define.cmd){
			define("ecar/ECar.dialogPrompt", ['$'], function(require,exports,module){
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

	if(ECar.dialogPrompt){
		return ECar.dialogPrompt;
	}

	window.promptTimer = '';
	var prompt;

    /*单例模式*/
    ECar.dialogPrompt = function(settings){
    	if( prompt === undefined ){
    		 prompt = new promptPop(settings);
    	} else {
    		prompt.init(settings);
    	}
    }

    function promptPop(settings){
    	this.init(settings);
    };

    promptPop.prototype = {

    	constructor	:	promptPop,

    	config	:	{
    		prompt	:'',
    		promptCont	:'',
    		$h	:''
    	},

	    init:	function(settings){

	        if (!settings.text) {
	            return false;
	        }

	        if (promptTimer != '') {
	            clearTimeout(promptTimer);
	        }

	        this.createPrompt(settings);	//创建结构

	        this.editStyle(settings);		//填充内容 修改样式

	        this.animate(settings);			//设置动画

	        this.setEvent(settings);		//添加事件
	    },
	   setEvent:function(settings){
	   		var _this = this,ele = document.getElementById('pop-prompt');
	    	if(settings.clickClose == true){
	    		ele.onclick = function(){
		    		_this.closePop(settings,ele);
		    	};
	    	}
	    },

	    editStyle:function(settings){

	    	this.config.prompt 		= 	$('#pop-prompt'),
	        this.config.promptCont 	= 	$('.prompt-cont',this.config.prompt);
	    	this.config.promptCont.html(settings.text);
	        this.config.prompt.css({'display':'block','top':'70%'});
	        this.config.$h= this.config.promptCont.height();
	        this.config.prompt.css({'margin-top':-1*this.config.$h+'px'});
	       	this.config.prompt.attr('class','pop-prompt pop-prompt-show');
	       if(settings.openFun != undefined && typeof(settings.openFun) == 'function'){
	       		settings.openFun.apply();
	       }
	    },

	    createPrompt:function(settings){

	    	var $prompt = $('#pop-prompt');
	        if ($prompt.length > 0) {
	            return false;
	        }

	        $pophtml = '<div class="pop-prompt" id="pop-prompt"><div class="prompt-cont round-min"></div></div>';
	        $('body').append($pophtml);

		},

		animate:function(settings){

			var _this = this,e = document.getElementById('pop-prompt');
			var closeTime = 3000;
		            if(settings.closeTime){
		                closeTime = settings.closeTime;
		            }

			promptTimer = setTimeout(function(){

					_this.closePop(settings,e);

		        },closeTime);

		},
		closePop:function(settings,e){
			var _this = this;
			this.config.prompt.attr('class','pop-prompt pop-prompt-hide');
			var transitionEvent = this.whichTransitionEvent();
//			if(transitionEvent != undefined){
//					e.addEventListener(transitionEvent, function() {
			setTimeout(function(){
				if(settings.closeFun != undefined && typeof(settings.closeFun) == 'function'){
					settings.closeFun.apply();
				}
				if(_this.config.prompt.attr('class') == 'pop-prompt pop-prompt-hide'){
					_this.config.prompt.css({'display':'none'});
				}
			},300);
//					});

//			};
		},
		whichTransitionEvent: function (){
			var t;
			var el = document.getElementById('pop-prompt');
			var transitions = {
				'transition':'transitionend',
				'OTransition':'oTransitionEnd',
				'MozTransition':'transitionend',
				'WebkitTransition':'webkitTransitionEnd'
			}
			for(t in transitions){
				if( el.style[t] !== undefined ){
				return transitions[t];
				}
			}
		}

    }

	return ECar.dialogPrompt;

});