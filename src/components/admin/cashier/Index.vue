<template>
    <div id="App">
        <div class="form-checkout">
            <div class="left">
                <div class="scroll">
                    <!-- <div>
                        <AppTabs 
                            :selectedIndex="selectedTabIndex" 
                            :path="'main-topic'"
                            :data="tabs" 
                            :isScrollable="false" 
                            :onChange="(data) => onChangeTabs(data)" 
                            class="margin margin-bottom-15-px" />
                    </div> -->
                    <div v-if="selectedTabIndex === 0">
                        <FormProduct 
                            :onChange="(data) => onChange(data)" />
                    </div>
                    <div v-if="selectedTabIndex === 1">
                        <FormOrders 
                            :onChange="(data) => onChangeOrders(data)" />
                    </div>
                </div>
            </div>
            <div class="right">
                <div class="scroll">
                    <FormCheckout 
                        :data.sync="items"
                        :onCheckOut="(data) => onCheckOut(data)"
                        :onSave="(data) => onSave(data)"
                        :onDelete="(data) => onDelete(data)" />
                </div>
            </div>
        </div>

        <div :class="visibleCheckOut ? 'content-form' : 'content-form hide'">
            <div class="right">
                <AppSideForm
                    :title="'Check Out'"
                    :enableSaveButton="selectedTable && selectedPayment ?  true : false"
                    :onSave="onShowHideSave"
                    :onClose="onButtonCheckOut"
                >
                    <div>
                        <div class="display-flex" style="margin-bottom: 15px;">
                            <div style="width: 100%;">
                                <div class="fonts fonts-10 grey">Subtotal</div>
                                <div class="fonts fonts-12 semibold orange">Rp. {{ order.order.total_price }}</div>
                            </div>
                            <div style="width: 30px;"></div>
                            <div style="width: 100%;">
                                <div class="fonts fonts-10 grey">PPN (0%)</div>
                                <div class="fonts fonts-12 semibold">Rp. 0</div>
                            </div>
                        </div>
                        <div style="margin-bottom: 15px;">
                            <div class="fonts fonts-10 grey">Payment Status</div>
                            <div class="fonts fonts-12 semibold">{{ order.order.payment_status ? 'Paid' : 'Unpaid' }}</div>
                        </div>
                        <div class="display-flex">
                            <div class="field-group margin margin-bottom-15-px">
                                <div class="fonts fonts-10 grey" style="margin-bottom: 5px;">Bills</div>
                                <input 
                                    type="number" 
                                    placeholder="" 
                                    class="field field-sekunder" 
                                    name="bills_price" 
                                    id="bills_price" 
                                    @keyup="onChangeBills"
                                    v-model="order.order.bills_price">
                                <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                                    {{ formMessage && formMessage.bills_price && formMessage.bills_price[0] }}
                                </div>
                            </div>
                            <div style="width: 30px;"></div>
                            <div class="field-group margin margin-bottom-15-px">
                                <div class="fonts fonts-10 grey" style="margin-bottom: 5px;">Change</div>
                                <input 
                                    type="number" 
                                    placeholder="" 
                                    class="field field-sekunder" 
                                    name="change_price" 
                                    id="change_price" 
                                    v-model="order.order.change_price"
                                    readonly>
                                <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                                    {{ formMessage && formMessage.change_price && formMessage.change_price[0] }}
                                </div>
                            </div>
                        </div>
                        <div class="width width-100 margin margin-bottom-20-px">
                            <div class="fonts fonts-10 grey" style="margin-bottom: 5px;">Table</div>
                            <div class="card border-full" style="padding: 10px; width: calc(100% - 20px);">
                                <div class="display-flex space-between">
                                    <div v-if="selectedTable" class="display-flex">
                                        <div style="width: 45px; margin-right: 15px">
                                            <div class="image image-padding" style="background-color: rgba(0, 0, 0, 0)">
                                                <img alt="" :src="selectedTable ? (tableImageThumbnailUrl + selectedTable.image) : ''" />
                                            </div>
                                        </div>
                                        <div style="width: calc(100% - 60px);">
                                            <div style="width: 100%;">
                                                <div class="fonts fonts-10 semibold black">
                                                    {{ selectedTable && selectedTable.name }}
                                                </div>
                                                <div class="fonts fonts-10 grey">
                                                    {{ selectedTable && selectedTable.code }} | {{ selectedTable && selectedTable.description }}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-else>
                                        <div class="fonts fonts-10 semibold" style="margin-top: 10px; margin-left: 10px;">Choose visible table</div>
                                    </div>
                                    <div style="width: 40px;">
                                        <button class="btn btn-icon btn-main-reverse with-hover" @click="openTable">
                                            <i class="fa fa-lg fa-arrow-right" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="width width-100 margin margin-bottom-20-px">
                            <div class="fonts fonts-10 grey" style="margin-bottom: 5px;">Payment</div>
                            <div class="card border-full" style="padding: 10px; width: calc(100% - 20px);">
                                <div class="display-flex space-between">
                                    <div v-if="selectedPayment" class="display-flex">
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
                                        </div>
                                    </div>
                                    <div v-else>
                                        <div class="fonts fonts-10 semibold" style="margin-top: 10px; margin-left: 10px;">Choose payment method</div>
                                    </div>
                                    <div style="width: 40px;">
                                        <button class="btn btn-icon btn-main-reverse with-hover" @click="openPayment">
                                            <i class="fa fa-lg fa-arrow-right" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="field-group margin margin-bottom-15-px">
                            <div class="fonts fonts-10 grey" style="margin-bottom: 0;">Notes</div>
                            <div class="fonts fonts-10 grey" style="margin-bottom: 10px;">You can put the initial name order</div>
                            <textarea 
                                name="note" 
                                id="note" 
                                class="field field-sekunder field-textarea" 
                                v-model="order.order.note"></textarea>
                            <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                                {{ formMessage && formMessage.note && formMessage.note[0] }}
                            </div>
                        </div>
                    </div>
                </AppSideForm>
            </div>
        </div>

        <FormPayment
            v-if="visiblePopupPayment"
            :selectedID="selectedPayment && selectedPayment.id ? selectedPayment.id : 0" 
            :data.sync="dataPayment"
            :onClose="openPayment"
            :onChange="(data) => onChangePayment(data)"
        />

        <FormTable
            v-if="visiblePopupTable"
            :selectedID="selectedTable && selectedTable.id ? selectedTable.id : 0"
            :data.sync="dataTable"
            :onClose="openTable"
            :onChange="(data) => onChangeTable(data)"
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
import { mapActions, mapGetters } from 'vuex'
import axios from 'axios'
import FormProduct from './FormProduct'
import FormOrders from './FormOrders'
import FormCheckout from './FormCheckout'
import CardPayment from './CardPayment'
import AppPopupForm from '../../modules/AppPopupForm'
import AppAlert from '../../modules/AppAlert'
import AppTabs from '../../modules/AppTabs'
import AppSideForm from '../../modules/AppSideForm'
import FormTable from './FormTable'
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
        shipment_name: '',
        config_id: null,
        shop_id: '',
        customer_id: '',
        table_id: '',
        address_id: '',
        shipment_id: '',
        payment_id: ''
    },
    details: [],
    customer: null,
    table: null,
    address: null,
    shipment: null,
    payment: null,
    shop: null,
    config: null
}

export default {
    name: 'App',
    data () {
        return {
            tabs: [
                {label: 'Products', status: 'active'},
                {label: 'Orders', status: ''},
            ],
            selectedTabIndex: 0,
            visibleLoaderSave: false,
            visibleAlertSave: false,
            visibleAlertCancel: false,
            visiblePopupPayment: false,
            visiblePopupTable: false,
            visibleCheckOut: false,
            formClass: false,
            items: [],
            order: {...payloadOrder},
            formMessage: null,

            // payment
            selectedPayment: null ,
            dataPayment: [],

            // table
            selectedTable: null ,
            dataTable: [],

            // shop
            dataShop: null,
            dataUser: null
        }
    },
    mounted () {
        this.getDataPayment()
        this.getDataTable()

        const order = this.$cookies.get('orderItem')
        const cart = this.cartItems ? this.cartItems : order ? order : []
        this.items = cart && cart.details ? cart.details : []
        this.selectedTable = cart && cart.table ? cart.table : null 
        this.selectedPayment = cart && cart.payment ? cart.payment : null
        this.order = order ? order : payloadOrder
        this.dataUser = this.$cookies.get('user')
        this.dataShop = this.$cookies.get('shop')
    },
    components: {
        CardPayment,
        AppSideForm,
        AppTabs,
        AppAlert,
        AppPopupForm,
        FormProduct,
        FormOrders,
        FormCheckout,
        FormTable,
        FormPayment
    },
    computed: {
        ...mapGetters({
            cartItems: 'cart/data'
        })
    },
    methods: {
        ...mapActions({
            setToast: 'toast/setToast',
            setCart: 'cart/setData',
            getCount: 'cart/getCount',
            getCountOrder: 'order/getCount'
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
        getLocalOrderCount () {
            const token = 'Bearer '.concat(this.$cookies.get('token'))
            this.getCountOrder(token)
        },
        onChangeTabs (index) {
            this.selectedTabIndex = index
        },

        // order
        onCancelOrder () {
            this.makeToast('Order Canceled')
        },
        onShowHideSave () {
            this.visibleAlertSave = !this.visibleAlertSave
        },
        onShowHideCancel () {
            this.visibleAlertCancel = !this.visibleAlertCancel
        },

        async onSaveOrder () {
            this.visibleLoaderSave = true

            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const time = new Date().getTime()
            const data = {
                ...this.order,
                order: {
                    ...this.order.order,
                    order_id: 'ODR-' + time.toString(),
                    status: 'confirmed',
                    shop_id: this.dataShop.id,
                    shop_name: this.dataShop.name 
                }
            }

            console.log('payload', data)
            
            const rest = await axios.post('/api/order/postAdmin', data, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                this.order = {...payloadOrder}
                this.visibleLoaderSave = false
                this.visibleCheckOut = false
                this.visibleAlertSave = false
                this.getLocalCartCount()
                this.getLocalOrderCount()
                this.makeToast('Your Order Created')
                this.setCart(null)
                this.$cookies.remove('orderItem')
            } else {
                this.visibleLoaderSave = false
                this.visibleAlertSave = false
                this.makeToast('Order Failed to Create')
            }
        },

        // orders
        onChangeOrders (data) {
            console.log('onChangeOrders', data)
        },

        // check out
        onButtonCheckOut () {
            this.visibleCheckOut = !this.visibleCheckOut
        },
        onChangeBills () {
            const bills = parseInt(this.order.order.bills_price)
            const ttl_price = parseInt(this.order.order.total_price)
            let ttl = (bills - ttl_price)
            this.order = {
                ...this.order,
                order: {
                    ...this.order.order,
                    bills_price: bills,
                    change_price: ttl,
                    payment_status: ttl > 0 ? 1 : 0
                }
            }
        },
        onSave (data) {
            this.onSetOrder(data)
            this.makeToast('Product updated')
        },
        onDelete (data) {
            const payload = this.items
            let newPayload = []
            payload && payload.map((dt, index) => {
                if (data !== index) {
                    newPayload.push({...dt})
                }
            })
            this.onSetOrder(newPayload)
        },
        onChange (data) {
            const payload = this.items
            payload.push(data)
            this.onSetOrder(payload)
        },
        onSetOrder (items) {
            const payload = {
                ...this.order,
                details: items  
            }
            this.order = payload
            this.setCart(this.order)
            this.$cookies.set('orderItem', JSON.stringify(this.order))
        },
        onCheckOut (data) {
            let subTotal = 0
            let subQty = 0
            data && data.map((dt) => {
                subQty += dt.quantity
                subTotal += dt.subtotal
            })
            const payload = {
                ...this.order,
                order: {
                    ...this.order.order,
                    total_item: subQty,
                    total_price: subTotal,
                    bills_price: 0,
                    change_price: 0
                },
                details: data 
            }
            this.order = payload
            this.onButtonCheckOut()
        },

        // table
        openTable () {
            this.visiblePopupTable = !this.visiblePopupTable
        },
        onChangeTable (data) {
            const payload = {
                ...this.order,
                order: {
                    ...this.order.order,
                    table_id: data.id,
                    table_name: data.name
                },
                table: data
            }
            this.order = payload
            this.selectedTable = data 

            this.setCart(this.order)
            this.$cookies.set('orderItem', JSON.stringify(this.order))
            this.openTable()
            this.makeToast('Table updated')
        },

        // payments
        openPayment () {
            this.visiblePopupPayment = !this.visiblePopupPayment
        },
        onChangePayment (data) {
            const payload = {
                ...this.order,
                order: {
                    ...this.order.order,
                    payment_id: data.id,
                    payment_name: data.name
                },
                payment: data
            }
            this.order = payload
            this.selectedPayment = data 

            this.setCart(this.order)
            this.$cookies.set('orderItem', JSON.stringify(this.order))
            this.openPayment()
            this.makeToast('Payment updated')
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
        },
        async getDataTable () {
            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const payload = {
                limit: 1000,
                offset: 0,
                status: 'active'
            }
            const rest = await axios.post('/api/table/getAll', payload, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                const data = rest.data.data
                this.dataTable = data
            }
        }
    },
    watch: {
        cartItems (props) {
            if (props) {
                this.items = props.details
            } else {
                this.items = []
            }
        }
    }
}
</script>
