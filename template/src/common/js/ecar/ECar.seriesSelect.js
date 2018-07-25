/**
 * Copyright (C), 2015, 上海赛可电子商务有限公司
 * Author:   康明飞
 * Date:     2015-7-5
 * Description: 滚动分页加载
 */
;(function(factory) {
	if (typeof define === 'function') {
		if(define.cmd){			
			define("ecar/ECar.seriesSelect", ['$', "zepto/touch", "ecar/ECar.utils"], function(require,exports,module){
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
	
	if(ECar["seriesSelect"])return;
	var defaults = {
		url: "", // 列表数据文件路径（json格式）
		selects: [], // 下拉选框组
		// prettySelects: [], // 美化过的表单项
		nodata: 'none', // 无数据状态, none--->display:none, hidden--->visibility:hidden
		required: false, // 是否为必选
		complete:function(){},
		data:null
	};
	ECar.seriesSelect = function(target, options) { //target is a jQuery object, parent of the selects
		// be efensive
		if (target.length < 1) {
			return;
		};
		var settings = $.extend(true, {}, defaults, options);
		if (!settings.selects.length) {
			return;
		};
		// 
		var box_obj = target;
		var select_arr = []; // 下拉框jQuery对象数组
		// var pretty_select_arr = []; //
		var select_sum = settings.selects.length; //下拉框数量
		// 校验 select_arr 和 pretty_select_arr 数量的相同与否
		var data_json;
		var temp_html;

		var getIndex = function(n) {
			return (settings.required) ? n : n - 1;
		};

		// 获取下拉框内容
		var getNewOption = function(json, title) {
			var _title = title || "请选择";
			var _html;

			if (!settings.required) { // 0?
				_html = "<option value='0'>" + _title + "</option>";
			};

			$.each(json, function(idx, val) {
				if (!val.value) {	
					_html += "<option value='" + val.text + "'>" + val.text + "</option>";
				} else {
					_html += "<option value='" + val.value + "'>" + val.text + "</option>";
				};
			});


			return _html;
		};

		// 初始化
		var init_val = [];
		// added for pretty selects
		function generateTextArray($select) {
			var $options = $select.children('option');
			var result = [];
			for (var i = 0, length = $options.length; i < length; i++) {
				result.push($options.eq(i).text());
			}
			return result;
		}

		var init = function() {
			for (var i = 0; i < select_sum; i++) {
				select_arr.push(box_obj.find("select." + settings.selects[i]));
			};
			// 遍历数据写入第一个下拉选框
			temp_html = getNewOption(data_json, select_arr[0].data("title"));
			select_arr[0].html(temp_html);
			select_arr[0].trigger('update');

			for (var i = 0; i < select_sum; i++) {
				if (select_arr[i].data("val")) { // <select data-value="">
					init_val.push(i);
				} else if (select_arr[i].attr("disabled")) {
					if (settings.nodata == "none") {
						select_arr[i].css("display", "none");
					} else if (settings.nodata == "hidden") {
						select_arr[i].css("visibility", "hidden");
					};
				};
			};

			box_obj.on("change", "select", function() { // delegation
				selectChange(this.className);
				//$(this).trigger("selectChange.hcs", ["hello", ]);
			});
			
			init_timeout();
		};

		var init_timeout = function(n) {
			if (!init_val.length) {
				settings.complete(data_json);
				return;
			};
			var _n = n || 0;
			if (_n < init_val.length) {
				setTimeout(function() {
					var defaultVal=select_arr[_n].data("val");
					select_arr[_n].val(defaultVal);
					if(select_arr[_n].val()==defaultVal){
						select_arr[_n].trigger("change");
					}
					_n++;
					init_timeout(_n);
				}, 1);
			}else{
				settings.complete(data_json);
			}
		};

		var selectChange = function(name) {
			var select_val = [];
			var select_index;
			var select_next;
			var select_data;
			// 获取当前 select 的位置
			for (var i = 0; i < select_sum; i++) { // 遍历取得节点路径
				select_val.push(getIndex(select_arr[i].get(0).selectedIndex));
				if (select_index || i > select_index) { // 删除当前点击select之后所有的select内部数据
					select_arr[i].empty().attr("disabled", true);
					select_arr[i].trigger('update');
					if (settings.nodata == "none") {
						select_arr[i].css("display", "none");
					} else if (settings.nodata == "hidden") {
						select_arr[i].css("visibility", "hidden");
					};
				};

				if (name.indexOf(settings.selects[i]) > -1) {
					select_index = i;
					select_arr[select_index].trigger('update');
				};
			};

			// 获取下级的列表数据
			select_next = select_index + 1;
			select_data = data_json;
			for (var i = 0; i < select_next; i++) {
				if (typeof(select_data[select_val[i]]) == "undefined" || !select_data[select_val[i]].children || !select_data[select_val[i]].children.length) {
					return;
					break;
				};
				select_data = select_data[select_val[i]].children;
			};

			// 遍历数据写入下拉选框
			if (select_arr[select_next]) {
				temp_html = getNewOption(select_data, select_arr[select_next].data("title"));
				select_arr[select_next].html(temp_html).removeAttr("disabled");
				select_arr[select_next].trigger('update');
			};
			colorArray = {
					'child':[]
			};
			for(i=0;i<select_data.length;i++){
				colorArray.child.push(select_data[i]);
			}
			if(select_arr[select_index] != undefined)
			{
				select_arr[select_index].trigger('selectChange.extra',colorArray);
			}
			
		};
		if(settings.url){
			$.getJSON(settings.url,function(json){
				data_json=json;
				init();
			});
		}else if(settings.data){
			data_json=settings.data;
			init();
		}
	};

	return ECar.seriesSelect;
});