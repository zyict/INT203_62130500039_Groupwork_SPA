import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import BodyCard from './components/BodyCard.vue'

const app = createApp(App)
app.component('body-card', BodyCard)
app.use(router).mount('#app')