<template>
    <div id="FormProduct">
         <div class="field-group margin margin-bottom-15-px">
             <div class="field-label">PRODUCT ID</div>
             <input 
                 type="text" 
                 placeholder="" 
                 class="field field-sekunder" 
                 name="product_id" 
                 id="product_id" 
                 v-model="data.product_id"
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
                 v-model="data.name"
                 readonly>
             <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                 {{ formMessage && formMessage.name && formMessage.name[0] }}
             </div>
         </div>
         <div class="field-group margin margin-bottom-15-px">
             <div class="field-label">CATEGORY</div>
             <input 
                 type="text" 
                 placeholder="" 
                 class="field field-sekunder" 
                 name="category_id" 
                 id="category_id" 
                 v-model="data.ctr_name"
                 readonly>
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
                 v-model="data.description"
                 readonly></textarea>
             <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                 {{ formMessage && formMessage.description && formMessage.description[0] }}
             </div>
         </div>
         <div class="field-group margin margin-bottom-15-px">
             <div class="field-label">NOTE</div>
             <textarea 
                 name="note" 
                 id="note" 
                 class="field field-sekunder field-textarea" 
                 v-model="data.note"
                 readonly></textarea>
             <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                 {{ formMessage && formMessage.note && formMessage.note[0] }}
             </div>
         </div>

         <AppPopupForm
            v-if="visiblePopup"
            :title="'Choose Product'"
            :onClose="onClose"
        >
            <div style="overflow-x: auto;">
                <table>
                    <thead>
                        <th class="normal-col">PRODUCT ID</th>
                        <th>NAME</th>
                        <th class="small-col"></th>
                    </thead>
                    <tbody>
                        <tr v-for="(dt, index) in datas" :key="index">
                            <td class="normal-col">{{ dt.product_id }}</td>
                            <td>{{ dt.name }}</td>
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
    name: 'FormProduct',
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
            required: true
        }
    },
    components: {
        AppPopupForm: AppPopupForm,
        AppAlert: AppAlert
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
            const payload = this.dataUser.role_name === 'admin' ? {
                limit: 1000,
                offset: 0
            } : {
                limit: 1000,
                offset: 0,
                user_id: this.dataUser.id
            }
            const rest = await axios.post('/api/product/getAll', payload, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                const data = rest.data.data
                this.datas = data && data.map((dt) => {
                    return {...dt.product}
                })
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