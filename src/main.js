import Vue from 'vue'
import App from "./App";
import StockPage from "../src/views/StockPage.vue";
import CurrencyEXPage from "../src/views/CurrencyEXPage.vue"
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import axios from 'axios'
import VueRouter from 'vue-router'

//styles 
import "../src/assets/sass/main.scss";


// for better use we should separate them into another file 
const routes = [
	{ path: '/stock', component: StockPage },
	{ path: '/currencyEX', component: CurrencyEXPage },
];
const router = new VueRouter({ routes, mode: "history" });


Vue.use(VueRouter)
Vue.use(axios)
Vue.config.productionTip = false


new Vue({
	render: h => h(App),
	router,
}).$mount('#app')
