<template>
    <div id="form">
        <AppSideForm 
            :title="title" 
            :enableSaveButton="this.title !== 'VIEW' ? true : false"
            :onSave="onButtonSave"
            :onClose="onClose">
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
                <div class="field-label">BENEFIT ID</div>
                <input 
                    type="text" 
                    placeholder="" 
                    class="field field-sekunder" 
                    name="benefit_id" 
                    id="benefit_id" 
                    v-model="formData.benefit_id"
                    readonly>
                <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                    {{ formMessage && formMessage.benefit_id && formMessage.benefit_id[0] }}
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
            <div class="field-group margin margin-bottom-15-px">
                <div class="field-label">STATUS</div>
                <div v-if="title !== 'VIEW'">
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
                </div>
                <div v-else>
                    <input 
                        type="text" 
                        placeholder="" 
                        class="field field-sekunder" 
                        name="status" 
                        id="status" 
                        :value="formData.status"
                        readonly>
                </div>
                <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                    {{ formMessage && formMessage.status && formMessage.status[0] }}
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
        </AppSideForm>
    </div>
</template>

<script>
import AppSideForm from '../../modules/AppSideForm'
import AppImage from '../../modules/AppImage'

const payload = {
    id: '',
    benefit_id: '',
    image: '',
    title: '',
    description: '',
    status: 'active'
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
        onButtonSave () {
            const time = new Date().getTime()
            const newPayload = this.title === 'CREATE' ? {
                ...this.formData,
                benefit_id: 'BN-' + time.toString()
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
                    benefit_id: props.benefit_id,
                    image: props.image,
                    title: props.title,
                    description: props.description,
                    status: props.status
                }
                this.image = props.image ? this.benefitImageThumbnailUrl + props.image : ''
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