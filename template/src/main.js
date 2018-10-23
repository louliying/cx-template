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
import {cxstore, vuecx} from './vuecx';
import cxstoredata from './utils/cxstoredata';
import 'es6-promise/auto';
{{#vuex}}
import store from './store';
{{/vuex}}
import * as Config from './config/index';
console.log('the domain from ucm is:', Config.sDomain);

Config.Interfaces.getInfo().then((data) => {
    console.log('接口的数据是:', data);
});

Vue.config.productionTip = false;

// Vue.use(MintUI);
Vue.use(vuecx);

/* eslint-disable no-new */
new Vue({
	el: '#app',
	{{#router}}
	router,
	{{/router}}
	{{#vuex}}
	store,
	{{/vuex}}
	cxstore: cxstore(cxstoredata),
	components: { App },
	template: '<App/>'
});
