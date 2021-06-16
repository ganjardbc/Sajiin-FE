import axios from 'axios'

export default {
    namespaced: true,

    state: {
        title: '',
        subtitle: '',
        visible: false 
    },

    getters: {
        visible (state) {
            return state.visible
        },
        title (state) {
            return state.title
        },
        subtitle (state) {
            return state.subtitle
        }
    },

    mutations: {
        SET_TOAST (state, value) {
            state.title = value.title ? value.title : state.title
            state.subtitle = value.subtitle ? value.subtitle : state.subtitle
            state.visible = value.visible
        }
    },

    actions: {
        setToast ({ commit }, status) {
            commit('SET_TOAST', status)
        }
    }
}