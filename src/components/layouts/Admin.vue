<template>
    <div id="admin">
        <div :class="showBar ? 'sidebar show' : 'sidebar show'">
            <div class="header header-left">
                <div class="width width-84-px">
                    <router-link :to="{name: 'home'}" class="logo">
                        <img :src="logo" alt="SAJI-IN" style="width: 100%;">
                    </router-link>
                </div>
            </div>
            <div class="content display-flex column center display-mobile">
                <AppListMenu 
                    :data.sync="sidebar" 
                    :showBar.sync="showBar"
                />
            </div>
            <div class="header header-right">
                <AppPopupProfile 
                    :dataUser.sync="dataUser"
                    :notif.sync="countNotif" />
            </div>
        </div>
        <div class="main">
            <div class="main-content">
                <div class="main-content-smalls">
                    <router-view />
                    <router-view name="adminfresh" />
                </div>
            </div>
        </div>

        <AppToast />

        <AppToastMessage />
    </div>
</template>

<script>
import axios from 'axios'
import { mapGetters, mapActions } from 'vuex'
import VueLoadImage from 'vue-load-image'
import AppListMenu from '../modules/AppListMenu'
import logo from '@/assets/img/logo.png'
import icon from '@/assets/img/icon.png'
import AppToast from '../modules/AppToast'
import AppToastMessage from '../modules/AppToastMessage'
import AppButtonMenu from '../modules/AppButtonMenu'
import AppButtonQR from '../modules/AppButtonQR'
import AppPopupProfile from '../modules/AppPopupProfile'

const sidebarAdmin = [
    {icon: 'fa fa-lg fa-database', label: 'DASHBOARD', value: 0, menu: [
        {icon: 'fa fa-lg fa-tachometer-alt', label: 'Dashboard', value: 0, link: 'dashboard', permission: 'dashboard'},
        {icon: 'fa fa-lg fa-laptop', label: 'Cashier', value: 0, link: 'cashier', permission: 'cashier'},
        {icon: 'fa fa-lg fa-list-ul', label: 'Orders', value: 0, link: 'orderlist', permission: 'orders'},
        {icon: 'fa fa-lg fa-calendar-check', label: 'Task Lists', value: 0, link: 'admin-tasklist', permission: 'tasklists'},
        {icon: 'fa fa-lg fa-utensils', label: 'Products', value: 0, link: 'admin-product', permission: 'products'},
        {icon: 'fa fa-lg fa-store', label: 'Shop', value: 0, link: 'admin-shop', permission: 'shops'},
        {icon: 'fa fa-lg fa-users', label: 'Employees', value: 0, link: 'admin-employee', permission: 'employees'},
        {icon: 'fa fa-lg fa-cogs', label: 'Settings', value: 0, link: 'admin-setting', permission: 'users'},
        {icon: 'fa fa-lg fa-bell', label: 'Notifications', value: 0, link: 'notification', permission: 'notifications'},
    ]},
]

export default {
    name: 'admin',
    data () {
        return {
            visibleLoader: false,
            logo: logo,
            icon: icon,
            countNotif: 0,
            sidebar: sidebarAdmin,
            showBar: false,
            classSidebar: 'sidebar smalls',
            classSidebarMenu: 'menu-list hover with-icon smalls',
            dataUser: null,
            dataShops: null,
            menuShops: [],
            selectedLabel: 'CREATE SHOP',
            selectedShop: null,
            selectedEmployee: null,
            code: null
        }
    },
    beforeMount (){
        if (!this.$cookies.get('token')) {
            this.$router.push({ name: 'home' })
        }
        // if (this.$cookies.get('user').role_name === 'customer') {
        //     this.$router.push({ name: 'home' })
        // }
    },
    mounted () {
        this.dataUser = this.user ? this.user : this.$cookies.get('user')
        this.selectedEmployee = this.employee ? this.employee : this.$cookies.get('employee')
        this.selectedShop = this.choosedShop ? this.choosedShop : this.$cookies.get('shop')
        this.selectedLabel = this.selectedShop ? this.selectedShop.name : 'CHOOSE SHOP'
        this.code = this.deployUrl + (this.$router.mode === 'hash' ? '#' : '') + '/generate-customer/' + (this.selectedShop ? this.selectedShop.shop_id : token)
        this.countNotif = this.notifs ? this.notifs : 0
        this.onSetNotif('notifications', this.countNotif)
        this.getShop()
        this.getLocalNotifCount()
        this.getLocalOrderCount()
    },
    components: {
        VueLoadImage,
        AppPopupProfile,
        AppButtonQR,
        AppButtonMenu,
        AppToastMessage,
        AppToast,
        AppListMenu
    },
    methods: {
        ...mapActions({
            setData: 'store/setData',
            setToast: 'toast/setToast',
            setMultipleToast: 'toastmessage/setMultipleToast',
            getCountCart: 'cart/getCount',
            getCountOrder: 'order/getCount',
            getCountNotif: 'notification/getCount'
        }),
        onChangeMenu (data) {
            this.selectedLabel = this.menuShops[data].label
            this.selectedShop = this.dataShops[data]
            this.setSelectedShop(this.selectedShop)
        },
        setSelectedShop (data) {
            this.setData(data)
            this.getLocalOrderCount()
            this.makeToast('Shop Moved to ' + data.name)
        },
        makeToast (title, subtitle) {
            const time = new Date().getTime()
            const payload = {
                visible: true,
                title: title,
                subtitle: subtitle
            }
            this.setToast(payload)
        },
        makeMultipleToast (title, subtitle) {
            const time = new Date().getTime()
            const payload = {
                id: time,
                visible: true,
                title: title,
                subtitle: subtitle
            }
            this.setMultipleToast(payload)
        },
        onSetNotif (target, notif) {
            const data = this.sidebar
            data && data.map((dt, i) => {
                dt.menu && dt.menu.map((sb, j) => {
                    if (sb.permission === target) {
                        this.sidebar[i].menu[j].value = notif
                    }
                })
            })
        },
        getLocalCartCount () {
            const token = 'Bearer '.concat(this.$cookies.get('token'))
            this.getCountCart(token)
        },
        getLocalOrderCount () {
            const token = 'Bearer '.concat(this.$cookies.get('token'))
            this.getCountOrder(token)
        },
        getLocalNotifCount () {
            const token = 'Bearer '.concat(this.$cookies.get('token'))
            this.getCountNotif(token)
        },
        async getShop () {
            this.visibleLoader = true 

            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const payload = {
                limit: 100,
                offset: 0,
                user_id: this.dataUser.id
            }

            const rest = await axios.post('/api/shop/getAll', payload, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                const data = rest.data.data
                this.menuShops = data && data.map((dt) => {
                    return {icon: 'fa fa-1x fa-store', label: dt.shop.name}
                })
                this.dataShops = data && data.map((dt) => {
                    return {...dt.shop}
                })
                this.visibleLoader = false 
            } else {
                this.visibleLoader = false 
            }
        },
    },
    computed: {
        ...mapGetters({
            authenticated: 'auth/authenticated',
            user: 'auth/user',
            employee: 'auth/employee',
            token: 'auth/token',
            cart: 'cart/count',
            carts: 'cart/all',
            order: 'order/count',
            orders: 'order/all',
            notifs: 'notification/count',
            choosedShop: 'store/selected',
            totalToast: 'toastmessage/data'
        })
    },
    watch: {
        notifs (props) {
            if (props) {
                this.countNotif = props 
            } else {
                this.countNotif = 0
            }
            this.onSetNotif('notifications', this.countNotif)
        },
        orders (props) {
            let val = props.confirmed + props.unconfirmed + props.cooking
            this.onSetNotif('orders', val)
        },
    },
    sockets: {
        orderList: function (data) {
            const lth = data.length
            const payload = data && data[lth - 1]
            this.makeMultipleToast(payload.title, payload.subtitle)
            this.getLocalNotifCount()
            this.getLocalOrderCount()
        }
    }
}
</script>