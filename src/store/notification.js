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
        data: null
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
        }
    },

    actions: {
        async setData ({ commit }, data = null) {
            commit('SET_DATA', data)
        },
        async getCount ({ commit }, token = '') {
            return await axios.post('/api/notification/getCountAll', {}, { headers: { Authorization: token } })
            .then((rest) => {
                const data = rest.data.data
                commit('SET_COUNT', data)
            })
            .catch(() => {
                commit('SET_COUNT', 0)
            })
        }
    }
}