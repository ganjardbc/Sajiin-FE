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
                <div class="field-group margin margin-bottom-15-px">
                    <div class="fonts fonts-12 semibold">Catalog</div>
                </div>
                <div class="field-group margin margin-bottom-15-px">
                    <div class="field-label">STATUS</div>
                    <div v-if="this.title !== 'VIEW' ? true : false">
                        <div class="display-flex" style="padding-bottom: 10px;">
                            <label class="radio">
                                <input 
                                    type="radio" 
                                    name="status"
                                    id="active"
                                    value="active"
                                    v-model="formData.status"
                                    :readonly="this.title === 'VIEW' ? true : false" />
                                <span class="checkmark" />
                                <span class="fonts micro">
                                    Active
                                </span>
                            </label>

                            <label class="radio">
                                <input 
                                    type="radio" 
                                    name="status"
                                    id="inactive"
                                    value="inactive"
                                    v-model="formData.status"
                                    :readonly="this.title === 'VIEW' ? true : false" />
                                <span class="checkmark" />
                                <span class="fonts micro">
                                    Inactive
                                </span>
                            </label>
                        </div>
                    </div>
                    <div v-else>
                        <div style="width: 100%;">
                            <input 
                                type="text" 
                                placeholder="" 
                                class="field field-sekunder" 
                                name="status" 
                                id="status" 
                                style="text-transform: capitalize;"
                                v-model="formData.status"
                                readonly>
                        </div>
                    </div>
                    <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.status && formMessage.status[0] }}
                    </div>
                </div>
                <div class="field-group margin margin-bottom-15-px">
                    <div class="field-label">AVAILABLE</div>
                    <div v-if="this.title !== 'VIEW' ? true : false">
                        <div class="display-flex space-between">
                            <div class="fonts micro black">Is this catalog still available ?</div>
                            <label class="switch green">
                                <input 
                                    type="checkbox" 
                                    name="is_available" 
                                    id="is_available" 
                                    v-model="formData.is_available"
                                    :readonly="this.title === 'VIEW' ? true : false" />
                                <span class="slider round" />
                            </label>
                        </div>
                    </div>
                    <div v-else>
                        <div style="width: 100%;">
                            <input 
                                type="text" 
                                placeholder="" 
                                class="field field-sekunder" 
                                name="is_available" 
                                id="is_available" 
                                style="text-transform: capitalize;"
                                :value="formData.is_available ? 'Available' : 'Unavailable'"
                                readonly>
                        </div>
                    </div>
                    <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.is_available && formMessage.is_available[0] }}
                    </div>
                </div>
                <div class="field-group margin margin-bottom-15-px">
                    <div class="field-label">PINNED</div>
                    <div v-if="this.title !== 'VIEW' ? true : false">
                        <div class="display-flex space-between">
                            <div class="fonts micro black">Set this catalog to banner ?</div>
                            <label class="switch green">
                                <input 
                                    type="checkbox" 
                                    name="is_pinned" 
                                    id="is_pinned" 
                                    v-model="formData.is_pinned" 
                                    :readonly="this.title === 'VIEW' ? true : false" />
                                <span class="slider round" />
                            </label>
                        </div>
                    </div>
                    <div v-else>
                        <div style="width: 100%;">
                            <input 
                                type="text" 
                                placeholder="" 
                                class="field field-sekunder" 
                                name="is_pinned" 
                                id="is_pinned" 
                                style="text-transform: capitalize;"
                                :value="formData.is_pinned ? 'Pinned' : 'Unpinned'"
                                readonly>
                        </div>
                    </div>
                    <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.is_pinned && formMessage.is_pinned[0] }}
                    </div>
                </div>
            </div>

            <div v-if="selectedIndex === 1">
                <div class="field-group margin margin-bottom-15-px">
                    <div class="field-label">ID</div>
                    <div v-if="this.title !== 'VIEW'" class="card-search full">
                        <input 
                            type="search" 
                            placeholder="" 
                            class="field"
                            name="shop_id" 
                            id="shop_id" 
                            v-model="formData.shop_id"
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
                            v-model="formData.shop_id"
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

            <div v-if="selectedIndex === 2">
                <div class="field-group margin margin-bottom-15-px">
                    <div class="field-label">ID</div>
                    <div v-if="this.title !== 'VIEW'" class="card-search full">
                        <input 
                            type="search" 
                            placeholder="" 
                            class="field"
                            name="product_id" 
                            id="product_id" 
                            v-model="formData.product_id"
                            readonly>
                        <button class="btn btn-icon btn-white" @click="onButtonProduct">
                            <i class="fa fa-1x fa-search" />
                        </button>
                    </div>
                    <div v-else>
                        <input 
                            type="search" 
                            placeholder="" 
                            class="field field-sekunder"
                            style="width: 100%;"
                            name="product_id" 
                            id="product_id" 
                            v-model="formData.product_id"
                            readonly>
                    </div>
                    <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.product_id && formMessage.product_id[0] }}
                    </div>
                </div>
                <FormProduct 
                    :data.sync="selectedProduct"
                    :enablePopup="openCreateProduct"
                    :onChange="(data) => onChangeProduct(data)"
                />
            </div>

            <div v-if="selectedIndex === 3">
                <FormDetail 
                    :selectedId.sync="selectedProduct.id"
                    :selectedProductId.sync="selectedProduct.product_id"
                    :enableButton="title === 'EDIT' ? true : false"
                    :enablePopup="popupDetailCreate" />
            </div>

            <div v-if="selectedIndex === 4">
                <FormImage 
                    :selectedId.sync="selectedProduct.id"
                    :selectedProductId.sync="selectedProduct.product_id"
                    :enableButton="title === 'EDIT' ? true : false"
                    :enablePopup="popupImageCreate" />
            </div>

            <div v-if="selectedIndex === 5">
                <FormToping 
                    :selectedId.sync="selectedProduct.id"
                    :selectedProductId.sync="selectedProduct.product_id"
                    :enableButton="title === 'EDIT' ? true : false"
                    :enablePopup="popupTopingCreate" />
            </div>
        </AppSideForm>
    </div>
</template>

<script>
import AppSideForm from '../../modules/AppSideForm'
import AppTabs from '../../modules/AppTabs'
import FormDetail from './FormDetail'
import FormImage from './FormImage'
import FormToping from './FormToping'
import FormProduct from '../product/FormProduct'
import FormShop from '../shops/FormShop'

const tabs = [
    {id: 1, label: 'Data', status: 'active'},
    {id: 2, label: 'Shop', status: ''},
    {id: 3, label: 'Product', status: ''},
    {id: 4, label: 'Details', status: ''},
    {id: 5, label: 'Images', status: ''},
    {id: 6, label: 'Topings', status: ''}
]

const catalog = {
    id: 1,
    is_pinned: 0,
    is_available: 1,
    status: "active",
    product_id: null,
    shop_id: null
}

const product = {
    id: '',
    product_id: '',
    name: '',
    description: '',
    note: '',
    is_pinned: 0,
    is_available: 0,
    status: '',
    category_id: ''
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
            openCreateProduct: false,
            openCreateShop: false,
            popupTopingCreate: false,
            popupDetailCreate: false,
            popupImageCreate: false,
            selectedIndex: 0,
            isView: false,
            tabs: tabs,
            selectedShop: {...shop},
            selectedProduct: {...product},
            formData: {...catalog},
            formMessage: [],
            formCategory: []
        }
    },
    mounted () {
        this.formData = {...catalog}
    },
    components: {
        AppSideForm,
        AppTabs,
        FormDetail,
        FormImage,
        FormToping,
        FormProduct,
        FormShop
    },
    props: {
        categories: {
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
                shop_id: data.id
            }
            this.selectedShop = {...data}
        },
        onChangeProduct (data) {
            this.formData = {
                ...this.formData,
                product_id: data.id
            }
            this.selectedProduct = {...data}
        },
        onButtonCreateToping () {
            this.popupTopingCreate = !this.popupTopingCreate
        },
        onButtonCreateDetail () {
            this.popupDetailCreate = !this.popupDetailCreate
        },
        onButtonCreateImage () {
            this.popupImageCreate = !this.popupImageCreate
        },
        onButtonProduct () {
            this.openCreateProduct = !this.openCreateProduct
        },
        onButtonShop () {
            this.openCreateShop = !this.openCreateShop
        },
        onButtonCreate () {
            console.log('index', this.selectedIndex)
            switch (this.selectedIndex) {
                case 1:
                    this.onButtonCreateDetail()
                    break
                case 2:
                    this.onButtonCreateImage()
                    break
                default:
                    this.onButtonCreateToping()
                    break
            }
        },
        onButtonSave () {
            const newPayload = this.formData
            this.onSave(newPayload)
        },
        onChangeTabs (data) {
            this.selectedIndex = data
        }
    },
    watch: {
        data: function (props, prevProps) {
            if (props) {
                this.formData = {
                    ...this.formData,
                    id: props.catalog.id,
                    is_pinned: props.catalog.is_pinned,
                    is_available: props.catalog.is_available,
                    status: props.catalog.status,
                    product_id: props.catalog.product_id,
                    shop_id: props.catalog.shop_id
                }
                this.selectedProduct = {
                    ...this.selectedProduct,
                    id: props.product.id,
                    product_id: props.product.product_id,
                    name: props.product.name,
                    description: props.product.description,
                    note: props.product.note,
                    is_pinned: props.product.is_pinned,
                    is_available: props.product.is_available,
                    status: props.product.status,
                    ctr_id: props.product.ctr_id,
                    ctr_name: props.product.ctr_name
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
                this.formData = {...catalog}
                this.selectedProduct = {...product}
                this.selectedShop = {...shop}
            }
            this.onChangeTabs(0)
        },
        message: function (props, prevProps) {
            if (props) {
                this.formMessage = props
            } else {
                this.formMessage = []
            }
        },
        categories: function (props, prevProps) {
            if (props) {
                this.formCategory = props
            } else {
                this.formCategory = []
            }
        }
    }
}
</script>