<template>
    <div id="form">
        <AppSideForm 
            :title="title" 
            :enableSaveButton="this.title !== 'VIEW' ? true : false"
            :onSave="onButtonSave"
            :onClose="onClose">
            
            <!-- <AppTabs 
                v-if="this.title !== 'CREATE'"
                :selectedIndex="selectedIndex" 
                :data="tabs" 
                :onChange="(data) => onChangeTabs(data)" 
                class="margin margin-bottom-15-px" /> -->
            
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
                    <div class="field-label">SHOP ID</div>
                    <input 
                        type="text" 
                        placeholder="" 
                        class="field field-sekunder" 
                        name="shop_id" 
                        id="shop_id" 
                        v-model="formData.shop_id"
                        readonly>
                    <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.shop_id && formMessage.shop_id[0] }}
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
                <div class="display-flex margin margin-bottom-15-px">
                    <div class="field-group" style="width: calc(100% - 10px); margin-right: 10px;">
                        <div class="field-label">OPEN DAY</div>
                        <input 
                            type="text" 
                            placeholder="" 
                            class="field field-sekunder" 
                            name="open_day" 
                            id="open_day" 
                            v-model="formData.open_day"
                            :readonly="this.title === 'VIEW' ? true : false">
                        <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                            {{ formMessage && formMessage.open_day && formMessage.open_day[0] }}
                        </div>
                    </div>
                    <div class="field-group" style="width: calc(100% - 10px); margin-left: 10px;">
                        <div class="field-label">CLOSE DAY</div>
                        <input 
                            type="text" 
                            placeholder="" 
                            class="field field-sekunder" 
                            name="close_day" 
                            id="close_day" 
                            v-model="formData.close_day"
                            :readonly="this.title === 'VIEW' ? true : false">
                        <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                            {{ formMessage && formMessage.close_day && formMessage.close_day[0] }}
                        </div>
                    </div>
                </div>
                <div class="display-flex margin margin-bottom-15-px">
                    <div class="field-group" style="width: calc(100% - 10px); margin-right: 10px;">
                        <div class="field-label">OPEN TIME</div>
                        <input 
                            type="text" 
                            placeholder="" 
                            class="field field-sekunder" 
                            name="open_time" 
                            id="open_time" 
                            v-model="formData.open_time"
                            :readonly="this.title === 'VIEW' ? true : false">
                        <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                            {{ formMessage && formMessage.open_time && formMessage.open_time[0] }}
                        </div>
                    </div>
                    <div class="field-group" style="width: calc(100% - 10px); margin-left: 10px;">
                        <div class="field-label">CLOSE TIME</div>
                        <input 
                            type="text" 
                            placeholder="" 
                            class="field field-sekunder" 
                            name="close_time" 
                            id="close_time" 
                            v-model="formData.close_time"
                            :readonly="this.title === 'VIEW' ? true : false">
                        <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                            {{ formMessage && formMessage.close_time && formMessage.close_time[0] }}
                        </div>
                    </div>
                </div>
                <div class="field-group margin margin-bottom-15-px">
                    <div class="field-label">LOCATION</div>
                    <textarea 
                        name="location" 
                        id="location" 
                        class="field field-sekunder field-textarea" 
                        v-model="formData.location"
                        :readonly="this.title === 'VIEW' ? true : false"></textarea>
                    <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.location && formMessage.location[0] }}
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
            </div>
            <!-- <div v-if="selectedIndex !== 0">
                <div>
                    {{ tabs[selectedIndex].label }}
                </div>
            </div> -->
        </AppSideForm>
    </div>
</template>

<script>
import AppSideForm from '../../modules/AppSideForm'
import AppImage from '../../modules/AppImage'
import AppTabs from '../../modules/AppTabs'

const tabs = [
    {label: 'Data', status: 'active'},
    {label: 'Tables', status: ''},
    {label: 'Catalogs', status: ''},
    {label: 'Shifts', status: ''},
    {label: 'Employees', status: ''},
    {label: 'Customers', status: ''}
]

const payload = {
    id: '',
    shop_id: '',
    user_id: '',
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
            tabs: tabs,
            isView: false,
            image: '',
            formData: {...payload},
            formMessage: []
        }
    },
    mounted () {
        this.formData = {...payload}
    },
    components: {
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
        onButtonSave () {
            const time = new Date().getTime()
            const newPayload = this.title === 'CREATE' ? {
                ...this.formData,
                shop_id: 'SH-' + time.toString()
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
                    id: props.shop.id,
                    shop_id: props.shop.shop_id,
                    image: props.shop.image,
                    name: props.shop.name,
                    about: props.shop.about,
                    email: props.shop.email,
                    phone: props.shop.phone,
                    location: props.shop.location,
                    open_day: props.shop.open_day,
                    close_day: props.shop.close_day,
                    open_time: props.shop.open_time,
                    close_time: props.shop.close_time,
                    status: props.shop.status,
                    is_available: props.shop.is_available,
                    user_id: props.shop.user_id,
                }
                this.image = props.shop.image ? this.shopImageThumbnailUrl + props.shop.image : ''
            } else {
                this.formData = {...payload}
                this.image = ''
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