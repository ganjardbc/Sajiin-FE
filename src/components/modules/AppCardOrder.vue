<template>
    <div id="AppCardOrder">
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
                <div v-if="type === 'owner'" class="display-flex">
                    <AppCapsuleMenu 
                        :title="dt.order.payment_status ? 'Paid' : 'Unpaid'"
                        :status="dt.order.payment_status ? 'active' : ''"
                        :onChange="(data) => onChangeStatus(data, dt.order.order_id, 'payment')" 
                        :data="[{label: 'Paid'}, {label: 'Unpaid'}]"
                    />
                    <AppCapsuleMenu 
                        :title="dt.order.status"
                        :status="(
                        dt.order.status === 'canceled' 
                            ? '' 
                            : dt.order.status === 'done' 
                                ? 'active' 
                                : dt.order.status === 'unconfirmed' || dt.order.status === 'confirmed'
                                    ? 'inactive' 
                                    : 'active'
                        )"
                        :onChange="(data) => onChangeStatus(data, dt.order.order_id, 'status')" 
                        :data="bizparCapsule"
                        style="margin-left: 5px; text-transform: capitalize;"
                    />
                </div>
                <div v-else class="display-flex">
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
            <div v-if="type === 'owner'" class="display-flex row space-between">
                <div></div>
                <div class="display-flex">
                    <button 
                        @click="onButtonDetail(dt)"
                        class="btn btn-primary"
                        style="margin-left: 15px;">
                        Order Detail
                    </button>
                    <button 
                        v-if="dt.order.status != 'canceled' && !dt.order.payment_status"
                        @click="onCheckOut(dt.order.id)"
                        class="btn btn-main"
                        style="margin-left: 15px;">
                        Check Out
                    </button>
                    <AppButtonMenu 
                        v-if="dt.order.status != 'canceled' && dt.order.status != 'done'"
                        style="margin-left: 15px;"
                        :onChange="(data) => onChangeMenuOwner(data, dt.order.id)" 
                        :data="[
                            {icon: 'fa fa-1x fa-pencil-alt', label: 'Edit'}, 
                            {icon: 'fa fa-1x fa-trash-alt', label: 'Delete'}, 
                            {icon: 'fa fa-1x fa-ellipsis-h', label: 'View'}
                        ]" />
                </div>
            </div>
            <div v-else class="display-flex row space-between">
                <div>
                    <router-link 
                        :to="{name: 'order-detail', params: {id: dt.order.order_id}}" 
                        class="btn btn-route-link"
                        style="margin-right: 15px;">
                        View Order Detail
                    </router-link>
                </div>
                <div class="display-flex">
                    <AppButtonMenu :onChange="(data) => onChangeMenu(data)" :data="[{label: 'Buy again'}, {label: 'Chat admin'}, {label: 'Help'}]" />
                </div>
            </div>
        </div> 

        <AppPopupForm
            v-if="visibleDetail"
            :enableRadius="true"
            :title="'Order Detail'"
            :enablePrintButton="true"
            :onPrint="onPrint"
            :onClose="onButtonDetail"
        >
            <FormOrder :data.sync="selectedData" />
        </AppPopupForm>
    </div>
</template>
<script>
import axios from 'axios'
import { mapActions } from 'vuex'
import AppPopupForm from './AppPopupForm'
import AppSideForm from './AppSideForm'
import AppButtonMenu from './AppButtonMenu'
import AppDote from './AppDote'
import AppShowHide from './AppShowHide'
import AppImageProduct from './AppImageProduct'
import AppCapsuleMenu from './AppCapsuleMenu'
import FormOrder from './FormOrder'

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
        AppImageProduct,
        AppSideForm
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
        onCheckOut: {
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
        onPrint () {
            alert('print')
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