<template>
    <div id="form">
        <AppSideForm 
            :title="title" 
            :enableSaveButton="this.title !== 'VIEW' ? true : false"
            :onSave="onButtonSave"
            :onClose="onClose">

            <AppTabs 
                :selectedIndex="selectedIndex" 
                :data="tabs" 
                :onChange="(data) => onChangeTabs(data)" 
                class="margin margin-bottom-15-px" />
            
            <div v-if="selectedIndex === 0">
                <div v-if="this.title !== 'CREATE' ? true : false" class="field-group margin margin-bottom-15-px">
                    <div class="field-label">IMAGE</div>
                    <AppImage 
                        :image.sync="image"
                        :isEnable="false"
                    />
                </div>
                <div class="field-group margin margin-bottom-15-px">
                    <div class="field-label">ID</div>
                    <input 
                        type="text" 
                        placeholder="" 
                        class="field field-sekunder" 
                        name="id" 
                        id="id" 
                        v-model="formData.id"
                        readonly>
                </div>
                <div class="field-group margin margin-bottom-15-px">
                    <div class="field-label">CART ID</div>
                    <input 
                        type="text" 
                        placeholder="" 
                        class="field field-sekunder" 
                        name="cart_id" 
                        id="cart_id" 
                        v-model="formData.cart_id"
                        readonly>
                    <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.cart_id && formMessage.cart_id[0] }}
                    </div>
                </div>
                <div class="field-group margin margin-bottom-15-px">
                    <div class="field-label">PRODUCT NAME</div>
                    <div class="card-search full">
                        <input 
                            type="search" 
                            placeholder="" 
                            class="field"
                            name="product_name" 
                            id="product_name" 
                            :style="this.title === 'VIEW' ? 'width: 100%;' : ''"
                            v-model="formData.product_name"
                            readonly>
                        <button v-if="this.title === 'VIEW' ? false : true" class="btn btn-icon btn-white" @click="onOpenProduct">
                            <i class="fa fa-1x fa-search" />
                        </button>
                    </div>
                    <div v-if="formMessage" class="fonts micro semibold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.product_name && formMessage.product_name[0] }}
                    </div>
                </div>
                <div class="field-group margin margin-bottom-15-px">
                    <div class="field-label">PRODUCT DETAIL</div>
                    <div class="card-search full">
                        <input 
                            type="search" 
                            placeholder="" 
                            class="field"
                            name="product_detail" 
                            id="product_detail" 
                            :style="this.title === 'VIEW' ? 'width: 100%;' : ''"
                            v-model="formData.product_detail"
                            readonly>
                        <button v-if="this.title === 'VIEW' ? false : true" class="btn btn-icon btn-white" @click="onOpenDetail">
                            <i class="fa fa-1x fa-search" />
                        </button>
                    </div>
                    <div v-if="formMessage" class="fonts micro semibold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.product_detail && formMessage.product_detail[0] }}
                    </div>
                </div>
                <div class="field-group margin margin-bottom-15-px">
                    <div class="field-label">PRODUCT TOPING</div>
                    <div class="card-search full">
                        <input 
                            type="search" 
                            placeholder="" 
                            class="field"
                            name="product_toping" 
                            id="product_toping" 
                            :style="this.title === 'VIEW' ? 'width: 100%;' : ''"
                            v-model="formData.product_toping"
                            readonly>
                        <button v-if="this.title === 'VIEW' ? false : true" class="btn btn-icon btn-white" @click="onOpenToping">
                            <i class="fa fa-1x fa-search" />
                        </button>
                    </div>
                    <div v-if="formMessage" class="fonts micro semibold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.product_toping && formMessage.product_toping[0] }}
                    </div>
                </div>
                <div class="field-group margin margin-bottom-15-px">
                    <div class="field-label">PRODUCT PRICE</div>
                    <input 
                        type="text" 
                        placeholder="" 
                        class="field field-sekunder" 
                        name="price" 
                        id="price" 
                        readonly
                        v-model="formData.price">
                    <div v-if="formMessage" class="fonts micro semibold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.price && formMessage.price[0] }}
                    </div>
                </div>
                <div class="field-group margin margin-bottom-15-px">
                    <div class="field-label">TOPING PRICE</div>
                    <input 
                        type="text" 
                        placeholder="" 
                        class="field field-sekunder" 
                        name="toping_price" 
                        id="toping_price" 
                        readonly
                        v-model="formData.toping_price">
                    <div v-if="formMessage" class="fonts micro semibold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.toping_price && formMessage.toping_price[0] }}
                    </div>
                </div>
                <div class="field-group margin margin-bottom-15-px">
                    <div class="field-label">DISCOUNT</div>
                    <input 
                        type="text" 
                        placeholder="" 
                        class="field field-sekunder" 
                        name="discount" 
                        id="discount" 
                        readonly
                        v-model="formData.discount">
                    <div v-if="formMessage" class="fonts micro semibold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.discount && formMessage.discount[0] }}
                    </div>
                </div>
                <div class="field-group margin margin-bottom-15-px">
                    <div class="field-label">QUANTITY</div>
                    <input 
                        type="number" 
                        placeholder="" 
                        class="field field-sekunder" 
                        name="quantity" 
                        id="quantity" 
                        @change="onTotal"
                        v-model="formData.quantity"
                        :readonly="this.title === 'VIEW' ? true : false">
                    <div v-if="formMessage" class="fonts micro semibold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.quantity && formMessage.quantity[0] }}
                    </div>
                </div>
                <div class="field-group margin margin-bottom-15-px">
                    <div class="field-label">SUBTOTAL</div>
                    <input 
                        type="text" 
                        placeholder="" 
                        class="field field-sekunder" 
                        name="subtotal" 
                        id="subtotal" 
                        readonly
                        v-model="formData.subtotal">
                    <div v-if="formMessage" class="fonts micro semibold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.subtotal && formMessage.subtotal[0] }}
                    </div>
                </div>
            </div>

            <div v-if="selectedIndex === 1">
                <div class="field-group margin margin-bottom-15-px">
                    <div class="field-label">OWNER ID</div>
                    <div v-if="this.title !== 'VIEW'" class="card-search full">
                        <input 
                            type="search" 
                            placeholder="" 
                            class="field"
                            name="owner_id" 
                            id="owner_id" 
                            v-model="formData.owner_id"
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
                            name="owner_id" 
                            id="owner_id" 
                            v-model="formData.owner_id"
                            readonly>
                    </div>
                    <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.owner_id && formMessage.owner_id[0] }}
                    </div>
                </div>
                <FormCustomer
                    :data.sync="selectedCustomer"
                    :enablePopup="openCreateCustomer"
                    :onChange="(data) => onChangeCustomer(data)"
                />
            </div>
        </AppSideForm>

        <AppPopupForm
            v-if="visiblePopupProduct"
            :title="'Choose Product'"
            :onClose="onOpenProduct"
        >
            <div style="overflow-x: auto;">
                <table>
                    <thead>
                        <th class="normal-col">PRODUCT ID</th>
                        <th>NAME</th>
                        <th class="small-col"></th>
                    </thead>
                    <tbody>
                        <tr v-for="(dt, index) in dataProduct" :key="index">
                            <td class="normal-col">{{ dt.product.product_id }}</td>
                            <td>{{ dt.product.name }}</td>
                            <td class="small-col">
                                <button v-if="formData.product_id !== dt.product.id" class="btn btn-small-icon btn-sekunder" @click="onChoose(dt, 'product')">
                                    <i class="fa fa-1x fa-plus"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </AppPopupForm>

        <AppPopupForm
            v-if="visiblePopupDetail"
            :title="'Choose Detail'"
            :onClose="onOpenDetail"
        >
            <div style="overflow-x: auto;">
                <table>
                    <thead>
                        <th class="normal-col">DETAIL ID</th>
                        <th>NAME</th>
                        <th class="normal-col">PRICE</th>
                        <th class="small-col"></th>
                    </thead>
                    <tbody>
                        <tr v-for="(dt, index) in dataDetail" :key="index">
                            <td class="normal-col">{{ dt.proddetail_id }}</td>
                            <td>{{ dt.name }}</td>
                            <td class="normal-col">{{ dt.price }}</td>
                            <td class="small-col">
                                <button v-if="formData.proddetail_id !== dt.id" class="btn btn-small-icon btn-sekunder" @click="onChoose(dt, 'detail')">
                                    <i class="fa fa-1x fa-plus"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </AppPopupForm>

        <AppPopupForm
            v-if="visiblePopupToping"
            :title="'Choose Toping'"
            :onClose="onOpenToping"
        >
            <div style="overflow-x: auto;">
                <table>
                    <thead>
                        <th class="normal-col">TOPING ID</th>
                        <th>NAME</th>
                        <th class="normal-col">PRICE</th>
                        <th class="small-col"></th>
                    </thead>
                    <tbody>
                        <tr v-for="(dt, index) in dataToping" :key="index">
                            <td class="normal-col">{{ dt.toping_id }}</td>
                            <td>{{ dt.name }}</td>
                            <td class="normal-col">{{ dt.price }}</td>
                            <td class="small-col">
                                <button v-if="formData.toping_id !== dt.id" class="btn btn-small-icon btn-sekunder" @click="onChoose(dt, 'toping')">
                                    <i class="fa fa-1x fa-plus"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </AppPopupForm>
    </div>
</template>

<script>
import axios from 'axios'
import AppSideForm from '../../modules/AppSideForm'
import AppImage from '../../modules/AppImage'
import AppPopupForm from '../../modules/AppPopupForm'
import AppAlert from '../../modules/AppAlert'
import AppTabs from '../../modules/AppTabs'
import FormCustomer from '../customer/FormCustomer'

const tabs = [
    {label: 'Data', status: 'active'},
    {label: 'Customer', status: ''}
]

const time = new Date().getTime()

const payload = {
    id: '',
    cart_id: 'CR-' + time,
    toping_price: 0,
    price: 0,
    discount: 0,
    quantity: 0,
    subtotal: 0,
    product_name: "",
    product_detail: "",
    product_toping: "",
    promo_code: null,
    owner_id: null,
    product_id: null,
    proddetail_id: null,
    toping_id: null,
}

const customer = {
    id: '',
    customer_id: '',
    image: '',
    name: '',
    email: '',
    phone: '',
    about: '',
    status: ''
}

export default {
    name: 'form',
    data () {
        return {
            selectedIndex: 0,
            visiblePopupToping: false,
            visiblePopupDetail: false,
            visiblePopupProduct: false,
            openCreateCustomer: false,
            isView: false,
            image: '',
            tabs: tabs,
            selectedCustomer: {...customer},
            formData: {...payload},
            formMessage: [],
            dataProduct: [],
            dataDetail: [],
            dataToping: [],
        }
    },
    mounted () {
        this.formData = {...payload}
        this.getDataProduct()
    },
    components: {
        FormCustomer,
        AppTabs,
        AppAlert,
        AppPopupForm,
        AppSideForm,
        AppImage
    },
    props: {
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
        uploadImage: {
            type: Function,
            required: false,
        },
        removeImage: {
            type: Function,
            required: false,
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
        onTotal: function () {
            let qty = this.formData.quantity
            let price = this.formData.price
            let tpPrice = this.formData.toping_price
            let ttl = (tpPrice + price) * qty
            this.formData = {
                ...this.formData,
                subtotal: ttl
            }
        },
        onOpenToping () {
            this.visiblePopupToping = !this.visiblePopupToping
        },
        onOpenDetail () {
            this.visiblePopupDetail = !this.visiblePopupDetail
        },
        onOpenProduct () {
            this.visiblePopupProduct = !this.visiblePopupProduct
        },
        onButtonTable () {
            this.openCreateCustomer = !this.openCreateCustomer
        },
        onButtonSave () {
            const newPayload = this.formData
            this.onSave(newPayload)
        },
        onChangeTabs (data) {
            this.selectedIndex = data
        },
        onChangeCustomer (data) {
            this.formData = {
                ...this.formData,
                owner_id: data.id
            }
            this.selectedCustomer = data
        },
        onChoose (data, type) {
            console.log('data', data)
            switch (type) {
                case 'product':
                    this.onOpenProduct()
                    this.dataDetail = data.details
                    this.dataToping = data.topings
                    this.formData = {
                        ...this.formData,
                        product_name: data.product.name,
                        product_id: data.product.id,
                        product_detail: '',
                        proddetail_id: 0,
                        price: 0,
                        product_toping: '',
                        toping_id: '',
                        toping_price: '',
                        quantity: 0,
                        subtotal: 0
                    }
                    break;
                case 'detail':
                    this.onOpenDetail()
                    this.formData = {
                        ...this.formData,
                        product_detail: data.name,
                        proddetail_id: data.id,
                        price: data.price
                    }
                    break;
                case 'toping':
                    this.onOpenToping()
                    this.formData = {
                        ...this.formData,
                        product_toping: data.name,
                        toping_id: data.id,
                        toping_price: data.price
                    }
                    break;
                default:
                    this.onOpenProduct()
                    break;
            }
            this.onTotal()
        },
        async getDataProduct () {
            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const payload = {
                limit: 1000,
                offset: 0,
                status: 'active'
            }

            const rest = await axios.post('/api/product/getAll', payload, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                const data = rest.data.data
                this.dataProduct = data
            }
        }
    },
    watch: {
        data: function (props, prevProps) {
            if (props) {
                this.formData = {
                    ...this.formData,
                    id: props.id,
                    cart_id: props.cart_id,
                    owner_id: props.owner_id,
                    toping_price: props.toping_price,
                    price: props.price,
                    discount: props.discount,
                    quantity: props.quantity,
                    subtotal: props.subtotal,
                    product_name: props.product_name,
                    product_detail: props.product_detail,
                    product_toping: props.product_toping,
                    promo_code: props.promo_code,
                    product_id: props.product_id,
                    proddetail_id: props.proddetail_id,
                    toping_id: props.toping_id,
                }
                this.image = this.productImageThumbnailUrl + props.product_image
                this.selectedCustomer = props.customer ? props.customer : customer
            } else {
                this.formData = {...payload}
                this.image = ''
                this.selectedCustomer = customer 
            }
            this.onChangeTabs(0)
            console.log('props', props)
        },
        message: function (props, prevProps) {
            if (props) {
                this.formMessage = props
            } else {
                this.formMessage = []
            }
            console.log('props', props)
        }
    }
}
</script>