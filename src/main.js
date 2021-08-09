import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from "element-plus";
import 'element-plus/lib/el-collapse';
import 'element-plus/lib/el-collapse-item';
import 'element-plus/lib/el-collapse-transition';
import 'element-plus/lib/el-radio';
// import VueGoogleMaps from '@fawmi/vue-google-maps';



const app = createApp(App);

app.use(router);
app.use(store);
app.use(ElementPlus);
// app.use(VueGoogleMaps, {
//     load: {
//         key: process.env.GOOGLE_MAPS_API_KEY,
//     }
// });
app.mount('#app');
