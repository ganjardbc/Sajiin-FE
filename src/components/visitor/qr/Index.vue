<template>
    <div id="App" class="main-screen">
        <AppMobileLayout :title="'QR Scanner'">
            <div>
                <div v-if="error" style="padding: 10px;">
                    <div class="card box-shadow">
                        <p class="fonts fonts-11 red semibold">{{ error }}</p>
                    </div>
                </div>

                <div v-if="visibleLoader">
                    <AppLoader />
                </div>

                <div v-else>
                    <div v-if="!selectedIndex" style="margin-top: 10px; width: 100%; height: calc(100vh - 50px);">
                        <qrcode-stream @decode="onDecode" @init="onInit">
                            <div v-if="loading" class="post-middle-absolute">
                                <AppLoader />
                            </div>
                        </qrcode-stream>
                    </div>

                    <div v-else style="padding: 10px 15px;"> 
                        <div class="card box-shadow" style="margin-top: 15px; margin-bottom: 15px; overflow: unset;">
                            <div class="display-flex space-between" style="padding-top: 5px; padding-bottom: 5px;">
                                <div style="width: 60px; margin-right: 15px;">
                                    <div class="image image-padding border border-full">
                                        <i v-if="!selectedIndex.shop.image" class="post-middle-absolute fa fa-lg fa-store" style="font-size: 32px; color: #999;" />
                                        <img v-else :src="shopImageThumbnailUrl + selectedIndex.shop.image" alt="" class="post-center">
                                    </div>
                                </div>
                                <div style="width: calc(100% - 75px);">
                                    <div class="display-flex" style="margin-bottom: 5px;">
                                        <div class="fonts fonts-11 semibold" style="margin-top: 3px;">{{ selectedIndex.shop.name }}</div>
                                        <div 
                                            :class="'card-capsule ' + (
                                            selectedIndex.shop.status === 'active' 
                                                ? 'active' 
                                                : ''
                                            )" 
                                            style="margin-left: 10px; text-transform: capitalize;">
                                            {{ selectedIndex.shop.status }}
                                        </div>
                                    </div>
                                    <div>
                                        <div class="fonts fonts-10 grey">{{ selectedIndex.shop.open_time }} - {{ selectedIndex.shop.close_time }}</div>
                                        <div class="fonts fonts-10 grey">{{ selectedIndex.shop.location }}</div>
                                    </div>
                                </div>
                            </div>
                            <div style="padding-top: 15px;">
                                <button class="btn btn-full btn-main" @click="onChangeShop(selectedIndex)">
                                    Enter This Shop 
                                </button>

                                <button class="btn btn-full btn-grey" style="margin-top: 10px;" @click="rescanQR">
                                    Re-scan QR Code
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppMobileLayout>

        <AppAlert 
            v-if="visibleAlertSave" 
            :isLoader="visibleLoaderAction"
            :title="'Enter this shop ?'" 
            :onClose="onShowHideSave" 
            :onSave="onChooseShop" />
    </div>
</template>
<script>
import { mapActions } from 'vuex'
import AppAlert from '../../modules/AppAlert'
import AppLoader from '../../modules/AppLoader'
import VueQrcode from 'vue-qrcode'
import axios from 'axios'
import AppMobileLayout from '../../modules/AppMobileLayout'

const shop = {
    id: '',
    shop_id: '',
    image: '',
    name: '',
    email: '',
    phone: '',
    about: '',
    status: ''
}

export default {
    name: 'App',
    data () {
        return {
            loading: false,
            result: '',
            error: '',
            validCode: '',
            visibleAlertSave: false,
            visibleLoaderAction: false,
            visibleLoader: false,
            openCreateShop: false,
            selectedShop: null,
            selectedIndex: null,
            datas: []
        }
    },
    mounted () {
        const shopData = this.$session.get('shop')
        this.selectedShop = shopData ? shopData : shop
        this.validCode = this.code ? this.code : '-'
    },
    components: {
        AppMobileLayout,
        AppLoader,
        AppAlert,
        VueQrcode,
    },
    methods: {
        ...mapActions({
            setShop: 'store/setData',
            setToast: 'toast/setToast'
        }),
        makeToast (title) {
            const payload = {
                visible: true,
                title: title
            }
            this.setToast(payload)
        },
        onDecode (result) {
            this.result = result
            const url = result
            const shopID = url.split('visit-shop')[1].replace('/', '')
            this.getByID(shopID)
            // this.$router.replace({ name: 'visitor-shop' })
        },

        async onInit (promise) {
            this.loading = true

            try {
                await promise
            } catch (error) {
                if (error.name === 'NotAllowedError') {
                    this.error = "ERROR: you need to grant camera access permisson"
                } else if (error.name === 'NotFoundError') {
                    this.error = "ERROR: no camera on this device"
                } else if (error.name === 'NotSupportedError') {
                    this.error = "ERROR: secure context required (HTTPS, localhost)"
                } else if (error.name === 'NotReadableError') {
                    this.error = "ERROR: is the camera already in use?"
                } else if (error.name === 'OverconstrainedError') {
                    this.error = "ERROR: installed cameras are not suitable"
                } else if (error.name === 'StreamApiNotSupportedError') {
                    this.error = "ERROR: Stream API is not supported in this browser"
                }
            } finally {
                this.loading = false
            }
        },
        rescanQR () {
            this.selectedIndex = null
        },
        onShowHideSave () {
            this.visibleAlertSave = !this.visibleAlertSave
            this.selectedIndex = null
        },
        onButtonShop () {
            this.openCreateShop = !this.openCreateShop
            this.selectedIndex = null
            this.error = ''
            this.result = ''
        },
        onChangeShop (data) {
            this.onShowHideSave()
            this.selectedIndex = data
        },
        onChooseShop () {
            this.selectedShop = this.selectedIndex
            this.openCreateShop = !this.openCreateShop

            this.$session.set('shop', this.selectedShop)
            this.$session.set('visitorShop', this.selectedShop.shop)
            this.$session.set('visitorTable', this.selectedShop.tables)
            this.$session.set('visitorCatalog', this.selectedShop.catalogs)
            this.$session.remove('orderItem')
            this.$session.remove('orderTable')
            this.$session.remove('orderPayment')
            this.$session.remove('cartList')

            this.$router.replace({ name: 'visitor-shop' })
        },
        async getByID (id) {
            this.visibleLoader = true 
            this.error = ''

            const payload = {
                shop_id: id
            }

            const rest = await axios.post('/api/public/shopByID', payload)

            if (rest && rest.status === 200) {
                const data = rest.data.data

                if (data) {
                    this.selectedIndex = data 
                } else {
                    this.error = 'Shop not found, please re-scan QR Code.'
                }

                this.visibleLoader = false 
            } else {
                this.visibleLoader = false 
                this.error = 'There is an error, please try again.'
            }
        },
    },
    watch: {
        code (props) {
            if (props) {
                this.validCode = props
            }
        }
    }
}
</script>