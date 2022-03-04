<template>
    <div id="App" :class="formClass ? 'content-form' : 'content-form hide'">
        <div class="left">
            <div class="bg-white box-shadow">
                <div class="display-flex row justify-content border-bottom padding padding-10-px" style="height: 40px;">
                    <div style="width: 100%;">
                        <h1 class="fonts small black">PARTNERS</h1>
                        <p class="fonts micro grey no-line-height">controll your datas</p>
                    </div>
                    <div class="display-flex">
                        <button class="btn btn-white btn-icon btn-radius">
                            <i class="fa fa-lw fa-search" />
                        </button>
                        <button class="btn btn-white btn-icon btn-radius">
                            <i class="fa fa-lw fa-filter" />
                        </button>
                        <button class="btn btn-white btn-icon btn-radius" @click="onShow('CREATE')">
                            <i class="fa fa-lw fa-plus" />
                        </button>
                    </div>
                </div>
                
                <div class="table-container">
                    <v-table 
                        :data="datas ? datas : []" 
                        :filters="filters" 
                        :currentPage.sync="currentPage" 
                        :pageSize="limitPage" 
                        @totalPagesChanged="totalPages = $event">
                        <thead slot="head">
                            <v-th sortKey="id" class="small-col">ID</v-th>
                            <v-th sortKey="partner_id" class="normal-col">partner ID</v-th>
                            <v-th sortKey="name">Name</v-th>
                            <v-th sortKey="percentage" class="normal-col">Percentage</v-th>
                            <v-th sortKey="amount" class="normal-col">Amount</v-th>
                            <v-th sortKey="status" class="normal-col">Status</v-th>
                            <th class="medium-col"></th>
                        </thead>
                        <tbody slot="body" slot-scope="{displayData}">
                            <tr v-for="(row, index) in displayData" :key="row.partner.id">
                                <td class="small-col">{{ row.partner.id }}</td>
                                <td class="normal-col">{{ row.partner.partner_id }}</td>
                                <td>{{ row.partner.name }}</td>
                                <td class="normal-col">{{ row.partner.percentage }}</td>
                                <td class="normal-col">{{ row.partner.amount }}</td>
                                <td class="normal-col">{{ row.partner.status }}</td>
                                <td class="medium-col">
                                    <div class="display-flex justify-content">
                                        <button class="btn btn-transparent btn-small-icon btn-radius" @click="onShow('EDIT', index)">
                                            <i class="fa fa-lw fa-pencil-alt" />
                                        </button>
                                        <button class="btn btn-transparent btn-small-icon btn-radius" @click="onShowHideDelete(index)">
                                            <i class="fa fa-lw fa-trash-alt" />
                                        </button>
                                        <button class="btn btn-transparent btn-small-icon btn-radius" @click="onShow('VIEW', index)">
                                            <i class="fa fa-lw fa-ellipsis-v" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </v-table>
                </div>

                <div class="padding padding-10-px" style="height: 40px;">
                    <smart-pagination
                        :currentPage.sync="currentPage"
                        :totalPages="totalPages"
                    />
                </div>
            </div>
        </div>

        <div class="right">
            <Form 
                :data.sync="selectedData"
                :message.sync="selectedMessage"
                :title="formTitle" 
                :onSave="(data) => onFormSave(data)"
                :onClose="onClose">
            </Form>
        </div>

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
import { mapGetters } from 'vuex'
import AppLoader from '../../modules/AppLoader'
import AppAlert from '../../modules/AppAlert'
import Form from './Form'

export default {
    name: 'App',
    data () {
        return {
            visibleAlertDelete: false,
            visibleAlertSave: false,
            visibleLoader: false,
            visibleLoaderAction: false,
            formTitle: 'CREATE',
            formClass: false,
            datas: [],
            selectedIndex: null,
            selectedForm: null,
            selectedData: null,
            selectedMessage: null,
            filters: {
                name: { value: '', keys: ['name'] }
            },
            limitPage: 10,
            currentPage: 1,
            totalPages: 0
        }
    },
    mounted () {
        this.getData()
        console.log('datas', this.datas)
    },
    components: {
        AppAlert: AppAlert,
        AppLoader: AppLoader,
        Form: Form
    },
    computed: {
        ...mapGetters({
            authenticated: 'auth/authenticated',
            user: 'auth/user',
            token: 'auth/token'
        })
    },
    methods: {
        nameLength (row) {
            return row.key.length
        },
        onSave () {
            this.visibleAlertDelete = false
            this.visibleAlertSave = false
            this.formClass = false
        },
        onClose () {
            this.formClass = false
        },
        onShow (title, index = null) {
            this.formClass = true
            this.formTitle = title
            this.selectedData = index >= 0 ? this.datas[index] : null
            this.selectedMessage = null 
        },
        onShowHideDelete (index = null) {
            this.visibleAlertDelete = !this.visibleAlertDelete
            this.selectedIndex = index
        },
        onShowHideSave () {
            this.visibleAlertSave = !this.visibleAlertSave
        },
        onFormSave (data = null) {
            this.onShowHideSave()
            this.selectedForm = data && data.partner ? data.partner : null
            console.log('onFormSave', data.partner)
        },
        async removeData () {
            this.visibleLoaderAction = true

            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const id = this.datas[this.selectedIndex].partner.partner_id
            const payload = {
                partner_id: id
            }

            const rest = await axios.post('/api/partner/delete', payload, { headers: { Authorization: token } })
            console.log('rest', rest)

            if (rest && rest.status === 200) {
                this.onShowHideDelete()
                this.onClose()
                this.visibleLoaderAction = false

                const data = rest.data
                if (data.status === 'ok') {
                    this.getData()
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
            const payload = this.selectedForm
            const url = this.formTitle === 'CREATE' ? '/api/partner/post' : '/api/partner/update' 

            const rest = await axios.post(url, payload, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                this.onShowHideSave()
                this.visibleLoaderAction = false

                const data = rest.data.data
                if (data.length !== 0) {
                    this.onClose()
                    this.getData()
                } else {
                    this.selectedMessage = rest.data.message
                }
            } else {
                alert('Proceed failed')
                this.visibleLoaderAction = false
            }
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
                console.log('response', JSON.stringify(this.datas))
            }
        }
    }
}
</script>