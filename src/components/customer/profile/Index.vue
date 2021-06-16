<template>
    <div id="App">
        <AppMobileLayout :title="'Customer'">
            <div style="padding: 10px 0; width: 100%; overflow: unset;">
                <div style="padding-top: 5px; width: 100%;">
                    <div class="display-flex border border-bottoms" style="padding-bottom: 15px;">
                        <div style="width: 45px; margin-right: 15px;">
                            <div class="image image-circle image-45px" style="margin: auto; text-align: center;">
                                <i v-if="selectedCustomer && !selectedCustomer.image" class="post-top fa fa-lg fa-user-circle" style="color: #999;" />
                                <img v-else :src="selectedCustomer && selectedCustomer.image ? (customerImageThumbnailUrl + selectedCustomer.image) : ''" alt="">
                            </div>
                        </div>
                        <div style="width: calc(100% - 95px);">
                            <div class="fonts fonts-13 semibold">{{ selectedCustomer && selectedCustomer.name }}</div>
                            <div class="fonts fonts-10 grey">{{ selectedCustomer && selectedCustomer.about }}</div>
                        </div>
                        <div class="display-flex space-between" style="width: 35px;">
                            <button class="btn btn-small-icon btn-sekunder" @click="onShowEdit">
                                <i class="fa fa-1x fa-cog"></i>
                            </button>
                        </div>
                    </div>

                    <div style="padding-top: 5px; padding-bottom: 15px;">
                        <button class="btn btn-main btn-full" @click="sendSocketOrder">
                            Send Order 
                        </button>
                    </div>

                    <div v-if="dataOrder" class="border border-bottoms" style="padding-top: 5px; padding-bottom: 15px;">
                        <div class="fonts fonts-10 semibold" style="margin-bottom: 5px;">
                            You have an order
                        </div>
                        <div class="display-flex">
                            <router-link :to="{name: 'order'}" class="card-capsule active" style="width: 100%; text-align: center; padding-top: 10px; padding-bottom: 8px;">
                                Continue to check out ?
                            </router-link>
                        </div>
                    </div>

                    <div class="border border-bottoms">
                        <div class="fonts fonts-10 black semibold" style="margin-bottom: 10px;">Menus</div>
                        <AppListMenu :data.sync="sidebar" :isSidebarSmall="isSidebarSmall" :enableGridView="true" />
                    </div>
                </div>

                <div class="navbar-bottom">
                    <div class="main-screen display-flex space-between" style="margin-top: 8px;">
                        <button class="btn btn-danger btn-full" @click="onLogout">
                            LOGOUT
                        </button>
                    </div>
                </div>
            </div>
        </AppMobileLayout>

        <FormCustomer 
            v-if="visiblePopup"
            :data.sync="selectedData"
            :message.sync="selectedMessage"
            :title="'Edit Customer'" 
            :uploadImage="(data) => uploadImage(data)"
            :removeImage="removeImage"
            :onSave="(data) => onFormSave(data)"
            :onClose="onClose" />
        
        <AppAlert 
            v-if="visibleAlertSave" 
            :isLoader="visibleLoaderAction"
            :title="'Proceed this data ?'" 
            :onClose="onShowHideSave" 
            :onSave="saveData" />
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import M from 'moment'
import axios from 'axios'
import AppListMenu from '../../modules/AppListMenu'
import AppLoader from '../../modules/AppLoader'
import AppMobileLayout from '../../modules/AppMobileLayout'
import AppAlert from '../../modules/AppAlert'
import FormCustomer from './forms/Customer'

const sidebarCustomer = [
    // {icon: 'fa fa-lg fa-user', label: 'Subscribe', value: 0, link: 'customer-order'},
    {icon: 'fa fa-lg fa-list-ol', label: 'Orders', value: 0, link: 'customer-order'},
    {icon: 'fa fa-lg fa-star', label: 'Feedbacks', value: 0, link: 'customer-feedback'},
    {icon: 'fa fa-lg fa-heart', label: 'Wiselists', value: 0, link: 'customer-whiselist'}
]

export default {
    name: 'App',
    data () {
        return {
            visibleLoader: false,
            visibleLoaderAction: false,
            visiblePopup: false,
            visibleAlertDelete: false,
            visibleAlertSave: false,
            visibleLoaderCheck: false,
            sidebar: sidebarCustomer,
            selectedCustomer: null,
            selectedData: null,
            selectedMessage: null,
            dataUser: null,
            dataOrder: null,
            isSidebarSmall: false,
            popupCreate: false,
            datas: [],
            formTitle: 'CREATE',
        }
    },
    mounted () {
        this.selectedCustomer = this.$cookies.get('customer')
        this.dataOrder = this.$cookies.get('orderItem')
        this.dataUser = this.$cookies.get('admin')
    },
    components: {
        FormCustomer,
        AppMobileLayout,
        AppLoader,
        AppListMenu,
        AppAlert
    },
    methods: {
        ...mapActions({
            removeCookieAuth: 'auth/removeCookieCustomerAuth',
            signOut: 'customer/removeData',
            setToast: 'toast/setToast',
            setCustomer: 'auth/setCustomer'
        }),
        makeToast (title) {
            const time = new Date().getTime()
            const payload = {
                id: time,
                visible: true,
                title: title
            }
            this.setToast(payload)
        },
        onLogout() {
            var a = confirm('Logout customer ?')
            if (a) {
                this.removeCookieAuth()
                this.signOut()
                this.$router.push({ name: 'home' })
            }
        },
        onBuilded () {
            alert('still builded !')
        },
        onClose () {
            this.visiblePopup = false
            this.formTitle = 'CREATE'
        },
        onShowEdit () {
            this.selectedData = this.selectedCustomer
            this.visiblePopup = true 
            this.formTitle = 'EDIT'
        },
        onShowHideSave () {
            this.visibleAlertSave = !this.visibleAlertSave
        },
        onFormSave (data = null) {
            this.onShowHideSave()
            this.selectedForm = data ? data : null
        },
        onChangeImage (data) {
            this.selectedData = {
                ...this.selectedData,
                image: data
            }
        },
        async uploadImage (data) {
            this.visibleLoaderAction = true

            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const payload = this.selectedData.customer
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
                    this.getData()
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
            const payload = this.selectedData.customer
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
                    this.getData()
                } else {
                    alert('Proceed failed')
                }
            }
        },
        async saveData () {
            this.visibleLoaderAction = true

            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const payload = this.selectedForm
            const url = '/api/customer/update' 

            const rest = await axios.post(url, payload, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                this.onShowHideSave()
                this.visibleLoaderAction = false

                const data = rest.data.data
                if (data.length !== 0) {
                    this.onClose()
                    this.$cookies.set('customer', data)
                    this.setCustomer(data)
                } else {
                    this.selectedMessage = rest.data.message
                }
            } else {
                alert('Proceed failed')
                this.visibleLoaderAction = false
            }
        },
        sendSocketOrder () {
            const payload = {
                order_id: '0001',
                customer_id: this.selectedCustomer ? this.selectedCustomer.id : '',
                owner_id: this.dataUser ? this.dataUser.id : '',
                title: 'Orders',
                subtitle: 'You have new order',
                link: 'localhost:8088'
            }

            this.$socket.emit('order', payload)
        }
    },
    computed: {
        ...mapGetters({
            authenticated: 'auth/authenticated',
            user: 'auth/user',
            token: 'auth/token',
            order: 'order/countCustomer'
        })
    },
    watch: {
        order (props) {
            this.sidebar[0].value = props
        }
    }
}
</script>
