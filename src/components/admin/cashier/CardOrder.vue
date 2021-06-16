<template>
    <div id="AppCardOrder" class="display-flex wrap" style="padding-left: 15px; padding-right: 15px;">
        <div v-for="(dt, i) in data" :key="i" class="card box-shadow bg-white" style="margin-top: 15px; margin-bottom: 15px; overflow: unset;">
            <div class="display-flex space-between" style="margin-bottom: 20px;">
                <div class="display-flex">
                    <div style="margin-right: 10px;"><i class="fa fa-1x fa-shopping-bag fonts orange"></i></div>
                    <div class="display-flex mobile-hidden">
                        <div class="fonts fonts-10 grey">{{ dt.order.created_at | moment("dddd, MMMM Do YYYY hh:mm") }}</div>
                        <AppDote style="margin-top: 8px;" />
                        <div class="fonts fonts-10 grey">{{ dt.order.order_id }}</div>
                    </div>
                </div>
                <div class="display-flex">
                    <div 
                        class="card-capsule" 
                        style="margin-right: 5px;">
                        {{ 
                            dt.order.payment_status 
                                ? 'Paid' 
                                : 'Unpaid' 
                        }}
                    </div>
                    <div 
                        :class="'card-capsule ' + (
                        dt.order.status === 'canceled' 
                            ? '' 
                            : dt.order.status === 'done' 
                                ? 'active' 
                                : dt.order.status === 'unconfirmed' || dt.order.status === 'confirmed' 
                                    ? 'inactive' 
                                    : 'active'
                        )"  
                        style="text-transform: capitalize;">
                        {{ 
                            dt.order.status === 'unconfirmed' 
                                ? 'Unconfirmed' 
                                : dt.order.status === 'confirmed' 
                                    ? 'Confirmed'
                                    : dt.order.status 
                        }}
                    </div>
                </div>
            </div>
            <div v-if="dt.order.note">
                <div class="fonts fonts-10 grey">
                    # {{ dt.order.note }}
                </div>
            </div>
            <div class="display-flex display-mobile" style="padding-top: 5px; padding-bottom: 5px;">
                <div class="width width-76 width-mobile border-right border-mobile-none no-margin-padding" style="padding-right: 10px; padding-bottom: 10px;">
                    <AppImageProduct :data.sync="dt.details" :to="1" />
                    <AppShowHide v-if="dt.details.length > 1" :title="'More Products (' + (dt.details.length - 1) + ')'">
                        <AppImageProduct :data.sync="dt.details" :from="1" :to="dt.details.length" />
                    </AppShowHide>
                </div>
                <div class="width width-24 width-mobile">
                    <div style="height: auto; padding-left: 20px;" class="no-margin-padding">
                        <div style="padding-top: 10px; padding-bottom: 10px;">
                            <div v-if="dt.table">
                                <div class="fonts fonts-9 grey" style="margin-bottom: 2px;">Table</div>
                                <div class="fonts fonts-11 semibold" style="margin-bottom: 12px;">{{ dt.table && dt.table.name }}</div>
                            </div>
                            
                            <div class="fonts fonts-9 grey" style="margin-bottom: 2px;">Total Payment</div>
                            <div class="fonts fonts-11 semibold orange">Rp {{ dt.order.total_price }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="display-flex row space-between">
                <div>
                    <button 
                        @click="onButtonDetail(dt)"
                        class="btn btn-primary"
                        style="margin-right: 15px;">
                        View Order Detail
                    </button>
                </div>
                <div class="display-flex">
                    <button class="btn btn-main">
                        Choose Order
                    </button>
                </div>
            </div>
        </div> 

        <AppPopupForm
            v-if="visibleDetail"
            :enableRadius="true"
            :title="'Order Detail'"
            :onClose="onButtonDetail"
        >
            <FormOrder :data.sync="selectedData" />
        </AppPopupForm>
    </div>
</template>
<script>
import axios from 'axios'
import { mapActions } from 'vuex'
import AppPopupForm from '../../modules/AppPopupForm'
import AppButtonMenu from '../../modules/AppButtonMenu'
import AppDote from '../../modules/AppDote'
import AppShowHide from '../../modules/AppShowHide'
import AppImageProduct from '../../modules/AppImageProduct'
import AppCapsuleMenu from '../../modules/AppCapsuleMenu'
import FormOrder from '../../modules/FormOrder'

export default {
    name: 'AppCardOrder',
    data () {
        return {
            visibleDetail: false,
            selectedData: null,
            bizparOrder: [],
            bizparStatus: [],
            bizparCapsule: []
        }
    },
    mounted () {
        this.getBizpar()
    },
    components: {
        FormOrder,
        AppPopupForm,
        AppCapsuleMenu,
        AppButtonMenu,
        AppDote,
        AppShowHide,
        AppImageProduct
    },
    props: {
        type: {
            type: String,
            required: false
        },
        data: {
            required: true 
        },
        onView: {
            type: Function,
            required: false
        },
        onEdit: {
            type: Function,
            required: false
        },
        onDelete: {
            type: Function,
            required: false
        },
        onChangeStatus: {
            type: Function,
            required: false
        }
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
        onChangeMenuOwner (data, id) {
            switch (data) {
                case 1:
                    this.onDelete(id)
                    break
                case 2:
                    this.onView(id)
                    break
                default:
                    this.onEdit(id)
                    break
            }
        },
        onChangeMenu (data) {
            console.log('index', data)
        },
        onButtonDetail (data) {
            this.visibleDetail = !this.visibleDetail
            this.selectedData = data 
        },
        async getBizpar () {
            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const payload = {
                limit: 1000,
                offset: 0,
                type: ''
            }

            const rest = await axios.post('/api/bizpar/getByType', {...payload, type: 'order'}, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                const data = rest.data.data
                this.bizparOrder = data
            }

            const response = await axios.post('/api/bizpar/getByType', {...payload, type: 'orderstatus'}, { headers: { Authorization: token } })

            if (response && response.status === 200) {
                const data = response.data.data
                this.bizparStatus = data
                this.bizparCapsule = data && data.map((dt) => {
                    return {
                        label: dt.value
                    }
                })
            }
        }
    }
}
</script>