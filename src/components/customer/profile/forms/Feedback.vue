<template>
    <div id="form">
        <AppPopupForm 
            :title="title === 'EDIT' ? 'Edit Feedback' : 'Create Feedback'" 
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
                <!-- <div class="field-group margin margin-bottom-15-px">
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
                </div> -->
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
        </AppPopupForm>
    </div>
</template>

<script>
import AppPopupForm from '../../../modules/AppPopupForm'
import AppImage from '../../../modules/AppImage'

const time = new Date().getTime()

const payload = {
    id: '',
    feedback_id: 'FB-' + time,
    image: '',
    name: '',
    work: '',
    feedback: '',
    status: 'inactive',
    owner_id: 0
}

export default {
    name: 'form',
    data () {
        return {
            selectedIndex: 0,
            isView: false,
            popupCreate: false,
            image: '',
            formData: {...payload},
            formMessage: [],
            selectedCustomer: null,
            selectedTable: null 
        }
    },
    mounted () {
        this.selectedCustomer = this.$cookies.get('customer')
        this.selectedTable = this.$cookies.get('table')
        this.formData = this.data ? {...this.data} : {...payload}
        this.formData = {
            ...this.formData,
            owner_id: this.selectedCustomer.id
        }
        this.image = this.data && this.data.image ? '/contents/feedbacks/thumbnails/' + this.data.image : ''
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
                    feedback_id: props.feedback_id,
                    image: props.image,
                    name: props.name,
                    work: props.work,
                    feedback: props.feedback,
                    status: props.status
                }
                this.image = props.image ? '/contents/feedbacks/thumbnails/' + props.image : ''
            } else {
                this.formData = {...payload}
                this.image = ''
            }
            // console.log('data', props)
        },
        message: function (props, prevProps) {
            if (props) {
                this.formMessage = props
            } else {
                this.formMessage = []
            }
            // console.log('message', props)
        }
    }
}
</script>