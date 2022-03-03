import axios from 'axios'

let payload = {
    all: 0,
    allAdmin: 0
}

let defaultCart = {
    id: '',
    cart_id: '',
    toping_price: 0,
    price: 0,
    discount: 0,
    quantity: 0,
    subtotal: 0,
    product_image: "",
    product_name: "",
    product_detail: "",
    product_toping: "",
    promo_code: null,
    owner_id: null,
    product_id: null,
    proddetail_id: null,
    toping_id: null,
    shop_id: null,
    assigned_id: null,
    status: "waiting",
    disableButton: false,
    disableSelect: false
}

export default {
    namespaced: true,

    state: {
        count: 0,
        countCustomer: 0,
        data: null,
        cart: {...defaultCart},
        cartList: [],
        all: {...payload}
    },

    getters: {
        count (state) {
            return state.count
        },
        countCustomer (state) {
            return state.countCustomer
        },
        data (state) {
            return state.data 
        },
        all (state) {
            return state.all
        },
        cart (state) {
            return state.cart
        },
        cartList (state) {
            return state.cartList
        }
    },

    mutations: {
        SET_COUNT (state, value) {
            state.count = value
        },
        SET_COUNT_CUSTOMER (state, value) {
            state.countCustomer = value
        },
        SET_DATA (state, value) {
            state.data = value
        },
        SET_ALL (state, value) {
            state.all = value
        },
        SET_CART_LIST (state, value) {
            state.cartList.push(value)
        },
        REPLACE_CART_LIST (state, value) {
            state.cartList = value
        },
        RESET_CART_LIST (state) {
            state.cartList = []
        }
    },

    actions: {
        async setData ({ commit }, data = null) {
            commit('SET_DATA', data)
        },
        async setCartList ({ commit }, data) {
            commit('SET_CART_LIST', data)
        },
        async replaceCartList ({ commit }, data) {
            commit('REPLACE_CART_LIST', data)
        },
        async resetCartList ({ commit }) {
            commit('RESET_CART_LIST')
        },
        async getCountCustomer ({ commit }, token = '') {
            const customerData = $cookies.get('user')
            const payload = {
                owner_id: customerData.id
            }
            return await axios.post('/api/cart/getCountCustomerAll', payload, { headers: { Authorization: token } })
            .then((rest) => {
                const count = rest.data.data
                commit('SET_COUNT_CUSTOMER', count > 0 ? count : 0)
            })
            .catch(() => {
                commit('SET_COUNT_CUSTOMER', 0)
            })
        },
        async getCount ({ commit }, token = '') {
            return await axios.post('/api/cart/getCountAll', {}, { headers: { Authorization: token } })
            .then((rest) => {
                const count = rest.data.data
                commit('SET_COUNT', count.all)
                commit('SET_ALL', count)
            })
            .catch(() => {
                commit('SET_COUNT', 0)
                commit('SET_ALL', payload)
            })
        }
    }
}