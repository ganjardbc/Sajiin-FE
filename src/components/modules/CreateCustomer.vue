<template>
    <div id="Form">
        <AppPopupForm
            :title="title === 'EDIT' ? 'Edit Customer' : 'Register Customer'"
            :enableRadius="true"
            :enableSaveButton="true"
            :onSave="onButtonSave"
            :onClose="onClose"
        >
            <div style="padding-top: 15px;">
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
        </AppPopupForm>
    </div>
</template>
<script>
import AppPopupForm from './AppPopupForm'
import AppImage from './AppImage'

const time = new Date().getTime()
const payload = {
    id: '',
    customer_id: 'CC-' + time,
    image: '',
    name: '',
    email: '',
    phone: '',
    about: '',
    status: 'inactive'
}

export default {
    name: 'Form',
    data () {
        return {
            formData: {...payload},
            formMessage: [],
            image: '',
        }
    },
    mounted () {
        this.formData = this.data ? {...this.data} : {...payload}
        this.image = this.data ? '/contents/customers/thumbnails/' + this.data.image : ''
    },
    components: {
        AppPopupForm,
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
                    customer_id: props.customer_id,
                    name: props.name,
                    email: props.email,
                    phone: props.phone,
                    about: props.about,
                    status: props.status
                }
                this.image = props.image ? '/contents/customers/thumbnails/' + props.image : ''
            } else {
                this.formData = {...payload}
                this.image = ''
            }
            console.log('data', props)
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