import axios from 'axios'

export default {
    namespaced: true,

    state: {
        status: false 
    },

    getters: {
        status (state) {
            return state.status
        }
    },

    mutations: {
        SET_STATUS (state, value) {
            state.status = value
        }
    },

    actions: {
        async deleteStatus ({ commit }, data) {
            const payload = {
                user_id: data.user_id,
                product_id: data.product_id
            }
            return await axios.post('/api/wishelist/delete', payload, { headers: { Authorization: data.token } })
            .then((rest) => {
                if (rest && rest.status === 200) {
                    commit('SET_STATUS', false)
                } else {
                    commit('SET_STATUS', true)
                }
            })
            .catch(() => {
                commit('SET_STATUS', true)
            })
        },
        async postStatus ({ commit }, data) {
            const customerData = $cookies.get('customer')
            const payload = {
                owner_id: customerData ? customerData.id : 0,
                user_id: data.user_id,
                product_id: data.product_id
            }
            return await axios.post('/api/wishelist/post', payload, { headers: { Authorization: data.token } })
            .then((rest) => {
                if (rest && rest.status === 200) {
                    commit('SET_STATUS', true)
                } else {
                    commit('SET_STATUS', false)
                }
            })
            .catch(() => {
                commit('SET_STATUS', false)
            })
        },
        async getStatus ({ commit }, data) {
            const customerData = $cookies.get('customer')
            const payload = {
                owner_id: customerData ? customerData.id : 0,
                user_id: data.user_id,
                product_id: data.product_id
            }
            return await axios.post('/api/wishelist/checkWisheList', payload, { headers: { Authorization: data.token } })
            .then((rest) => {
                if (rest && rest.status === 200) {
                    const data = rest.data.status
                    if (data === 'choosed') {
                        commit('SET_STATUS', true)
                    } else {
                        commit('SET_STATUS', false)
                    }
                }
            })
            .catch(() => {
                commit('SET_STATUS', false)
            })
        },
        async setStatus ({ commit }, data) {
            commit('SET_STATUS', data)
        }
    }
}