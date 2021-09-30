<template>
    <div id="App">
        <div>
            <div style="padding: 10px 0; width: 100%; overflow: unset;">
                <div style="padding-top: 5px; width: 100%;">
                    <div>
                        <div style="width: 150px; margin: auto;">
                            <div class="image image-circle image-150px" style="margin: auto; text-align: center;">
                                <i v-if="user && !user.image" class="post-top fa fa-lg fa-user-circle" style="color: #999;" />
                                <img v-else :src="user && user.image ? (adminImageThumbnailUrl + user.image) : ''" alt="">
                            </div>
                        </div>
                        <div style="width: 100%; text-align: center; padding-top: 15px; padding-bottom: 15px;">
                            <div class="fonts fonts-16 semibold">{{ user && user.name }}</div>
                            <div class="fonts fonts-11 grey">{{ user && user.role_name }}</div>
                        </div>
                        <div class="display-flex center">
                            <button class="btn btn-icon btn-sekunder" style="margin-left: 5px; margin-right: 5px;" @click="sendSocketOrder">
                                <i class="fa fa-1x fa-paper-plane"></i>
                            </button>
                            <button class="btn btn-icon btn-sekunder" style="margin-left: 5px; margin-right: 5px;" @click="onShowEdit">
                                <i class="fa fa-1x fa-cog"></i>
                            </button>
                        </div>
                    </div>

                    <div v-if="dataOrder" class="border border-bottoms" style="padding-top: 15px;">
                        <div class="fonts fonts-10 semibold" style="margin-bottom: 5px;">
                            You have an order
                        </div>
                        <div class="display-flex">
                            <router-link :to="{name: 'order'}" class="card-capsule active" style="width: 100%; text-align: center; padding-top: 10px; padding-bottom: 8px;">
                                Continue to check out ?
                            </router-link>
                        </div>
                    </div>
                </div>

                <!-- <div class="navbar-bottom">
                    <div class="main-screen display-flex space-between" style="margin-top: 8px;">
                        <button class="btn btn-danger btn-full" @click="onLogout">
                            LOGOUT
                        </button>
                    </div>
                </div> -->
            </div>
        </div>

        <FormUser 
            v-if="visiblePopup"
            :data.sync="selectedData"
            :message.sync="selectedMessage"
            :title="'Edit User'" 
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
import AppListDownMenu from '../../modules/AppListDownMenu'
import AppLoader from '../../modules/AppLoader'
import AppMobileLayout from '../../modules/AppMobileLayout'
import AppAlert from '../../modules/AppAlert'
import FormUser from './forms/User'

const sidebarCustomer = [
    {icon: 'fa fa-lg fa-list-ol', label: 'Order History', value: 0, link: 'customer-order'},
    {icon: 'fa fa-lg fa-star', label: 'Feedbacks', value: 0, link: 'customer-feedback'},
    {icon: 'fa fa-lg fa-heart', label: 'Wishelists', value: 0, link: 'customer-whiselist'},
    {icon: 'fa fa-lg fa-plus-circle', label: 'Register Restaurant', value: 0, link: '404'}
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
            dataShop: null,
            isSidebarSmall: false,
            popupCreate: false,
            datas: [],
            formTitle: 'CREATE',
        }
    },
    mounted () {
        this.selectedCustomer = this.$cookies.get('customer')
        this.dataOrder = this.$cookies.get('orderItem')
        this.dataUser = this.$cookies.get('user')
        this.dataShop = this.$cookies.get('shop')
        this.sidebar[0].value = this.order 
    },
    components: {
        FormUser,
        AppMobileLayout,
        AppLoader,
        AppListDownMenu,
        AppAlert
    },
    methods: {
        ...mapActions({
            removeCookieAuth: 'auth/removeCookieAuth',
            signOut: 'auth/signOut',
            setToast: 'toast/setToast',
            setUser: 'auth/setUser',
            setShop: 'store/setData'
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
        onBuilded () {
            alert('still builded !')
        },
        onClose () {
            this.visiblePopup = false
            this.formTitle = 'CREATE'
        },
        onShowEdit () {
            this.selectedData = this.dataUser
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
            const payload = this.selectedData
            const url = '/api/user/uploadImage' 

            let formData = new FormData();
            formData.append('id', payload.id);
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
            const payload = this.selectedData
            const url = '/api/user/removeImage' 

            let formData = new FormData();
            formData.append('id', payload.id);

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
            const url = '/api/user/update' 

            const rest = await axios.post(url, payload, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                this.onShowHideSave()
                this.visibleLoaderAction = false

                const data = rest.data.data
                if (data.length !== 0) {
                    this.onClose()
                    this.setUser(data)
                } else {
                    this.selectedMessage = rest.data.message
                }
            } else {
                alert('Proceed failed')
                this.visibleLoaderAction = false
            }
        },
        async onLogout() {
            var a = confirm('Logout customer ?')
            if (a) {
                const rest = await this.signOut(this.token)
                
                if (rest.data.status === 'ok') {
                    this.removeCookieAuth()
                    this.$router.push({ name: 'home' })
                }
            }
        },
        async exitShop () {
            this.visibleLoaderExit = true

            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const payload = {
                owner_id: this.dataUser.id
            }

            const rest = await axios.post('/api/shop/exit', payload, { headers: { Authorization: token } })
            if (rest && rest.status === 200) {
                this.visibleLoaderExit = false
                this.setShop(null)
                this.$cookies.remove('shop')
                this.$cookies.remove('orderItem')
                this.$cookies.remove('orderTable')
                this.$cookies.remove('orderPayment')
            } else {
                this.makeToast('Proceed failed')
                this.visibleLoaderExit = false
            }
        },
        async saveNotif (title, subtitle) {
            const time = new Date().getTime()

            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const payload = {
                id: '',
                notification_id: 'NF-' + time,
                image: '',
                title: title,
                link: '',
                status: 'active',
                subtitle: subtitle,
                is_read: 0,
                owner_id: this.dataShop.user_id
            }

            const rest = await axios.post('/api/notification/postOwner', payload, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                this.visibleLoader = false 
            } else {
                this.visibleLoader = false 
            }
        },
        sendSocketOrder () {
            const time = new Date().getTime()
            const payload = {
                order_id: 'ODR-' + time,
                customer_id: this.selectedCustomer ? this.selectedCustomer.id : '',
                owner_id: this.dataUser ? this.dataUser.id : '',
                title: 'Orders',
                subtitle: 'You have new order',
                link: 'localhost:8088'
            }

            this.$socket.emit('order', payload)
            this.saveNotif(payload.title, payload.order_id)
        }
    },
    computed: {
        ...mapGetters({
            authenticated: 'auth/authenticated',
            user: 'auth/admin',
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
