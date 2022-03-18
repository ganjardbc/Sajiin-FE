<template>
    <div id="App">
        <!-- <div class="left-form">
            <div class="display-flex left card-dashboard-container" style="padding-bottom: 20px;">
                <h1 class="fonts big black bold">Cashier</h1>
            </div>

            <FormTableMonitoring 
                :visibleLoader.sync="visibleLoaderTable"
                :data.sync="dataAllTable"
                :onRefresh="getDataTable"
                :onChangeTable="onChangeMainTable"
            />

            <FormProduct 
                :onChange="(data) => onChange(data)" />
        </div>

        <div class="right-form">
            <div style="padding: 15px;">
                <FormCarts 
                    :data.sync="items"
                    :onClickClose="onVisibleCart"
                    :onCheckOut="(data) => onCheckOut(data)"
                    :onSave="(data) => onSave(data)"
                    :onDelete="(data) => onDelete(data)" />
            </div>
        </div> -->

        <div class="cashier-container">
            <div class="display-flex left card-dashboard-container" style="padding-bottom: 20px;">
                <h1 class="fonts big black bold">Cashier</h1>
            </div>

            <FormTableMonitoring 
                :visibleLoader.sync="visibleLoaderTable"
                :data.sync="dataAllTable"
                :onRefresh="getDataTable"
                :onChangeTable="onChangeMainTable"
            />

            <FormProduct 
                :onChange="(data) => onChange(data)" 
            />
        </div>

        <div :class="`content-form ${!visibleCart ? 'hide' : ''}`">
            <div class="right">
                <AppSideForm
                    :title="'Carts'"
                    :enableSaveButton="false"
                    :onClose="onVisibleCart"
                >
                    <FormCarts 
                        :data.sync="items"
                        :onClickClose="onVisibleCart"
                        :onCheckOut="(data) => onCheckOut(data)"
                        :onSave="(data) => onSave(data)"
                        :onDelete="(data) => onDelete(data)" />
                </AppSideForm>
            </div>
        </div>

        <div :class="`content-form ${!visibleCheckOut ? 'hide' : ''}`">
            <div class="right">
                <AppSideForm
                    :title="'Check Out'"
                    :enableSaveButton="true"
                    :onSave="onShowHideSave"
                    :onClose="onButtonCheckOut"
                >
                    <FormCheckout 
                        :order.sync="order"
                        :formMessage.sync="formMessage"
                        :selectedTable.sync="selectedTable"
                        :selectedPayment.sync="selectedPayment"
                        :onChangeBills="onChangeBills"
                        :onTable="openTable"
                        :onPayment="openPayment"
                    />
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
            :data.sync="dataActiveTable"
            :onClose="openTable"
            :onChange="(data) => onChangeTable(data)"
        />

        <FormCartsSmall 
            :data.sync="items"
            :onClick="onVisibleCart"
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
import FormCarts from './FormRightCarts'
import FormCartsSmall from './FormCartsSmall'
import FormCheckout from './FormCheckout'
import CardPayment from './CardPayment'
import AppPopupForm from '../../modules/AppPopupForm'
import AppAlert from '../../modules/AppAlert'
import AppSideForm from '../../modules/AppSideForm'
import FormTable from './FormTable'
import FormPayment from './FormPayment'
import FormTableMonitoring from './FormTableMonitoring'

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
            visibleCart: false,
            visibleLoaderTable: false,
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
        const order = this.$cookies.get('orderItem')
        const cart = this.cartItems ? this.cartItems : order ? order : []
        this.items = cart && cart.details ? cart.details : []
        this.selectedTable = cart && cart.table ? cart.table : null 
        this.selectedPayment = cart && cart.payment ? cart.payment : null
        this.order = order ? order : payloadOrder
        this.dataUser = this.$cookies.get('user')
        this.dataShop = this.$cookies.get('shop')

        this.getDataPayment()
        this.getDataTable()
    },
    components: {
        CardPayment,
        AppSideForm,
        AppAlert,
        AppPopupForm,
        FormProduct,
        FormOrders,
        FormCarts,
        FormCartsSmall,
        FormCheckout,
        FormTable,
        FormPayment,
        FormTableMonitoring
    },
    computed: {
        ...mapGetters({
            cartItems: 'cart/data'
        }),
        dataAllTable() {
            return this.dataTable
        },
        dataActiveTable() {
            return this.dataTable.filter((dt) => dt.status === 'active')
        }
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
        onVisibleCart () {
            this.visibleCart = !this.visibleCart
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
            
            const rest = await axios.post('/api/order/postAdmin', data, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                this.order = {...payloadOrder}
                this.visibleLoaderSave = false
                this.visibleCheckOut = false
                this.visibleCart = false
                this.visibleAlertSave = false
                this.getDataTable()
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
                    payment_status: ttl >= 0 ? 1 : 0
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
        onChangeMainTable(newData) {
            const oldData = this.dataTable
            let payload = oldData.map((dt, i) => {
                if (dt.id === newData.id) {
                    return {...newData}
                } else {
                    return {...dt}
                }
            })
            this.dataTable = payload
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
                status: 'active',
                shop_id: this.dataShop.id
            }
            const rest = await axios.post('/api/payment/getAll', payload, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                const data = rest.data.data
                this.dataPayment = data
            }
        },
        async getDataTable () {
            this.visibleLoaderTable = true
            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const payload = {
                limit: 1000,
                offset: 0,
                shop_id: this.dataShop.id
            }
            const rest = await axios.post('/api/table/getAll', payload, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                const data = rest.data.data
                this.dataTable = data
                this.visibleLoaderTable = false
            } else {
                this.visibleLoaderTable = false
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
