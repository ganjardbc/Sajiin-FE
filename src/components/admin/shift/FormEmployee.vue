<template>
    <div id="FormEmployee">
        <AppLoader v-if="visibleLoader" />

        <div v-else>
            <div class="card box-shadow" v-for="(dt, index) in datas" :key="index">
                <div class="display-flex">
                    <div>
                        <div class="display-flex margin margin-bottom-10-px" style="width: 80px;">
                            <div class="image image-padding border-full">
                                <img v-if="dt.employee_image" :src="employeeImageThumbnailUrl + dt.employee_image" alt="" class="post-center">
                                <i v-else class="post-middle-absolute icn fa fa-lg fa-image"></i>
                            </div>
                        </div>
                        <div class="display-flex margin margin-bottom-5-px">
                            <div class="fonts micro black width width-100-px">ID</div>
                            <div class="fonts micro black semibold">{{ dt.emp_id }}</div>
                        </div>
                        <div class="display-flex margin margin-bottom-5-px">
                            <div class="fonts micro black width width-100-px">Employee ID</div>
                            <div class="fonts micro black semibold">{{ dt.employee_id }}</div>
                        </div>
                        <div class="display-flex margin margin-bottom-5-px">
                            <div class="fonts micro black width width-100-px">Position</div>
                            <div class="fonts micro black semibold">{{ dt.employee_position }}</div>
                        </div>
                        <div class="display-flex margin margin-bottom-5-px">
                            <div class="fonts micro black width width-100-px">Name</div>
                            <div class="fonts micro black semibold">{{ dt.employee_name }}</div>
                        </div>
                        <div class="display-flex margin margin-bottom-5-px">
                            <div class="fonts micro black width width-100-px">Email</div>
                            <div class="fonts micro black semibold">{{ dt.employee_email }}</div>
                        </div>
                        <div class="display-flex margin margin-bottom-5-px">
                            <div class="fonts micro black width width-100-px">Phone</div>
                            <div class="fonts micro black semibold">{{ dt.employee_phone }}</div>
                        </div>
                        <div class="display-flex margin margin-bottom-5-px">
                            <div class="fonts micro black width width-100-px">Address</div>
                            <div class="fonts micro black semibold">{{ dt.employee_address }}</div>
                        </div>
                        <div class="display-flex margin margin-bottom-5-px">
                            <div class="fonts micro black width width-100-px">About</div>
                            <div class="fonts micro black semibold">{{ dt.employee_about }}</div>
                        </div>
                        <div class="display-flex margin margin-bottom-10-px">
                            <div class="fonts micro black width width-100-px">Status</div>
                            <div class="fonts micro black semibold">{{ dt.employee_status }}</div>
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
            :title="'Choose Employee'"
            :onClose="onClose"
        >
            <div style="overflow-x: auto;">
                <table>
                    <thead>
                        <th class="normal-col">ID</th>
                        <th>NAME</th>
                        <th class="small-col"></th>
                    </thead>
                    <tbody>
                        <tr v-for="(dt, index) in employees" :key="index">
                            <td class="normal-col">{{ dt.employee_id }}</td>
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
    employee_id: 0,
    shift_id: 0
}

export default {
    name: 'FormEmployee',
    data () {
        return {
            visibleAlertDelete: false,
            visibleAlertSave: false,
            visibleLoader: false,
            visibleLoaderAction: false,
            isCreate: true,
            visiblePopup: false,
            selectedEmployeeID: 0,
            payload: {...payload},
            datas: [],
            employees: [],
            formMessage: [],
            dataUser: null 
        }
    },
    mounted () {
        this.dataUser = this.$cookies.get('user')
        this.getData(this.selectedShiftId)
        this.getEmployee()
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
        selectedShiftId: {
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
            this.selectedEmployeeID = index
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
            const id = this.payload.es_id
            const payload = {
                id: id
            }

            const rest = await axios.post('/api/employeeShift/delete', payload, { headers: { Authorization: token } })
            if (rest && rest.status === 200) {
                this.onShowHideDelete()
                this.onClose()
                this.visibleLoaderAction = false

                const data = rest.data
                if (data.status === 'ok') {
                    this.getData(this.selectedShiftId)
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
            const payload = {...this.payload, employee_id: this.selectedEmployeeID, shift_id: this.selectedId}
            const url = '/api/employeeShift/post'

            const rest = await axios.post(url, payload, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                this.onShowHideSave()
                this.visibleLoaderAction = false

                const data = rest.data
                if (data.status === 'ok') {
                    this.onClose()
                    this.getData(this.selectedShiftId)
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
                shift_id: id
            }

            const rest = await axios.post('/api/employeeShift/getAll', payload, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                const data = rest.data.data
                this.datas = data
                this.visibleLoader = false
            } else {
                this.visibleLoader = false
            }
        },
        async getEmployee () {
            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const payload = {
                limit: 1000,
                offset: 0,
                status: 'active',
                user_id: this.dataUser.id
            }
            const rest = await axios.post('/api/employee/getAll', payload, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                const data = rest.data.data
                this.employees = data && data.map((dt) => {
                    return {...dt.employee}
                })
            }
        }
    },
    watch: {
        selectedShiftId: function (props, prevProps) {
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