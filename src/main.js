import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import Routes from "./routes";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(ElementUI);
Vue.use(VueRouter);

const router = new VueRouter({
  routes: Routes
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
