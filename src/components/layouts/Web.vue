<template>
    <div id="WebLayouts">
        <div id="header" class="border-bottoms">
            <div id="header-container" class="header-mobile">
                <div class="left">
                    <router-link :to="{name: 'home'}" style="position: relative; width: 100%; top: -2.5px; left: 0;">
                        <img :src="logo" alt="SAJI-IN" style="width: 80%;">
                    </router-link>
                </div>
                <div class="right">
                    <div class="header-bar">
                        <button class="btn btn-icon btn-white" @click="onOpenMenu">
                            <i class="fa fa-lg fa-bars"></i>
                        </button>
                    </div>
                    <div :class="'header-menu ' + (visibleMenu ? 'show' : '')">
                        <div class="header-bar header-menu-bar">
                            <div class="display-flex space-between">
                                <div class="fonts fonts-14 semibold" style="padding-top: 6px;">
                                    Menu
                                </div>
                                <button class="btn btn-icon btn-white" @click="onOpenMenu">
                                    <i class="fa fa-lg fa-times"></i>
                                </button>
                            </div>
                        </div>
                        <div class="header-menu-content display-flex space-between display-mobile">
                            <div class="header-menu-list display-flex display-mobile">
                                <AppMenu :data="navbar" />
                            </div>
                            <div class="display-flex display-mobile">
                                <div class="header-menu-list display-flex display-mobile">
                                    <router-link v-if="!dataUser ? false : true" :to="{name: dataUser.role_name === 'customer' ? 'customer-main' : 'dashboard'}" style="display: block;" class="margin margin-left-5-px no-margin-padding">
                                        <button class="btn btn-sekunder btn-mobile">
                                            {{ dataUser.role_name === 'customer' ? 'CUSTOMER' : 'DASHBOARD' }}
                                        </button>
                                    </router-link>
                                    <router-link v-if="dataUser ? false : true" :to="{name: 'login'}" style="display: block;" class="header-menu-mobile">
                                        <button class="btn btn-sekunder btn-mobile">
                                            LOGIN
                                        </button>
                                    </router-link>
                                    <router-link v-if="dataUser ? false : true" :to="{name: 'register'}" style="display: block;" class="margin margin-left-5-px no-margin-padding">
                                        <button class="btn btn-main btn-mobile">
                                            REGISTER
                                        </button>
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div> 
                    
                </div>
            </div>
        </div>
        <div id="body">
            <transition>
                <keep-alive>
                    <router-view />
                </keep-alive>
            </transition>

            <transition>
                <router-view name="webfresh" />
            </transition>

            <div v-if="customer && customer.id" style="position: fixed; bottom: 10px; right: 10px;">
                <router-link :to="{name: 'customer-main'}" class="btn btn-main btn-radius-rounded">
                    Go To Customer Page <i class="icn fa fa-lg fa-arrow-right" />
                </router-link>
            </div>
        </div>
        <div id="contact" class="main-screen" style="padding-top: 64px; padding-bottom: 32px;">
            <div type="center" class="self-padding">
                <div class="width width-50 width-mobile width-center content-center">
                    <h1 class="fonts fonts-16 semibold red" style="margin-bottom: 10px;">Ready to get started ?</h1>
                    <h2 class="fonts fonts-34 bold black no-line-height">Let's join with Us</h2>
                    <h2 class="fonts fonts-34 bold black no-line-height">and get better Products</h2>
                    <div style="margin-top: 15px; margin-bottom: 15px;">
                        <div class="bottom-line" style="margin: auto;"></div>
                    </div>
                    <div class="display-flex center" style="margin-bottom: 15px;">
                        <span class="fonts fonts-12 grey">Questions? Call us at <span class="fonts fonts-11 red semibold">1-800-975-5304</span> or email <span class="fonts fonts-11 red semibold">hello@sajiin.com</span></span>
                    </div>
                </div>
                <div class="display-flex center" style="margin-top: 32px;">
                    <button class="btn btn-main" style="margin-left: 10px; margin-right: 10px;">
                        Register Your Restaurant <i class="icn fa fa-lg fa-arrow-right" />
                    </button>
                </div>
            </div>
        </div>
        <div id="footer">
            <div id="footer-content" class="display-flex space-between display-mobile">
                <div class="width width-30 width-mobile" style="padding-bottom: 15px;">
                    <div style="position: relative; 
                                width: 150px;
                                margin-bottom: 20px;
                                margin-left: 0;
                                overflow: hidden;
                                height: 58px;">
                        <img 
                            :src="logo" 
                            alt="SAJI-IN" 
                            style="
                                width: 100%;
                            ">
                    </div>
                    <AppText style="margin-bottom: 20px;">
                        <span style="font-size: 10pt;">This Site All Right Reserved @2020</span>
                    </AppText>
                </div>

                <div class="width width-70 width-mobile display-flex space-between display-mobile">
                    <div class="width width-60 width-mobile display-flex space-between" style="padding-bottom: 15px;">
                        <div class="width width-100">
                            <div class="fonts fonts-13px semibold grey" style="margin-bottom: 15px;">About</div>
                            <ul class="menu-list">
                                <li class="ml-list">
                                    <router-link :to="{name: 'about-us'}" class="ml-link">
                                        About Us
                                    </router-link>
                                </li>
                                <li class="ml-list">
                                    <router-link :to="{name: 'articles'}" class="ml-link">
                                        Our Team
                                    </router-link>
                                </li>
                                <li class="ml-list">
                                    <router-link :to="{name: 'pricing'}" class="ml-link">
                                        Pricing
                                    </router-link>
                                </li>
                            </ul>
                        </div>
                        <div class="width width-100">
                            <div class="fonts fonts-13px semibold grey" style="margin-bottom: 15px;">Blogs</div>
                            <ul class="menu-list">
                                <li class="ml-list">
                                    <router-link :to="{name: 'articles'}" class="ml-link">
                                        Articles
                                    </router-link>
                                </li>
                                <li class="ml-list">
                                    <router-link :to="{name: 'benefits'}" class="ml-link">
                                        Benefits
                                    </router-link>
                                </li>
                            </ul>
                        </div>
                        <div class="width width-100">
                            <div class="fonts fonts-13px semibold grey" style="margin-bottom: 15px;">Helps</div>
                            <ul class="menu-list">
                                <li class="ml-list">
                                    <router-link :to="{name: 'how-to-orders'}" class="ml-link">
                                        How to create orders ?
                                    </router-link>
                                </li>
                                <li class="ml-list">
                                    <router-link :to="{name: 'how-to-join'}" class="ml-link">
                                        How to join ?
                                    </router-link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="width width-30 width-mobile">
                        <div class="fonts fonts-13px semibold grey" style="margin-bottom: 15px;">Contacts</div>
                        <div class="display-flex" style="margin-bottom: 15px;">
                            <button class="btn btn-icon btn-small-radius btn-sekunder" style="margin-right: 10px;">
                                <i class="fab fa-lg fa-facebook" />
                            </button>
                            <button class="btn btn-icon btn-small-radius btn-sekunder" style="margin-right: 10px;">
                                <i class="fab fa-lg fa-instagram" />
                            </button>
                            <button class="btn btn-icon btn-small-radius btn-sekunder" style="margin-right: 10px;">
                                <i class="fab fa-lg fa-whatsapp" />
                            </button>
                        </div>
                        <div class="display-flex">
                            <button class="btn btn-icon btn-small-radius btn-sekunder" style="margin-right: 10px;">
                                <i class="fab fa-lg fa-telegram-plane" />
                            </button>
                            <button class="btn btn-icon btn-small-radius btn-sekunder" style="margin-right: 10px;">
                                <i class="fa fa-lg fa-envelope" />
                            </button>
                            <button class="btn btn-icon btn-small-radius btn-sekunder" style="margin-right: 10px;">
                                <i class="fa fa-lg fa-phone" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <AppToast />
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import logo from '@/assets/img/logo.png'
import logo2 from '@/assets/img/icon.png'
import AppWrapper from '../modules/AppWrapper'
import AppButton from '../modules/AppButton'
import AppMenu from "../modules/AppMenu"
import AppText from "../modules/AppText"
import SearchField from '../modules/SearchField'
import AppToast from '../modules/AppToast'

const navbar = [
    {label: 'Home', link: 'home'},
    {label: 'Articles', link: 'articles'},
    {label: 'Benefits', link: 'benefits'},
    {label: 'Pricing', link: 'pricing'}
]

export default {
    name: 'WebLayouts',
    data () {
        return {
            visibleMenu: false,
            logo: logo,
            logo2: logo2,
            navbar: navbar,
            role: null,
            customer: null,
            token: null,
            dataUser: null
        }
    },
    mounted () {
        const usr = this.$cookies.get('user')
        this.dataUser = this.user ? this.user : usr 

        const role = this.$cookies.get('role')
        this.role = role
        console.log('role', role)

        const token = this.$cookies.get('token')
        this.token = token

        this.customer = this.$cookies.get('customer')

        this.getLocalCartCount()
        this.getLocalOrderCount()
    },
    components: {
        AppToast,
        AppWrapper,
        AppButton,
        AppMenu,
        AppText,
        SearchField
    },
    methods: {
        ...mapActions({
            getCount: 'cart/getCount',
            getCountOrder: 'order/getCount'
        }),
        onOpenMenu () {
            this.visibleMenu = !this.visibleMenu
        },
        getLocalCartCount () {
            const token = 'Bearer '.concat(this.$cookies.get('token'))
            this.getCount(token)
        },
        getLocalOrderCount () {
            const token = 'Bearer '.concat(this.$cookies.get('token'))
            this.getCountOrder(token)
        }
    },
    computed: {
        ...mapGetters({
            authenticated: 'auth/authenticated',
            user: 'auth/user',
            permissions: 'auth/permissions',
            cart: 'cart/count',
            order: 'order/count'
        })
    },
    watch: {
        user (props) {
            if (props) {
                this.dataUser = props
            }
        }
    }
}

</script>