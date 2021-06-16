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
        async getData ({ commit }) {
            const token = 'Bearer '.concat($cookies.get('token'))
            const dataUser = $cookies.get('admin')
            const payload = {
                limit: 1000,
                offset: 0,
                status: 'active',
                user_id: dataUser.id
            }
            return await axios.post('/api/table/getAll', payload, { headers: { Authorization: token } })
            .then((rest) => {
                if (rest && rest.status === 200) {
                    const data = rest.data.data
                    commit('SET_DATA', data)
                } else {
                    commit('SET_DATA', null)
                }
                // console.log('table', rest)
            })
            .catch(() => {
                commit('SET_DATA', null)
            })
        }
    }
}