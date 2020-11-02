import Vue from 'vue'
import App from './App.vue'
import router from "@/router";
import store from "@/store";
import toast from "@/components/common/toast";
import fastclick from 'fastclick'
import VueLazyload from "vue-lazyload";

Vue.config.productionTip = false
//添加事件总线
Vue.prototype.$bus = new Vue();
//当使用vue.use时实际是去执行toast.install函数，并自动传递Vue
Vue.use(toast);
Vue.use(VueLazyload,{
    //占位图
    loading: require('./assets/img/common/placeholder.png')
});
//解决移动端300ms的延迟问题
fastclick.attach(document.body);
new Vue({
  render: h => h(App),
    router,
    store
}).$mount('#app')
