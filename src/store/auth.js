import axios from 'axios'

export default {
  namespaced: true,

  state: {
    authenticated: false,
    admin: null,
    user: null,
    customer: null,
    role: null,
    rolename: null,
    permissions: null,
    token: null,
    shop: null,
    employee: null 
  },

  getters: {
    authenticated (state) {
      return state.authenticated
    },

    admin (state) {
      return state.admin
    },
    
    user (state) {
      return state.user
    },

    customer (state) {
      return state.customer
    },

    role (state) {
      return state.role
    },

    rolename (state) {
      return state.rolename
    },

    permissions (state) {
      return state.permissions
    },

    token (state) {
      return state.token
    },

    shop (state) {
      return state.shop
    },

    employee (state) {
      return state.employee
    }
  },

  mutations: {
    SET_AUTHENTICATED (state, value) {
      state.authenticated = value
    },

    SET_ADMIN (state, value) {
      state.admin = value
    },
    
    SET_USER (state, value) {
      state.user = value
    },

    SET_CUSTOMER (state, value) {
      state.customer = value
    },

    SET_ROLE (state, value) {
      state.role = value
    },

    SET_ROLENAME (state, value) {
      state.rolename = value
    },

    SET_PERMISSIONS (state, value) {
      state.permissions = value
    },

    SET_TOKEN (state, value) {
      state.token = value
    },

    SET_SHOP (state, value) {
      state.shop = value
    },

    SET_EMPLOYEE (state, value) {
      state.employee = value
    }
  },

  actions: {
    token ({ commit }, token) {
      commit('SET_TOKEN', token)
    },

    setCustomer ({ commit }, data = '') {
      commit('SET_CUSTOMER', data)
      $cookies.set('customer', data)
    },

    setUser ({ commit }, data = '') {
      commit('SET_USER', data)
      $cookies.set('user', data)
    },

    setCookieCustomerAuth ({commit}, data) {
      const AuthStr = 'Bearer '.concat(data.token)

      $cookies.set('authenticated', true)
      $cookies.set('token', data.token)
      $cookies.set('admin', data.user)
      $cookies.set('role_name', 'customer')
      $cookies.set('rawUser', data)
      $cookies.set('customer', data.customer)

      commit('SET_AUTHENTICATED', true)
      commit('SET_ADMIN', data && data.user)
      commit('SET_ROLENAME', 'customer')
      commit('SET_TOKEN', AuthStr)
      commit('SET_CUSTOMER', data && data.customer)
    },

    removeCookieCustomerAuth ({commit}) {
      $cookies.remove('authenticated')
      $cookies.remove('token')
      $cookies.remove('admin')
      $cookies.remove('role_name')
      $cookies.remove('rawUser')
      $cookies.remove('table')
      $cookies.remove('shop')

      commit('SET_AUTHENTICATED', false)
      commit('SET_ADMIN', null)
      commit('SET_ROLENAME', null)
      commit('SET_TOKEN', null)
      commit('SET_CUSTOMER', null)
    },

    setCookieAuth ({commit}, data) {
      const AuthStr = 'Bearer '.concat(data.token)
      const permissions = data ? {permissions: [...data.permissions]} : null 

      $cookies.set('authenticated', true)
      $cookies.set('token', data.token)
      $cookies.set('user', data.user)
      $cookies.set('role', data.role)
      $cookies.set('role_name', data.role.role_name)
      $cookies.set('permissions', permissions)
      $cookies.set('rawUser', data)
      $cookies.set('shop', data && data.shop && data.shop[0])
      $cookies.set('employee', data.employee)

      commit('SET_AUTHENTICATED', true)
      commit('SET_USER', data && data.user)
      commit('SET_ROLE', data && data.role)
      commit('SET_PERMISSIONS', data && data.permissions)
      commit('SET_TOKEN', AuthStr)
      commit('SET_SHOP', data && data.shop && data.shop[0])
      commit('SET_EMPLOYEE', data && data.employee)
    },

    removeCookieAuth ({commit}) {
      $cookies.set('authenticated', false)
      $cookies.remove('token')
      $cookies.remove('user')
      $cookies.remove('role')
      $cookies.remove('role_name')
      $cookies.remove('permissions')
      $cookies.remove('rawUser')
      $cookies.remove('orderItem')
      $cookies.remove('orderTable')
      $cookies.remove('orderPayment')
      $cookies.remove('customer')
      $cookies.remove('shop')
      $cookies.remove('employee')

      commit('SET_AUTHENTICATED', false)
      commit('SET_USER', null)
      commit('SET_ROLE', null)
      commit('SET_PERMISSIONS', null)
      commit('SET_TOKEN', null),
      commit('SET_EMPLOYEE', null)
    },

    async register ({ dispatch }, credentials) {
      // const csrf = await axios.get('/sanctum/csrf-cookie')
      const rest = await axios.post('/api/auth/register', credentials)

      return rest
    },

    async signIn ({ dispatch }, credentials) {
      // const csrf = await axios.get('/sanctum/csrf-cookie')
      const rest = await axios.post('/api/auth/login', credentials)

      dispatch('token', rest.data.data.token)
      dispatch('me', rest.data.data.token)

      return rest
    },
  
    async signOut ({ dispatch }, token = '') {
      const rest = await axios.post('/api/logout', {token: token} , { headers: { Authorization: token } })

      return rest
    },

    async getAdmin ({ commit }, token = '') {
      const AuthStr = 'Bearer '.concat(token)
      const response = await axios.get('/api/me', { headers: { Authorization: AuthStr } })
      if (response) {
        const data = response.data.data
        commit('SET_AUTHENTICATED', true)
        commit('SET_ADMIN', data && data.user)
        commit('SET_TOKEN', AuthStr)
        commit('SET_CUSTOMER', null)
      } else {
        commit('SET_AUTHENTICATED', false)
        commit('SET_ADMIN', false)
        commit('SET_TOKEN', null)
        commit('SET_CUSTOMER', null)
      } 
      return response
    },
    
    async me ({ commit }, token = '') {
      const AuthStr = 'Bearer '.concat(token)
      const response = await axios.get('/api/me', { headers: { Authorization: AuthStr } })

      if (response) {
        const data = response.data.data
        const permissions = data ? {permissions: [...data.permissions]} : null 

        commit('SET_AUTHENTICATED', true)
        commit('SET_TOKEN', AuthStr)

        $cookies.set('permissions', permissions)

        if ($cookies.get('role_name') !== 'customer') {
          commit('SET_PERMISSIONS', data && data.permissions)
          commit('SET_ROLE', data && data.role)
          commit('SET_ROLENAME', data && data.role.role_name)
          commit('SET_USER', data && data.user)
          commit('SET_SHOP', data && data.shop[0])
        } else {
          commit('SET_ADMIN', data && data.user)
          commit('SET_ROLENAME', 'customer')
        }
      } else {
        commit('SET_AUTHENTICATED', false)
        commit('SET_USER', null)
        commit('SET_ADMIN', null)
        commit('SET_ROLENAME', null)
        commit('SET_ROLE', null)
        commit('SET_PERMISSIONS', null)
        commit('SET_TOKEN', null)
        commit('SET_STHOP', null)

        $cookies.remove('permissions')
      }
    }
  }
}