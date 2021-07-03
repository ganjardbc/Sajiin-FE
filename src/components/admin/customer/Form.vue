<template>
    <div id="form">
        <AppSideForm 
            :title="title" 
            :enableCreateButton="this.title === 'EDIT' ? selectedIndex === 2 ? true : false : false"
            :enableSaveButton="this.title !== 'VIEW' ? selectedIndex === 0 || selectedIndex === 1 ? true : false : false"
            :onCreate="onButtonCreate"
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
                        :isEnable="this.title !== 'VIEW' ? true : false"
                        :onUpload="(data) => uploadImage(data)"
                        :onRemove="removeImage"
                    />
                    <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.image && formMessage.image[0] }}
                    </div>
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
                    <div class="field-label">CUSTOMER ID</div>
                    <input 
                        type="text" 
                        placeholder="" 
                        class="field field-sekunder" 
                        name="customer_id" 
                        id="customer_id" 
                        v-model="formData.customer_id"
                        readonly>
                    <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.customer_id && formMessage.customer_id[0] }}
                    </div>
                </div>
                <div class="field-group margin margin-bottom-15-px">
                    <div class="field-label">NAME</div>
                    <input 
                        type="text" 
                        placeholder="" 
                        class="field field-sekunder" 
                        name="name" 
                        id="name" 
                        v-model="formData.name"
                        :readonly="this.title === 'VIEW' ? true : false">
                    <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.name && formMessage.name[0] }}
                    </div>
                </div>
                <div class="field-group margin margin-bottom-15-px">
                    <div class="field-label">EMAIL</div>
                    <input 
                        type="email" 
                        placeholder="" 
                        class="field field-sekunder" 
                        name="email" 
                        id="email" 
                        v-model="formData.email"
                        :readonly="this.title === 'VIEW' ? true : false">
                    <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.email && formMessage.email[0] }}
                    </div>
                </div>
                <div class="field-group margin margin-bottom-15-px">
                    <div class="field-label">PHONE</div>
                    <input 
                        type="text" 
                        placeholder="" 
                        class="field field-sekunder" 
                        name="phone" 
                        id="phone" 
                        v-model="formData.phone"
                        :readonly="this.title === 'VIEW' ? true : false">
                    <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.phone && formMessage.phone[0] }}
                    </div>
                </div>
                <div class="field-group margin margin-bottom-20-px">
                    <div class="field-label">STATUS</div>
                    <div class="display-flex">
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
                    <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.status && formMessage.status[0] }}
                    </div>
                </div>
                <div class="field-group margin margin-bottom-15-px">
                    <div class="field-label">ABOUT</div>
                    <textarea 
                        name="about" 
                        id="about" 
                        class="field field-sekunder field-textarea" 
                        v-model="formData.about"
                        :readonly="this.title === 'VIEW' ? true : false"></textarea>
                    <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.about && formMessage.about[0] }}
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
                <FormAddress 
                    :selectedId.sync="formData.id"
                    :selectedCustomerId.sync="formData.customer_id"
                    :enableButton="title === 'EDIT' ? true : false"
                    :enablePopup="popupCreate" />
            </div>
        </AppSideForm>
    </div>
</template>

<script>
import AppSideForm from '../../modules/AppSideForm'
import AppTabs from '../../modules/AppTabs'
import FormAddress from './FormAddress'
import AppImage from '../../modules/AppImage'
import FormShop from '../shops/FormShop'

const tabs = [
    {id: 1, label: 'Data', status: 'active'},
    {id: 2, label: 'Shop', status: ''},
    {id: 3, label: 'Address', status: ''}
]

const payload = {
    id: '',
    customer_id: '',
    image: '',
    name: '',
    email: '',
    phone: '',
    about: '',
    status: 'active',
    shop_id: ''
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
            openCreateShop: false,
            selectedShop: {...shop},
            selectedIndex: 0,
            isView: false,
            popupCreate: false,
            tabs: tabs,
            formData: {...payload},
            formMessage: [],
            image: ''
        }
    },
    mounted () {
        this.formData = {...payload}
    },
    components: {
        AppImage,
        FormShop,
        FormAddress,
        AppSideForm,
        AppTabs 
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
        },
        uploadImage: {
            type: Function,
            required: false,
        },
        removeImage: {
            type: Function,
            required: false,
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
        onButtonShop () {
            this.openCreateShop = !this.openCreateShop
        },
        onButtonCreate () {
            this.popupCreate = !this.popupCreate
        },
        onButtonSave () {
            const time = new Date().getTime()
            const newPayload = this.title === 'CREATE' ? {
                ...this.formData,
                customer_id: 'CC-' + time.toString()
            } : {
                ...this.formData
            }
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
                    id: props.customer.id,
                    customer_id: props.customer.customer_id,
                    name: props.customer.name,
                    email: props.customer.email,
                    phone: props.customer.phone,
                    about: props.customer.about,
                    status: props.customer.status,
                    shop_id: props.customer.shop_id
                }
                this.selectedShop = {
                    ...this.selectedShop,
                    id: props.shop.id,
                    shop_id: props.shop.shop_id,
                    name: props.shop.name,
                    status: props.shop.status,
                    about: props.shop.about
                }
                this.image = props.customer.image ? this.customerImageThumbnailUrl + props.customer.image : ''
            } else {
                this.formData = {...payload}
                this.selectedShop = {...shop}
                this.image = ''
            }
            this.onChangeTabs(0)
        },
        message: function (props, prevProps) {
            if (props) {
                this.formMessage = props
            } else {
                this.formMessage = []
            }
            console.log('message', props)
        }
    }
}
</script>