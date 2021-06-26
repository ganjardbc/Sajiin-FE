<template>
    <div id="App">
        <button :class="(buttonClass ? buttonClass : 'btn btn-main') + (buttonFull ? ' btn-full' : '')" @click="onButtonShop">
            <i :class="'icn icn-left ' + (icon ? icon : 'fa fa-lg fa-qrcode')" /> {{ title ? title : 'Scan QR Code'}}
        </button>

        <AppPopupForm
            v-if="openCreateShop"
            :enableRadius="true"
            :title="'Chose Shop'"
            :onClose="onButtonShop"
        >
            <div>
                <div v-if="datas.length > 0" style="padding-left: 10px; padding-right: 10px;">
                    <div v-for="(dt, i) in datas" :key="i" class="card box-shadow" style="margin-top: 15px; margin-bottom: 15px; overflow: unset;">
                        <div class="display-flex space-between" style="padding-top: 5px; padding-bottom: 5px;">
                            <div style="width: 60px; margin-right: 15px;">
                                <div class="image image-padding border border-full">
                                    <i v-if="!dt.image" class="post-middle-absolute fa fa-lg fa-store" style="font-size: 32px; color: #999;" />
                                    <img v-else :src="shopImageThumbnailUrl + dt.image" alt="" class="post-center">
                                </div>
                            </div>
                            <div style="width: calc(100% - 185px);">
                                <div class="display-flex" style="margin-bottom: 5px;">
                                    <div class="fonts fonts-11 semibold" style="margin-top: 3px;">{{ dt.name }}</div>
                                    <div 
                                        :class="'card-capsule ' + (
                                        dt.status === 'active' 
                                            ? 'active' 
                                            : ''
                                        )" 
                                        style="margin-left: 10px; text-transform: capitalize;">
                                        {{ dt.status }}
                                    </div>
                                </div>
                                <div>
                                    <div class="fonts fonts-10 grey">{{ dt.location }}</div>
                                </div>
                            </div>
                            <div class="display-flex column space-between" style="width: 110px;">
                                <div class="display-flex space-between">
                                    <div></div>
                                    <div v-if="selectedShop" class="display-flex">
                                        <button v-if="selectedShop.id !== dt.id" class="btn btn-small-icon btn-sekunder" @click="onChangeShop(dt)">
                                            <i class="fa fa-1x fa-plus"></i>
                                        </button>
                                    </div>
                                    <div v-else>
                                        <button class="btn btn-small-icon btn-sekunder" @click="onChangeShop(dt)">
                                            <i class="fa fa-1x fa-plus"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppPopupForm>

        <AppAlert 
            v-if="visibleAlertSave" 
            :isLoader="visibleLoaderAction"
            :title="'Choose this shop ?'" 
            :onClose="onShowHideSave" 
            :onSave="onChooseShop" />
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import AppPopupForm from './AppPopupForm'
import AppAlert from './AppAlert'
import VueQrcode from 'vue-qrcode'
import axios from 'axios'

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
        const shopData = this.$cookies.get('shop')
        this.selectedShop = shopData ? shopData : shop
        this.validCode = this.code ? this.code : 'https://www.instagram.com/ganjar_hadiatna/'
        console.log('shopData', shopData)
        this.getData()
    },
    components: {
        AppAlert,
        VueQrcode,
        AppPopupForm
    },
    props: {
        buttonFull: {
            type: Boolean,
            required: false,
        },
        buttonClass: {
            type: String,
            required: false
        },
        code: {
            type: String,
            required: false
        },
        title: {
            type: String,
            required: false
        },
        icon: {
            type: String,
            required: false
        },
        onChange: {
            type: Function,
            required: false
        }
    },
    computed: {
        ...mapGetters({
            user: 'auth/user',
            customer: 'customer/data'
        })
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
        onShowHideSave () {
            this.visibleAlertSave = !this.visibleAlertSave
        },
        onButtonShop () {
            const user = this.$cookies.get('user')
            if (user) {
                this.openCreateShop = !this.openCreateShop
            } else {
                this.makeToast('Scan QR restaurant that you will visit.')
            }
        },
        onChangeShop (data) {
            this.onShowHideSave()
            this.selectedIndex = data
        },
        onChooseShop () {
            this.selectedShop = this.selectedIndex
            this.openCreateShop = !this.openCreateShop
            this.setShop(this.selectedShop)
            this.$cookies.set('shop', this.selectedShop)
            this.$cookies.remove('table')
            this.$router.push({ name: 'customer-main' })
        },
        async getData () {
            this.visibleLoader = true 

            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const payload = {
                limit: 1000,
                offset: 0,
                status: 'active'
            }

            const rest = await axios.post('/api/shop/getAllOnlyShop', payload, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                const data = rest.data.data

                this.datas = data 
                this.visibleLoader = false 
            } else {
                this.visibleLoader = false 
            }
        }
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