import axios from 'axios'

export default {
    namespaced: true,

    state: {
        data: null  
    },

    getters: {
        data (state) {
            return state.data
        }
    },

    mutations: {
        SET_DATA (state, value) {
            state.data = value
        }
    },

    actions: {
        async removeData ({ commit }) {
            $cookies.remove('customer')
            $cookies.remove('orderItem')
            commit('SET_DATA', null)
        },
        async setData ({ commit }, data) {
            $cookies.set('customer', data)
            commit('SET_DATA', data)
        }
    }
}