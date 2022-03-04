import axios from 'axios'

let payload = {
    all: 0,
    allAdmin: 0,
    canceled: 0,
    confirmed: 0,
    cooking: 0,
    done: 0,
    packing: 0,
    shipping: 0,
    unconfirmed: 0
}

let defaultPayload = {
    id: 0,
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
    order_id: 0,
    product_id: 0,
    proddetail_id: 0,
    toping_id: 0,
    shop_id: 0,
    assigned_id: 0,
    status: "waiting"
}

export default {
    namespaced: true,

    state: {
        count: 0,
        countCustomer: 0,
        all: {...payload},
        allCustomer: {...payload},
        order: {...defaultPayload},
        orderList: [],
    },

    getters: {
        count (state) {
            return state.count
        },
        countCustomer (state) {
            return state.countCustomer
        },
        all (state) {
            return state.all
        },
        allCustomer (state) {
            return state.allCustomer
        },
        order (state) {
            return state.order
        },
        orderList (state) {
            return state.orderList
        }
    },

    mutations: {
        SET_COUNT (state, value) {
            state.count = value
        },
        SET_COUNT_CUSTOMER (state, value) {
            state.countCustomer = value
        },
        SET_ALL (state, value) {
            state.all = value
        },
        SET_ALL_CUSTOMER (state, value) {
            state.allCustomer = value
        },
        SET_ORDER (state, value) {
            state.order = value 
        },
        SET_ORDER_LIST (state, value) {
            state.orderList = value
        }
    },

    actions: {
        setOrder ({ commit }, data) {
            commit('SET_ORDER', data)
        },
        setOrderList ({ commit }, data) {
            commit('SET_ORDER_LIST', data)
        },
        async getCountCustomer ({ commit }, token = '') {
            const customerData = $cookies.get('user')
            const payload = {
                owner_id: customerData.id
            }
            return await axios.post('/api/order/getCountCustomerByID', payload, { headers: { Authorization: token } })
            .then((rest) => {
                const count = rest.data.data
                const newPayload = {
                    ...payload,
                    all: count.all,
                    allAdmin: count.allAdmin,
                    canceled: count.canceled,
                    confirmed: count.confirmed,
                    cooking: count.cooking,
                    done: count.done,
                    packing: count.packing,
                    shipping: count.shipping,
                    unconfirmed: count.unconfirmed
                }

                console.log('getCountCustomerOrder => ', rest)

                commit('SET_COUNT_CUSTOMER', count.all)
                commit('SET_ALL_CUSTOMER', newPayload)
            })
            .catch(() => {
                commit('SET_COUNT_CUSTOMER', 0)
                commit('SET_ALL_CUSTOMER', payload)
            })
        },
        async getCount ({ commit }, token = '') {
            const shopData = $cookies.get('shop')
            const payload = {
                shop_id: shopData.id
            }
            return await axios.post('/api/order/getCountByStatus', payload, { headers: { Authorization: token } })
            .then((rest) => {
                const count = rest.data.data
                const newPayload = {
                    ...payload,
                    all: count.all,
                    allAdmin: count.allAdmin,
                    canceled: count.canceled,
                    confirmed: count.confirmed,
                    cooking: count.cooking,
                    done: count.done,
                    packing: count.packing,
                    shipping: count.shipping,
                    unconfirmed: count.unconfirmed
                }

                commit('SET_COUNT', count.all)
                commit('SET_ALL', newPayload)
            })
            .catch(() => {
                commit('SET_COUNT', 0)
                commit('SET_ALL', payload)
            })
        }
    }
}