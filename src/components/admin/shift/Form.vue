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
                <!-- <div v-if="this.title !== 'CREATE' ? true : false" class="field-group margin margin-bottom-15-px">
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
                </div> -->
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
                    <div class="field-label">SHIFT ID</div>
                    <input 
                        type="text" 
                        placeholder="" 
                        class="field field-sekunder" 
                        name="shift_id" 
                        id="shift_id" 
                        v-model="formData.shift_id"
                        readonly>
                    <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.shift_id && formMessage.shift_id[0] }}
                    </div>
                </div>
                <div class="field-group margin margin-bottom-15-px">
                    <div class="field-label">TITLE</div>
                    <input 
                        type="text" 
                        placeholder="" 
                        class="field field-sekunder" 
                        name="title" 
                        id="title" 
                        v-model="formData.title"
                        :readonly="this.title === 'VIEW' ? true : false">
                    <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.title && formMessage.title[0] }}
                    </div>
                </div>
                <div class="display-flex margin margin-bottom-15-px">
                    <div class="field-group" style="width: calc(100% - 10px); margin-right: 10px;">
                        <div class="field-label">START TIME</div>
                        <input 
                            type="text" 
                            placeholder="" 
                            class="field field-sekunder" 
                            name="start_time" 
                            id="start_time" 
                            v-model="formData.start_time"
                            :readonly="this.title === 'VIEW' ? true : false">
                        <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                            {{ formMessage && formMessage.start_time && formMessage.start_time[0] }}
                        </div>
                    </div>
                    <div class="field-group" style="width: calc(100% - 10px); margin-left: 10px;">
                        <div class="field-label">END TIME</div>
                        <input 
                            type="text" 
                            placeholder="" 
                            class="field field-sekunder" 
                            name="end_time" 
                            id="end_time" 
                            v-model="formData.end_time"
                            :readonly="this.title === 'VIEW' ? true : false">
                        <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                            {{ formMessage && formMessage.end_time && formMessage.end_time[0] }}
                        </div>
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

            <div v-if="selectedIndex === 2">
                <FormEmployee 
                    :selectedId.sync="formData.id"
                    :selectedShiftId.sync="formData.shift_id"
                    :enableButton="title === 'EDIT' ? true : false"
                    :enablePopup="popupEmployeeCreate" />
            </div>
        </AppSideForm>
    </div>
</template>

<script>
import AppSideForm from '../../modules/AppSideForm'
import AppImage from '../../modules/AppImage'
import AppTabs from '../../modules/AppTabs'
import FormShop from '../shops/FormShop'
import FormEmployee from './FormEmployee'

const tabs = [
    {label: 'Data', status: 'active'},
    {label: 'Shop', status: ''},
    {label: 'Employees', status: ''}
]

const payload = {
    id: '',
    shift_id: '',
    code: '',
    image: '',
    title: '',
    start_time: '',
    end_time: '',
    status: '',
    is_available: 0,
    description: '',
    shop_id: 0
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
            popupEmployeeCreate: false,
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
        FormEmployee,
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
        onButtonCreateEmployee () {
            this.popupEmployeeCreate = !this.popupEmployeeCreate
        },
        onButtonShop () {
            this.openCreateShop = !this.openCreateShop
        },
        onButtonSave () {
            const time = new Date().getTime()
            const newPayload = this.title === 'CREATE' ? {
                ...this.formData,
                shift_id: 'SH-' + time.toString()
            } : {
                ...this.formData
            }
            this.onSave(newPayload)
        },
        onButtonCreate () {
            this.onButtonCreateEmployee()
        }
    },
    watch: {
        data: function (props, prevProps) {
            if (props) {
                this.formData = {
                    ...this.formData,
                    id: props.shift.id,
                    shift_id: props.shift.shift_id,
                    image: props.shift.image,
                    title: props.shift.title,
                    start_time: props.shift.start_time,
                    end_time: props.shift.end_time,
                    is_available: props.shift.is_available,
                    status: props.shift.status,
                    description: props.shift.description,
                    shop_id: props.shift.shop_id
                }
                this.selectedShop = {
                    ...this.selectedShop,
                    id: props.shop.id,
                    shop_id: props.shop.shop_id,
                    name: props.shop.name,
                    status: props.shop.status,
                    about: props.shop.about
                }
                this.image = props.shift.image ? this.shiftImageThumbnailUrl + props.shift.image : ''
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