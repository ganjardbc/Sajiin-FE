<template>
    <div id="CardAddress" style="position: relative;">
        <AppShowHide :title="'List Address (' + (datas.length) + ')'">
            <div v-if="datas.length > 0">
                <div class="card border-full" style="margin-bottom: 20px;" v-for="(dt, index) in datas" :key="index">
                    <div class="display-flex space-between">
                        <div style="width: 40px;">
                            <i class="fa fa-lg fa-map-marker-alt fonts main" style="margin-top: 5px;"></i>
                        </div>
                        <div style="width: calc(100% - 70px);">
                            <div class="display-flex">
                                <div class="fonts fonts-10">{{ dt.name }}</div>
                                <div class="fa fa-1x fa-circle" style="color: #999; font-size: 5px; margin-left: 5px; margin-right: 5px; margin-top: 10px;"></div>
                                <div class="fonts fonts-10 grey">{{ dt.type }}</div>
                                <div style="padding-left: 10px; padding-top: 2px; padding-bottom: 2px;">
                                    <i :class="dt.is_selected ? 'fa fa-lw fa-check-circle fonts green' : ''"></i>
                                </div>
                            </div>
                            <div class="fonts fonts-11 semibold">{{ dt.address }}</div>
                        </div>
                        <div class="display-flex" style="width: 60px; text-align: right;">
                            <button class="btn btn-small-icon btn-transparent" @click="onEdit(index)">
                                <i class="fa fa-lw fa-pencil-alt"></i>
                            </button>
                            <button class="btn btn-small-icon btn-transparent" @click="onShowHideDelete(index)">
                                <i class="fa fa-lw fa-trash-alt"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else>
                <AppEmpty />
            </div>
        </AppShowHide>

        <button class="btn btn-main" style="position: absolute; top: -59px; right: 50px;" @click="onCreate">
            Add Address
        </button>

        <AppPopupForm
            v-if="visiblePopup"
            :title="isCreate ? 'Create Address' : 'Edit Address'"
            :enableSaveButton="true"
            :enableRadius="true"
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
                <div class="field-label">ADDRESS ID</div>
                <input 
                    type="text" 
                    placeholder="" 
                    class="field field-sekunder" 
                    name="address_id" 
                    id="address_id" 
                    v-model="payload.address_id"
                    readonly>
                <div v-if="formMessage" class="fonts micro semibold" style="color: red; margin-top: 5px;">
                    {{ formMessage && formMessage.address_id && formMessage.address_id[0] }}
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
                <div class="field-label">ADDRESS</div>
                <textarea 
                    name="address" 
                    id="address" 
                    class="field field-sekunder field-textarea" 
                    v-model="payload.address"></textarea>
                <div v-if="formMessage" class="fonts micro semibold" style="color: red; margin-top: 5px;">
                    {{ formMessage && formMessage.address && formMessage.address[0] }}
                </div>
            </div>
            <div class="field-group margin margin-bottom-15-px">
                <div class="field-label">TYPE</div>
                <select 
                    class="cf-input slc slc-sekunder"
                    name="category_id" 
                    id="category_id" 
                    v-model="payload.type">
                    <option v-for="(ctr, index) in bizparAddress" :value="ctr.value" :key="index">
                        {{ ctr.value }}
                    </option>
                </select>
                <div v-if="formMessage" class="fonts micro semibold" style="color: red; margin-top: 5px;">
                    {{ formMessage && formMessage.type && formMessage.type[0] }}
                </div>
            </div>
            <div class="field-group margin margin-bottom-20-px">
                <div class="field-label">SELECTED</div>
                <div class="display-flex space-between">
                    <div class="fonts micro black">Make this address as your now location ?</div>
                    <label class="switch green">
                        <input 
                            type="checkbox" 
                            name="is_selected" 
                            id="is_selected" 
                            v-model="payload.is_selected" />
                        <span class="slider round" />
                    </label>
                </div>
                <div v-if="formMessage" class="fonts micro semibold" style="color: red; margin-top: 5px;">
                    {{ formMessage && formMessage.is_selected && formMessage.is_selected[0] }}
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
import AppPopupForm from '../../../modules/AppPopupForm'
import AppAlert from '../../../modules/AppAlert'
import AppShowHide from '../../../modules/AppShowHide'
import AppEmpty from '../../../modules/AppEmpty'

const time = new Date().getTime()

const payload = {
    id: '',
    address_id: 'AD-' + time.toString(),
    name: '',
    address: '',
    type: '',
    is_selected: 0,
    customer_id: 0
}

export default {
    name: 'CardAddress',
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
            bizparAddress: [],
            formMessage: []
        }
    },
    mounted () {
        this.getData(this.selectedCustomerId)
        this.getDataBizpar('address')
    },
    components: {
        AppEmpty,
        AppShowHide,
        AppPopupForm,
        AppAlert
    },
    props: {
        selectedId: {
            required: true
        },
        selectedCustomerId: {
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
        onCreate: function () {
            this.visiblePopup = true
            this.isCreate = true 
            this.payload = {...payload}
            this.formMessage = []
        },
        async removeData () {
            this.visibleLoaderAction = true

            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const id = this.payload.address_id
            const payload = {
                address_id: id
            }

            const rest = await axios.post('/api/address/delete', payload, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                this.onShowHideDelete()
                this.onClose()
                this.visibleLoaderAction = false

                const data = rest.data
                if (data.status === 'ok') {
                    this.getData(this.selectedCustomerId)
                } else {
                    alert('Proceed failed')
                }
            } else {
                alert('Proceed failed')
                this.visibleLoaderAction = false
            }

            console.log('rest', rest)
        },
        async saveData () {
            this.visibleLoaderAction = true

            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const payload = {...this.payload, customer_id: this.selectedId}
            const url = this.isCreate ? '/api/address/post' : '/api/address/update' 

            const rest = await axios.post(url, payload, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                this.onShowHideSave()
                this.visibleLoaderAction = false

                const data = rest.data.data
                if (data.length !== 0) {
                    this.onClose()
                    this.getData(this.selectedCustomerId)
                } else {
                    this.formMessage = rest.data.message
                }
            } else {
                alert('Proceed failed')
                this.visibleLoaderAction = false
            }
        },
        async getData (id) {
            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const payload = {
                limit: 1000,
                offset: 0,
                customer_id: id
            }

            const rest = await axios.post('/api/address/getAll', payload, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                const data = rest.data.data
                this.datas = data
            }
        },
        async getDataBizpar (type) {
            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const payload = {
                limit: 1000,
                offset: 0,
                type: type
            }

            const rest = await axios.post('/api/bizpar/getByType', payload, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                const data = rest.data.data
                this.bizparAddress = data
            }
        },
    },
    watch: {
        selectedCustomerId: function (props, prevProps) {
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