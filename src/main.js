// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueLazyLoad from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'
import {currency} from './util/currency'
import {toDate} from './util/toDate'
import {simpleDate} from './util/simpleDate'
import * as filters from './util/timeAgoFilter'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'

Vue.filter('currency',currency);
Vue.filter('toDate',toDate);
Vue.filter('simpleDate', simpleDate);
Vue.filter('timeAgo', filters.timeAgo);
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueLazyLoad,{
  loading: "/static/loading-svg/loading-bars.svg"
});
Vue.use(infiniteScroll);


//axios拦截过期token

if (store.state.auth.token) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + store.state.auth.token;
} else {
  console.log('没有token')
}

axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (error.response.data == "token expired") {
    store.commit("DELETE_TOKEN")
  }
  return Promise.reject(error);
});

console.log(`token: ${store.state.auth.token}`);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
