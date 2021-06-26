import axios from 'axios'

let payload = {
    all: 0,
    allAdmin: 0
}

export default {
    namespaced: true,

    state: {
        count: 0,
        countCustomer: 0,
        data: null,
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
        }
    },

    actions: {
        async setData ({ commit }, data = null) {
            commit('SET_DATA', data)
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
                console.log('getCountCustomerCart => ', count)
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

                console.log('count card', count)
            })
            .catch(() => {
                commit('SET_COUNT', 0)
                commit('SET_ALL', payload)
            })
        }
    }
}