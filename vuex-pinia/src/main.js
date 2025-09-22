import { createApp } from "vue";
import { createPinia } from "pinia";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from "./App.vue";
import i18n from "./i18n";
// 导入 Vuex store
import store from "./store-vuex";

const app = createApp(App);

// 挂载 Vuex store
app.use(store);
app.use(i18n);
app.use(ElementPlus)
// 挂载 Pinia
app.use(createPinia());

app.mount("#app");
