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
                <div class="field-label">TOPING ID</div>
                <input 
                    type="text" 
                    placeholder="" 
                    class="field field-sekunder" 
                    name="toping_id" 
                    id="toping_id" 
                    v-model="formData.toping_id"
                    readonly>
                <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                    {{ formMessage && formMessage.toping_id && formMessage.toping_id[0] }}
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
                <div class="field-label">PRICE</div>
                <input 
                    type="text" 
                    placeholder="" 
                    class="field field-sekunder" 
                    name="price" 
                    id="price" 
                    v-model="formData.price"
                    :readonly="this.title === 'VIEW' ? true : false">
                <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                    {{ formMessage && formMessage.price && formMessage.price[0] }}
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
                <div class="field-label">AVAILABLE</div>
                <div class="display-flex space-between">
                    <div class="fonts micro black">Is this toping still available ?</div>
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
        </AppSideForm>
    </div>
</template>

<script>
import AppSideForm from '../../modules/AppSideForm'

const time = new Date().getTime()

const payload = {
    id: '',
    toping_id: 'PT-' + time,
    name: '',
    price: '',
    is_available: '',
    status: '',
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
                    toping_id: props.toping_id,
                    name: props.name,
                    price: props.price,
                    is_available: props.is_available,
                    status: props.status,
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