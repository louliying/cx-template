// import { request } from 'https';
/* eslint-disable no-unused-vars */
let _toString = Object.prototype.toString;
/* eslint-disable no-unused-vars */
let _toTrim = String.prototype.trim;
/* eslint-disable no-unused-vars */
let _toEach = Array.prototype.forEach;

/*
 * 判断是否是微信
 * @return {Boolean}
 */
export let isWeixin = function () {
	let _userAgent = window.navigator.userAgent;

	if (_userAgent.toLowerCase().match(/MicroMessenger/i) === 'micromessenger') {
		return true;
	} else {
		return false;
	}
};
/**
 * 判断是否是数组
 * @return {Boolean}
 */
export let isArray = function (arr) {
	return Array.isArray(arr);
};
/**
 * 判断是否是null undefined
 * @return {Boolean}
 */
export let isUndef = function (v) {
	return v === undefined || v === null;
};
/**
 *  数值转化为序列化，并渲染出来
 * @return {String}
 */
export let toString = function (val) {
	return val == null ? '' : typeof val === 'object' ? JSON.stringify(val, null, 2) : String(val);
};
/**
 *  数值转化为数字
 * @return {Number}
 */
export let toNumber = function (val) {
	var n = parseFloat(val);
	return isNaN(n) ? val : n;
};
/**
 *  继承
 * @return {Object}
 */
export let _extend = function (to, _from) {
	var key;
	for (key in _from) {
		to[key] = _from[key];
	}
	return to;
};
/**
 *  对象或者数组
 * @return {Boolean}
 */
export let isArrayOrObj = function (obj) {
	return isArray(obj) || isPlainObject(obj);
};
/**
 *  克隆
 * @return {Object}
 */
export let clone = function (obj) {
	if (isArrayOrObj(obj)) {
		return JSON.parse(JSON.stringify(obj));
	}
	return obj;
};
/**
 *  是否是对象
 * @return {Boolean}
 */
export let isPlainObject = function (obj) {
	return _toString.call(obj) === '[object Object]';
};
/**
 *  判断字符串是否为空
 * @return {Boolean}
 */
export let isNullString = function (str) {
	return trim(str).length === 0;
};
/**
 *  去除空格
 * @return {String}
 */
export let trim = function (str) {
	return _toTrim(str);
};
/**
 *  判断是否为邮箱
 * @return {Boolean}
 */
export let isEmail = function (str) {
	var reg = /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;
	if (reg.test(str)) {
		return true;
	}
	return false;
};
/**
 *  判断是否为手机
 * @return {Boolean}
 */
export let isMobile = function (str) {
	var reg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;
	if (reg.test(str)) {
		return true;
	}
	return false;
};
/**
 *  只保留数字
 * @return {String}
 */
export let isSaveNumber = function (str) {
	return str.replace(/[^0-9.]/g, '');
};
/**
 *  获取cookie
 * @return {String}
 */
export let getCookie = function (name) {
	if (document.cookie.length > 0) {
		let c_start = document.cookie.indexOf(name + '=');
		if (c_start !== -1) {
			c_start = c_start + name.length + 1;
			let c_end = document.cookie.indexOf(';', c_start);
			if (c_end === -1) {
				c_end = document.cookie.length;
			}
			return unescape(document.cookie.substring(c_start, c_end));
		}
	}
	return '';
};
/**
 *  设置cookie
 */
export let setCookie = function (c_name, value, expiredays) {
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + expiredays);
	document.cookie = c_name + '=' + escape(value) + ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString());
};
/**
 *  获取本地存储数据  统一用Object或者Array
 *  return {Object String}
 */
export let getStore = function (name) {
	return JSON.parse(localStorage.getItem(name));
};
/**
 *  设置本地存储书籍 统一用Object或者Array
 */
export let setStore = function (name, val = {}) {
	localStorage.setItem(name, JSON.stringify(val));
};
/**
 *  只保留中文
 *  return {Object String}
 */
export let toCN = function () {
	var regEx = /[^\u4e00-\u9fa5\uf900-\ufa2d]/g;
	return this.replace(regEx, '');
};

/**
 * Check if value is primitive
 */
export let isPrimitive = function (value) {
	return (
		typeof value === 'string' ||
		typeof value === 'number' ||
		typeof value === 'symbol' ||
		typeof value === 'boolean'
	);
};
/**
 * Remove an item from an array
 */
export let remove = function (arr, item) {
	var index;
	if (arr.length) {
		index = arr.indexOf(item);
		if (index > -1) {
			return arr.splice(index, 1);
		}
	}
};
/**
 *  返回唯一的实例
 *  return {Object String}
 */
export let getSingle = function (fn) {
	var result;
	return function () {
		return result || (result = fn.apply(this, arguments));
	};
};

/*
*
		* Merge an Array of Objects into a single Object.
*/
export let toObject = function (arr) {
	var res = {};
	var i;
	for (i = 0; i < arr.length; i++) {
		if (arr[i]) {
			// extend(res, arr[i]);
			Object.assign(res, arr[i]);
		}
	}
	return res;
};

/*
	// 从ucm的js里，读取相应key值 的value
*/
export let getDomainByKey = function (sKey) {
	let envConfig = window.envConfig;
	if (JSON.stringify(envConfig) !== '{}') {
		if (envConfig.code === 200) {
			let aData = envConfig.data;
			let oTemp = aData.find((item, key) => {
				return item.key === sKey;
			});
			return oTemp.value;
		}
	}
};
