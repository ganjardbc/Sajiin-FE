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
                    <div class="field-label">FEEDBACK ID</div>
                    <input 
                        type="text" 
                        placeholder="" 
                        class="field field-sekunder" 
                        name="feedback_id" 
                        id="feedback_id" 
                        v-model="formData.feedback_id"
                        readonly>
                    <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.feedback_id && formMessage.feedback_id[0] }}
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
                    <div class="field-label">WORK</div>
                    <input 
                        type="text" 
                        placeholder="" 
                        class="field field-sekunder" 
                        name="work" 
                        id="work" 
                        v-model="formData.work"
                        :readonly="this.title === 'VIEW' ? true : false">
                    <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.work && formMessage.work[0] }}
                    </div>
                </div>
                <div class="field-group margin margin-bottom-15-px">
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
                    <div class="field-label">FEEDBACK</div>
                    <textarea 
                        name="feedback" 
                        id="feedback" 
                        class="field field-sekunder field-textarea" 
                        v-model="formData.feedback"
                        :readonly="this.title === 'VIEW' ? true : false"></textarea>
                    <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.feedback && formMessage.feedback[0] }}
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
    </div>
</template>

<script>
import AppSideForm from '../../modules/AppSideForm'
import AppImage from '../../modules/AppImage'
import AppTabs from '../../modules/AppTabs'
import FormCustomer from '../customer/FormCustomer'

const tabs = [
    {label: 'Data', status: 'active'},
    {label: 'Customer', status: ''}
]

const time = new Date().getTime()

const payload = {
    id: '',
    feedback_id: 'FB-' + time,
    image: '',
    name: '',
    work: '',
    feedback: '',
    status: '',
    owner_id: 0
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
            openCreateCustomer: false,
            isView: false,
            image: '',
            tabs: tabs,
            selectedCustomer: {...customer},
            formData: {...payload},
            formMessage: []
        }
    },
    mounted () {
        this.formData = {...payload}
    },
    components: {
        FormCustomer,
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
        onButtonTable () {
            this.openCreateCustomer = !this.openCreateCustomer
        },
        onButtonSave () {
            const newPayload = this.formData
            this.onSave(newPayload)
        }
    },
    watch: {
        data: function (props, prevProps) {
            if (props) {
                this.formData = {
                    ...this.formData,
                    id: props.id,
                    feedback_id: props.feedback_id,
                    image: props.image,
                    name: props.name,
                    work: props.work,
                    feedback: props.feedback,
                    status: props.status,
                    owner_id: props.owner_id
                }
                this.image = props.image ? this.feedbackImageThumbnailUrl + props.image : ''
                this.selectedCustomer = props.customer ? props.customer : customer
            } else {
                this.formData = {...payload}
                this.image = ''
                this.selectedCustomer = customer 
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