<template>
    <div id="App" class="main-screen" style="padding-top: 50px;">
        <div class="display-flex display-mobile space-between">
            <div class="width width-25 width-mobile" style="margin-bottom: 30px;">
                <div class="card box-shadow bg-white">
                    <div class="display-flex border border-bottom" style="padding-bottom: 20px;">
                        <div style="width: 45px; margin-right: 15px;">
                            <div class="image image-circle image-45px" style="margin: auto; text-align: center;">
                                <i class="post-top fa fa-lg fa-user-circle" style="color: #999;" />
                            </div>
                        </div>
                        <div style="width: calc(100% - 90px);">
                            <div class="fonts fonts-13 semibold">{{ user && user.name }}</div>
                            <div class="fonts fonts-10 grey">{{ user && user.role_name }}</div>
                        </div>
                        <div style="width: 30px;">
                            <button class="btn btn-small-icon btn-sekunder">
                                <i class="fa fa-1x fa-cog"></i>
                            </button>
                        </div>
                    </div>

                    <div v-if="dataOrder" class="border border-bottom" style="padding-top: 15px; padding-bottom: 20px;">
                        <div class="fonts fonts-10 semibold" style="margin-bottom: 5px;">
                            You have a drafts
                        </div>
                        <div class="display-flex">
                            <router-link :to="{name: 'order'}" class="card-capsule active" style="width: 100%; text-align: center; padding-top: 10px; padding-bottom: 8px;">
                                Continue make order ?
                            </router-link>
                        </div>
                    </div>

                    <div class="border border-bottom">
                        <AppListMenu :data.sync="sidebar" :isSidebarSmall="isSidebarSmall" />
                    </div>

                    <AppButton
                        style="width: 100%; margin-top: 20px;"
                        :onPress="onLogout"
                        title="Logout"
                        type="primary"
                    />
                </div>

                <AppButton
                    style="width: 100%; margin-top: 30px;"
                    :onPress="onBuilded"
                    title="Help"
                    type="sekunder"
                />

                <AppButton
                    style="width: 100%; margin-top: 10px;"
                    :onPress="onBuilded"
                    title="Chat Admin"
                    type="sekunder"
                />
            </div>
            <div class="width width-70 width-mobile">
                <router-view />
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import AppTabs from '../modules/AppTabs'
import AppButton from '../modules/AppButton'
import AppListMenu from '../modules/AppListMenu'

const sidebarCustomer = [
    {icon: 'fa fa-lg fa-list-ol', label: 'Orders', value: 0, link: 'account'},
    {icon: 'fa fa-lg fa-users', label: 'Customers', value: 0, link: 'account-customer'},
    {icon: 'fa fa-lg fa-star', label: 'Feedbacks', value: 0, link: 'account-feedback'},
    {icon: 'fa fa-lg fa-heart', label: 'Wiselists', value: 0, link: 'account-whiselist'},
    {icon: 'fa fa-lg fa-tachometer-alt', label: 'Dashboard', value: 0, link: 'dashboard'}
]

export default {
    name: 'App',
    data () {
        return {
            sidebar: sidebarCustomer,
            dataUser: null,
            dataOrder: null,
            isSidebarSmall: false
        }
    },
    mounted () {
        this.dataOrder = this.$cookies.get('orderItem')
        this.dataUser = this.$cookies.get('user')
        this.sidebar[0].value = this.order
    },
    components: {
        AppListMenu,
        AppTabs,
        AppButton,
    },
    methods: {
        ...mapActions({
            removeCookieAuth: 'auth/removeCookieAuth',
            signOut: 'auth/signOut'
        }),
        async onLogout () {
            var a = confirm('logout your session ?')
            if (a) {
                const rest = await this.signOut(this.token)
                
                if (rest.data.status === 'ok') {
                    this.removeCookieAuth()
                    // this.$router.push({ name: 'home' })
                    window.location = this.initUrl
                }

                console.log('LOGOUT', rest)
            }
        },
        onBuilded () {
            alert('still builded !')
        }
    },
    computed: {
        ...mapGetters({
            authenticated: 'auth/authenticated',
            user: 'auth/user',
            token: 'auth/token',
            order: 'order/count'
        })
    },
    watch: {
        order (props) {
            this.sidebar[0].value = props
        }
    }
}
</script>
