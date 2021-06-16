<template>
    <div id="FormConfig">
        <div class="card box-shadow" v-for="(dt, index) in datas" :key="index">
            <div class="display-flex">
                <div>
                    <div class="display-flex margin margin-bottom-5-px">
                        <div class="fonts micro black width width-100-px">ID</div>
                        <div class="fonts micro black semibold">{{ dt.id }}</div>
                    </div>
                    <div class="display-flex margin margin-bottom-5-px">
                        <div class="fonts micro black width width-100-px">Config ID</div>
                        <div class="fonts micro black semibold">{{ dt.partconfig_id }}</div>
                    </div>
                    <div class="display-flex margin margin-bottom-5-px">
                        <div class="fonts micro black width width-100-px">Name</div>
                        <div class="fonts micro black semibold">{{ dt.name }}</div>
                    </div>
                    <div class="display-flex margin margin-bottom-5-px">
                        <div class="fonts micro black width width-100-px">Promo Code</div>
                        <div class="fonts micro black semibold">{{ dt.promo_code }}</div>
                    </div>
                    <div class="display-flex margin margin-bottom-5-px">
                        <div class="fonts micro black width width-100-px">Expire Date</div>
                        <div class="fonts micro black semibold">{{ dt.expire_date }}</div>
                    </div>
                    <div class="display-flex margin margin-bottom-5-px">
                        <div class="fonts micro black width width-100-px">Status</div>
                        <div class="fonts micro black semibold">{{ dt.status }}</div>
                    </div>
                    <div class="display-flex margin margin-bottom-10-px">
                        <div class="fonts micro black width width-100-px">Description</div>
                        <div class="fonts micro black semibold">{{ dt.description }}</div>
                    </div>
                </div>
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

        <AppPopupForm
            v-if="visiblePopup"
            :title="isCreate ? 'Create Configuration' : 'Edit Configuration'"
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
                <div class="field-label">CONFIG ID</div>
                <input 
                    type="text" 
                    placeholder="" 
                    class="field field-sekunder" 
                    name="partconfig_id" 
                    id="partconfig_id" 
                    v-model="payload.partconfig_id"
                    :readonly="isCreate ? false : true">
                <div v-if="formMessage" class="fonts micro semibold" style="color: red; margin-top: 5px;">
                    {{ formMessage && formMessage.partconfig_id && formMessage.partconfig_id[0] }}
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
                <div class="field-label">PROMO CODE</div>
                <input 
                    type="text" 
                    placeholder="" 
                    class="field field-sekunder" 
                    name="promo_code" 
                    id="promo_code" 
                    v-model="payload.promo_code">
                <div v-if="formMessage" class="fonts micro semibold" style="color: red; margin-top: 5px;">
                    {{ formMessage && formMessage.promo_code && formMessage.promo_code[0] }}
                </div>
            </div>
            <div class="field-group margin margin-bottom-15-px">
                <div class="field-label">EXPIRE DATE</div>
                <input 
                    type="date" 
                    placeholder="" 
                    class="field field-sekunder" 
                    name="expire_date" 
                    id="expire_date" 
                    v-model="payload.expire_date"
                    :readonly="this.title === 'VIEW' ? true : false">
                <div v-if="formMessage" class="fonts micro semibold" style="color: red; margin-top: 5px;">
                    {{ formMessage && formMessage.expire_date && formMessage.expire_date[0] }}
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

const payload = {
    id: '',
    partconfig_id: '',
    name: '',
    description: '',
    promo_code: '',
    expire_date: '',
    status: '',
    partner_id: 0
}

export default {
    name: 'FormConfig',
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
        this.getData(this.selectedPartnerId)
    },
    components: {
        AppPopupForm: AppPopupForm,
        AppAlert: AppAlert
    },
    props: {
        selectedId: {
            required: true
        },
        selectedPartnerId: {
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
            const id = this.payload.partconfig_id
            const payload = {
                partconfig_id: id
            }

            const rest = await axios.post('/api/partnerConfiguration/delete', payload, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                this.onShowHideDelete()
                this.onClose()
                this.visibleLoaderAction = false

                const data = rest.data
                if (data.status === 'ok') {
                    this.getData(this.selectedPartnerId)
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
            const payload = {...this.payload, partner_id: this.selectedId}
            const url = this.isCreate ? '/api/partnerConfiguration/post' : '/api/partnerConfiguration/update' 

            const rest = await axios.post(url, payload, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                this.onShowHideSave()
                this.visibleLoaderAction = false

                const data = rest.data.data
                if (data.length !== 0) {
                    this.onClose()
                    this.getData(this.selectedPartnerId)
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
                partner_id: id
            }

            const rest = await axios.post('/api/partnerConfiguration/getAll', payload, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                const data = rest.data.data
                this.datas = data
            }
        },
    },
    watch: {
        selectedPartnerId: function (props, prevProps) {
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