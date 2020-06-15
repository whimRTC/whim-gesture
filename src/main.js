import Vue from "vue";
import App from "./App.vue";
import whimClientVue from "whim-client-vue";
import "whim-client-vue/dist/whim-client-vue.css";
import "./assets/main.scss";

Vue.config.productionTip = false;
Vue.use(whimClientVue);

// settings for debug
// let recaptchaScript = document.createElement("script");
// recaptchaScript.setAttribute("src", "http://localhost:8098");
// document.head.appendChild(recaptchaScript);

new Vue({
  render: h => h(App)
}).$mount("#app");
