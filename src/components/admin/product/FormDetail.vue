<template>
    <div id="FormDetail">
        <AppLoader v-if="visibleLoader" />

        <div v-else>
            <div class="card box-shadow" v-for="(dt, index) in datas" :key="index">
                <div class="display-flex margin margin-bottom-5-px">
                    <div class="fonts micro black width width-100-px">ID</div>
                    <div class="fonts micro black semibold">{{ dt.id }}</div>
                </div>
                <div class="display-flex margin margin-bottom-5-px">
                    <div class="fonts micro black width width-100-px">Detail ID</div>
                    <div class="fonts micro black semibold">{{ dt.proddetail_id }}</div>
                </div>
                <div class="display-flex margin margin-bottom-5-px">
                    <div class="fonts micro black width width-100-px">Name</div>
                    <div class="fonts micro black semibold">{{ dt.name }}</div>
                </div>
                <div class="display-flex margin margin-bottom-5-px">
                    <div class="fonts micro black width width-100-px">Price</div>
                    <div class="fonts micro black semibold">{{ dt.price }}</div>
                </div>
                <div class="display-flex margin margin-bottom-5-px">
                    <div class="fonts micro black width width-100-px">Status</div>
                    <div class="fonts micro black semibold">{{ dt.status }}</div>
                </div>
                <div class="display-flex margin margin-bottom-5-px">
                    <div class="fonts micro black width width-100-px">Is Available</div>
                    <div class="fonts micro black semibold">{{ dt.is_available ? 'yes' : 'no' }}</div>
                </div>
                <div class="display-flex margin margin-bottom-10-px">
                    <div class="fonts micro black width width-100-px">Description</div>
                    <div class="fonts micro black semibold">{{ dt.description }}</div>
                </div>
                <div v-if="enableButton" class="display-flex space-between margin margin-bottom-0-px">
                    <div></div>
                    <div class="display-flex content-right">
                        <button class="btn btn-small-icon btn-sekunder" @click="onEdit(index)">
                            <i class="fa fa-1x fa-pencil-alt"></i>
                        </button>
                        <button class="btn btn-small-icon btn-sekunder" @click="onShowHideDelete(index)">
                            <i class="fa fa-1x fa-trash-alt"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <AppPopupForm
            v-if="visiblePopup"
            :title="isCreate ? 'Create Detail' : 'Edit Detail'"
            :enableSaveButton="true"
            :onClose="onClose"
            :onSave="onShowHideSave"
        >
            <div class="field-group margin margin-bottom-15-px">
                <div class="field-label">ID</div>
                <input 
                    type="text" 
                    placeholder="" 
                    class="field field-sekunder" 
                    name="id" 
                    id="id" 
                    v-model="payload.id"
                    readonly>
            </div>
            <div class="field-group margin margin-bottom-15-px">
                <div class="field-label">DETAIL ID</div>
                <input 
                    type="text" 
                    placeholder="" 
                    class="field field-sekunder" 
                    name="proddetail_id" 
                    id="proddetail_id" 
                    v-model="payload.proddetail_id"
                    readonly>
                <div v-if="formMessage" class="fonts micro semibold" style="color: red; margin-top: 5px;">
                    {{ formMessage && formMessage.proddetail_id && formMessage.proddetail_id[0] }}
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
                    v-model="payload.name">
                <div v-if="formMessage" class="fonts micro semibold" style="color: red; margin-top: 5px;">
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
                    v-model="payload.price">
                <div v-if="formMessage" class="fonts micro semibold" style="color: red; margin-top: 5px;">
                    {{ formMessage && formMessage.price && formMessage.price[0] }}
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
                            v-model="payload.status" />
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
                            v-model="payload.status" />
                        <span class="checkmark" />
                        <span class="fonts micro">
                            Inactive
                        </span>
                    </label>
                </div>
                <div v-if="formMessage" class="fonts micro semibold" style="color: red; margin-top: 5px;">
                    {{ formMessage && formMessage.status && formMessage.status[0] }}
                </div>
            </div>
            <div class="field-group margin margin-bottom-15-px">
                <div class="field-label">AVAILABLE</div>
                <div class="display-flex space-between">
                    <div class="fonts micro black">Is this detail still available ?</div>
                    <label class="switch green">
                        <input 
                            type="checkbox" 
                            name="is_available" 
                            id="is_available" 
                            v-model="payload.is_available" />
                        <span class="slider round" />
                    </label>
                </div>
                <div v-if="formMessage" class="fonts micro semibold" style="color: red; margin-top: 5px;">
                    {{ formMessage && formMessage.is_available && formMessage.is_available[0] }}
                </div>
            </div>
            <div class="field-group margin margin-bottom-15-px">
                <div class="field-label">DESCRIPTION</div>
                <textarea 
                    name="description" 
                    id="description" 
                    class="field field-sekunder field-textarea" 
                    v-model="payload.description"></textarea>
                <div v-if="formMessage" class="fonts micro semibold" style="color: red; margin-top: 5px;">
                    {{ formMessage && formMessage.description && formMessage.description[0] }}
                </div>
            </div>
        </AppPopupForm>

        <AppAlert 
            v-if="visibleAlertDelete" 
            :isLoader="visibleLoaderAction"
            :title="'This action will remove data permanently, delete this data ?'" 
            :onClose="onShowHideDelete" 
            :onSave="removeData" />
        
        <AppAlert 
            v-if="visibleAlertSave" 
            :isLoader="visibleLoaderAction"
            :title="'Proceed this data ?'" 
            :onClose="onShowHideSave" 
            :onSave="saveData" />
    </div>
</template>

<script>
import axios from 'axios'
import AppPopupForm from '../../modules/AppPopupForm'
import AppAlert from '../../modules/AppAlert'
import AppLoader from '../../modules/AppLoader'

const payload = {
    id: '',
    proddetail_id: '',
    name: '',
    description: '',
    price: '',
    is_available: 0,
    status: '',
    product_id: 0
}

export default {
    name: 'FormDetail',
    data () {
        return {
            visibleAlertDelete: false,
            visibleAlertSave: false,
            visibleLoader: false,
            visibleLoaderAction: false,
            isCreate: true,
            visiblePopup: false,
            payload: {...payload},
            datas: [],
            formMessage: []
        }
    },
    mounted () {
        this.getData(this.selectedProductId)
    },
    components: {
        AppLoader,
        AppPopupForm,
        AppAlert
    },
    props: {
        selectedId: {
            required: true
        },
        selectedProductId: {
            required: true
        },
        enableButton: {
            required: false,
            type: Boolean
        },
        enablePopup: {
            required: false,
            type: Boolean
        }
    },
    methods: {
        onShowHideDelete (index = null) {
            this.visibleAlertDelete = !this.visibleAlertDelete
            this.payload = this.datas[index] ? this.datas[index] : payload
            this.formMessage = []
        },
        onShowHideSave () {
            this.visibleAlertSave = !this.visibleAlertSave
            this.formMessage = []
        },
        onClose: function () {
            this.visiblePopup = false
            this.isCreate = true
            this.payload = {...payload}
            this.formMessage = []
        },
        onEdit: function (index) {
            this.visiblePopup = true
            this.isCreate = false
            this.payload = this.datas[index] ? this.datas[index] : payload
            this.formMessage = []
        },
        async removeData () {
            this.visibleLoaderAction = true

            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const id = this.payload.proddetail_id
            const payload = {
                proddetail_id: id
            }

            const rest = await axios.post('/api/productDetail/delete', payload, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                this.onShowHideDelete()
                this.onClose()
                this.visibleLoaderAction = false

                const data = rest.data
                if (data.status === 'ok') {
                    this.getData(this.selectedProductId)
                } else {
                    alert('Proceed failed')
                }
            } else {
                alert('Proceed failed')
                this.visibleLoaderAction = false
            }
        },
        async saveData () {
            this.visibleLoaderAction = true

            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const payload = {...this.payload, product_id: this.selectedId}
            const url = this.isCreate ? '/api/productDetail/post' : '/api/productDetail/update' 

            const time = new Date().getTime()
            const newPayload = this.isCreate ? {
                ...payload,
                proddetail_id: 'PD-' + time.toString()
            } : {
                ...payload
            }

            const rest = await axios.post(url, newPayload, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                this.onShowHideSave()
                this.visibleLoaderAction = false

                const data = rest.data.data
                if (data.length !== 0) {
                    this.onClose()
                    this.getData(this.selectedProductId)
                } else {
                    this.formMessage = rest.data.message
                }
            } else {
                alert('Proceed failed')
                this.visibleLoaderAction = false
            }
        },
        async getData (id) {
            this.visibleLoader = true 

            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const payload = {
                limit: 1000,
                offset: 0,
                product_id: id
            }

            const rest = await axios.post('/api/productDetail/getAll', payload, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                const data = rest.data.data
                this.datas = data
                this.visibleLoader = false
            } else {
                this.visibleLoader = false
            }
        },
    },
    watch: {
        selectedProductId: function (props, prevProps) {
            if (props) {
                this.getData(props)
            }
        },
        enablePopup: function (props, prevProps) {
            if (!this.visiblePopup) {
                this.visiblePopup = true
            } else {
                this.visiblePopup = false
            }
        }
    }
}
</script>