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
import visitor from './visitor'
import toastmessage from './toastmessage'
import notification from './notification'

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
    visitor,
    toastmessage,
    notification
  }
})