<template>
    <div id="FormConfig">
        <div class="field-group margin margin-bottom-15-px">
            <div class="field-label">CONFIG ID</div>
            <input 
                type="text" 
                placeholder="" 
                class="field field-sekunder" 
                name="partconfig_id" 
                id="partconfig_id" 
                v-model="data.partconfig_id"
                readonly>
        </div>
        <div class="field-group margin margin-bottom-15-px">
            <div class="field-label">NAME</div>
            <input 
                type="text" 
                placeholder="" 
                class="field field-sekunder" 
                name="name" 
                id="name" 
                v-model="data.name"
                readonly>
        </div>
        <div class="field-group margin margin-bottom-15-px">
            <div class="field-label">PROMO CODE</div>
            <input 
                type="text" 
                placeholder="" 
                class="field field-sekunder" 
                name="promo_code" 
                id="promo_code" 
                v-model="data.promo_code"
                readonly>
        </div>
        <div class="field-group margin margin-bottom-15-px">
            <div class="field-label">EXPIRE DATE</div>
            <input 
                type="text" 
                placeholder="" 
                class="field field-sekunder" 
                name="expire_date" 
                id="expire_date" 
                v-model="data.expire_date"
                readonly>
        </div>
        <div class="field-group margin margin-bottom-15-px">
            <div class="field-label">STATUS</div>
            <input 
                type="text" 
                placeholder="" 
                class="field field-sekunder" 
                name="status" 
                id="status" 
                v-model="data.status"
                readonly>
        </div>
        <div class="field-group margin margin-bottom-15-px">
            <div class="field-label">DESCRIPTION</div>
            <textarea 
                name="description" 
                id="description" 
                class="field field-sekunder field-textarea" 
                v-model="data.description"
                readonly></textarea>
        </div>

        <AppPopupForm
            v-if="visiblePopup"
            :title="'Choose Config'"
            :onClose="onClose"
        >
            <div class="field-group margin margin-bottom-15-px">
                <div class="field-label">CHOOSE PARTNER</div>
                <select 
                    class="cf-input slc slc-sekunder"
                    name="partner_id" 
                    id="partner_id" 
                    v-on:change="onChangeInput"
                    v-model="partner_id">
                    <option v-for="(ctr, index) in datas" :value="ctr.partner.id" :key="index">
                        {{ ctr.partner.name }}
                    </option>
                </select>
            </div>
            <div style="overflow-x: auto;">
                <table>
                    <thead>
                        <th class="normal-col">CONFIG ID</th>
                        <th class="normal-col">NAME</th>
                        <th>PROMO CODE</th>
                        <th class="small-col"></th>
                    </thead>
                    <tbody>
                        <tr v-for="(dt, index) in tables" :key="index">
                            <td class="normal-col">{{ dt.partconfig_id }}</td>
                            <td class="normal-col">{{ dt.name }}</td>
                            <td>{{ dt.promo_code }}</td>
                            <td class="small-col">
                                <button v-if="data.id !== dt.id" class="btn btn-small-icon btn-sekunder" @click="onChoose(dt)">
                                    <i class="fa fa-1x fa-plus"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
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
            :title="'Choose this data ?'" 
            :onClose="onShowHideSave" 
            :onSave="saveData" />
    </div>
</template>

<script>
import axios from 'axios'
import AppPopupForm from '../../modules/AppPopupForm'
import AppAlert from '../../modules/AppAlert'

const payload = {}

export default {
    name: 'FormConfig',
    data () {
        return {
            visibleAlertDelete: false,
            visibleAlertSave: false,
            visibleLoader: false,
            visibleLoaderAction: false,
            visiblePopup: false,
            selectedID: 0,
            formData: null,
            payload: {...payload},
            partner_id: null,
            datas: [],
            tables: []
        }
    },
    mounted () {
        this.partner_id = this.data.partner_id
        this.getData()
    },
    components: {
        AppPopupForm: AppPopupForm,
        AppAlert: AppAlert
    },
    props: {
        onChange: {
            type: Function,
            requred: true
        },
        enablePopup: {
            type: Boolean,
            requred: false
        },
        data: {
            requred: true
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
        onChoose: function (index) {
            this.visibleAlertSave = !this.visibleAlertSave
            this.selectedID = index
            this.formMessage = []
        },
        onClose: function () {
            this.visiblePopup = false
            this.payload = {...payload}
        },
        onChangeInput: function () {
            this.datas && this.datas.map((dt) => {
                if (dt.partner.id === this.partner_id) {
                    this.tables = dt.configurations
                }
            })
        },
        saveData: function () {
            this.onChange(this.selectedID)
            this.onShowHideSave()
            this.visiblePopup = false
        },
        async getData () {
            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const payload = {
                limit: 1000,
                offset: 0
            }
            const rest = await axios.post('/api/partner/getAll', payload, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                const data = rest.data.data
                this.datas = data
                this.onChangeInput()
            }
        }
    },
    watch: {
        data: function (props, prevProps) {
            console.log(props)
            if (props) {
                this.formData = props
                this.partner_id = props.partner_id
            } else {
                this.formData = null
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