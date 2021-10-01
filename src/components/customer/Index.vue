<template>
    <div id="App">
        <div class="main-screen">
            <div style="padding-bottom: 10px;">
                <CardProfile />
            </div>

            <div v-if="menus" class="display-flex wrap" style="padding-bottom: 60px;">
                <div v-for="(dt, i) in menus" :key="i" class="width width-row-3 width-mobile-row-2">
                    <div style="margin: 7.5px;">
                        <router-link :to="{name: dt.route ? dt.route : '404WEB'}">
                            <div class="card box-shadow" style="overflow: unset; padding: 0; width: 100%;">
                                <div style="padding: 15px; height: 180px; text-align: center;">
                                    <div style="padding-top: 20px; padding-bottom: 20px;">
                                        <div style="margin: auto; width: 100px; height: 100px; border-radius: 100%; text-align: center;" class="bg-main">
                                            <i :class="`post-center ${dt.icon}`" style="font-size: 32px; color: white;"></i>
                                        </div>
                                    </div>
                                    <div class="fonts fonts-11 semibold black">{{ dt.title }}</div>
                                </div>
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>

        <AppAlert 
            v-if="visibleAlertExit" 
            :isLoader="visibleLoaderExit"
            :title="'Exit Shop ?'" 
            :subtitle="'It will remove your Carts and Wishelists.'"
            :onClose="onShowHideExit" 
            :onSave="exitShop" />
        
        <AppCardSmallCart />
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import axios from 'axios'
import AppWrapper from '../modules/AppWrapper'
import AppButton from '../modules/AppButton'
import AppText from '../modules/AppText'
import AppCardPostGrid from '../modules/AppCardPostGrid'
import AppCardGrid from '../modules/AppCardGrid'
import AppCardList from '../modules/AppCardList'
import AppLoader from '../modules/AppLoader'
import AppButtonTable from '../modules/AppButtonTable'
import AppAlert from '../modules/AppAlert'
import AppCardSmallCart from '../modules/AppCardSmallCart'
import CardProfile from './profile/CardProfile'

const infos = [
    {title: 'Orders', qty: '120'},
    {title: 'Visitors', qty: '34'},
    {title: 'Visble Table', qty: '2'}
]

const notes = [
    {icon: 'fa fa-lg fa-info-circle', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit '},
    {icon: 'fa fa-lg fa-info-circle', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '},
    {icon: 'fa fa-lg fa-info-circle', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, dolore magna aliqua. '}
]

export default {
    name: 'App',
    data () {
        return {
            visibleAlertExit: false,
            visibleLoaderExit: false,
            visibleLoader: false,
            visibleLoadMore: false,
            menus: [
                {icon: 'fa fa-lw fa-qrcode', title: 'Scan QR Code', value: 0, route: 'customer-qr'},
                {icon: 'fa fa-lg fa-store', title: 'Visit Shop', value: 0, route: 'customer-home'},
                {icon: 'fa fa-lg fa-list-ol', title: 'Order History', value: 0, route: 'customer-order'},
                {icon: 'fa fa-lg fa-shopping-cart', title: 'Carts', value: 0, route: 'customer-chart'},
                {icon: 'fa fa-lg fa-heart', title: 'Wishelists', value: 0, route: 'customer-whiselist'},
                {icon: 'fa fa-lg fa-star', title: 'Feedbacks', value: 0, route: 'customer-feedback'},
            ],
            products: [],
            categories: [],
            articles: [],
            dataUser: null,
            dataOrder: null,
            selectedCustomer: null,
            selectedShop: null,
            notes: notes,
            infos: infos
        }
    },
    mounted () {
        this.selectedShop = this.$cookies.get('shop')
        this.selectedCustomer = this.$cookies.get('customer')
        this.dataOrder = this.$cookies.get('orderItem')
        this.dataUser = this.$cookies.get('user')
    },
    components: {
        CardProfile,
        AppCardSmallCart,
        AppAlert,
        AppButtonTable,
        AppLoader,
        AppCardPostGrid,
        AppCardList,
        AppCardGrid,
        AppWrapper,
        AppButton,
        AppText
    },
    computed: {
        ...mapGetters({
            authenticated: 'auth/authenticated',
            user: 'auth/admin',
            token: 'auth/token',
            order: 'order/count'
        })
    },
    methods: {
        ...mapActions({
            setShop: 'store/setData',
            setToast: 'toast/setToast',
            getCount: 'cart/getCountCustomer',
        }),
        makeToast (title) {
            const payload = {
                visible: true,
                title: title
            }
            this.setToast(payload)
        },
        getLocalCartCount () {
            const token = 'Bearer '.concat(this.$cookies.get('token'))
            this.getCount(token)
        },
        onShowHideExit () {
            this.visibleAlertExit = !this.visibleAlertExit
        },
        async exitShop () {
            this.visibleLoaderExit = true

            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const payload = {
                owner_id: this.dataUser.id
            }

            const rest = await axios.post('/api/shop/exit', payload, { headers: { Authorization: token } })
            if (rest && rest.status === 200) {
                this.visibleLoaderExit = false
                this.onShowHideExit()
                this.getLocalCartCount()
                this.setShop(null)
                this.$cookies.remove('shop')
                this.$cookies.remove('orderItem')
                this.$cookies.remove('orderTable')
                this.$cookies.remove('orderPayment')
                this.$router.go()
            } else {
                this.onShowHideExit()
                this.makeToast('Proceed failed')
                this.visibleLoaderExit = false
            }
        }
    }
}
</script>

<style scoped>
.self-padding {
    padding-top: 50px;
    padding-bottom: 50px;
}
</style>
