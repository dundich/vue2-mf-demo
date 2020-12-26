import Vue from "vue";
import App from "./App.vue";
import router from "./router";


// const Content = (() => import("home/Content")); // defineAsyncComponent(() => import("home/Content"));
// const Button = (() => import("home/Button")); // defineAsyncComponent(() => import("home/Button"));

new Vue({
  // comments: {
  //   "content-element": Content,
  //   "button-element": Button
  // },
  router,
  render: (h) => h(App),
}).$mount("#app");
