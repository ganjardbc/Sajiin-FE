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
                                        <i v-if="selectedCustomer && !selectedCustomer.image" class="post-center fa fa-lg fa-user-circle" style="color: #999;" />
                                        <img v-else :src="selectedCustomer ? (customerImageThumbnailUrl + selectedCustomer.image) : ''" alt="" class="post-center">
                                    </div>
                                </div>
                                <div style="width: calc(100% - 70px);">
                                    <div class="fonts fonts-11 semibold" style="margin-bottom: 5px;">{{ selectedCustomer && selectedCustomer.name ? selectedCustomer.name : '-' }}</div>
                                    <div class="display-flex" style="margin-bottom: 5px;">
                                        <div style="width: 25px;">
                                            <i class="fa fa-lw fa-envelope" style="font-size: 14px; color: #555;" />
                                        </div>
                                        <div class="fonts fonts-10 grey">{{ selectedCustomer && selectedCustomer.email ? selectedCustomer.email : '-' }}</div>
                                    </div>
                                    <div class="display-flex" style="margin-bottom: 5px;">
                                        <div style="width: 25px;">
                                            <i class="fa fa-lw fa-phone" style="font-size: 14px; color: #555;" />
                                        </div>
                                        <div class="fonts fonts-10 grey">{{ selectedCustomer && selectedCustomer.phone ? selectedCustomer.phone : '-' }}</div>
                                    </div>
                                    <div class="display-flex">
                                        <div style="width: 25px;">
                                            <i class="fa fa-lw fa-info-circle" style="font-size: 14px; color: #555;" />
                                        </div>
                                        <div class="fonts fonts-10 grey">{{ selectedCustomer && selectedCustomer.about ? selectedCustomer.about : '-' }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- <div style="margin-top: 30px; padding-bottom: 15px;">
                            <div class="fonts fonts-10 black semibold" style="margin-bottom: 10px;">Table</div>
                            <AppButtonTable 
                                :enableDetail="true"
                                :isFull="true" 
                                :onChange="(data) => onChangeTable(data)" 
                                style="width: 100%; margin-bottom: 15px;" />
                        </div> -->
                        
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
                                        <!-- <button class="btn btn-icon btn-main-reverse with-hover" @click="openPayment">
                                            <i class="fa fa-lg fa-arrow-right" />
                                        </button> -->
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
                                        <!-- <button class="btn btn-icon btn-main-reverse with-hover" @click="openPayment">
                                            <i class="fa fa-lg fa-arrow-right" />
                                        </button> -->
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
                                            <div class="fonts fonts-10 semibold black">{{ 'Rp. 0' }}</div>
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
                                            v-if="selectedPayment && selectedCustomer" 
                                            class="btn btn-main btn-full" 
                                            @click="onShowHideSave">
                                            Order Now
                                        </button>
                                        <button v-else class="btn btn-primary btn-full">
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

        <FormCustomer 
            v-if="visiblePopupCustomer" 
            :selectedID="selectedCustomer && selectedCustomer.id ? selectedCustomer.id : 0" 
            :data.sync="dataCustomer"
            :onChange="(data) => onChangeCustomer(data)"
            :onClose="openCustomer" 
        />
        
        <FormAddress 
            v-if="visiblePopupAddress"
            :selectedID="selectedAddress && selectedAddress.id ? selectedAddress.id : 0" 
            :data.sync="dataAddress"
            :onClose="openAddress"
            :onChange="(data) => onChangeAddress(data)"
        />

        <FormShipment
            v-if="visiblePopupShipment"
            :selectedID="selectedShipment && selectedShipment.id ? selectedShipment.id : 0" 
            :data.sync="dataShipment"
            :onClose="openShipment"
            :onChange="(data) => onChangeShipment(data)"
        />

        <FormPayment
            v-if="visiblePopupPayment"
            :selectedID="selectedPayment && selectedPayment.id ? selectedPayment.id : 0" 
            :data.sync="dataPayment"
            :onClose="openPayment"
            :onChange="(data) => onChangePayment(data)"
        />

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
            formPayload: null,
            data: [],
            dataPayment: [],
            dataShipment: [],
            dataUser: null,
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

        this.data = orderItem.details
        this.dataUser = this.$cookies.get('admin')
        this.formPayload = {...orderItem}
        this.selectedTable = orderItem && orderItem.table ? orderItem.table : this.$cookies.get('table')
        this.selectedCustomer = orderItem && orderItem.customer ? orderItem.customer : this.$cookies.get('customer')
        // this.selectedAddress = orderItem && orderItem.address ? orderItem.address : null
        // this.visibleAddress = this.selectedCustomer ? true : false
        // this.selectedShipment = orderItem && orderItem.shipment ? orderItem.shipment : null
        this.selectedPayment = orderItem && orderItem.payment ? orderItem.payment : null
        // const csID = this.selectedCustomer ? this.selectedCustomer.customer_id : null

        this.onTotal(this.data)
        this.onChangeOnlyTable(this.selectedTable)
        this.onChangeOnlyCustomer(this.selectedCustomer)
        
        // this.getDataCustomer()
        // this.getDataAddress(csID)
        this.getDataPayment()
        // this.getDataShipment()

        console.log('orderItem', orderItem)
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
        onCancelOrder () {
            this.makeToast('Order Canceled')
            this.$cookies.remove('orderItem')
            this.$cookies.remove('table')
            this.$router.push({ name: 'customer-main' })
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

            // console.log('formPayload', this.formPayload)

            if (this.subtotalPrice) {
                this.visibleButton = true 
            } else {
                this.visibleButton = false 
            }
        },
        onChangeOnlyTable (data) {
            this.formPayload = {
                ...this.formPayload,
                table: data ? data : null,
                order: {
                    ...this.formPayload.order,
                    table_id: data ? data.id : 0,
                }
            }
            // console.log('onChangeOnlyTable', this.formPayload)
            this.$cookies.set('orderItem', JSON.stringify(this.formPayload))
        },
        onChangeOnlyCustomer (data) {
            this.visibleAddress = true 
            this.selectedAddress = null 
            this.formPayload = {
                ...this.formPayload,
                customer: data ? data : null,
                address: null,
                order: {
                    ...this.formPayload.order,
                    customer_id: data ? data.id : 0,
                    address_id: null
                }
            }
            this.$cookies.set('orderItem', JSON.stringify(this.formPayload))
        },
        onChangeTable (data) {
            this.onChangeOnlyTable (data)
        },
        onChangeCustomer (data) {
            this.selectedCustomer = data.customer
            this.dataAddress = data.address
            this.visibleAddress = true 
            this.selectedAddress = null 
            this.formPayload = {
                ...this.formPayload,
                customer: this.selectedCustomer,
                address: null,
                order: {
                    ...this.formPayload.order,
                    customer_id: this.selectedCustomer.id,
                    address_id: 0
                }
            }
            this.$cookies.set('orderItem', JSON.stringify(this.formPayload))
            this.openCustomer()
            this.makeToast('Customer Updated')
            // console.log('onChangeCustomer', data)
        },
        onChangeAddress (data) {
            this.selectedAddress = data 
            this.formPayload = {
                ...this.formPayload,
                address: this.selectedAddress,
                order: {
                    ...this.formPayload.order,
                    address_id: this.selectedAddress.id 
                }
            }
            this.$cookies.set('orderItem', JSON.stringify(this.formPayload))
            this.openAddress()
            this.makeToast('Address Customer Updated')
            // console.log('onChangeAddress', data)
        },
        onChangeShipment (data) {
            this.selectedShipment = data 
            this.formPayload = {
                ...this.formPayload,
                shipment: this.selectedShipment,
                order: {
                    ...this.formPayload.order,
                    shipment_id: this.selectedShipment.id 
                }
            }
            this.$cookies.set('orderItem', JSON.stringify(this.formPayload))
            this.openShipment()
            this.makeToast('Shipment Updated')
            // console.log('onChangeShipment', data)
        },
        onChangePayment (data) {
            this.selectedPayment = data 
            this.formPayload = {
                ...this.formPayload,
                payment: this.selectedPayment,
                order: {
                    ...this.formPayload.order,
                    payment_id: this.selectedPayment.id 
                }
            }
            this.$cookies.set('orderItem', JSON.stringify(this.formPayload))
            this.openPayment()
            this.makeToast('Shipment Updated')
            // console.log('onChangePayment', data)
        },
        openCustomer () {
            this.visiblePopupCustomer = !this.visiblePopupCustomer
        },
        openAddress () {
            this.visiblePopupAddress = !this.visiblePopupAddress
        },
        openShipment () {
            this.visiblePopupShipment = !this.visiblePopupShipment
        },
        openPayment () {
            this.visiblePopupPayment = !this.visiblePopupPayment
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
                this.$router.push({ name: 'customer-order-list' })
            } else {
                this.visibleAlertSave = false
                this.onShowHideSave()
                this.makeToast('Order Failed to Create')
            }

            // console.log('makeOrder', rest)
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

            // console.log('rest', rest)
        },
        async getDataShipment () {
            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const payload = {
                limit: 1000,
                offset: 0,
                status: 'active'
            }
            const rest = await axios.post('/api/shipment/getAll', payload, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                const data = rest.data.data
                this.dataShipment = data
            }

            // console.log('getDataShipment', rest)
        },
        async getDataCustomer () {
            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const payload = {
                limit: 1000,
                offset: 0,
                user_id: this.dataUser.id,
                status: 'active'
            }
            const rest = await axios.post('/api/customer/getAll', payload, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                const data = rest.data.data
                this.dataCustomer = data
            }
        },
        async getDataAddress (csID) {
            if (csID) {
                const token = 'Bearer '.concat(this.$cookies.get('token'))
                const payload = {
                    limit: 1000,
                    offset: 0,
                    customer_id: csID
                }
                const rest = await axios.post('/api/address/getAll', payload, { headers: { Authorization: token } })

                if (rest && rest.status === 200) {
                    const data = rest.data.data
                    this.dataAddress = data
                }
            } else {
                // console.log('csID not defined', csID)
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
        }
    }
}
</script>