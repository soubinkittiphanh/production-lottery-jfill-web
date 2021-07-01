import { createApp } from "vue";
import App from "./App.vue";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from "./store/index.js";
import router from "./router.js";
import DrawerLayout from 'vue-drawer-layout'
const app=createApp(App);
app.use(DrawerLayout);
app.use(store);
app.use(router);
app.mount("#app");
