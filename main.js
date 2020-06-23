import Vue from 'vue'
import App from './App'
import 'static/index.scss'
import 'static/icon/iconfont.css'
import store from './store';
import tui from './utils/httpRequest.js';

Vue.config.productionTip = false
// #ifdef H5
window.QQmap = null;
// #endif
Vue.prototype.tui = tui
Vue.prototype.$eventHub = Vue.prototype.$eventHub || new Vue()
Vue.prototype.$store = store
App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
