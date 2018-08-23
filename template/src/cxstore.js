import Vue from 'vue';

const cxVue = {
	install (Vue) {
		const usesInit = Vue.config._lifecycleHooks.indexOf('init') > -1;
		Vue.mixin(usesInit ? { init: this.vuexInit } : { beforeCreate: this.vuexInit });
	},
	vuexInit () {
		const options = this.$options;
		// store injection
		if (options.cxVueStore) {
			this.$CXD = options.cxVueStore;
		} else if (options.parent && options.parent.$CXD) {
			this.$CXD = options.parent.$CXD;
		}
	}
};

let cxVueStore = (options = {}) => {
	return new Vue({
		data: options
	});
};

export {
	cxVueStore,
	cxVue
};
