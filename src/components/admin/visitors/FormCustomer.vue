<template>
    <div id="FormCustomer">
        <div class="field-group margin margin-bottom-15-px">
            <div class="field-label">CUSTOMER ID</div>
            <input 
                type="text" 
                placeholder="" 
                class="field field-sekunder" 
                name="customer_id" 
                id="customer_id" 
                v-model="data.customer_id"
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
            <div class="field-label">EMAIL</div>
            <input 
                type="email" 
                placeholder="" 
                class="field field-sekunder" 
                name="email" 
                id="email" 
                v-model="data.email"
                readonly>
        </div>
        <div class="field-group margin margin-bottom-15-px">
            <div class="field-label">PHONE</div>
            <input 
                type="text" 
                placeholder="" 
                class="field field-sekunder" 
                name="phone" 
                id="phone" 
                v-model="data.phone"
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
            <div class="field-label">ABOUT</div>
            <textarea 
                name="about" 
                id="about" 
                class="field field-sekunder field-textarea" 
                v-model="data.about"
                readonly></textarea>
        </div>

        <AppPopupForm
            v-if="visiblePopup"
            :title="'Choose Customer'"
            :onClose="onClose"
        >
            <div style="overflow-x: auto;">
                <table>
                    <thead>
                        <th class="normal-col">CUSTOMER ID</th>
                        <th>NAME</th>
                        <th class="normal-col">PHONE</th>
                        <th class="small-col"></th>
                    </thead>
                    <tbody>
                        <tr v-for="(dt, index) in datas" :key="index">
                            <td class="normal-col">{{ dt.customer.customer_id }}</td>
                            <td>{{ dt.customer.name }}</td>
                            <td class="normal-col">{{ dt.customer.phone }}</td>
                            <td class="small-col">
                                <button v-if="data.id !== dt.customer.id" class="btn btn-small-icon btn-sekunder" @click="onChoose(dt.customer)">
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
    name: 'FormCustomer',
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
            payload: {...payload},
            dataUser: null 
        }
    },
    mounted () {
        this.dataUser = this.$cookies.get('user')
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
            this.onChange(index)
            this.visiblePopup = false
            // this.visibleAlertSave = !this.visibleAlertSave
            // this.selectedID = index
            // this.formMessage = []
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
            const payload = this.dataUser.role_name === 'admin' ? {
                limit: 1000,
                offset: 0,
                status: 'active'
            } : {
                limit: 1000,
                offset: 0,
                user_id: this.dataUser.id,
                status: 'active'
            }
            const rest = await axios.post('/api/customer/getAll', payload, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                const data = rest.data.data
                this.datas = data
            }
        }
    },
    watch: {
        data: function (props, prevProps) {
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