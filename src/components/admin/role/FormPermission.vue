<template>
    <div id="FormPermission">
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
                            <div class="fonts micro black width width-100-px">Permission ID</div>
                            <div class="fonts micro black semibold">{{ dt.main_permission_id }}</div>
                        </div>
                        <div class="display-flex margin margin-bottom-5-px">
                            <div class="fonts micro black width width-100-px">Name</div>
                            <div class="fonts micro black semibold">{{ dt.permission_name }}</div>
                        </div>
                        <div class="display-flex margin margin-bottom-10-px">
                            <div class="fonts micro black width width-100-px">Description</div>
                            <div class="fonts micro black semibold">{{ dt.permission_description }}</div>
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
            :title="'Choose Permission'"
            :onClose="onClose"
        >
            <div style="overflow-x: auto;">
                <table>
                    <thead>
                        <th class="normal-col">PERMISSION ID</th>
                        <th>PERMISSION NAME</th>
                        <th class="small-col"></th>
                    </thead>
                    <tbody>
                        <tr v-for="(dt, index) in permissions" :key="index">
                            <td class="normal-col">{{ dt.permission_id }}</td>
                            <td>{{ dt.name }}</td>
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
    role_id: 0,
    permission_id: 0
}

export default {
    name: 'FormPermission',
    data () {
        return {
            visibleAlertDelete: false,
            visibleAlertSave: false,
            visibleLoader: false,
            visibleLoaderAction: false,
            isCreate: true,
            visiblePopup: false,
            selectedPermissionID: 0,
            payload: {...payload},
            datas: [],
            permissions: [],
            formMessage: []
        }
    },
    mounted () {
        const id = this.selectedID
        this.getData(id)
        this.getPermission()
    },
    components: {
        AppLoader,
        AppPopupForm,
        AppAlert
    },
    props: {
        selectedID: {
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
            this.selectedPermissionID = index
            this.formMessage = []
        },
        onClose: function () {
            this.visiblePopup = false
            this.isCreate = true
            this.payload = {...payload}
            this.formMessage = []
            // console.log('onClose')
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

            const rest = await axios.post('/api/rolepermission/delete', payload, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                this.onShowHideDelete()
                this.onClose()
                this.visibleLoaderAction = false

                const data = rest.data
                if (data.status === 'ok') {
                    this.getData(this.selectedID)
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
            const payload = {...this.payload, permission_id: this.selectedPermissionID, role_id: this.selectedID}
            const url = '/api/rolepermission/post'

            const rest = await axios.post(url, payload, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                this.onShowHideSave()
                this.visibleLoaderAction = false

                const data = rest.data
                if (data.status === 'ok') {
                    this.onClose()
                    this.getData(this.selectedID)
                } else {
                    alert(data.message)
                    // this.onClose()
                    this.visibleAlertSave = false 
                    this.visibleLoaderAction = false
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
                role_id: id
            }

            const rest = await axios.post('/api/rolepermission/getAll', payload, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                const data = rest.data.data
                this.datas = data
                this.visibleLoader = false
            } else {
                this.visibleLoader = false
            }
        },
        async getPermission () {
            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const payload = {
                limit: 1000,
                offset: 0,
                status: 'active'
            }
            const rest = await axios.post('/api/permission/getAll', payload, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                const data = rest.data.data
                this.permissions = data
            }
        }
    },
    watch: {
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