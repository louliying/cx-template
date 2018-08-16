// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import MintUI from 'mint-ui';
// import 'reset.css'
// import 'mint-ui/lib/style.css'
{{#router}}
import router from './router';
{{/router}}
import {vuemaxusstore, vuemaxus} from './vuemaxus';
import maxusdata from './utils/maxusdata';
import 'es6-promise/auto';

{{#vuex}}
import store from './store';
{{/vuex}}

Vue.config.productionTip = false;

Vue.use(MintUI);
Vue.use(vuemaxus);

/* eslint-disable no-new */
new Vue({
	el: '#app',
	{{#router}}
	router,
	{{/router}}
	{{#vuex}}
	store,
	{{/vuex}}
	vuemaxusstore: vuemaxusstore(maxusdata),
	components: { App },
	template: '<App/>'
});
