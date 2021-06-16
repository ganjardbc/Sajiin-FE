<template>
    <div id="WebLayouts">
        <div id="header" class="box-shadow">
            <div id="header-container" class="header-mobile">
                <div class="left">
                    <router-link :to="{name: 'home'}" style="position: relative; width: 100%; top: -10px; left: -7.5px;">
                        <img :src="logo" alt="SAJI-IN" style="width: 100%;">
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
                                    <router-link v-if="!dataUser ? false : true" :to="{name: 'dashboard'}" style="display: block;" class="margin margin-left-5-px no-margin-padding">
                                        <button class="btn btn-small btn-sekunder btn-mobile">
                                            DASHBOARD
                                        </button>
                                    </router-link>
                                    <router-link v-if="dataUser ? false : true" :to="{name: 'login'}" style="display: block;" class="header-menu-mobile">
                                        <button class="btn btn-small btn-sekunder btn-mobile">
                                            LOGIN
                                        </button>
                                    </router-link>
                                    <router-link v-if="dataUser ? false : true" :to="{name: 'register'}" style="display: block;" class="margin margin-left-5-px no-margin-padding">
                                        <button class="btn btn-small btn-main btn-mobile">
                                            REGISTER
                                        </button>
                                    </router-link>
                                </div>
                                <div class="header-menu-list header-search">
                                    <SearchField :placeholder="'Search article ..'" />
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
        <div id="footer">
            <div id="footer-content" class="display-flex space-between display-mobile">
                <div class="width width-30 width-mobile" style="padding-bottom: 15px;">
                    <div style="position: relative; 
                                width: 150px;
                                margin-bottom: 20px;
                                margin-left: -13px;
                                overflow: hidden;
                                height: 46px;">
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
                                    <router-link :to="{name: 'articles'}" class="ml-link">
                                        Events
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
    {label: 'About Us', link: 'about-us'},
    {label: 'Pricing', link: 'pricing'},
    {label: 'How to Join ?', link: 'how-to-join'}
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
        console.log('token', token)

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