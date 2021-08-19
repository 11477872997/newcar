import Vue from 'vue'
import App from '@/App.vue'
Vue.config.productionTip = false;
import "@/start/css/index.css";
// pc端ui
import elementui from "../src/start/js/elementui.js"
Vue.use(elementui);
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
