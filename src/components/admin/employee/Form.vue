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
                    <div class="field-label">EMPLOYEE ID</div>
                    <input 
                        type="text" 
                        placeholder="" 
                        class="field field-sekunder" 
                        name="employee_id" 
                        id="employee_id" 
                        v-model="formData.employee_id"
                        readonly>
                    <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.employee_id && formMessage.employee_id[0] }}
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
                            <div class="fonts micro black">Is this employee still available ?</div>
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
                    <div class="field-label">ADDRESS</div>
                    <textarea 
                        name="address" 
                        id="address" 
                        class="field field-sekunder field-textarea" 
                        v-model="formData.address"
                        :readonly="this.title === 'VIEW' ? true : false"></textarea>
                    <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.address && formMessage.address[0] }}
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
                            name="position_id" 
                            id="position_id" 
                            v-model="formData.position_id"
                            readonly>
                        <button class="btn btn-icon btn-white" @click="onButtonPosition">
                            <i class="fa fa-1x fa-search" />
                        </button>
                    </div>
                    <div v-else>
                        <input 
                            type="search" 
                            placeholder="" 
                            class="field field-sekunder"
                            style="width: 100%;"
                            name="position_id" 
                            id="position_id" 
                            v-model="formData.position_id"
                            readonly>
                    </div>
                    <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.position_id && formMessage.position_id[0] }}
                    </div>
                </div>
                <FormPosition
                    :data.sync="selectedPosition"
                    :enablePopup="openCreatePosition"
                    :onChange="(data) => onChangePosition(data)"
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
import FormPosition from '../position/FormPosition'

const tabs = [
    {label: 'Data', status: 'active'},
    {label: 'Position', status: ''},
    {label: 'Shops', status: ''}
]

const payload = {
    id: '',
    employee_id: '',
    image: '',
    name: '',
    phone: '',
    email: '',
    status: '',
    is_available: 0,
    about: '',
    address: '',
    position_id: '',
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

const position = {
    id: '',
    position_id: '',
    image: '',
    title: '',
    description: '',
    status: ''
}

export default {
    name: 'form',
    data () {
        return {
            selectedIndex: 0,
            openCreateShop: false,
            openCreatePosition: false,
            tabs: tabs,
            isView: false,
            image: '',
            selectedShop: {...shop},
            selectedPosition: {...position},
            formData: {...payload},
            formMessage: []
        }
    },
    mounted () {
        this.formData = {...payload}
    },
    components: {
        FormPosition,
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
        onChangePosition (data) {
            this.formData = {
                ...this.formData,
                position_id: data.id
            }
            this.selectedPosition = {...data}
        },
        onButtonShop () {
            this.openCreateShop = !this.openCreateShop
        },
        onButtonPosition () {
            this.openCreatePosition = !this.openCreatePosition
        },
        onButtonSave () {
            const time = new Date().getTime()
            const newPayload = this.title === 'CREATE' ? {
                ...this.formData,
                employee_id: 'EE-' + time.toString()
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
                    id: props.employee.id,
                    employee_id: props.employee.employee_id,
                    image: props.employee.image,
                    name: props.employee.name,
                    email: props.employee.email,
                    phone: props.employee.phone,
                    is_available: props.employee.is_available,
                    status: props.employee.status,
                    about: props.employee.about,
                    address: props.employee.address,
                    position_id: props.employee.position_id,
                    shop_id: props.employee.shop_id
                }
                this.selectedShop = {
                    ...this.selectedShop,
                    id: props.shop.id,
                    shop_id: props.shop.shop_id,
                    name: props.shop.name,
                    status: props.shop.status,
                    about: props.shop.about
                }
                this.selectedPosition = {
                    ...this.selectedPosition,
                    id: props.position.id,
                    position_id: props.position.position_id,
                    image: props.position.image,
                    title: props.position.title,
                    description: props.position.description,
                    status: props.position.status
                }
                this.image = props.employee.image ? this.employeeImageThumbnailUrl + props.employee.image : ''
            } else {
                this.formData = {...payload}
                this.selectedShop = {...shop}
                this.selectedPosition = {...position}
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