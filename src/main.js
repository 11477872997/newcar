import Vue from 'vue'
import App from '@/App.vue'
Vue.config.productionTip = false;
import "@/start/css/index.css";
// pc端ui
import elementui from "../src/start/js/elementui.js"
Vue.use(elementui);
// 移动端ui
//vant ui
import vantUI from '../src/start/js/vantui.js';
Vue.use(vantUI);

//移动端图表
import F2 from '@antv/f2';
Vue.prototype.F2 = F2;

import router from '@/router/index.js';
import store from '@/store/index.js';
// pc端图表
import VeHistogram from 'v-charts/lib/histogram.common'
import VePie from 'v-charts/lib/pie.common'
Vue.component(VeHistogram.name, VeHistogram);
Vue.component(VePie.name, VePie);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
