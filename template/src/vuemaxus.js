import Vue from 'vue';

const vuemaxus = {
  install(Vue) {
    const usesInit = Vue.config._lifecycleHooks.indexOf('init') > -1;
    Vue.mixin(usesInit ?
      { init: this.vuexInit }
      :
      { beforeCreate: this.vuexInit })
  },
  vuexInit() {
    const options = this.$options
    // store injection
    if (options.vuemaxusstore) {
      this.$MD = options.vuemaxusstore
    } else if (options.parent && options.parent.$MD) {
      this.$MD = options.parent.$MD
    }
  }
}

let vuemaxusstore = (options = {}) => {
  return new Vue({
    data: options
  });
};

export {
  vuemaxusstore,
  vuemaxus
};
