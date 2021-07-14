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
                    <div class="field-label">TABLE ID</div>
                    <input 
                        type="text" 
                        placeholder="" 
                        class="field field-sekunder" 
                        name="table_id" 
                        id="table_id" 
                        v-model="formData.table_id"
                        readonly>
                    <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.table_id && formMessage.table_id[0] }}
                    </div>
                </div>
                <div class="field-group margin margin-bottom-15-px">
                    <div class="field-label">CODE</div>
                    <input 
                        type="text" 
                        placeholder="" 
                        class="field field-sekunder" 
                        name="code" 
                        id="code" 
                        v-model="formData.code"
                        :readonly="this.title === 'VIEW' ? true : false">
                    <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.code && formMessage.code[0] }}
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
                                :value="formData.status"
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
                            <div class="fonts micro black">Is this table still available ?</div>
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
                    <div class="field-label">DESCRIPTION</div>
                    <textarea 
                        name="description" 
                        id="description" 
                        class="field field-sekunder field-textarea" 
                        v-model="formData.description"
                        :readonly="this.title === 'VIEW' ? true : false"></textarea>
                    <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.description && formMessage.description[0] }}
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
        </AppSideForm>
    </div>
</template>

<script>
import AppSideForm from '../../modules/AppSideForm'
import AppImage from '../../modules/AppImage'
import AppTabs from '../../modules/AppTabs'
import FormShop from '../shops/FormShop'

const tabs = [
    {label: 'Data', status: 'active'},
    {label: 'Shop', status: ''}
]

const payload = {
    id: '',
    table_id: '',
    code: '',
    image: '',
    name: '',
    status: 'active',
    is_available: 0,
    description: '',
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
            selectedIndex: 0,
            openCreateShop: false,
            tabs: tabs,
            isView: false,
            image: '',
            selectedShop: {...shop},
            formData: {...payload},
            formMessage: []
        }
    },
    mounted () {
        this.formData = {...payload}
    },
    components: {
        FormShop,
        AppTabs,
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
        onChangeTabs (data) {
            this.selectedIndex = data
        },
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
        onButtonSave () {
            const time = new Date().getTime()
            const newPayload = this.title === 'CREATE' ? {
                ...this.formData,
                table_id: 'CT-' + time.toString()
            } : {
                ...this.formData
            }
            this.onSave(newPayload)
        }
    },
    watch: {
        data: function (props, prevProps) {
            if (props) {
                this.formData = {
                    ...this.formData,
                    id: props.table.id,
                    table_id: props.table.table_id,
                    code: props.table.code,
                    image: props.table.image,
                    name: props.table.name,
                    is_available: props.table.is_available,
                    status: props.table.status,
                    description: props.table.description,
                    shop_id: props.table.shop_id
                }
                this.selectedShop = {
                    ...this.selectedShop,
                    id: props.shop.id,
                    shop_id: props.shop.shop_id,
                    name: props.shop.name,
                    status: props.shop.status,
                    about: props.shop.about
                }
                this.image = props.table.image ? this.tableImageThumbnailUrl + props.table.image : ''
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
            console.log('props', props)
        }
    }
}
</script>