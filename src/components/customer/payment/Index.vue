<template>
    <div id="App">
        <AppMobileLayout :title="'Choose Payments'">
            <AppLoader v-if="visibleLoader" />
            <div v-else>
                <div v-if="datas.length > 0" style="padding-top: 5px;">
                    <div v-for="(dt, i) in datas" :key="i" class="card border-full" style="margin-top: 15px; margin-bottom: 15px;">
                        <div class="display-flex space-between" style="padding-top: 5px; padding-bottom: 5px;">
                            <div style="width: 60px; margin-right: 20px;">
                                <div class="image image-padding" style="background-color: rgba(0, 0, 0, 0)">
                                    <img :src="paymentImageThumbnailUrl + dt.image" alt="" class="post-center">
                                </div>
                            </div>
                            <div style="width: calc(100% - 110px);">
                                <div class="post-top">
                                    <div class="fonts fonts-11 semibold" style="margin-bottom: 5px;">{{ dt.name }}</div>
                                    <div class="fonts fonts-10 grey">{{ dt.description }}</div>
                                </div>
                            </div>
                            <div style="width: 40px; height: 60px;">
                                <div class="post-top">
                                    <button v-if="selectedID === dt.id ? false : true" class="btn btn-sekunder btn-icon" @click="onChangePopup(dt)">
                                        <i class="fa fa-lg fa-plus"></i>
                                    </button>
                                    <div v-else class="card-check">
                                        <i class="icn far fa-lg fa-check-circle"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <AppEmpty v-else />
            </div>
            <div style="padding-bottom: 60px;"></div>
            <div class="navbar-bottom">
                <div class="main-screen display-flex space-between">
                    <button  
                        v-if="selectedData"
                        @click="onShowHideSave"
                        class="btn btn-main btn-full"
                        style="margin-top: 8px;">
                        Save Payment
                    </button>
                    <button  
                        v-else
                        class="btn btn-primary btn-full"
                        style="margin-top: 8px; cursor: not-allowed;">
                        Save Payment
                    </button>
                </div>
            </div>
        </AppMobileLayout>

        <AppAlert 
            v-if="visibleAlertSave" 
            :isLoader="visibleLoaderAction"
            :title="'Save changes ?'" 
            :onClose="onShowHideSave" 
            :onSave="saveData" />
    </div>
</template>
<script>
import axios from 'axios'
import { mapActions } from 'vuex'
import AppMobileLayout from '../../modules/AppMobileLayout'
import AppLoader from '../../modules/AppLoader'
import AppEmpty from '../../modules/AppEmpty'
import AppAlert from '../../modules/AppAlert'

export default {
    name: 'App',
    data () {
        return {
            visibleAlertSave: false,
            visibleLoaderAction: false,
            visibleLoader: false,
            selectedID: null,
            selectedData: null,
            datas: [],
            formPayload: null,
            dataShop: null 
        }
    },
    mounted () {
        const orderPayment = this.$cookies.get('orderPayment')
        this.formPayload = orderPayment ? orderPayment : null 
        this.selectedData = orderPayment ? orderPayment : null
        this.selectedID = this.selectedData ? this.selectedData.id : null 
        this.dataShop = this.$cookies.get('shop')
        this.getData()
    },
    components: {
        AppMobileLayout,
        AppEmpty,
        AppAlert,
        AppLoader
    },
    methods: {
        ...mapActions({
            setToast: 'toast/setToast'
        }),
        makeToast (title) {
            const payload = {
                visible: true,
                title: title
            }
            this.setToast(payload)
        },
        onChangePopup (data) {
            this.selectedData = data 
            this.selectedID = data.id 
        },
        onShowHideSave () {
            this.visibleAlertSave = !this.visibleAlertSave
        },
        saveData () {
            this.onChangePayment()
        },
        onChangePayment () {
            this.formPayload = {
                ...this.selectedData
            }
            this.$cookies.set('orderPayment', JSON.stringify(this.formPayload))
            this.onShowHideSave()
            this.makeToast('Payment Selected')
            this.$router.back()
        },
        async getData () {
            this.visibleLoader = true 

            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const payload = {
                limit: 1000,
                offset: 0,
                status: 'active',
                shop_id: this.dataShop.id 
            }
            const rest = await axios.post('/api/payment/getAll', payload, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                const data = rest.data.data
                this.datas = data
                this.visibleLoader = false 
            } else {
                this.visibleLoader = false 
            }
        },
    }
}
</script>