window.Vue = require('vue');
 
import App from './components/App.vue';
import VueRouter from 'vue-router';
import VueAxios from 'vue-axios';
import VueCookies from 'vue-cookies';
import Vuex from 'vuex';
import axios from 'axios';
import {routes} from './router';
import store from './store';
import SmartTable from 'vuejs-smart-table';
import jquery from 'jquery';
import VueSocketIO from 'vue-socket.io';
import SocketIo from 'socket.io-client';
import VueQrcodeReader from "vue-qrcode-reader";
import "./assets/sass/app.css";
import "./assets/icons/fontawesome/css/all.min.css";
import Vue from 'vue';

const url = window.location.protocol+'//'+window.location.host;
const socket = "https://sajiin-socket-v1.herokuapp.com";
const api = "http://localhost:8000"; 
// const api = "https://kebunbegonialembang.com/sajiin-api/public/";
const deploy = "https://ganjardbc.github.io/Sajiin-FE/";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = api;

window.$ = jquery;

Vue.use(require('vue-moment'));
Vue.use(VueQrcodeReader);
Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(VueAxios, axios);
Vue.use(VueCookies);
Vue.use(SmartTable);
Vue.use(new VueSocketIO({
    debug: true,
    connection: SocketIo(socket)
}));


Vue.$cookies.config('30d');
Vue.prototype.deployUrl = deploy;
Vue.prototype.apiUrl = api;
Vue.prototype.initUrl = url;
Vue.prototype.socketUrl = socket;
Vue.prototype.adminImageThumbnailUrl = api + '/contents/users/thumbnails/';
Vue.prototype.adminImageCoverUrl = api + '/contents/users/covers/';
Vue.prototype.benefitImageThumbnailUrl = api + '/contents/benefits/thumbnails/';
Vue.prototype.benefitImageCoverUrl = api + '/contents/benefits/covers/';
Vue.prototype.productImageThumbnailUrl = api + '/contents/products/thumbnails/';
Vue.prototype.productImageCoverUrl = api + '/contents/products/covers/';
Vue.prototype.articleImageThumbnailUrl = api + '/contents/articles/thumbnails/';
Vue.prototype.articleImageCoverUrl = api + '/contents/articles/covers/';
Vue.prototype.categoryImageThumbnailUrl = api + '/contents/categories/thumbnails/';
Vue.prototype.categoryImageCoverUrl = api + '/contents/categories/covers/';
Vue.prototype.topingImageThumbnailUrl = api + '/contents/topings/thumbnails/';
Vue.prototype.topingImageCoverUrl = api + '/contents/topings/covers/';
Vue.prototype.paymentImageThumbnailUrl = api + '/contents/payments/thumbnails/';
Vue.prototype.paymentImageCoverlUrl = api + '/contents/payments/covers/';
Vue.prototype.shipmentImageThumbnaiUrl = api + '/contents/shipments/thumbnails/';
Vue.prototype.shipmentImageCoverUrl = api + '/contents/shipments/covers/';
Vue.prototype.customerImageThumbnailUrl = api + '/contents/customers/thumbnails/';
Vue.prototype.customerImageCoverUrl = api + '/contents/customers/covers/';
Vue.prototype.tableImageThumbnailUrl = api + '/contents/tables/thumbnails/';
Vue.prototype.tableImageCoverUrl = api + '/contents/tables/covers/';
Vue.prototype.feedbackImageThumbnailUrl = api + '/contents/feedbacks/thumbnails/';
Vue.prototype.feedbackImageCoverUrl = api + '/contents/feedbacks/covers/';
Vue.prototype.shopImageThumbnailUrl = api + '/contents/shops/thumbnails/';
Vue.prototype.shopImageCoverUrl = api + '/contents/shops/covers/';
Vue.prototype.employeeImageThumbnailUrl = api + '/contents/employees/thumbnails/';
Vue.prototype.employeeImageCoverUrl = api + '/contents/employees/covers/';
Vue.prototype.shiftImageThumbnailUrl = api + '/contents/shifts/thumbnails/';
Vue.prototype.shiftImageCoverUrl = api + '/contents/shifts/covers/';

const token = Vue.$cookies.get('token'); 
const router = new VueRouter({
    // mode: 'history',
    routes: routes,
    base: process.env.BASE_URL,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {x: 0, y: 0}
        }
    }
});
 
const app = new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App),
});

store.dispatch('auth/me', token).then(() => {
    app
});