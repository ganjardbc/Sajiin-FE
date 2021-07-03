<template>
    <div id="form">
        <AppSideForm 
            :title="title" 
            :enableSaveButton="this.title !== 'VIEW' ? true : false"
            :onSave="onButtonSave"
            :onClose="onClose">
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
                <div class="field-label">NOTIFICATION ID</div>
                <input 
                    type="text" 
                    placeholder="" 
                    class="field field-sekunder" 
                    name="notification_id" 
                    id="notification_id" 
                    v-model="formData.notification_id"
                    readonly>
                <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                    {{ formMessage && formMessage.notification_id && formMessage.notification_id[0] }}
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
                    readonly>
                <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                    {{ formMessage && formMessage.title && formMessage.title[0] }}
                </div>
            </div>
            <div class="field-group margin margin-bottom-15-px">
                <div class="field-label">LINK</div>
                <input 
                    type="text" 
                    placeholder="" 
                    class="field field-sekunder" 
                    name="link" 
                    id="link" 
                    v-model="formData.link"
                    readonly>
                <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                    {{ formMessage && formMessage.link && formMessage.link[0] }}
                </div>
            </div>
            <div class="field-group margin margin-bottom-15-px">
                <div class="field-label">SUBTITLE</div>
                <textarea 
                    name="subtitle" 
                    id="subtitle" 
                    class="field field-sekunder field-textarea" 
                    v-model="formData.subtitle"
                    readonly></textarea>
                <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                    {{ formMessage && formMessage.subtitle && formMessage.subtitle[0] }}
                </div>
            </div>
            <!-- <div class="field-group margin margin-bottom-25-px">
                <div class="field-label">STATUS</div>
                <div v-if="this.title !== 'VIEW'" class="display-flex">
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
                <input 
                    v-else
                    type="text" 
                    placeholder="" 
                    class="field field-sekunder" 
                    name="status" 
                    id="status" 
                    :value="formData.status"
                    readonly>
                <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                    {{ formMessage && formMessage.status && formMessage.status[0] }}
                </div>
            </div> -->
            <div class="field-group margin margin-bottom-15-px">
                <div class="field-label">READ</div>
                <div v-if="this.title !== 'VIEW'" class="display-flex space-between">
                    <div class="fonts micro black">Mark as read ?</div>
                    <label class="switch green">
                        <input 
                            type="checkbox" 
                            name="is_read" 
                            id="is_read" 
                            v-model="formData.is_read"
                            :readonly="this.title === 'VIEW' ? true : false" />
                        <span class="slider round" />
                    </label>
                </div>
                <input 
                    v-else
                    type="text" 
                    placeholder="" 
                    class="field field-sekunder" 
                    name="is_read" 
                    id="is_read" 
                    :value="formData.status ? 'Read' : 'Unread'"
                    readonly>
                <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                    {{ formMessage && formMessage.is_read && formMessage.is_read[0] }}
                </div>
            </div>
        </AppSideForm>
    </div>
</template>

<script>
import AppSideForm from '../../modules/AppSideForm'
import AppImage from '../../modules/AppImage'

const payload = {
    id: '',
    notification_id: '',
    image: '',
    title: '',
    link: '',
    status: '',
    subtitle: '',
    is_read: 0
}

export default {
    name: 'form',
    data () {
        return {
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
        AppSideForm: AppSideForm,
        AppImage: AppImage
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
        onButtonSave () {
            const time = new Date().getTime()
            const newPayload = this.title === 'CREATE' ? {
                ...this.formData,
                notification_id: 'NF-' + time.toString()
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
                    id: props.id,
                    notification_id: props.notification_id,
                    image: props.image,
                    title: props.title,
                    link: props.link,
                    status: props.status,
                    subtitle: props.subtitle,
                    is_read: props.is_read
                }
                this.image = props.image ? this.categoryImageThumbnailUrl + props.image : ''
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
            console.log('props', props)
        }
    }
}
</script>