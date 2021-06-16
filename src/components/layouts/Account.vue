<template>
    <div id="App" class="main-screen" style="padding-top: 10px;">
        <router-view />
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import AppTabs from '../modules/AppTabs'
import AppButton from '../modules/AppButton'
import AppListMenu from '../modules/AppListMenu'
import AppShowHide from '../modules/AppShowHide'

const sidebarCustomer = [
    {icon: 'fa fa-lg fa-home', label: 'Home', value: 0, link: 'customer-home'},
    // {icon: 'fa fa-lg fa-list-ol', label: 'Orders', value: 0, link: 'customer-order'},
    {icon: 'fa fa-lg fa-star', label: 'Feedbacks', value: 0, link: 'customer-feedback'},
    {icon: 'fa fa-lg fa-heart', label: 'Wiselists', value: 0, link: 'customer-whiselist'}
]

export default {
    name: 'App',
    data () {
        return {
            sidebar: sidebarCustomer,
            selectedCustomer: null,
            dataUser: null,
            dataOrder: null,
            isSidebarSmall: false
        }
    },
    mounted () {
        this.selectedCustomer = this.$cookies.get('customer')
        this.dataOrder = this.$cookies.get('orderItem')
        this.dataUser = this.$cookies.get('user')
        this.sidebar[0].value = this.order
    },
    components: {
        AppShowHide,
        AppListMenu,
        AppTabs,
        AppButton,
    },
    methods: {
        ...mapActions({
            removeCookieAuth: 'auth/removeCookieCustomerAuth',
            signOut: 'customer/removeData'
        }),
        onLogout() {
            var a = confirm('Logout customer ?')
            if (a) {
                this.removeCookieAuth()
                this.signOut()
                this.$router.push({ name: 'home' })
                // this.$router.push({ name: 'customer-main' })
                // window.location = this.initUrl
            }
        },
        onBuilded () {
            alert('still builded !')
        }
    },
    computed: {
        ...mapGetters({
            authenticated: 'auth/authenticated',
            user: 'auth/user',
            token: 'auth/token',
            order: 'order/countCustomer'
        })
    },
    watch: {
        order (props) {
            this.sidebar[0].value = props
        }
    }
}
</script>
