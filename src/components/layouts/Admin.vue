<template>
    <div id="admin">
        <div :class="isSidebarSmall ? 'sidebar small' : 'sidebar'">
            <div class="header">
                <div class="header-content display-flex space-between">
                    <router-link :to="{name: 'home'}" class="logo" style="width: 100%;">
                        <img :src="logo" alt="SAJI-IN" style="width: 100%;">
                    </router-link>
                    <div class="mobile-visible" style="width: calc(100% - 8px); padding-left: 4px; padding-right: 4px;">
                        <router-link :to="{name: 'home'}">
                            <div class="image image-padding">
                                <img :src="icon" alt="">
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>
            <div class="content">
                <AppListMenu :data.sync="sidebar" :isSidebarSmall.sync="isSidebarSmall" />
            </div>
        </div>
        <div class="main">
            <div class="header">
                <div class="set-padding display-flex space-between">
                    <div>
                        <form action="#" class="card-search mobile flat">
                            <button class="btn btn-icon btn-white" type="submite">
                                <i class="fa fa-1x fa-search" />
                            </button>
                            <input type="search" placeholder="Search products or orders.." required class="field" style="border-radius: 0;">
                        </form>
                    </div>
                    <div style="width: 100%;" class="display-flex right">
                        <!-- <AppButtonQR 
                            v-if="dataUser.role_name !== 'customer'"
                            :buttonClass="'btn btn-white'"
                            :code="code"
                            title="Show QR" 
                        /> -->
                        <router-link :to="{name: 'admin-shop'}" style="margin-left: 0;" class="button-router-link">
                            <button class="btn btn-white btn-icon btn-radius" title="Shops">
                                <i class="fa fa-lg fa-store" />
                                <span class="notif">0</span>
                            </button>
                        </router-link>
                        <router-link :to="{name: '404'}" style="margin-left: 5px;" class="button-router-link">
                            <button class="btn btn-white btn-icon btn-radius" title="Notifications">
                                <i class="fa fa-lg fa-bell" />
                                <span class="notif">{{ countNotif }}</span>
                            </button>
                        </router-link>
                        <router-link :to="{name: 'profile'}" class="card-small-profile" style="margin-left: 5px;">
                            <div class="image" style="text-align: center;">
                                <img v-if="dataUser && dataUser.image" :src="dataUser && dataUser.image ? (adminImageThumbnailUrl + dataUser.image) : ''" alt="">
                                <i v-else class="post-top fa fa-lg fa-user-circle" style="color: #999;" />
                            </div>
                            <div style="height: 30px; padding-right: 10px; padding-left: 5px;">
                                <div class="post-center fonts fonts-10 semibold black" style="text-transform: uppercase;">{{ dataUser && dataUser.name }}</div>
                            </div>
                        </router-link>
                        <div class="border-left" style="margin-left: 10px; padding-left: 10px;"></div>
                        <div class="display-flex">
                            <AppButtonMenu 
                                :icon="'icn fa fa-lg fa-chevron-down'"
                                :image="selectedShop ? (shopImageThumbnailUrl + selectedShop.image) : ''"
                                :label="selectedLabel"
                                :button="'btn btn-white btn-radius-rounded'"
                                :onChange="(data) => onChangeMenu(data)" 
                                :isLoader="visibleLoader"
                                :data="menuShops" />
                            <!-- <router-link v-if="selectedLabel" :to="{name: 'admin-shop'}" class="card-small-profile" style="margin-left: 5px;">
                                <div class="image" style="text-align: center;">
                                    <img v-if="selectedShop && selectedShop.image" :src="selectedShop ? (shopImageThumbnailUrl + selectedShop.image) : ''" alt="">
                                    <i v-else class="post-top fa fa-lg fa-user-circle" style="color: #999;" />
                                </div>
                                <div style="height: 30px; padding-right: 10px; padding-left: 5px;">
                                    <div class="post-center fonts fonts-10 semibold black" style="text-transform: uppercase;">{{ selectedLabel }}</div>
                                </div>
                            </router-link>
                            <router-link v-else :to="{name: 'admin-shop'}">
                                <button class="btn btn-main btn-radius-rounded">
                                    <i class="icn icn-left fa fa-lg fa-plus" />
                                    CREATE SHOP 
                                </button>
                            </router-link> -->
                        </div>
                    </div>
                </div>
            </div>
            <div class="inner">
                <router-view />
                <router-view name="adminfresh" />
            </div>
        </div>

        <AppToast />

        <AppToastMessage />
    </div>
</template>

<script>
import axios from 'axios'
import { mapGetters, mapActions } from 'vuex'
import AppListMenu from '../modules/AppListMenu'
import logo from '@/assets/img/logo.png'
import icon from '@/assets/img/icon.png'
import AppToast from '../modules/AppToast'
import AppToastMessage from '../modules/AppToastMessage'
import AppButtonMenu from '../modules/AppButtonMenu'
import AppButtonQR from '../modules/AppButtonQR'

const sidebarAdmin = [
    {icon: 'fa fa-lg fa-database', label: 'DASHBOARD', value: 0, menu: [
        {icon: 'fa fa-lg fa-tachometer-alt', label: 'Dashboard', value: 1, link: 'dashboard', permission: 'dashboard'},
        // {icon: 'fa fa-lg fa-store', label: 'Shops', value: 0, link: 'shops', permission: 'products'},
        {icon: 'fa fa-lg fa-laptop', label: 'Cashier', value: 0, link: 'cashier', permission: 'cashier'},
        {icon: 'fa fa-lg fa-receipt', label: 'Orders', value: 0, link: 'orderlist', permission: 'orders'},
        {icon: 'fa fa-lg fa-utensils', label: 'Catalogs', value: 0, link: 'catalog', permission: 'products'},
        {icon: 'fa fa-lg fa-users', label: 'Customers', value: 0, link: 'customer', permission: 'customers'},
        {icon: 'fa fa-lg fa-th-large', label: 'Tables', value: 0, link: 'table', permission: 'tables'},
        {icon: 'fa fa-lg fa-address-card', label: 'Employees', value: 0, link: 'employee', permission: 'products'},
        {icon: 'fa fa-lg fa-clock', label: 'Shifts', value: 0, link: 'shift', permission: 'products'}
    ]},
    // {icon: 'fa fa-lg fa-database', label: 'CUSTOMER', value: 0, menu: [
    //     {icon: 'fa fa-lg fa-users', label: 'Customers', value: 0, link: 'customer', permission: 'customers'},
    //     {icon: 'fa fa-lg fa-shopping-basket', label: 'Carts', value: 0, link: 'cartList', permission: 'carts'},
    //     {icon: 'fa fa-lg fa-heart', label: 'Wiselists', value: 0, link: 'wishelist', permission: 'wiselists'},
    //     {icon: 'fa fa-lg fa-star', label: 'Feedbacks', value: 0, link: 'feedback', permission: 'feedbacks'}
    // ]},
    {icon: 'fa fa-lg fa-database', label: 'WEBSITE', value: 0, menu: [
        {icon: 'fa fa-lg fa-newspaper', label: 'Articles', value: 0, link: 'articlelist', permission: 'articles'},
        {icon: 'fa fa-lg fa-check', label: 'Benefits', value: 0, link: 'benefit', permission: 'benefits'}
    ]},
    {icon: 'fa fa-lg fa-database', label: 'USER N ROLES', value: 0, menu: [
        {icon: 'fa fa-lg fa-tag', label: 'Bizpars', value: 0, link: 'bizpar', permission: 'bizpars'},
        {icon: 'fa fa-lg fa-lock', label: 'Permissions', value: 0, link: 'permission', permission: 'permissions'},
        {icon: 'fa fa-lg fa-flag', label: 'Roles', value: 0, link: 'role', permission: 'roles'},
        {icon: 'fa fa-lg fa-user', label: 'Users', value: 0, link: 'userlist', permission: 'users'}
    ]}
]

export default {
    name: 'admin',
    data () {
        return {
            visibleLoader: false,
            permissions: null,
            logo: logo,
            icon: icon,
            countNotif: 0,
            sidebar: null,
            isSidebarSmall: false,
            classSidebar: 'sidebar smalls',
            classSidebarMenu: 'menu-list hover with-icon smalls',
            dataUser: null,
            dataShops: null,
            menuShops: [],
            selectedLabel: 'CHOOSE SHOP',
            selectedShop: null,
            code: null
        }
    },
    beforeMount (){
        if (!this.$cookies.get('token')) {
            this.$router.push({ name: 'home' })
        }
    },
    mounted () {
        const token = this.$cookies.get('token')
        console.log('token', token)

        this.dataUser = this.user ? this.user : this.$cookies.get('user')
        this.selectedShop = this.choosedShop ? this.choosedShop : this.$cookies.get('shop')
        this.selectedLabel = this.selectedShop ? this.selectedShop.name : 'CHOOSE SHOP'
        this.code = this.deployUrl + (this.$router.mode === 'hash' ? '#' : '') + '/generate-customer/' + (this.selectedShop ? this.selectedShop.shop_id : token)

        console.log('selected shop', this.selectedShop)

        const permissions = this.$cookies.get('permissions')
        this.permissions = permissions.permissions
        console.log('permissions', permissions)

        this.onCheckMenus(sidebarAdmin)
        this.getLocalOrderCount()
        this.getShop()
    },
    components: {
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
            getCountOrder: 'order/getCount'
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
        onCheckSubmenus (data) {
            let menu = []
            data && data.map((dt) => {
                const stt = this.onCheckPermission(dt.permission)
                if (stt) {
                    menu.push({
                        ...dt
                    })
                }
            })
            return menu
        },
        onCheckMenus (data) {
            let menu = []
            data && data.map((dt) => {
                if (dt.menu) {
                    let submenu = this.onCheckSubmenus(dt.menu)
                    if (submenu.length > 0) {
                        let submenuPayload = []
                        submenu && submenu.map((sb) => {
                            submenuPayload.push({...sb})
                        })
                        if (submenuPayload.length > 0) {
                            menu.push({
                                ...dt,
                                menu: submenuPayload
                            })
                        }
                    }
                }
            })
            this.sidebar = menu
        },
        onCheckPermission (prm) {
            let stt = false
            const data = this.permissions
            data && data.map((dt) => {
                if (dt.permission_name === prm) {
                    stt = true
                }
            })
            return stt
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
        onSidebar () {
            this.isSidebarSmall = !this.isSidebarSmall
        },
        getLocalCartCount () {
            const token = 'Bearer '.concat(this.$cookies.get('token'))
            this.getCountCart(token)
        },
        getLocalOrderCount () {
            const token = 'Bearer '.concat(this.$cookies.get('token'))
            this.getCountOrder(token)
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
        }
    },
    computed: {
        ...mapGetters({
            authenticated: 'auth/authenticated',
            user: 'auth/user',
            token: 'auth/token',
            cart: 'cart/count',
            carts: 'cart/all',
            order: 'order/count',
            orders: 'order/all',
            choosedShop: 'store/selected'
        })
    },
    watch: {
        orders (props) {
            let val = 0
            const data = this.$cookies.get('user')
            const role = data && data.role_name
            switch (role) {
                case 'admin':
                    val = props.allAdmin
                    break;
                default:
                    val = props.all
                    break;
            }

            this.onSetNotif('orders', val)
        }
    },
    sockets: {
        orderList: function (data) {
            console.log('orderList', data)
            const lth = data.length
            const payload = data && data[lth - 1]
            this.countNotif = lth 
            this.getLocalCartCount()
            this.getLocalOrderCount()
            this.makeMultipleToast(payload.title, payload.subtitle)
        }
    }
}
</script>