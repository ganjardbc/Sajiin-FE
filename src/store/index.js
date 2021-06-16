import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import cart from './cart'
import toast from './toast'
import order from './order'
import wishelist from './wishelist'
import customer from './customer'
import table from './table'
import store from './store'
import toastmessage from './toastmessage'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    cart,
    toast,
    wishelist,
    order,
    customer,
    table,
    store,
    toastmessage
  }
})