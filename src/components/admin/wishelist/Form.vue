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
                    <div class="field-label">ID</div>
                    <div v-if="this.title !== 'VIEW' ? true : false" class="card-search full">
                        <input 
                            type="search" 
                            placeholder="" 
                            class="field"
                            name="id" 
                            id="id" 
                            v-model="formData.product_id"
                            readonly>
                        <button class="btn btn-icon btn-white" @click="onButtonProduct">
                            <i class="fa fa-1x fa-search" />
                        </button>
                    </div>
                    <div v-else>
                        <input 
                            type="text" 
                            placeholder="" 
                            class="field field-sekunder" 
                            name="id" 
                            id="id" 
                            v-model="formData.product_id"
                            readonly>
                    </div>
                    <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.product_id && formMessage.product_id[0] }}
                    </div>
                </div>

                <div class="field-group margin margin-bottom-15-px">
                    <div class="field-label">IMAGE</div>
                    <AppImage 
                        :image.sync="image"
                        :isEnable="false"
                    />
                </div>

                <div class="field-group margin margin-bottom-15-px">
                    <div class="field-label">PRODUCT ID</div>
                    <input 
                        type="text" 
                        placeholder="" 
                        class="field field-sekunder" 
                        name="product_id" 
                        id="product_id" 
                        v-model="selectedData.product_id"
                        readonly>
                </div>
                
                <div class="field-group margin margin-bottom-15-px">
                    <div class="field-label">PRODUCT</div>
                    <input 
                        type="text" 
                        placeholder="" 
                        class="field field-sekunder" 
                        name="name" 
                        id="name" 
                        v-model="selectedData.name"
                        readonly>
                </div>

                <div class="field-group margin margin-bottom-10-px">
                    <div class="field-label">DESCRIPTION</div>
                    <textarea 
                        name="description" 
                        id="description" 
                        class="field field-sekunder field-textarea" 
                        v-model="selectedData.description"
                        readonly></textarea>
                </div>

                <div class="field-group margin margin-bottom-20-px">
                    <div class="field-label">STATUS</div>
                    <div 
                        :class="'card-capsule ' + (selectedData.status === 'active' ? 'active' : '')" 
                        style="text-transform: capitalize; display: inline-block; padding-top: 2px; padding-bottom: 2px;">
                        {{ selectedData.status }}
                    </div>
                </div>

                <!-- <div class="field-group margin margin-bottom-15-px">
                    <div class="field-label">USER ID</div>
                    <input 
                        type="text" 
                        placeholder="" 
                        class="field field-sekunder" 
                        name="user_id" 
                        id="user_id" 
                        v-model="formData.user_id"
                        readonly>
                </div>

                <div class="field-group margin margin-bottom-15-px">
                    <div class="field-label">USER NAME</div>
                    <input 
                        type="text" 
                        placeholder="" 
                        class="field field-sekunder" 
                        name="user_name" 
                        id="user_name" 
                        v-model="selectedData.user_name"
                        readonly>
                </div> -->
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
            v-if="visibleCreateProduct"
            :title="'Choose Product'"
            :onClose="onButtonProduct"
        >
            <div style="padding: 10px;">
                <div class="card box-shadow" v-for="(detail, index) in dataProduct" :key="index">
                    <div class="display-flex" style="margin-bottom: 10px;">
                        <div style="width: 120px;">
                            <router-link :to="{name: 'product', params: {id: detail.product_id}}">
                                <AppImage 
                                    :image.sync="detail.image"
                                    :isEnable="false"
                                />
                            </router-link>
                        </div>
                        <div style="width: calc(100% - 120px)">
                            <router-link :to="{name: 'product', params: {id: detail.product_id}}"> 
                                <div 
                                    style="margin-bottom: 5px;" 
                                    class="fonts fonts-14 black semibold">
                                    {{ detail.name }}
                                </div>
                            </router-link>
                            <div style="margin-bottom: 0;" class="fonts fonts-10 grey">{{ detail.ctr_name }}</div>
                            <div style="margin-bottom: 5px;" class="fonts fonts-10 grey">{{ detail.description.substring(0, 50) }} ...</div>
                            <div style="margin-bottom: 5px;" class="fonts fonts-14 black semibold">{{ detail.price }}</div>
                        </div>
                    </div>

                    <div class="display-flex space-between">
                        <div></div>
                        <div class="display-flex content-right">
                            <router-link :to="{name: 'product', params: {id: detail.product_id}}">
                                <button class="btn btn-sekunder">
                                    View Product
                                </button>
                            </router-link>
                            <button class="btn btn-icon btn-sekunder" style="margin-left: 10px;" @click="onChooseProduct(detail)">
                                <i class="fa fa-1x fa-plus"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AppPopupForm>
    </div>
</template>

<script>
import AppSideForm from '../../modules/AppSideForm'
import AppImage from '../../modules/AppImage'
import AppPopupForm from '../../modules/AppPopupForm'
import AppTabs from '../../modules/AppTabs'
import FormCustomer from '../customer/FormCustomer'

const tabs = [
    {label: 'Data', status: 'active'},
    {label: 'Customer', status: ''}
]

const payload = {
    id: '',
    owner_id: '',
    user_id: '',
    product_id: ''
}

const payloadData = {
    id: '',
    user_id: '',
    prod_id: '',
    product_id: '',
    name: '',
    description: '',
    note: null,
    type: null,
    is_pinned: 0,
    is_available: 0,
    status: '',
    username: '',
    user_name: '',
    prod_image: ''
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
            visibleCreateProduct: false,
            openCreateCustomer: false,
            isView: false,
            image: '',
            tabs: tabs,
            selectedCustomer: {...customer},
            formData: {...payload},
            formMessage: [],
            dataProduct: [],
            selectedData: null
        }
    },
    mounted () {
        this.getData();
        this.formData = {...payload}
        this.selectedData = this.data ? {...this.data} : {...payloadData}
    },
    components: {
        FormCustomer,
        AppTabs,
        AppImage,
        AppPopupForm,
        AppSideForm
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
        onChangeCustomer (data) {
            this.formData = {
                ...this.formData,
                owner_id: data.id
            }
            this.selectedCustomer = data
        },
        onChangeTabs (data) {
            this.selectedIndex = data
        },
        onButtonProduct () {
            this.visibleCreateProduct = !this.visibleCreateProduct
        },
        onButtonTable () {
            this.openCreateCustomer = !this.openCreateCustomer
        },
        onButtonSave () {
            const newPayload = this.formData
            this.onSave(newPayload)
        },
        onChooseProduct (data) {
            const user = this.$cookies.get('user')
            this.formData = {
                ...payload,
                user_id: user.id,
                product_id: data.id
            }
            this.selectedData = {
                ...payloadData,
                product_id: data.product_id,
                name: data.name,
                description: data.description,
                status: data.status,
                user_name: user.name
            }
            this.image = data.image
            this.onButtonProduct()
        },
        async getData () {
            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const payload = {
                limit: 1000,
                offset: 0,
                status: 'active'
            }

            const rest = await axios.post('/api/product/getAll', payload, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                const data = rest.data.data
                this.dataProduct = data && data.map((dt) => {
                    const ttlImage = dt.images ? (dt.images.length - 1) : 0
                    const img = dt.images && dt.images[ttlImage] && dt.images[ttlImage].image
                    const pr = dt.details && dt.details[0] && dt.details[0].price
                    return {
                        id: dt.product.id,
                        product_id: dt.product.product_id,
                        name: dt.product.name,
                        ctr_name: dt.product.ctr_name,
                        description: dt.product.description,
                        status: dt.product.status,
                        price: 'Rp. ' + (pr ? pr : 0),
                        image: img ? this.productImageThumbnailUrl + img : ''
                    }
                })

                console.log('data', data)
                console.log('dataProduct', this.dataProduct)
            }
        },
    },
    watch: {
        data: function (props, prevProps) {
            if (props) {
                this.formData = {
                    ...payload,
                    owner_id: props.owner_id,
                    user_id: props.user_id,
                    product_id: props.prod_id
                }
                this.selectedData = {
                    ...payloadData,
                    product_id: props.product_id,
                    name: props.name,
                    description: props.description,
                    status: props.status,
                    user_name: props.user_name
                }
                this.image = this.productImageThumbnailUrl + props.prod_image
                this.selectedCustomer = props.customer ? props.customer : customer
            } else {
                this.formData = {
                    ...payload
                }
                this.selectedData = {
                    ...payloadData
                } 
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