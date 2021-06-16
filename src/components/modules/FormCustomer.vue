<template>
    <div id="FormCustomer">
        <AppPopupForm
            v-if="visiblePopup"
            :enableRadius="true"
            :title="'Register Customer'"
            :onClose="onClose"
        >
            <div style="position: absolute; top: 20px; right: 70px;" @click="onShowCustomer('CREATE')">
                <button class="btn btn-icon btn-white">
                    <i class="fa fa-lg fa-plus" />
                </button>
            </div>

            <div v-if="datas.length > 0" style="padding-left: 10px; padding-right: 10px;">
                <div v-for="(dt, i) in datas" :key="i" class="card box-shadow" style="margin-top: 15px; margin-bottom: 15px; overflow: unset;">
                    <div class="display-flex space-between" style="padding-top: 5px; padding-bottom: 20px;">
                        <div style="width: 60px; margin-right: 20px;">
                            <div class="image image-padding image-circle">
                                <img :src="customerImageThumbnailUrl + dt.customer.image" alt="" class="post-center">
                            </div>
                        </div>
                        <div style="width: calc(100% - 150px);">
                            <div class="fonts fonts-11 semibold" style="margin-bottom: 5px;">{{ dt.customer.name }}</div>
                            <div class="display-flex" style="margin-bottom: 5px;">
                                <div style="width: 25px;">
                                    <i class="fa fa-lw fa-envelope" style="font-size: 14px; color: #555;" />
                                </div>
                                <div class="fonts fonts-10 grey">{{ dt.customer.email }}</div>
                            </div>
                            <div class="display-flex" style="margin-bottom: 5px;">
                                <div style="width: 25px;">
                                    <i class="fa fa-lw fa-phone" style="font-size: 14px; color: #555;" />
                                </div>
                                <div class="fonts fonts-10 grey">{{ dt.customer.phone }}</div>
                            </div>
                            <div class="display-flex">
                                <div style="width: 25px;">
                                    <i class="fa fa-lw fa-info-circle" style="font-size: 14px; color: #555;" />
                                </div>
                                <div class="fonts fonts-10 grey">{{ dt.customer.about }}</div>
                            </div>
                        </div>
                        <div class="display-flex column space-between" style="width: 110px; height: 100px;">
                            <div class="display-flex space-between">
                                <div></div>
                                <div 
                                    :class="'card-capsule ' + (
                                    dt.customer.status === 'active' 
                                        ? 'active' 
                                        : ''
                                    )" 
                                    style="margin-left: 15px; text-transform: capitalize;">
                                    {{ dt.customer.status }}
                                </div>
                            </div>
                            <div class="display-flex space-between">
                                <div></div>
                                <div v-if="data" class="display-flex">
                                    <button class="btn btn-small-icon btn-sekunder" @click="onShowEdit(dt.customer.id)">
                                        <i class="fa fa-1x fa-pencil-alt"></i>
                                    </button>
                                    <button v-if="data.id !== dt.customer.id" class="btn btn-small-icon btn-sekunder" @click="onShowHideChoose(dt.customer)">
                                        <i class="fa fa-1x fa-plus"></i>
                                    </button>
                                    <router-link v-else :to="{name: 'customer-main'}" style="margin-top: 2px;" class="btn btn-small btn-main-reverse with-hover">
                                        Customer <i class="icn fa fa-1x fa-arrow-right" />
                                    </router-link>
                                </div>
                                <div v-else>
                                    <button class="btn btn-small-icon btn-sekunder" @click="onShowHideChoose(dt.customer)">
                                        <i class="fa fa-1x fa-plus"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-else class="content-center">
                <AppEmpty />
                <div style="width: 300px; margin: auto; padding-top: 10px; padding-bottom: 40px;">
                    <SearchField 
                        id="search-customer" 
                        :placeholder="'Search customer by email'"
                        :onChange="(data) => onSearchCustomer(data)"
                    />
                    <!-- <button class="btn btn-main btn-full" @click="onShowCustomer('CREATE')"> 
                        Create New Customer <i class="icn fa fa-lg fa-arrow-right" />
                    </button> -->
                </div>
            </div>
        </AppPopupForm>

        <CreateCustomer 
            v-if="visiblePopupCustomer" 
            :data.sync="selectedData"
            :message.sync="selectedMessage"
            :title="formTitle"
            :uploadImage="(data) => uploadImage(data)"
            :removeImage="removeImage"
            :onSave="(data) => onFormSave(data)"
            :onClose="onCloseCustomer"
        />

        <AppAlert 
            v-if="visibleAlertDelete" 
            :isLoader="visibleLoaderAction"
            :title="'This action will remove data permanently, delete this data ?'" 
            :onClose="onShowHideDelete" 
            :onSave="removeData" />
        
        <AppAlert 
            v-if="visibleAlertChoose" 
            :isLoader="visibleLoaderAction"
            :title="'Choose this data ?'" 
            :onClose="onShowHideChoose" 
            :onSave="chooseData" />
        
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
import AppPopupForm from './AppPopupForm'
import AppAlert from './AppAlert'
import AppEmpty from './AppEmpty'
import CreateCustomer from './CreateCustomer'
import SearchField from './SearchField'

const payload = {}

export default {
    name: 'FormCustomer',
    data () {
        return {
            visibleAlertSave: false,
            visibleAlertDelete: false,
            visibleAlertChoose: false,
            visibleLoader: false,
            visibleLoaderAction: false,
            visiblePopupCustomer: false,
            visiblePopup: false,
            selectedData: null,
            selectedMessage: null,
            selectedID: 0,
            formTitle: 'CREATE',
            formData: null,
            datas: [],
            formMessage: [],
            payload: {...payload},
            dataUser: null 
        }
    },
    mounted () {
        this.dataUser = this.$cookies.get('user')
    },
    components: {
        SearchField,
        CreateCustomer,
        AppEmpty,
        AppPopupForm,
        AppAlert
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
        onShowHideSave () {
            this.visibleAlertSave = !this.visibleAlertSave
        },
        onFormSave (data = null) {
            this.onShowHideSave()
            this.selectedForm = data ? data : null
        },
        onShowHideDelete (index = null) {
            this.visibleAlertDelete = !this.visibleAlertDelete
            this.payload = this.datas[index] ? this.datas[index] : payload
            this.formMessage = []
        },
        onShowHideChoose (index = null) {
            this.visibleAlertChoose = !this.visibleAlertChoose
            this.selectedID = index
            this.formMessage = []
        },
        onChoose: function (index) {
            this.onChange(index)
            this.visiblePopup = false
        },
        onCloseCustomer () {
            this.visiblePopupCustomer = false
            this.formTitle = 'CREATE'
        },
        onSearchData (id) {
            let payload = null
            this.datas.map((dt) => {
                if (dt.customer.id === id) {
                    payload = {...dt.customer}
                }
                return null 
            })
            return payload
        },
        onShowEdit (index) {
            this.selectedData = this.onSearchData(index)
            this.visiblePopupCustomer = true 
            this.formTitle = 'EDIT'
        },
        onShowCustomer (title) {
            this.selectedData = null 
            this.visiblePopupCustomer = true
            this.formTitle = title
        },
        onClose: function () {
            this.visiblePopup = false
            this.payload = {...payload}
            this.datas = {}
        },
        chooseData: function () {
            this.onChange(this.selectedID)
            this.onShowHideChoose()
            this.visiblePopup = false
        },
        onChangeImage (data) {
            this.selectedData = {
                ...this.selectedData,
                image: data
            }
        },
        async onSearchCustomer (data) {
            if (data) {
                const token = 'Bearer '.concat(this.$cookies.get('token'))
                const payload = {
                    email: data
                }
                const rest = await axios.post('/api/customer/getSearchByEmail', payload, { headers: { Authorization: token } })

                if (rest && rest.status === 200) {
                    const data = rest.data.data
                    const payload = {
                        customer: {
                            ...data
                        },
                        address: []
                    }
                    this.datas = [payload]
                }
            } else {
                alert('Please put customer email !')
            }
        },
        async uploadImage (data) {
            this.visibleLoaderAction = true

            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const payload = this.selectedData
            const url = '/api/customer/uploadImage' 

            let formData = new FormData();
            formData.append('customer_id', payload.customer_id);
            formData.append('image', data);

            const rest = await axios.post(url, formData, { headers: { Authorization: token, 'Content-Type': 'multipart/form-data' } })

            if (rest && rest.status === 200) {
                this.visibleLoaderAction = false

                const data = rest.data.data
                if (data && data.image) {
                    this.onChangeImage(data && data.image)
                    this.getDataByID(payload.customer_id)
                    this.selectedMessage = []
                } else {
                    this.selectedMessage = rest.data.message
                }
            } else {
                alert('Proceed failed')
            }
        },
        async removeImage () {
            this.visibleLoaderAction = true

            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const payload = this.selectedData
            const url = '/api/customer/removeImage' 

            let formData = new FormData();
            formData.append('customer_id', payload.customer_id);

            var a = confirm('remove this image ?')
            if (a) {
                const rest = await axios.post(url, formData, { headers: { Authorization: token, 'Content-Type': 'multipart/form-data' } })

                if (rest && rest.status === 200) {
                    this.visibleLoaderAction = false

                    const data = rest.data.data
                    this.onChangeImage(data && data.image)
                    this.getDataByID(payload.customer_id)
                } else {
                    alert('Proceed failed')
                }
            }
        },
        async saveData () {
            this.visibleLoaderAction = true

            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const payload = this.selectedForm
            const url = this.formTitle === 'CREATE' ? '/api/customer/post' : '/api/customer/update' 

            const rest = await axios.post(url, payload, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                this.onShowHideSave()
                this.visibleLoaderAction = false

                const data = rest.data.data
                if (data.length !== 0) {
                    this.onCloseCustomer()
                    this.getDataByID(data.customer_id)
                } else {
                    this.selectedMessage = rest.data.message
                }
            } else {
                alert('Proceed failed')
                this.visibleLoaderAction = false
            }
        },
        async getDataByID (id) {
            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const payload = {
                customer_id: id
            }
            const rest = await axios.post('/api/customer/getByID', payload, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                const data = rest.data.data
                const payload = {
                    customer: {
                        ...data
                    },
                    address: []
                }
                this.datas = [payload]
            }
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