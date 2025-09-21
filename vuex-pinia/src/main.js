import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

// 导入 Vuex store
import store from "./store-vuex";

const app = createApp(App);

// 挂载 Vuex store
app.use(store);

// 挂载 Pinia
app.use(createPinia());

app.mount("#app");
