<template>
    <div id="form">
        <AppPopupForm 
            :title="title === 'EDIT' ? 'Edit Customer' : 'Create Customer'" 
            :enableRadius="true"
            :enableCreateButton="this.title === 'EDIT' ? selectedIndex === 1 ? true : false : false"
            :enableSaveButton="this.title !== 'VIEW' ? selectedIndex === 0 ? true : false : false"
            :onCreate="onButtonCreate"
            :onSave="onButtonSave"
            :onClose="onClose">

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
                    <div class="field-label">USERNAME</div>
                    <input 
                        type="text" 
                        placeholder="" 
                        class="field field-sekunder" 
                        name="username" 
                        id="username" 
                        v-model="formData.username"
                        :readonly="this.title === 'VIEW' ? true : false">
                    <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.username && formMessage.username[0] }}
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
                    <div class="field-label">STATUS</div>
                    <input 
                        type="text" 
                        placeholder="" 
                        class="field field-sekunder" 
                        name="status" 
                        id="status" 
                        v-model="formData.status"
                        readonly>
                    <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.status && formMessage.status[0] }}
                    </div>
                </div>
                <div class="field-group margin margin-bottom-15-px">
                    <div class="field-label">ROLE NAME</div>
                    <input 
                        type="text" 
                        placeholder="" 
                        class="field field-sekunder" 
                        name="role_name" 
                        id="role_name" 
                        v-model="formData.role_name"
                        readonly>
                    <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.role_name && formMessage.role_name[0] }}
                    </div>
                </div>
            </div>
        </AppPopupForm>
    </div>
</template>

<script>
import AppPopupForm from '../../../modules/AppPopupForm'
import AppImage from '../../../modules/AppImage'

const payload = {
    id: '',
    image: '',
    name: '',
    username: '',
    email: '',
    password: '',
    email_verified_at: '',
    provider: '',
    enabled: 0,
    status: 'inactive',
    role_id: ''
}

export default {
    name: 'form',
    data () {
        return {
            selectedIndex: 0,
            isView: false,
            popupCreate: false,
            formData: {...payload},
            formMessage: [],
            image: ''
        }
    },
    mounted () {
        this.formData = this.data ? {...this.data} : {...payload}
        this.image = this.data ? this.adminImageThumbnailUrl + this.data.image : ''
    },
    components: {
        AppImage,
        AppPopupForm 
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
        onButtonCreate () {
            this.popupCreate = !this.popupCreate
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
                    image: props.image,
                    name: props.name,
                    username: props.username,
                    email: props.email,
                    password: props.password,
                    email_verified_at: props.email_verified_at,
                    provider: props.provider,
                    enabled: props.enabled,
                    status: props.status,
                    role_id: props.role_id
                }
                this.image = props.image ? this.adminImageThumbnailUrl + props.image : ''
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