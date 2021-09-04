<template>
    <div id="form">
        <AppSideForm 
            :title="title" 
            :enableCreateButton="this.title === 'EDIT' ? selectedIndex === 5 ? true : false : false"
            :enableSaveButton="this.title !== 'VIEW' ? true : false"
            :onCreate="onButtonCreate"
            :onSave="onButtonSave"
            :onClose="onClose">

            <AppTabs 
                :selectedIndex="selectedIndex" 
                :path="'main-form-order'"
                :data="tabs" 
                :isScrollable="false" 
                :onChange="(data) => onChangeTabs(data)" 
                class="margin margin-bottom-15-px" />

            <div v-if="selectedIndex === 0">
                <div class="field-group margin margin-bottom-15-px">
                    <div class="field-label">ID</div>
                    <input 
                        type="text" 
                        placeholder="" 
                        class="field field-sekunder" 
                        name="id" 
                        id="id" 
                        v-model="formData.order.id"
                        readonly>
                </div>
                <div class="field-group margin margin-bottom-15-px">
                    <div class="field-label">ORDER ID</div>
                    <input 
                        type="text" 
                        placeholder="" 
                        class="field field-sekunder" 
                        name="order_id" 
                        id="order_id" 
                        v-model="formData.order.order_id"
                        readonly>
                    <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.order_id && formMessage.order_id[0] }}
                    </div>
                </div>
                <div class="field-group margin margin-bottom-15-px">
                    <div class="field-label">TOTAL ITEM</div>
                    <input 
                        type="number" 
                        placeholder="" 
                        class="field field-sekunder" 
                        name="total_item" 
                        id="total_item" 
                        v-model="formData.order.total_item"
                        readonly>
                    <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.total_item && formMessage.total_item[0] }}
                    </div>
                </div>
                <div class="field-group margin margin-bottom-15-px">
                    <div class="field-label">TOTAL PRICE</div>
                    <input 
                        type="text" 
                        placeholder="" 
                        class="field field-sekunder" 
                        name="total_price" 
                        id="total_price" 
                        v-model="formData.order.total_price"
                        readonly>
                    <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.total_price && formMessage.total_price[0] }}
                    </div>
                </div>
                <div class="field-group margin margin-bottom-15-px">
                    <div class="field-label">BILLS</div>
                    <input 
                        type="number" 
                        placeholder="" 
                        class="field field-sekunder" 
                        name="bills_price" 
                        id="bills_price" 
                        @keyup="onChangeBills"
                        v-model="formData.order.bills_price"
                        :readonly="this.title !== 'EDIT' ? true : false">
                    <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.bills_price && formMessage.bills_price[0] }}
                    </div>
                </div>
                <div class="field-group margin margin-bottom-15-px">
                    <div class="field-label">CHANGE</div>
                    <input 
                        type="number" 
                        placeholder="" 
                        class="field field-sekunder" 
                        name="change_price" 
                        id="change_price" 
                        v-model="formData.order.change_price"
                        readonly>
                    <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.change_price && formMessage.change_price[0] }}
                    </div>
                </div>
                <div class="field-group margin margin-bottom-15-px">
                    <div class="field-label">ORDER STATUS</div>
                    <div v-if="this.title === 'EDIT' ? true : false">
                        <select 
                            v-if="dataUser.role_name === 'owner' ? true : true"
                            class="cf-input slc slc-sekunder"
                            name="status" 
                            id="status" 
                            v-model="formData.order.status"
                            :readonly="this.title === 'VIEW' ? true : false">
                            <option v-for="(ctr, index) in formBpStatus" :value="ctr.value" :key="index">
                                {{ ctr.value }}
                            </option>
                        </select>
                        <div v-else>
                            <input 
                                type="text" 
                                placeholder="" 
                                class="field field-sekunder" 
                                name="order_status" 
                                id="order_status" 
                                style="text-transform: capitalize;"
                                :value="formData.order.status"
                                readonly>
                        </div>
                    </div>
                    <div v-else>
                        <input 
                            type="text" 
                            placeholder="" 
                            class="field field-sekunder" 
                            name="order_status" 
                            id="order_status" 
                            style="text-transform: capitalize;"
                            :value="formData.order.status"
                            readonly>
                    </div>
                    <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.status && formMessage.status[0] }}
                    </div>
                </div>
                <div class="field-group margin margin-bottom-15-px">
                    <div class="field-label">PAYMENT STATUS</div>
                    <div v-if="this.title === 'EDIT' ? true : false">
                        <div v-if="dataUser.role_name === 'owner' ? true : true" class="display-flex">
                            <label class="radio">
                                <input 
                                    type="radio" 
                                    name="payment_status"
                                    id="paid"
                                    value="1"
                                    v-model="formData.order.payment_status" />
                                <span class="checkmark" />
                                <span class="fonts micro">
                                    Paid
                                </span>
                            </label>

                            <label class="radio">
                                <input 
                                    type="radio" 
                                    name="payment_status"
                                    id="unpaid"
                                    value="0"
                                    v-model="formData.order.payment_status" />
                                <span class="checkmark" />
                                <span class="fonts micro">
                                    Unpaid
                                </span>
                            </label>
                        </div>
                        <div v-else>
                            <div style="width: 100%;">
                                <input 
                                    type="text" 
                                    placeholder="" 
                                    class="field field-sekunder" 
                                    name="payment_status" 
                                    id="payment_status" 
                                    style="text-transform: capitalize;"
                                    :value="formData.order.payment_status ? 'Paid' : 'Unpaid'"
                                    readonly>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <div style="width: 100%;">
                            <input 
                                type="text" 
                                placeholder="" 
                                class="field field-sekunder" 
                                name="payment_status" 
                                id="payment_status" 
                                style="text-transform: capitalize;"
                                :value="formData.order.payment_status ? 'Paid' : 'Unpaid'"
                                readonly>
                        </div>
                    </div>
                    <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.payment_status && formMessage.payment_status[0] }}
                    </div>
                </div>
                <div class="field-group margin margin-bottom-15-px">
                    <div class="field-label">NOTE</div>
                    <textarea 
                        name="note" 
                        id="note" 
                        class="field field-sekunder field-textarea" 
                        v-model="formData.order.note"
                        :readonly="this.title === 'VIEW' ? true : false"></textarea>
                    <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.note && formMessage.note[0] }}
                    </div>
                </div>
            </div>

            <div v-if="selectedIndex === 1">
                <div>
                    <div class="field-group margin margin-bottom-15-px">
                        <div class="field-label">ID</div>
                        <div v-if="this.title !== 'VIEW'" class="card-search full">
                            <input 
                                type="search" 
                                placeholder="" 
                                class="field"
                                name="shop_id" 
                                id="shop_id" 
                                v-model="formData.order.shop_id"
                                readonly>
                            <button class="btn btn-icon btn-white" @click="onButtonShop">
                                <i class="fa fa-1x fa-search" />
                            </button>
                        </div>
                        <div v-else>
                            <input 
                                type="search" 
                                placeholder="" 
                                class="field field-sekunder"
                                style="width: 100%;"
                                name="shop_id" 
                                id="shop_id" 
                                v-model="formData.order.shop_id"
                                readonly>
                        </div>
                        <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                            {{ formMessage && formMessage.shop_id && formMessage.shop_id[0] }}
                        </div>
                    </div>
                    <FormShop
                        :data.sync="selectedShop"
                        :enablePopup="openCreateShop"
                        :onChange="(data) => onChangeShop(data)"
                    />
                </div>
            </div>

            <div v-if="selectedIndex === 2">
                <div v-if="roleName !== 'customer'">
                    <div class="field-group margin margin-bottom-15-px">
                        <div class="field-label">ID</div>
                        <div v-if="this.title !== 'VIEW'" class="card-search full">
                            <input 
                                type="search" 
                                placeholder="" 
                                class="field"
                                name="table_id" 
                                id="table_id" 
                                v-model="formData.order.table_id"
                                readonly>
                            <button class="btn btn-icon btn-white" @click="onButtonTable">
                                <i class="fa fa-1x fa-search" />
                            </button>
                        </div>
                        <div v-else>
                            <input 
                                type="search" 
                                placeholder="" 
                                class="field field-sekunder"
                                style="width: 100%;"
                                name="table_id" 
                                id="table_id" 
                                v-model="formData.order.table_id"
                                readonly>
                        </div>
                        <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                            {{ formMessage && formMessage.table_id && formMessage.table_id[0] }}
                        </div>
                    </div>
                    <FormTable 
                        :data.sync="formData.table"
                        :enablePopup="openCreateTable"
                        :onChange="(data) => onChangeTable(data)"
                    />
                </div>
                <div v-else style="text-align: center;">
                    <div class="fonts micro semibold" >You have got owner access</div>
                </div>
            </div>

            <div v-if="selectedIndex === 3">
                <div v-if="roleName !== 'customer'">
                    <div class="field-group margin margin-bottom-15-px">
                        <div class="field-label">ID</div>
                        <div v-if="this.title !== 'VIEW'" class="card-search full">
                            <input 
                                type="search" 
                                placeholder="" 
                                class="field"
                                name="payment_id" 
                                id="payment_id" 
                                v-model="formData.order.payment_id"
                                readonly>
                            <button class="btn btn-icon btn-white" @click="onButtonPayment">
                                <i class="fa fa-1x fa-search" />
                            </button>
                        </div>
                        <div v-else>
                            <input 
                                type="search" 
                                placeholder="" 
                                class="field field-sekunder"
                                style="width: 100%;"
                                name="payment_id" 
                                id="payment_id" 
                                v-model="formData.order.payment_id"
                                readonly>
                        </div>
                        <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                            {{ formMessage && formMessage.payment_id && formMessage.payment_id[0] }}
                        </div>
                    </div>
                    <FormPayment
                        :data.sync="formData.payment"
                        :enablePopup="openCreatePayment"
                        :onChange="(data) => onChangePayment(data)"
                    />
                </div>
                <div v-else style="text-align: center;">
                    <div class="fonts micro semibold" >You have got owner access</div>
                </div>
            </div>

            <div v-if="selectedIndex === 4">
                <div v-if="title !== 'CREATE' ? true : false">
                    <FormProduct 
                        :selectedId.sync="formData.order.id"
                        :selectedOrderId.sync="formData.order.order_id"
                        :enableButton="title === 'EDIT' ? true : false"
                        :enablePopup="popupProductCreate"
                        :onCalculate="(data) => onCalculate(data)"
                    />
                </div>
                <div v-else style="text-align: center;">
                    <div class="fonts micro semibold" >You can add products after create this order</div>
                </div>
            </div>
        </AppSideForm>
    </div>
</template>

<script>
import AppSideForm from '../../modules/AppSideForm'
import AppTabs from '../../modules/AppTabs'
import AppImage from '../../modules/AppImage'
import FormCustomer from './FormCustomer'
import FormAddress from './FormAddress'
import FormShipment from './FormShipment'
import FormPayment from './FormPayment'
import FormTable from './FormTable'
import FormProduct from './FormProduct'
import FormShop from '../shops/FormShop'

const tabs = [
    {label: 'Data', status: 'active'},
    {label: 'Shop', status: ''},
    {label: 'Table', status: ''},
    {label: 'Payment', status: ''},
    {label: 'Products', status: ''}
]

const payload = {
    order: {
        id: '',
        order_id: '0',
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
        table_id: '',
        shop_id: '',
        customer_id: '',
        address_id: '',
        shipment_id: '',
        payment_id: ''
    },
    details: [],
    customer: {},
    address: {},
    shipment: {},
    payment: {},
    table: {}
}

const shop = {
    id: '',
    shop_id: '',
    image: '',
    name: '',
    about: '',
    email: '',
    phone: '',
    location: '',
    open_day: '',
    close_day: '',
    open_time: '',
    close_time: '',
    status: '',
    is_available: 0
}

export default {
    name: 'form',
    data () {
        return {
            image: '',
            openCreateShop: false,
            openCreateTable: false,
            openCreatePayment: false,
            openCreateShipment: false,
            openCreateAddress: false,
            openCreateCustomer: false,
            popupProductCreate: false,
            selectedIndex: 0,
            isView: false,
            tabs: tabs,
            selectedShop: {...shop},
            formData: {...payload},
            formMessage: [],
            formBpOrder: [],
            formBpStatus: [],
            dataUser: null,
            roleName: null
        }
    },
    mounted () {
        this.dataUser = this.$cookies.get('user')
        this.roleName = this.dataUser.role_name
        this.formData = {...payload}
    },
    components: {
        AppImage,
        FormShop,
        FormTable,
        FormProduct,
        FormPayment,
        FormShipment,
        FormAddress,
        FormCustomer,
        AppSideForm,
        AppTabs
    },
    props: {
        uploadImage: {
            type: Function,
            required: false,
        },
        removeImage: {
            type: Function,
            required: false,
        },
        bizparOrder: {
            required: true
        },
        bizparStatus: {
            required: true
        },
        data: {
            required: true
        },
        message: {
            required: false
        },
        title: {
            type: String,
            required: true
        },
        onSave: {
            type: Function,
            required: true
        },
        onClose: {
            type: Function,
            required: true
        }
    },
    methods: {
        onChangeShop (data) {
            this.formData = {
                ...this.formData,
                order: {
                    ...this.formData.order,
                    shop_id: data.id
                }
            }
            this.selectedShop = {...data}
        },
        onButtonShop () {
            this.openCreateShop = !this.openCreateShop
        },
        onButtonTable () {
            this.openCreateTable = !this.openCreateTable
        },
        onButtonPayment () {
            this.openCreatePayment = !this.openCreatePayment
        },
        onButtonShipment () {
            this.openCreateShipment = !this.openCreateShipment
        },
        onButtonAddress () {
            this.openCreateAddress = !this.openCreateAddress
        },
        onButtonCustomer () {
            this.openCreateCustomer = !this.openCreateCustomer
        },
        onButtonCreate () {
            this.popupProductCreate = !this.popupProductCreate
        },
        onButtonSave () {
            const time = new Date().getTime()
            const newPayload = this.title === 'CREATE' ? {
                ...this.formData,
                order: {
                    ...this.formData.order,
                    order_id: 'ODR-' + time.toString()
                }
            } : {
                ...this.formData
            }
            this.onSave(newPayload)
        },
        onChangeTabs (data) {
            this.selectedIndex = data
        },
        onChangeCustomer (data) {
            this.formData = {
                ...this.formData,
                order: {
                    ...this.formData.order,
                    customer_id: data.id
                },
                customer: {
                    ...data
                }
            }
        },
        onChangeAddress (data) {
            this.formData = {
                ...this.formData,
                order: {
                    ...this.formData.order,
                    address_id: data.id
                },
                address: {
                    ...data
                }
            }
        },
        onChangeShipment (data) {
            this.formData = {
                ...this.formData,
                order: {
                    ...this.formData.order,
                    shipment_id: data.id
                },
                shipment: {
                    ...data
                }
            }
        },
        onChangePayment (data) {
            this.formData = {
                ...this.formData,
                order: {
                    ...this.formData.order,
                    payment_id: data.id
                },
                payment: {
                    ...data
                }
            }
        },
        onChangeTable (data) {
            this.formData = {
                ...this.formData,
                order: {
                    ...this.formData.order,
                    table_id: data.id
                },
                table: {
                    ...data
                }
            }
        },
        onChangeDeliveryFee () {
            let ttl = (parseInt(this.formData.order.total_price) + parseInt(this.formData.order.delivery_fee))
            this.formData = {
                ...this.formData,
                order: {
                    ...this.formData.order,
                    total_price: ttl,
                }
            }
        },
        onCalculate (data) {
            var quantity = 0
            var subtotal = 0
            data && data.map((dt) => {
                quantity += dt.quantity
                subtotal += dt.subtotal
            })
            this.formData = {
                ...this.formData,
                order: {
                    ...this.formData.order,
                    total_price: (subtotal + this.formData.order.delivery_fee),
                    total_item: quantity
                }
            }
        },
        onChangeBills () {
            const bills = parseInt(this.formData.order.bills_price)
            const ttl_price = parseInt(this.formData.order.total_price)
            let ttl = (bills - ttl_price)
            this.formData = {
                ...this.formData,
                order: {
                    ...this.formData.order,
                    bills_price: bills,
                    change_price: ttl,
                    payment: ttl > 0 ? 1 : 0
                }
            }
        },
    },
    watch: {
        data: function (props, prevProps) {
            if (props) {
                this.formData = {
                    ...this.formData,
                    order: {
                        ...this.formData.order,
                        id: props.order.id,
                        order_id: props.order.order_id,
                        delivery_fee: props.order.delivery_fee,
                        total_price: props.order.total_price,
                        total_item: props.order.total_item,
                        bills_price: props.order.bills_price,
                        change_price: props.order.change_price,
                        payment_status: props.order.payment_status,
                        proof_of_payment: props.order.proof_of_payment,
                        status: props.order.status,
                        type: props.order.type,
                        note: props.order.note,
                        table_id: props.order.table_id,
                        shop_id: props.order.shop_id,
                        customer_id: props.order.customer_id,
                        address_id: props.order.address_id,
                        shipment_id: props.order.shipment_id,
                        payment_id: props.order.payment_id
                    },
                    details: [
                        ...props.details
                    ],
                    customer: {
                        ...props.customer
                    },
                    address: {
                        ...props.address
                    },
                    shipment: {
                        ...props.shipment
                    },
                    payment: {
                        ...props.payment
                    },
                    table: {
                        ...props.table
                    }
                }
                this.selectedShop = {
                    ...this.selectedShop,
                    id: props.shop.id,
                    shop_id: props.shop.shop_id,
                    name: props.shop.name,
                    status: props.shop.status,
                    about: props.shop.about
                }
            } else {
                this.formData = {...payload}
                this.selectedShop = {...shop}
            }
            this.onChangeTabs(0)
        },
        bizparOrder: function (props, prevProps) {
            if (props) {
                this.formBpOrder = props
            } else {
                this.formBpOrder = []
            }
        },
        bizparStatus: function (props, prevProps) {
            if (props) {
                this.formBpStatus = props
            } else {
                this.formBpStatus = []
            }
        },
        message: function (props, prevProps) {
            if (props) {
                this.formMessage = props
            } else {
                this.formMessage = []
            }
        }
    }
}
</script>