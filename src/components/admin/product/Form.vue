<template>
    <div id="form">
        <AppSideForm 
            :title="title" 
            :enableCreateButton="this.title === 'EDIT' ? selectedIndex !== 0 ? true : false : false"
            :enableSaveButton="this.title !== 'VIEW' ? selectedIndex === 0 ? true : false : false"
            :onSave="onButtonSave"
            :onCreate="onButtonCreate"
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
                        v-model="formData.product.id"
                        readonly>
                </div>
                <div class="field-group margin margin-bottom-15-px">
                    <div class="field-label">PRODUCT ID</div>
                    <input 
                        type="text" 
                        placeholder="" 
                        class="field field-sekunder" 
                        name="product_id" 
                        id="product_id" 
                        v-model="formData.product.product_id"
                        readonly>
                    <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.product_id && formMessage.product_id[0] }}
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
                        v-model="formData.product.name"
                        :readonly="this.title === 'VIEW' ? true : false">
                    <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.name && formMessage.name[0] }}
                    </div>
                </div>
                <div class="field-group margin margin-bottom-15-px">
                    <div class="field-label">CATEGORY</div>
                    <select 
                        class="cf-input slc slc-sekunder"
                        name="category_id" 
                        id="category_id" 
                        v-model="formData.product.category_id"
                        :disabled="this.title === 'VIEW' ? true : false">
                        <option v-for="(ctr, index) in formCategory" :value="ctr.id" :key="index">
                            {{ ctr.name }}
                        </option>
                    </select>
                    <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.category_id && formMessage.category_id[0] }}
                    </div>
                </div>
                <div class="field-group margin margin-bottom-15-px">
                    <div class="field-label">DESCRIPTION</div>
                    <textarea 
                        name="description" 
                        id="description" 
                        class="field field-sekunder field-textarea" 
                        v-model="formData.product.description"
                        :readonly="this.title === 'VIEW' ? true : false"></textarea>
                    <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.description && formMessage.description[0] }}
                    </div>
                </div>
                <div class="field-group margin margin-bottom-20-px">
                    <div class="field-label">STATUS</div>
                    <div class="display-flex">
                        <label class="radio">
                            <input 
                                type="radio" 
                                name="status"
                                id="active"
                                value="active"
                                v-model="formData.product.status"
                                :disabled="this.title === 'VIEW' ? true : false" />
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
                                v-model="formData.product.status"
                                :disabled="this.title === 'VIEW' ? true : false" />
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
                        <div class="fonts micro black">Is this product still available ?</div>
                        <label class="switch green">
                            <input 
                                type="checkbox" 
                                name="is_available" 
                                id="is_available" 
                                v-model="formData.product.is_available"
                                :disabled="this.title === 'VIEW' ? true : false" />
                            <span class="slider round" />
                        </label>
                    </div>
                    <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.is_available && formMessage.is_available[0] }}
                    </div>
                </div>
                <div class="field-group margin margin-bottom-15-px">
                    <div class="field-label">PINNED</div>
                    <div class="display-flex space-between">
                        <div class="fonts micro black">Set this product to banner ?</div>
                        <label class="switch green">
                            <input 
                                type="checkbox" 
                                name="is_pinned" 
                                id="is_pinned" 
                                v-model="formData.product.is_pinned" 
                                :disabled="this.title === 'VIEW' ? true : false" />
                            <span class="slider round" />
                        </label>
                    </div>
                    <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.is_pinned && formMessage.is_pinned[0] }}
                    </div>
                </div>
                <div class="field-group margin margin-bottom-15-px">
                    <div class="field-label">NOTE</div>
                    <textarea 
                        name="note" 
                        id="note" 
                        class="field field-sekunder field-textarea" 
                        v-model="formData.product.note"
                        :readonly="this.title === 'VIEW' ? true : false"></textarea>
                    <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.note && formMessage.note[0] }}
                    </div>
                </div>
            </div>

            <div v-if="selectedIndex === 1">
                <FormDetail 
                    :selectedId.sync="formData.product.id"
                    :selectedProductId.sync="formData.product.product_id"
                    :enableButton="title === 'EDIT' ? true : false"
                    :enablePopup="popupDetailCreate" />
            </div>

            <div v-if="selectedIndex === 2">
                <FormImage 
                    :selectedId.sync="formData.product.id"
                    :selectedProductId.sync="formData.product.product_id"
                    :enableButton="title === 'EDIT' ? true : false"
                    :enablePopup="popupImageCreate" />
            </div>

            <div v-if="selectedIndex === 3">
                <FormToping 
                    :selectedId.sync="formData.product.id"
                    :selectedProductId.sync="formData.product.product_id"
                    :enableButton="title === 'EDIT' ? true : false"
                    :enablePopup="popupTopingCreate" />
            </div>
        </AppSideForm>
    </div>
</template>

<script>
import AppSideForm from '../../modules/AppSideForm'
import AppTabs from '../../modules/AppTabs'
import FormDetail from './FormDetail'
import FormImage from './FormImage'
import FormToping from './FormToping'

const tabs = [
    {id: 1, label: 'Data', status: 'active'},
    {id: 2, label: 'Details', status: ''},
    {id: 3, label: 'Images', status: ''},
    {id: 4, label: 'Topings', status: ''}
]

const payload = {
    product: {
        id: '',
        product_id: '',
        name: '',
        description: '',
        note: '',
        is_pinned: 0,
        is_available: 0,
        status: 'active',
        category_id: ''
    },
    details: [],
    images: []
}

export default {
    name: 'form',
    data () {
        return {
            popupTopingCreate: false,
            popupDetailCreate: false,
            popupImageCreate: false,
            selectedIndex: 0,
            isView: false,
            tabs: tabs,
            formData: {...payload},
            formMessage: [],
            formCategory: []
        }
    },
    mounted () {
        this.formData = {...payload}
    },
    components: {
        AppSideForm: AppSideForm,
        AppTabs: AppTabs,
        FormDetail: FormDetail,
        FormImage: FormImage,
        FormToping: FormToping
    },
    props: {
        categories: {
            required: true
        },
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
        onButtonCreateToping () {
            this.popupTopingCreate = !this.popupTopingCreate
        },
        onButtonCreateDetail () {
            this.popupDetailCreate = !this.popupDetailCreate
        },
        onButtonCreateImage () {
            this.popupImageCreate = !this.popupImageCreate
        },
        onButtonCreate () {
            console.log('index', this.selectedIndex)
            switch (this.selectedIndex) {
                case 1:
                    this.onButtonCreateDetail()
                    break
                case 2:
                    this.onButtonCreateImage()
                    break
                default:
                    this.onButtonCreateToping()
                    break
            }
        },
        onButtonSave () {
            const time = new Date().getTime()
            const newPayload = this.title === 'CREATE' ? {
                ...this.formData,
                product: {
                    ...this.formData.product,
                    product_id: 'PR-' + time.toString()
                }
            } : {
                ...this.formData
            }
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
                    product: {
                        ...this.formData.product,
                        id: props.product.id,
                        product_id: props.product.product_id,
                        name: props.product.name,
                        description: props.product.description,
                        note: props.product.note,
                        is_pinned: props.product.is_pinned,
                        is_available: props.product.is_available,
                        status: props.product.status,
                        category_id: props.product.category_id
                    },
                    images: [
                        ...props.images
                    ],
                    details: [
                        ...props.details
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
        },
        categories: function (props, prevProps) {
            if (props) {
                this.formCategory = props
            } else {
                this.formCategory = []
            }
        }
    }
}
</script>