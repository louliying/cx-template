import Vue from 'vue';

const vuemaxus = {
	install (Vue) {
		const usesInit = Vue.config._lifecycleHooks.indexOf('init') > -1;
		Vue.mixin(usesInit ? { init: this.vuexInit } : { beforeCreate: this.vuexInit });
	},
	vuexInit () {
		const options = this.$options;
		// store injection
		if (options.vuemaxusstore) {
			this.$CXD = options.vuemaxusstore;
		} else if (options.parent && options.parent.$CXD) {
			this.$CXD = options.parent.$CXD;
		}
	}
};

let vuemaxusstore = (options = {}) => {
	return new Vue({
		data: options
	});
};

export {
	vuemaxusstore,
	vuemaxus
};
