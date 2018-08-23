// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
// import MintUI from 'mint-ui';
// import 'reset.css'
// import 'mint-ui/lib/style.css'
{{#router}}
import router from './router';
{{/router}}
import {cxVue, cxVueStore} from './cxstore';
import cxStoreData from './utils/cxstoredata';
import 'es6-promise/auto';
{{#vuex}}
import store from './store';
{{/vuex}}
import * as Config from './config/index';
console.log('the domain from ucm is:', Config.sDomain);

Vue.config.productionTip = false;

// Vue.use(MintUI);
Vue.use(cxVue);

/* eslint-disable no-new */
new Vue({
	el: '#app',
	{{#router}}
	router,
	{{/router}}
	{{#vuex}}
	store,
	{{/vuex}}
	cxVueStore: cxVueStore(cxStoreData),
	components: { App },
	template: '<App/>'
});
