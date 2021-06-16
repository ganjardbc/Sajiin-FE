<template>
    <div id="FormToping">
        <AppLoader v-if="visibleLoader" />

        <div v-else>
            <div class="card box-shadow" v-for="(dt, index) in datas" :key="index">
                <div class="display-flex">
                    <div>
                        <div class="display-flex margin margin-bottom-5-px">
                            <div class="fonts micro black width width-100-px">ID</div>
                            <div class="fonts micro black semibold">{{ dt.id }}</div>
                        </div>
                        <div class="display-flex margin margin-bottom-5-px">
                            <div class="fonts micro black width width-100-px">Toping ID</div>
                            <div class="fonts micro black semibold">{{ dt.toping_id }}</div>
                        </div>
                        <div class="display-flex margin margin-bottom-5-px">
                            <div class="fonts micro black width width-100-px">Name</div>
                            <div class="fonts micro black semibold">{{ dt.name }}</div>
                        </div>
                        <div class="display-flex margin margin-bottom-5-px">
                            <div class="fonts micro black width width-100-px">Price</div>
                            <div class="fonts micro black semibold">{{ dt.price }}</div>
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
                        <button class="btn btn-small-icon btn-sekunder" @click="onShowHideDelete(index)">
                            <i class="fa fa-1x fa-trash-alt"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <AppPopupForm
            v-if="visiblePopup"
            :title="'Choose Toping'"
            :onClose="onClose"
        >
            <div style="overflow-x: auto;">
                <table>
                    <thead>
                        <th>NAME</th>
                        <th class="normal-col">PRICE</th>
                        <th class="small-col"></th>
                    </thead>
                    <tbody>
                        <tr v-for="(dt, index) in topings" :key="index">
                            <td>{{ dt.name }}</td>
                            <td class="normal-col">{{ dt.price }}</td>
                            <td class="small-col">
                                <button class="btn btn-small-icon btn-sekunder" @click="onChoose(dt.id)">
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
import AppLoader from '../../modules/AppLoader'

const payload = {
    id: 0,
    toping_id: 0,
    product_id: 0
}

export default {
    name: 'FormToping',
    data () {
        return {
            visibleAlertDelete: false,
            visibleAlertSave: false,
            visibleLoader: false,
            visibleLoaderAction: false,
            isCreate: true,
            visiblePopup: false,
            selectedTopingID: 0,
            payload: {...payload},
            datas: [],
            topings: [],
            formMessage: [],
            dataUser: null 
        }
    },
    mounted () {
        this.dataUser = this.$cookies.get('user')
        this.getData(this.selectedProductId)
        this.getToping()
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
        onChoose: function (index) {
            this.visibleAlertSave = !this.visibleAlertSave
            this.selectedTopingID = index
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
            const id = this.payload.id
            const payload = {
                id: id
            }

            const rest = await axios.post('/api/productToping/delete', payload, { headers: { Authorization: token } })

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
            const payload = {...this.payload, toping_id: this.selectedTopingID, product_id: this.selectedId}
            const url = '/api/productToping/post'

            const rest = await axios.post(url, payload, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                this.onShowHideSave()
                this.visibleLoaderAction = false

                const data = rest.data
                if (data.status === 'ok') {
                    this.onClose()
                    this.getData(this.selectedProductId)
                } else {
                    alert(data.message)
                    this.onClose()
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

            const rest = await axios.post('/api/productToping/getAll', payload, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                const data = rest.data.data
                this.datas = data
                this.visibleLoader = false
            } else {
                this.visibleLoader = false
            }
        },
        async getToping () {
            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const payload = {
                limit: 1000,
                offset: 0,
                status: 'active',
                user_id: this.dataUser.id
            }
            const rest = await axios.post('/api/toping/getAll', payload, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                const data = rest.data.data
                this.topings = data
            }
        }
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