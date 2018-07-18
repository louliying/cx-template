import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/Hello';
import Index from '@/page/index/index';
// import List from '@/components/List'
const List = resolve => require(['@/components/List'], resolve);

Vue.use(Router);

export default new Router({
  // mode: 'history',
  // base:"/cx/cxj/cxjappweb/yearFeedback",
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/list',
      name: 'List',
      component: List
    }
  ]
});
