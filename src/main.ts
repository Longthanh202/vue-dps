import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@fortawesome/fontawesome-free/css/all.css'
import swal from 'sweetalert';

const app = createApp(App)

app.use(router)

app.mount('#app')
