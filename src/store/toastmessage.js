import axios from 'axios'

export default {
    namespaced: true,

    state: {
        data: [],
        title: '',
        subtitle: '',
        visible: false 
    },

    getters: {
        data (state) {
            return state.data
        },
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
        },
        SET_DATA_TOAST (state, value) {
            state.data = value
        },
        SET_MULTIPLE_TOAST (state, value) {
            state.data.unshift({
                id: value.id ? value.id : '',
                title: value.title ? value.title : state.title,
                subtitle: value.subtitle ? value.subtitle : state.subtitle,
                visible: value.visible
            })
        }
    },

    actions: {
        setToast ({ commit }, status) {
            commit('SET_TOAST', status)
        },
        setDataToast ({ commit }, data) {
            commit('SET_DATA_TOAST', data)
        },
        setMultipleToast ({ commit }, data) {
            commit('SET_MULTIPLE_TOAST', data)
        }
    }
}