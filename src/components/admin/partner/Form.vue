<template>
    <div id="form">
        <AppSideForm 
            :title="title" 
            :enableCreateButton="this.title === 'EDIT' ? selectedIndex === 1 ? true : false : false"
            :enableSaveButton="this.title !== 'VIEW' ? selectedIndex === 0 ? true : false : false"
            :onCreate="onButtonCreate"
            :onSave="onButtonSave"
            :onClose="onClose">

            <AppTabs 
                v-if="title !== 'CREATE' ? true : false"
                :selectedIndex="selectedIndex" 
                :data="tabs" 
                :onChange="(data) => onChangeTabs(data)" 
                class="margin margin-bottom-15-px" />

            <div v-if="selectedIndex === 0">
                <div class="field-group margin margin-bottom-15-px">
                    <div class="field-label">ID</div>
                    <input 
                        type="text" 
                        placeholder="" 
                        class="field field-sekunder" 
                        name="id" 
                        id="id" 
                        v-model="formData.partner.id"
                        readonly>
                </div>
                <div class="field-group margin margin-bottom-15-px">
                    <div class="field-label">PARTNER ID</div>
                    <input 
                        type="text" 
                        placeholder="" 
                        class="field field-sekunder" 
                        name="partner_id" 
                        id="partner_id" 
                        v-model="formData.partner.partner_id"
                        :readonly="this.title !== 'CREATE' ? true : false">
                    <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.partner_id && formMessage.partner_id[0] }}
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
                        v-model="formData.partner.name"
                        :readonly="this.title === 'VIEW' ? true : false">
                    <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.name && formMessage.name[0] }}
                    </div>
                </div>
                <div class="field-group margin margin-bottom-15-px">
                    <div class="field-label">PERCENTAGE</div>
                    <input 
                        type="number" 
                        placeholder="" 
                        class="field field-sekunder" 
                        name="percentage" 
                        id="percentage" 
                        v-model="formData.partner.percentage"
                        :readonly="this.title === 'VIEW' ? true : false">
                    <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.percentage && formMessage.percentage[0] }}
                    </div>
                </div>
                <div class="field-group margin margin-bottom-15-px">
                    <div class="field-label">AMOUNT</div>
                    <input 
                        type="number" 
                        placeholder="" 
                        class="field field-sekunder" 
                        name="amount" 
                        id="amount" 
                        v-model="formData.partner.amount"
                        :readonly="this.title === 'VIEW' ? true : false">
                    <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.amount && formMessage.amount[0] }}
                    </div>
                </div>
                <div class="field-group margin margin-bottom-15-px">
                    <div class="field-label">AVAILABLE</div>
                    <div class="display-flex space-between">
                        <div class="fonts micro black">Is this partner still available ?</div>
                        <label class="switch green">
                            <input 
                                type="checkbox" 
                                name="is_available" 
                                id="is_available" 
                                v-model="formData.partner.is_available"
                                :readonly="this.title === 'VIEW' ? true : false" />
                            <span class="slider round" />
                        </label>
                    </div>
                    <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.is_available && formMessage.is_available[0] }}
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
                                v-model="formData.partner.status" />
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
                                v-model="formData.partner.status" />
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
                    <div class="field-label">DESCRIPTION</div>
                    <textarea 
                        name="description" 
                        id="description" 
                        class="field field-sekunder field-textarea" 
                        v-model="formData.partner.description"
                        :readonly="this.title === 'VIEW' ? true : false"></textarea>
                    <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.description && formMessage.description[0] }}
                    </div>
                </div>
            </div>

            <div v-if="selectedIndex === 1">
                <FormConfig 
                    :selectedId.sync="formData.partner.id"
                    :selectedPartnerId.sync="formData.partner.partner_id"
                    :enableButton="title === 'EDIT' ? true : false"
                    :enablePopup="popupCreate" />
            </div>
        </AppSideForm>
    </div>
</template>

<script>
import AppSideForm from '../../modules/AppSideForm'
import AppTabs from '../../modules/AppTabs'
import FormConfig from './FormConfig'

const tabs = [
    {id: 1, label: 'Data', status: 'active'},
    {id: 2, label: 'Configuration', status: ''}
]

const payload = {
    partner: {
        id: '',
        partner_id: '',
        name: '',
        description: '',
        promo_code: '',
        percentage: '',
        amount: '',
        expire_date: '',
        is_available: '',
        status: ''
    },
    configurations: []
}

export default {
    name: 'form',
    data () {
        return {
            selectedIndex: 0,
            isView: false,
            popupCreate: false,
            tabs: tabs,
            formData: {...payload},
            formMessage: []
        }
    },
    mounted () {
        this.formData = {...payload}
    },
    components: {
        FormConfig: FormConfig,
        AppSideForm: AppSideForm,
        AppTabs: AppTabs
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
        onButtonCreate () {
            this.popupCreate = !this.popupCreate
        },
        onButtonSave () {
            const newPayload = this.formData
            this.onSave(newPayload)
        },
        onChangeTabs (data) {
            this.selectedIndex = data
        }
    },
    watch: {
        data: function (props, prevProps) {
            if (props) {
                this.formData = {
                    ...this.formData,
                    partner: {
                        ...this.formData.partner,
                        id: props.partner.id,
                        partner_id: props.partner.partner_id,
                        name: props.partner.name,
                        description: props.partner.description,
                        promo_code: props.partner.promo_code,
                        percentage: props.partner.percentage,
                        amount: props.partner.amount,
                        expire_date: props.partner.expire_date,
                        is_available: props.partner.is_available,
                        status: props.partner.status
                    },
                    configurations: [
                        ...props.configurations
                    ]
                }
            } else {
                this.formData = {...payload}
            }
            this.onChangeTabs(0)
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