import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "axios";

Vue.config.productionTip = false;

axios.defaults.baseURL = "http://localhost:3304";

new Vue({
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
