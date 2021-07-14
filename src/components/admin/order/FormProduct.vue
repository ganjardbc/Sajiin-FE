<template>
    <div id="FormProduct">
        <AppLoader v-if="visibleLoader" />

        <div v-else>
            <div class="card box-shadow" v-for="(detail, index) in datas" :key="index">
                <div class="display-flex space-between margin margin-bottom-5-px">
                    <div class="fonts micro black">ID</div>
                    <div class="fonts micro black semibold">{{ detail.id }}</div>
                </div>
                <div class="display-flex space-between margin margin-bottom-5-px">
                    <div class="fonts micro black">Product name</div>
                    <div class="fonts micro black semibold">{{ detail.product_name }}</div>
                </div>
                <div class="display-flex space-between margin margin-bottom-5-px">
                    <div class="fonts micro black">Product detail</div>
                    <div class="fonts micro black semibold">{{ detail.product_detail }}</div>
                </div>
                <div class="display-flex space-between margin margin-bottom-5-px">
                    <div class="fonts micro black">Product toping</div>
                    <div class="fonts micro black semibold">{{ detail.product_toping }}</div>
                </div>
                <div class="display-flex space-between margin margin-bottom-5-px">
                    <div class="fonts micro black">Product Price</div>
                    <div class="fonts micro black semibold">{{ detail.price }}</div>
                </div>
                <div class="display-flex space-between margin margin-bottom-5-px">
                    <div class="fonts micro black">Toping price</div>
                    <div class="fonts micro black semibold">{{ detail.toping_price }}</div>
                </div>
                <div class="display-flex space-between margin margin-bottom-5-px">
                    <div class="fonts micro black">Discount</div>
                    <div class="fonts micro black semibold">{{ detail.discount }}</div>
                </div>
                <div class="display-flex space-between margin margin-bottom-5-px">
                    <div class="fonts micro black">Quantity</div>
                    <div class="fonts micro black semibold">{{ detail.quantity }}</div>
                </div>
                <div class="display-flex space-between margin margin-bottom-5-px">
                    <div class="fonts micro black">Subtotal</div>
                    <div class="fonts micro black semibold">{{ detail.subtotal }}</div>
                </div>
                <div class="display-flex space-between margin margin-bottom-10-px">
                    <div class="fonts micro black">Status</div>
                    <div class="fonts micro black semibold" style="text-transform: capitalize;">{{ detail.status }}</div>
                </div>
                <div v-if="enableButton && detail.status === 'waiting'" class="display-flex space-between margin margin-bottom-0-px">
                    <div></div>
                    <div class="display-flex content-right">
                        <button class="btn btn-small-icon btn-sekunder" @click="onEdit(index)">
                            <i class="fa fa-1x fa-pencil-alt"></i>
                        </button>
                        <button class="btn btn-small-icon btn-sekunder" @click="onShowHideDelete(index)">
                            <i class="fa fa-1x fa-trash-alt"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <AppPopupForm
            v-if="visiblePopup"
            :title="isCreate ? 'Create Product' : 'Edit Product'"
            :enableSaveButton="true"
            :onClose="onClose"
            :onSave="onShowHideSave"
        >
            <div class="field-group margin margin-bottom-15-px">
                <div class="field-label">ID</div>
                <input 
                    type="text" 
                    placeholder="" 
                    class="field field-sekunder" 
                    name="id" 
                    id="id" 
                    v-model="payload.id"
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
                    v-model="payload.order_id"
                    readonly>
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
                        v-model="payload.product_name"
                        readonly>
                    <button class="btn btn-icon btn-white" @click="onOpenProduct">
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
                        v-model="payload.product_detail"
                        readonly>
                    <button class="btn btn-icon btn-white" @click="onOpenDetail">
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
                        v-model="payload.product_toping"
                        readonly>
                    <button class="btn btn-icon btn-white" @click="onOpenToping">
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
                    v-model="payload.price">
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
                    v-model="payload.toping_price">
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
                    v-model="payload.discount">
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
                    v-model="payload.quantity">
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
                    v-model="payload.subtotal">
                <div v-if="formMessage" class="fonts micro semibold" style="color: red; margin-top: 5px;">
                    {{ formMessage && formMessage.subtotal && formMessage.subtotal[0] }}
                </div>
            </div>
        </AppPopupForm>

        <AppPopupForm
            v-if="visiblePopupProduct"
            :title="'Choose Product'"
            :onClose="onOpenProduct"
        >
            <div style="overflow-x: auto;">
                <table>
                    <thead>
                        <th>PRODUCT ID</th>
                        <th>NAME</th>
                        <th class="small-col"></th>
                    </thead>
                    <tbody>
                        <tr v-for="(dt, index) in dataProduct" :key="index">
                            <td>{{ dt.product.product_id }}</td>
                            <td>{{ dt.product.name }}</td>
                            <td class="small-col">
                                <button v-if="payload.product_id !== dt.product.id" class="btn btn-small-icon btn-sekunder" @click="onChoose(dt, 'product')">
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
                        <th>DETAIL ID</th>
                        <th>NAME</th>
                        <th class="normal-col">PRICE</th>
                        <th class="small-col"></th>
                    </thead>
                    <tbody>
                        <tr v-for="(dt, index) in dataDetail" :key="index">
                            <td>{{ dt.proddetail_id }}</td>
                            <td>{{ dt.name }}</td>
                            <td class="normal-col">{{ dt.price }}</td>
                            <td class="small-col">
                                <button v-if="payload.proddetail_id !== dt.id" class="btn btn-small-icon btn-sekunder" @click="onChoose(dt, 'detail')">
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
                        <th>TOPING ID</th>
                        <th>NAME</th>
                        <th class="normal-col">PRICE</th>
                        <th class="small-col"></th>
                    </thead>
                    <tbody>
                        <tr v-for="(dt, index) in dataToping" :key="index">
                            <td>{{ dt.toping_id }}</td>
                            <td>{{ dt.name }}</td>
                            <td class="normal-col">{{ dt.price }}</td>
                            <td class="small-col">
                                <button v-if="payload.toping_id !== dt.id" class="btn btn-small-icon btn-sekunder" @click="onChoose(dt, 'toping')">
                                    <i class="fa fa-1x fa-plus"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </AppPopupForm>

        <AppAlert 
            v-if="visibleAlertDelete" 
            :isLoader="visibleLoaderAction"
            :title="'This action will remove data permanently, delete this data ?'" 
            :onClose="onShowHideDelete" 
            :onSave="removeData" />
        
        <AppAlert 
            v-if="visibleAlertSave" 
            :isLoader="visibleLoaderAction"
            :title="'Proceed this data ?'" 
            :onClose="onShowHideSave" 
            :onSave="saveData" />
    </div>
</template>
<script>
import axios from 'axios'
import AppPopupForm from '../../modules/AppPopupForm'
import AppAlert from '../../modules/AppAlert'
import AppLoader from '../../modules/AppLoader'

const payload = {
    "id": 0,
    "toping_price": 0,
    "price": 0,
    "discount": 0,
    "quantity": 0,
    "subtotal": 0,
    "product_name": "",
    "product_detail": "",
    "product_toping": "",
    "promo_code": null,
    "order_id": 0,
    "product_id": 0,
    "proddetail_id": 0,
    "toping_id": 0,
    "status": "waiting"
}

export default {
    name: 'FormProduct',
    data () {
        return {
            visiblePopupToping: false,
            visiblePopupDetail: false,
            visiblePopupProduct: false,
            visibleAlertDelete: false,
            visibleAlertSave: false,
            visibleLoader: false,
            visibleLoaderAction: false,
            isCreate: true,
            visiblePopup: false,
            payload: {...payload},
            datas: [],
            dataProduct: [],
            dataDetail: [],
            dataToping: [],
            formMessage: [],
            dataUser: null
        }
    },
    mounted () {
        this.dataUser = this.$cookies.get('user')
        this.getData(this.selectedOrderId)
        this.getDataProduct()
    },
    components: {
        AppLoader,
        AppPopupForm,
        AppAlert
    },
    props: {
        selectedId: {
            required: true
        },
        selectedOrderId: {
            required: true
        },
        enableButton: {
            required: false,
            type: Boolean
        },
        enablePopup: {
            required: false,
            type: Boolean
        },
        onCalculate: {
            type: Function,
            required: true
        }
    },
    methods: {
        onOpenToping () {
            this.visiblePopupToping = !this.visiblePopupToping
        },
        onOpenDetail () {
            this.visiblePopupDetail = !this.visiblePopupDetail
        },
        onOpenProduct () {
            this.visiblePopupProduct = !this.visiblePopupProduct
        },
        onShowHideDelete (index = null) {
            this.visibleAlertDelete = !this.visibleAlertDelete
            this.payload = this.datas[index] ? this.datas[index] : payload
            this.formMessage = []
        },
        onShowHideSave () {
            this.visibleAlertSave = !this.visibleAlertSave
            this.formMessage = []
        },
        onChoose (data, type) {
            switch (type) {
                case 'product':
                    this.onOpenProduct()
                    this.dataDetail = data.details
                    this.dataToping = data.topings
                    this.payload = {
                        ...this.payload,
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
                    this.payload = {
                        ...this.payload,
                        product_detail: data.name,
                        proddetail_id: data.id,
                        price: data.price
                    }
                    break;
                case 'toping':
                    this.onOpenToping()
                    this.payload = {
                        ...this.payload,
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
        onClose: function () {
            this.visiblePopup = false
            this.isCreate = true
            this.payload = {...payload}
            this.formMessage = []
        },
        onSearchProduct: function (data) {
            this.dataProduct && this.dataProduct.map((dt) => {
                if (data === dt.product.id) {
                    this.dataDetail = dt.details
                    this.dataToping = dt.topings
                }
            })
        },
        onEdit: function (index) {
            this.visiblePopup = true
            this.isCreate = false
            this.payload = this.datas[index] ? this.datas[index] : payload
            this.formMessage = []
            this.onSearchProduct(this.payload.product_id)
        },
        onTotal: function () {
            let qty = this.payload.quantity
            let price = this.payload.price
            let tpPrice = this.payload.toping_price
            let ttl = (tpPrice + price) * qty
            this.payload = {
                ...this.payload,
                subtotal: ttl
            }
        },
        async removeData () {
            this.visibleLoaderAction = true

            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const id = this.payload.id
            const payload = {
                id: id
            }

            const rest = await axios.post('/api/orderItem/delete', payload, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                this.onShowHideDelete()
                this.onClose()
                this.visibleLoaderAction = false

                const data = rest.data
                if (data.status === 'ok') {
                    this.getData(this.selectedOrderId)
                } else {
                    alert('Proceed failed')
                }
            } else {
                alert('Proceed failed')
                this.visibleLoaderAction = false
            }
        },
        async saveData () {
            this.visibleLoaderAction = true

            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const payload = {...this.payload, partner_id: this.selectedId}
            const url = this.isCreate ? '/api/orderItem/post' : '/api/orderItem/update' 

            const rest = await axios.post(url, payload, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                this.onShowHideSave()
                this.visibleLoaderAction = false

                const data = rest.data.data
                if (data.length !== 0) {
                    this.onClose()
                    this.getData(this.selectedOrderId)
                } else {
                    this.formMessage = rest.data.message
                }
            } else {
                alert('Proceed failed')
                this.visibleLoaderAction = false
            }
        },
        async getData (id) {
            this.visibleLoader = true

            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const payload = {
                limit: 1000,
                offset: 0,
                order_id: id
            }

            const rest = await axios.post('/api/orderItem/getAll', payload, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                const data = rest.data.data
                this.datas = data
                this.visibleLoader = false
                this.onCalculate(data)
            } else {
                this.visibleLoader = false
            }
        },
        async getDataProduct () {
            this.visibleLoader = true

            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const payload = this.dataUser.role_name === 'admin' ? {
                limit: 1000,
                offset: 0,
                status: 'active'
            } : {
                limit: 1000,
                offset: 0,
                status: 'active',
                user_id: this.dataUser.id
            }

            const rest = await axios.post('/api/product/getAll', payload, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                const data = rest.data.data
                this.dataProduct = data
                this.visibleLoader = false
            } else {
                this.visibleLoader = false
            }
        }
    },
    watch: {
        selectedOrderId: function (props, prevProps) {
            if (props) {
                this.getData(props)
            }
        },
        enablePopup: function (props, prevProps) {
            if (!this.visiblePopup) {
                this.visiblePopup = true
                this.payload = {
                    ...this.payload,
                    order_id: this.selectedId
                }
            } else {
                this.visiblePopup = false
            }
        }
    }
}
</script>