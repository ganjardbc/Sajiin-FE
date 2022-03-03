import axios from 'axios'

export default {
    namespaced: true,

    state: {
        data: false,
        selected: false
    },

    getters: {
        data (state) {
            return state.data
        },
        selected (state) {
            return state.selected
        }
    },

    mutations: {
        SET_DATA (state, value) {
            state.data = value
        },
        SET_SELECTED (state, value) {
            state.selected = value
        }
    },

    actions: {
        async setData ({commit}, data = '') {
            commit('SET_SELECTED', data)
        },
        async getShop ({commit}, payload) {
            const url = '/api/public/shopByID'
            return await axios.post(url, payload)
            .then((res) => {
                if (res && res.status === 200) {
                    const data = res.data.data
                    commit('SET_DATA', data)
                } else {
                    commit('SET_DATA', null)
                }
            })
            .catch(() => {
                commit('SET_DATA', null)
            })
        }
    }
}