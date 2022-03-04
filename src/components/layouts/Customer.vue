<template>
    <div id="CustomerLayout" class="mobile">
        <div class="navbar-header">
            <div class="navbar-header-content">
                <div class="left">
                    <router-link :to="{name: 'customer-main'}" style="position: relative; width: 100%; top: 3px;">
                        <img :src="logo" alt="SAJI-IN" style="width: 80%;">
                    </router-link>
                </div>
                <div class="right">
                    <div class="header-menu-content display-flex space-between display-mobile">
                        <div></div>
                        <div class="header-menu-list display-flex">
                            <!-- <router-link :to="{name: 'customer-profile'}" class="btn btn-sekunder btn-radius-rounded" style="padding: 9px 12px; margin-top: 2px;">
                                <i class="icn icn-left far fa-lg fa-user" /> {{ dataUser && dataUser.name }}
                            </router-link> -->
                            <button class="btn btn-sekunder btn-radius-rounded" style="padding: 9px 12px; margin-top: 2px;" @click="onLogout">
                                <i class="icn icn-left fa fa-lw fa-power-off" /> Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="body">
            <router-view />
            
            <keep-alive>
                <router-view name="customerKeepAlive" />
            </keep-alive>
        </div>
        <AppToast />
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import logo from '@/assets/img/logo.png'
import logo2 from '@/assets/img/icon.png'
import AppWrapper from '../modules/AppWrapper'
import AppButton from '../modules/AppButton'
import AppMenu from "../modules/AppMenu"
import AppText from "../modules/AppText"
import SearchField from '../modules/SearchField'
import AppToast from '../modules/AppToast'
import AppButtonTable from '../modules/AppButtonTable'
import AppButtonScanQr from '../modules/AppButtonScanQr'

const customer = {
    id: '',
    customer_id: '',
    image: '',
    name: '',
    email: '',
    phone: '',
    about: '',
    status: ''
}

const table = {
    id: '',
    table_id: '',
    image: '',
    name: '',
    code: '',
    description: '',
    status: '',
    is_available: ''
}

const navbar = [
    {label: 'Catalogs', link: 'customer-main'},
    {label: 'How to orders ?', link: 'home'},
    // {label: 'Saji-in', link: 'home'}
]

export default {
    name: 'CustomerLayout',
    data () {
        return {
            visibleMenu: false,
            selectedCustomer: {...customer},
            selectedTable: {...table},
            selectedShop: null,
            dataUser: null,
            logo: logo,
            logo2: logo2,
            navbar: navbar,
            countCart: 0,
            countOrder: 0
        }
    },
    beforeMount (){
        if (!this.$cookies.get('token')) {
            this.$router.push({ name: 'home' })
        }
        if (this.$cookies.get('user').role_name !== 'customer') {
            this.$router.push({ name: 'home' })
        }
    },
    mounted () {
        this.selectedShop = this.$cookies.get('shop')
        // console.log('selectedShop', this.selectedShop)

        const customerData = this.$cookies.get('customer')
        this.setCustomer(customerData)

        this.selectedCustomer = customerData ? customerData : customer
        this.dataUser = this.$cookies.get('user')
        // console.log('dataUser', this.dataUser)

        const tableData = this.$cookies.get('table')
        this.selectedTable = tableData ? tableData : table
        this.setDataTableSelected(this.selectedTable)

        this.countCart = this.cart
        this.countOrder = this.order

        // this.getLocalCartCount()
        // this.getLocalOrderCount()
        // this.getDataTable()
    },
    components: {
        AppButtonScanQr,
        AppButtonTable,
        AppToast,
        AppWrapper,
        AppButton,
        AppMenu,
        AppText,
        SearchField
    },
    methods: {
        ...mapActions({
            removeCookieAuth: 'auth/removeCookieAuth',
            signOut: 'customer/removeData',
            setDataTableSelected: 'table/setData',
            getDataTable: 'table/getData',
            getCount: 'cart/getCountCustomer',
            getCountOrder: 'order/getCountCustomer',
            setCustomer: 'auth/setCustomer'
        }),
        onLogout() {
            var a = confirm('Logout customer ?')
            if (a) {
                this.removeCookieAuth()
                this.signOut()
                this.$router.replace({ name: 'home' })
            }
        },
        onOpenMenu () {
            this.visibleMenu = !this.visibleMenu
        },
        onChangeTable (data) {
            this.getLocalCartCount()
            this.getLocalOrderCount()
            this.$router.push({ name: 'customer-main' })
            // console.log('onChangeTable', data)
        },
        getLocalCartCount () {
            const token = 'Bearer '.concat(this.$cookies.get('token'))
            this.getCount(token)
        },
        getLocalOrderCount () {
            const token = 'Bearer '.concat(this.$cookies.get('token'))
            this.getCountOrder(token)
        }
    },
    computed: {
        ...mapGetters({
            authenticated: 'auth/authenticated',
            user: 'auth/admin',
            permissions: 'auth/permissions',
            token: 'auth/token',
            cart: 'cart/countCustomer',
            order: 'order/countCustomer',
            customer: 'customer/data',
            selectTable: 'table/selected',
            selectShop: 'store/selected'
        })
    },
    watch: {
        cart (props) {
            this.countCart = props
        },
        order (props) {
            this.countOrder = props
        },
        selectTable (props) {
            if (props) {
                this.selectedTable = props
            } else {
                this.selectedTable = null
            }
        },
        selectShop (props) {
            if (props) {
                this.selectedShop = props 
            } else {
                this.selectedShop = null 
            }
        },
        customer (props) {
            if (props) {
                this.selectedCustomer = props
            } else {
                this.selectedCustomer = customer
            }
        }
    }
}

</script>