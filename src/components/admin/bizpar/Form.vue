<template>
    <div id="form">
        <AppSideForm 
            :title="title" 
            :enableSaveButton="this.title !== 'VIEW' ? true : false"
            :onSave="onButtonSave"
            :onClose="onClose">
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
                <div class="field-label">KEY</div>
                <input 
                    type="text" 
                    placeholder="" 
                    class="field field-sekunder" 
                    name="key" 
                    id="key" 
                    v-model="formData.key"
                    readonly>
                <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                    {{ formMessage && formMessage.key && formMessage.key[0] }}
                </div>
            </div>
            <div class="field-group margin margin-bottom-15-px">
                <div class="field-label">VALUE</div>
                <input 
                    type="text" 
                    placeholder="" 
                    class="field field-sekunder" 
                    name="value" 
                    id="value" 
                    v-model="formData.value"
                    :readonly="this.title === 'VIEW' ? true : false">
                <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                    {{ formMessage && formMessage.value && formMessage.value[0] }}
                </div>
            </div>
            <div class="field-group margin margin-bottom-15-px">
                <div class="field-label">TYPE</div>
                <input 
                    type="text" 
                    placeholder="" 
                    class="field field-sekunder" 
                    name="type" 
                    id="type" 
                    v-model="formData.type"
                    :readonly="this.title === 'VIEW' ? true : false">
                <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                    {{ formMessage && formMessage.type && formMessage.type[0] }}
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

const payload = {
    id: '',
    key: '',
    value: '',
    type: '',
    description: ''
}

export default {
    name: 'form',
    data () {
        return {
            isView: false,
            formData: {...payload},
            formMessage: []
        }
    },
    mounted () {
        this.formData = {...payload}
    },
    components: {
        AppSideForm: AppSideForm
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
                key: 'BZ-' + time.toString()
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
                    key: props.key,
                    value: props.value,
                    type: props.type,
                    description: props.description
                }
            } else {
                this.formData = {...payload}
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