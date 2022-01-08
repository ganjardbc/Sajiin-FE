<template>
    <div id="product">
        <AppMobileLayout :title="'Check Out'">
            <div style="padding: 10px 0; width: 100%; overflow: unset;">
                <div class="width width-100">
                    <div class="width width-100" style="margin-bottom: 20px;">
                        <div class="card box-shadow" style="margin-top: 10px; padding: 10px; padding-top: 15px; padding-bottom: 15px; width: calc(100% - 20px);">
                            <div class="display-flex">
                                <div style="width: 50px; margin-right: 20px;">
                                    <div class="image image-50px image-circle" style="text-align: center;">
                                        <i v-if="dataUser && !dataUser.image" class="post-center fa fa-lg fa-user-circle" style="color: #999;" />
                                        <img v-else :src="dataUser ? (adminImageThumbnailUrl + dataUser.image) : ''" alt="" class="post-center">
                                    </div>
                                </div>
                                <div style="width: calc(100% - 70px);">
                                    <div class="fonts fonts-11 semibold" style="margin-bottom: 5px;">{{ dataUser && dataUser.name ? dataUser.name : '-' }}</div>
                                    <div class="display-flex" style="margin-bottom: 5px;">
                                        <div style="width: 25px;">
                                            <i class="fa fa-lw fa-envelope" style="font-size: 14px; color: #555;" />
                                        </div>
                                        <div class="fonts fonts-10 grey">{{ dataUser && dataUser.email ? dataUser.email : '-' }}</div>
                                    </div>
                                    <div class="display-flex" style="margin-bottom: 5px;">
                                        <div style="width: 25px;">
                                            <i class="fa fa-lw fa-phone" style="font-size: 14px; color: #555;" />
                                        </div>
                                        <div class="fonts fonts-10 grey">{{ dataUser && dataUser.phone ? dataUser.phone : '-' }}</div>
                                    </div>
                                    <div class="display-flex">
                                        <div style="width: 25px;">
                                            <i class="fa fa-lw fa-info-circle" style="font-size: 14px; color: #555;" />
                                        </div>
                                        <div class="fonts fonts-10 grey">{{ dataUser && dataUser.about ? dataUser.about : '-' }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="width width-full" style="margin-top: 30px;">
                            <div class="fonts fonts-11 semibold black" style="margin-bottom: 5px;">Products</div>
                            <AppCardOrderItem :data.sync="data" />
                        </div>

                        <div class="width width-100 margin margin-top-15-px">
                            <div class="fonts fonts-11 semibold black" style="margin-bottom: 5px;">Table</div>
                            <div class="card border-full" style="padding: 10px; width: calc(100% - 20px);">
                                <div class="display-flex space-between">
                                    <div class="fonts fonts-10 semibold" style="margin-top: 10px; margin-left: 10px;">Choose visible table</div>
                                    <div style="width: 40px;">
                                        <router-link :to="{name: 'customer-table'}">
                                            <button class="btn btn-icon btn-main-reverse with-hover">
                                                <i class="fa fa-lg fa-arrow-right" />
                                            </button>
                                        </router-link>
                                    </div>
                                </div>
                                <div v-if="selectedTable" class="display-flex space-between border-top" style="margin-top: 15px; padding-top: 15px;">
                                    <div style="width: 45px; margin-right: 15px">
                                        <div class="image image-padding" style="background-color: rgba(0, 0, 0, 0)">
                                            <img alt="" :src="selectedTable ? (tableImageThumbnailUrl + selectedTable.image) : ''" />
                                        </div>
                                    </div>
                                    <div class="display-flex space-between" style="width: calc(100% - 60px);">
                                        <div class="post-tops">
                                            <div class="fonts fonts-10 semibold black">
                                                {{ selectedTable && selectedTable.name }}
                                            </div>
                                            <div class="fonts fonts-10 grey">{{ selectedTable && selectedTable.description }}</div>
                                        </div>
                                        <div class="post-tops">
                                            <div class="fonts fonts-10 semibold black">{{ selectedTable && selectedTable.code }}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="width width-100 margin margin-top-20-px">
                            <div class="fonts fonts-11 semibold black" style="margin-bottom: 5px;">Payment</div>
                            <div class="card border-full" style="padding: 10px; width: calc(100% - 20px);">
                                <div class="display-flex space-between">
                                    <div class="fonts fonts-10 semibold" style="margin-top: 10px; margin-left: 10px;">Choose payment method</div>
                                    <div style="width: 40px;">
                                        <router-link :to="{name: 'customer-payment'}">
                                            <button class="btn btn-icon btn-main-reverse with-hover">
                                                <i class="fa fa-lg fa-arrow-right" />
                                            </button>
                                        </router-link>
                                    </div>
                                </div>
                                <div v-if="selectedPayment" class="display-flex space-between border-top" style="margin-top: 15px; padding-top: 15px;">
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
                                            <div class="fonts fonts-10 semibold black"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="width width-100 margin margin-top-20-px">
                            <div class="fonts fonts-11 semibold black" style="margin-bottom: 5px;">Notes</div>
                            <div class="fonts fonts-10 grey" style="margin-bottom: 10px;">You can put your initial name order</div>
                            <textarea 
                                name="note" 
                                id="note" 
                                class="field field-sekunder field-textarea" 
                                v-model="formPayload.order.note"
                                ></textarea>
                        </div>

                        <div style="padding-bottom: 80px;"></div>
                    </div>

                    <div class="width width-100">
                        <div class="component-mobile">
                            <div class="component-mobile-content">
                                <AppShowHide :title="'Rp. ' + (formPayload && formPayload.order.total_price)" style="margin-bottom: 10px;">
                                    <div class="display-flex space-between margin margin-bottom-5-px">
                                        <div class="fonts fonts-10 black">Total price ({{ formPayload && formPayload.order.total_item }} products)</div>
                                        <div class="fonts fonts-10 grey semibold">Rp {{ formPayload && formPayload.order.total_price }}</div>
                                    </div>
                                    <div class="display-flex space-between margin margin-bottom-20-px">
                                        <div class="fonts fonts-10 black">PPN ({{ ppn }}%)</div>
                                        <div class="fonts fonts-10 grey semibold">Rp {{ totalPPN }}</div>
                                    </div>

                                    <div class="display-flex space-between margin margin-bottom-20-px">
                                        <div class="fonts fonts-11 black semibold" style="margin-bottom: 5px;">Total Payment</div>
                                        <div class="fonts fonts-10 main semibold">Rp {{ formPayload && formPayload.order.total_price }}</div>
                                    </div>
                                </AppShowHide>

                                <div class="display-flex space-between" style="margin-top: 10px;">
                                    <div class="width width-49">
                                        <button class="btn btn-sekunder btn-full" @click="onShowHideCancel">
                                            Cancel Order ?
                                        </button>
                                    </div>
                                    <div class="width width-49">
                                        <button 
                                            v-if="selectedTable && selectedPayment && dataUser && dataShop" 
                                            class="btn btn-main btn-full" 
                                            @click="onShowHideSave">
                                            Order Now
                                        </button>
                                        <button v-else class="btn btn-primary btn-full" @click="onShowHideSave">
                                            Order Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppMobileLayout>

        <AppAlert 
            v-if="visibleAlertCancel" 
            :title="'Cancel this order ?'" 
            :onClose="onShowHideCancel" 
            :onSave="onCancelOrder" />
        
        <AppAlert 
            v-if="visibleAlertSave" 
            :title="'Save this order ?'" 
            :isLoader="visibleLoaderSave"
            :onClose="onShowHideSave" 
            :onSave="onSaveOrder" />
    </div>
</template>

<script>
import axios from 'axios'
import { mapGetters, mapActions } from 'vuex'
import AppAlert from '../../modules/AppAlert'
import AppWrapper from '../../modules/AppWrapper'
import AppButton from '../../modules/AppButton'
import AppText from '../../modules/AppText'
import AppCardCharts from '../../modules/AppCardCharts'
import AppCardOrderItem from '../../modules/AppCardOrderItem'
import AppShowHide from '../../modules/AppShowHide'
import AppDote from '../../modules/AppDote'
import AppMobileLayout from '../../modules/AppMobileLayout'
import AppButtonTable from '../../modules/AppButtonTable'
import FormCustomer from './FormCustomer'
import FormAddress from './FormAddress'
import FormShipment from './FormShipment'
import FormPayment from './FormPayment'

const payloadOrder = {
    order: {
        id: '',
        order_id: '',
        delivery_fee: 0,
        total_price: 0,
        total_item: 0,
        bills_price: 0,
        change_price: 0,
        payment_status: 0,
        proof_of_payment: '',
        status: 'unconfirmed',
        type: 'personal',
        note: '',
        customer_name: '',
        shop_name: '',
        table_name: '',
        payment_name: '',
        shop_id: '',
        customer_id: '',
        table_id: '',
        payment_id: ''
    },
    details: null,
    customer: null,
    table: null,
    payment: null,
    shop: null
}

export default {
    name: 'product',
    data () {
        return {
            visibleLoaderSave: false,
            visibleAlertSave: false,
            visibleAlertCancel: false,
            visiblePopupPayment: false,
            visiblePopupShipment: false,
            visiblePopupCustomer: false,
            visiblePopupAddress: false,
            visibleAddress: false,
            visibleButton: false,
            totalPrice: 0,
            subtotalPrice: 0,
            totalProduct: 0,
            totalPPN: 0,
            ppn: 0,
            formPayload: {...payloadOrder},
            data: [],
            dataPayment: [],
            dataShipment: [],
            dataUser: null,
            dataShop: null,
            dataCustomer: null,
            dataAddress: null,
            selectedCustomer: null,
            selectedAddress: null,
            selectedShipment: null,
            selectedPayment: null ,
            selectedTable: null
        }
    },
    mounted () {
        const orderItem = this.$cookies.get('orderItem')

        this.data = JSON.parse(orderItem)
        this.dataUser = this.$cookies.get('user')
        this.dataShop = this.$cookies.get('shop')
        this.selectedTable = this.$cookies.get('orderTable')
        this.selectedPayment = this.$cookies.get('orderPayment')
        this.formPayload = {
            ...payloadOrder,
            details: this.data
        }

        this.onTotal(this.data)
        this.onChangeOnlyCustomer(this.dataUser)
        this.onChangeOnlyShop(this.dataShop)
        this.onChangeOnlyPayment(this.selectedPayment)
        this.onChangeOnlyTable(this.selectedTable)
    },
    components: {
        FormPayment,
        FormShipment,
        FormCustomer,
        FormAddress,
        AppButtonTable,
        AppMobileLayout,
        AppDote,
        AppShowHide,
        AppCardOrderItem,
        AppWrapper,
        AppButton,
        AppText,
        AppCardCharts,
        AppAlert
    },
    computed: {
        ...mapGetters({
            cartItems: 'cart/data'
        })
    },
    methods: {
        ...mapActions({
            setToast: 'toast/setToast',
            getCountCart: 'cart/getCountCustomer',
            getCountOrder: 'order/getCountCustomer'
        }),
        getLocalCartCount () {
            const token = 'Bearer '.concat(this.$cookies.get('token'))
            this.getCountCart(token)
        },
        getLocalOrderCount () {
            const token = 'Bearer '.concat(this.$cookies.get('token'))
            this.getCountOrder(token)
        },
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
        onShowHideCancel () {
            this.visibleAlertCancel = !this.visibleAlertCancel
        },
        onTotal (data) {
            let qty = 0
            let price = 0
            let totalPrice = 0
            data && data.map((dt) => {
                qty += dt.quantity
                price += dt.subtotal
                totalPrice += dt.subtotal
            })
            this.totalPPN = (this.ppn * totalPrice) / 100
            this.totalProduct = qty
            this.totalPrice = price 
            this.subtotalPrice = this.totalPPN + totalPrice

            this.formPayload = {
                ...this.formPayload,
                order: {
                    ...this.formPayload.order,
                    total_item: qty,
                    total_price: totalPrice
                }
            }

            if (this.subtotalPrice) {
                this.visibleButton = true 
            } else {
                this.visibleButton = false 
            }
        },
        onChangeOnlyPayment (data) {
            this.formPayload = {
                ...this.formPayload,
                payment: data ? data : null,
                order: {
                    ...this.formPayload.order,
                    payment_id: data ? data.id : 0,
                    payment_name: data ? data.name : ''
                }
            }
        },
        onChangeOnlyTable (data) {
            this.formPayload = {
                ...this.formPayload,
                table: data ? data : null,
                order: {
                    ...this.formPayload.order,
                    table_id: data ? data.id : 0,
                    table_name: data ? data.name : ''
                }
            }
        },
        onChangeOnlyShop (data) {
            this.formPayload = {
                ...this.formPayload,
                shop: data ? data : null,
                order: {
                    ...this.formPayload.order,
                    shop_id: data ? data.id : 0,
                    shop_name: data ? data.name : ''
                }
            }
        },
        onChangeOnlyCustomer (data) { 
            this.formPayload = {
                ...this.formPayload,
                customer: data ? data : null,
                order: {
                    ...this.formPayload.order,
                    customer_id: data ? data.id : 0,
                    customer_name: data ? data.name : '',
                    note: data ? data.name : ''
                }
            }
        },
        onCancelOrder () {
            this.makeToast('Order Canceled')
            this.$cookies.remove('orderItem')
            this.$cookies.remove('orderTable')
            this.$cookies.remove('orderPayment')
            this.$router.replace({ name: 'customer-main' })
        },
        async onSaveOrder () {
            this.visibleLoaderSave = true

            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const time = new Date().getTime()
            const data = {
                ...this.formPayload,
                order: {
                    ...this.formPayload.order,
                    order_id: 'ODR-' + time.toString()
                }
            }
            
            const rest = await axios.post('/api/order/postCustomer', data, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                this.visibleAlertSave = false
                this.onShowHideSave()
                this.makeToast('Your Order Created')
                this.getLocalCartCount()
                this.getLocalOrderCount()
                this.sendSocketOrder(data.order.order_id)
                this.$cookies.remove('orderItem')
                this.$cookies.remove('orderTable')
                this.$cookies.remove('orderPayment')
                this.$router.replace({ name: 'customer-order' })
            } else {
                this.visibleAlertSave = false
                this.onShowHideSave()
                this.makeToast('Order Failed to Create')
            }
        },
        async saveNotif (title, subtitle) {
            const time = new Date().getTime()

            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const payload = {
                id: '',
                notification_id: 'NF-' + time,
                image: '',
                title: title,
                link: '',
                status: 'active',
                subtitle: subtitle,
                is_read: 0,
                owner_id: this.dataShop.user_id
            }

            const rest = await axios.post('/api/notification/postOwner', payload, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                this.visibleLoader = false 
            } else {
                this.visibleLoader = false 
            }
        },
        sendSocketOrder (order_id) {
            const payload = {
                order_id: order_id,
                customer_id: this.selectedCustomer ? this.selectedCustomer.id : '',
                owner_id: this.dataUser ? this.dataUser.id : '',
                title: 'You have new order',
                subtitle: order_id,
                link: 'localhost:8088'
            }

            this.$socket.emit('order', payload)
            this.saveNotif(payload.title, payload.subtitle)
        }
    }
}
</script>