import Vue from 'vue'
import App from './App'
import store from './store' // store
import plugins from './plugins' // plugins
import uView from '@/uni_modules/uview-ui'
import './permission' // permission
import common from './utils/base.js'
import DictData from '@/components/dict/init'
import DictTag from '@/components/dict/DictTag'
import $mHelper from '@/utils/helper'
import globalConfig from './config'
import commonView from './components/common-view.vue'

Vue.prototype.$mHelper = $mHelper
Vue.prototype.globalConfig = globalConfig
Vue.use(plugins)
Vue.use(uView)
Vue.component('DictTag', DictTag)
Vue.component('commonView', commonView)
Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.base=common;
DictData.install()
Vue.prototype.$toast = function(message,duration) {
	uni.showToast({
		icon: "none",
		title: message,
		duration:duration||2000
	})
}
App.mpType = 'app'

const app = new Vue({
  ...App
})

app.$mount()