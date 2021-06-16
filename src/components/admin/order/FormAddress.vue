<template>
    <div id="FormAddress">
        <div class="field-group margin margin-bottom-15-px">
            <div class="field-label">ADDRESS ID</div>
            <input 
                type="text" 
                placeholder="" 
                class="field field-sekunder" 
                name="address_id" 
                id="address_id" 
                v-model="data.address_id"
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
            <div class="field-label">TYPE</div>
            <input 
                type="text" 
                placeholder="" 
                class="field field-sekunder" 
                name="type" 
                id="type" 
                v-model="data.type"
                readonly>
        </div>
        <div class="field-group margin margin-bottom-15-px">
            <div class="field-label">ADDRESS</div>
            <textarea 
                name="address" 
                id="address" 
                class="field field-sekunder field-textarea" 
                v-model="data.address"
                readonly></textarea>
        </div>

        <AppPopupForm
            v-if="visiblePopup"
            :title="'Choose Address'"
            :onClose="onClose"
        >
            <div style="overflow-x: auto;">
                <table>
                    <thead>
                        <th class="normal-col">ADDRESS ID</th>
                        <th class="normal-col">NAME</th>
                        <th>ADDRESS</th>
                        <th class="small-col"></th>
                    </thead>
                    <tbody>
                        <tr v-for="(dt, index) in datas" :key="index">
                            <td class="normal-col">{{ dt.address_id }}</td>
                            <td class="normal-col">{{ dt.name }}</td>
                            <td>{{ dt.address }}</td>
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
    name: 'FormAddress',
    data () {
        return {
            visibleAlertDelete: false,
            visibleAlertSave: false,
            visibleLoader: false,
            visibleLoaderAction: false,
            visiblePopup: false,
            selectedID: 0,
            formData: null,
            datas: [],
            formMessage: [],
            payload: {...payload}
        }
    },
    mounted () {
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
        customerId: {
            required: true
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
        saveData: function () {
            this.onChange(this.selectedID)
            this.onShowHideSave()
            this.visiblePopup = false
        },
        async getData () {
            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const payload = {
                limit: 1000,
                offset: 0,
                customer_id: this.customerId
            }
            const rest = await axios.post('/api/address/getAll', payload, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                const data = rest.data.data
                this.datas = data
            }
        }
    },
    watch: {
        data: function (props, prevProps) {
            console.log(props)
            if (props) {
                this.formData = props
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