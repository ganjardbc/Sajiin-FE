<template>
    <div id="App">
        <div class="width width-100">
            <div class="fonts fonts-11 semibold black" style="margin-bottom: 5px;">Payments</div>
            <div class="card border-full" style="padding: 10px; width: calc(100% - 20px);">
                <div class="display-flex space-between">
                    <div class="fonts fonts-10 semibold" style="margin-top: 10px; margin-left: 10px;">Choose payment method</div>
                    <div style="width: 40px;">
                        <button class="btn btn-icon btn-main-reverse with-hover" @click="openPayment">
                            <i class="fa fa-lg fa-arrow-right" />
                        </button>
                    </div>
                </div>
                <div v-if="selectedPayment" class="display-flex space-between border-top" style="margin-top: 20px; padding-top: 20px;">
                    <div style="width: 45px; margin-right: 15px">
                        <div class="image image-padding" style="background-color: rgba(0, 0, 0, 0)">
                            <img alt="" :src="selectedPayment ? (paymentImageThumbnailUrl + selectedPayment.image) : ''" />
                        </div>
                    </div>
                    <div class="display-flex space-between" style="width: calc(100% - 60px);">
                        <div class="post-tops">
                            <div class="fonts fonts-10 semibold black">
                                {{ selectedPayment && selectedPayment.name }}
                            </div>
                            <div class="fonts fonts-10 grey">{{ selectedPayment && selectedPayment.description }}</div>
                        </div>
                        <div class="post-tops">
                            <div class="fonts fonts-10 semibold black">{{ 'Rp. 0' }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <FormPayment
            v-if="visiblePopupPayment"
            :selectedID="selectedPayment && selectedPayment.id ? selectedPayment.id : 0" 
            :data.sync="dataPayment"
            :onClose="openPayment"
            :onChange="(data) => onChangePayment(data)"
        />
    </div>
</template>
<script>
import axios from 'axios'
import FormPayment from '../../customer/orders/FormPayment'

export default {
    name: 'App',
    data () {
        return {
            visiblePopupPayment: false,
            selectedPayment: null ,
            dataPayment: []
        }
    },
    mounted () {
        this.getDataPayment()
    },
    components: {
        FormPayment
    },
    methods: {
        openPayment () {
            this.visiblePopupPayment = !this.visiblePopupPayment
        },
        onChangePayment (data) {
            this.selectedPayment = data 
            this.openPayment()
            console.log('onChangePayment', data)
        },
        async getDataPayment () {
            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const payload = {
                limit: 1000,
                offset: 0,
                status: 'active'
            }
            const rest = await axios.post('/api/payment/getAll', payload, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                const data = rest.data.data
                this.dataPayment = data
            }

            console.log('rest', rest)
        },
    }
}
</script>