import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//importacion de bootstrap y fontawesome para su correcto funcinamiento en toda la aplicacion
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
import '@fortawesome/fontawesome-free/css/all.min.css';



createApp(App).use(store).use(router).mount('#app')
//importacion de popper para bootstrap
//import 'bootstrap/dist/js/bootstrap';
