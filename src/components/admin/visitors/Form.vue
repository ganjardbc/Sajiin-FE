<template>
    <div id="form">
        <AppSideForm 
            :title="title" 
            :enableSaveButton="this.title !== 'VIEW' ? true : false"
            :onSave="onButtonSave"
            :onClose="onClose">
            
            <AppTabs 
                :selectedIndex="selectedIndex" 
                :data="tabs" 
                :onChange="(data) => onChangeTabs(data)" 
                class="margin margin-bottom-15-px" />

            <div v-if="selectedIndex === 0">
                <div class="field-group margin margin-bottom-15-px">
                    <div class="field-label">ID</div>
                    <input 
                        type="text" 
                        placeholder="" 
                        class="field field-sekunder" 
                        name="id" 
                        id="id" 
                        v-model="formData.id"
                        readonly>
                </div>
                <div class="field-group margin margin-bottom-15-px">
                    <div class="field-label">START DATE</div>
                    <input 
                        type="datetime-local" 
                        placeholder="" 
                        class="field field-sekunder" 
                        name="start_date" 
                        id="start_date" 
                        v-model="formData.start_date"
                        :readonly="this.title === 'VIEW' ? true : false">
                    <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.start_date && formMessage.start_date[0] }}
                    </div>
                </div>
                <div class="field-group margin margin-bottom-15-px">
                    <div class="field-label">END DATE</div>
                    <input 
                        type="datetime-local" 
                        placeholder="" 
                        class="field field-sekunder" 
                        name="end_date" 
                        id="end_date" 
                        v-model="formData.end_date"
                        :readonly="this.title === 'VIEW' ? true : false">
                    <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.end_date && formMessage.end_date[0] }}
                    </div>
                </div>
                <div class="field-group margin margin-bottom-15-px">
                    <div class="field-label">STATUS</div>
                    <div class="display-flex">
                        <label class="radio">
                            <input 
                                type="radio" 
                                name="status"
                                id="active"
                                value="active"
                                v-model="formData.status"
                                :readonly="this.title === 'VIEW' ? true : false" />
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
                                v-model="formData.status"
                                :readonly="this.title === 'VIEW' ? true : false" />
                            <span class="checkmark" />
                            <span class="fonts micro">
                                Inactive
                            </span>
                        </label>
                    </div>
                    <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.status && formMessage.status[0] }}
                    </div>
                </div>
                <div class="field-group margin margin-bottom-15-px">
                    <div class="field-label">USER NAME</div>
                    <input 
                        type="text" 
                        placeholder="" 
                        class="field field-sekunder" 
                        name="user_name" 
                        id="user_name" 
                        v-model="selectedUser.name"
                        readonly>
                </div>
            </div>

            <div v-if="selectedIndex === 1">
                <div class="field-group margin margin-bottom-15-px">
                    <div class="field-label">CUSTOMER ID</div>
                    <div v-if="this.title !== 'VIEW'" class="card-search full">
                        <input 
                            type="search" 
                            placeholder="" 
                            class="field"
                            name="owner_id" 
                            id="owner_id" 
                            v-model="formData.owner_id"
                            readonly>
                        <button class="btn btn-icon btn-white" @click="onButtonCustomer">
                            <i class="fa fa-1x fa-search" />
                        </button>
                    </div>
                    <div v-else>
                        <input 
                            type="search" 
                            placeholder="" 
                            class="field field-sekunder"
                            style="width: 100%;"
                            name="owner_id" 
                            id="owner_id" 
                            v-model="formData.owner_id"
                            readonly>
                    </div>
                    <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.owner_id && formMessage.owner_id[0] }}
                    </div>
                </div>
                <FormCustomer
                    :data.sync="selectedCustomer"
                    :enablePopup="openCreateCustomer"
                    :onChange="(data) => onChangeCustomer(data)"
                />
            </div>

            <div v-if="selectedIndex === 2">
                <div class="field-group margin margin-bottom-15-px">
                    <div class="field-label">TABLE ID</div>
                    <div v-if="this.title !== 'VIEW'" class="card-search full">
                        <input 
                            type="search" 
                            placeholder="" 
                            class="field"
                            name="table_id" 
                            id="table_id" 
                            v-model="formData.table_id"
                            readonly>
                        <button class="btn btn-icon btn-white" @click="onButtonTable">
                            <i class="fa fa-1x fa-search" />
                        </button>
                    </div>
                    <div v-else>
                        <input 
                            type="search" 
                            placeholder="" 
                            class="field field-sekunder"
                            style="width: 100%;"
                            name="owner_id" 
                            id="owner_id" 
                            v-model="formData.owner_id"
                            readonly>
                    </div>
                    <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.owner_id && formMessage.owner_id[0] }}
                    </div>
                </div>
                <FormTable 
                    :data.sync="selectedTable"
                    :enablePopup="openCreateTable"
                    :onChange="(data) => onChangeTable(data)"
                />
            </div>
        </AppSideForm>
    </div>
</template>

<script>
import AppSideForm from '../../modules/AppSideForm'
import AppTabs from '../../modules/AppTabs'
import FormCustomer from './FormCustomer'
import FormTable from './FormTable'

const tabs = [
    {label: 'Data', status: 'active'},
    {label: 'Customer', status: ''},
    {label: 'Table', status: ''}
]

const payload = {
    id: '',
    start_date: null,
    end_date: null,
    status: "inactive",
    owner_id: '',
    table_id: '',
    user_id: ''
}

const customer = {
    id: '',
    customer_id: '',
    image: '',
    name: '',
    email: '',
    phone: '',
    about: '',
    status: ''
}

const table = {
    id: '',
    table_id: '',
    code: '',
    image: '',
    name: '',
    status: '',
    is_available: 0,
    description: ''
}

const user = {
    id: '',
    image: '',
    name: '',
    username: '',
    email: '',
    password: '',
    email_verified_at: '',
    provider: '',
    enabled: '',
    status: '',
    role_id: ''
}

export default {
    name: 'form',
    data () {
        return {
            selectedIndex: 0,
            openCreateCustomer: false,
            openCreateTable: false,
            isView: false,
            image: '',
            tabs: tabs,
            selectedCustomer: {...customer},
            selectedTable: {...table},
            selectedUser: {...user},
            formData: {...payload},
            formMessage: []
        }
    },
    mounted () {
        this.formData = {...payload}
    },
    components: {
        FormTable,
        FormCustomer,
        AppTabs,
        AppSideForm
    },
    props: {
        data: {
            required: true
        },
        message: {
            required: false
        },
        title: {
            type: String,
            required: true
        },
        onSave: {
            type: Function,
            required: true
        },
        onClose: {
            type: Function,
            required: true
        }
    },
    methods: {
        onChangeTable (data) {
            this.formData = {
                ...this.formData,
                table_id: data.id
            }
            this.selectedTable = data
        },
        onChangeCustomer (data) {
            this.formData = {
                ...this.formData,
                owner_id: data.id
            }
            this.selectedCustomer = data
        },
        onChangeTabs (data) {
            this.selectedIndex = data
        },
        onButtonCustomer () {
            this.openCreateCustomer = !this.openCreateCustomer
        },
        onButtonTable () {
            this.openCreateTable = !this.openCreateTable
        },
        onButtonSave () {
            const newPayload = this.formData
            this.onSave(newPayload)
        }
    },
    watch: {
        data: function (props, prevProps) {
            if (props) {
                this.formData = {
                    ...this.formData,
                    id: props.visitor.id,
                    start_date: props.visitor.start_date,
                    end_date: props.visitor.end_date,
                    status: props.visitor.status,
                    owner_id: props.visitor.owner_id,
                    table_id: props.visitor.table_id,
                    user_id: props.visitor.user_id,
                    status: props.visitor.status
                }
                this.selectedCustomer = props.customer ? props.customer : customer
                this.selectedTable = props.table ? props.table : table
                this.selectedUser = props.user ? props.user : user
            } else {
                this.formData = {...payload}
                this.selectedCustomer = customer 
                this.selectedTable = table
                this.selectedUser = user
            }
            this.onChangeTabs(0)
            console.log('props', props)
        },
        message: function (props, prevProps) {
            if (props) {
                this.formMessage = props
            } else {
                this.formMessage = []
            }
            console.log('props', props)
        }
    }
}
</script>