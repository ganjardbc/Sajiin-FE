<template>
    <div id="App" style="position: fixed; bottom: 10px; right: 0; width: 100%; display: flex; justify-content: center; z-index: 10000;">
        <router-link :to="{name: 'customer-chart'}">
            <button class="btn btn-main btn-radius-rounded box-shadow" style="display: flex; align-items: center; padding-top: 15px; padding-bottom: 15px;">
                <!-- <i class="icn icn-left fa fa-lg fa-shopping-cart"></i> -->
                <div class="fonts fonts-11 white semibold" style="line-height: 0;">Carts ({{ cart }})</div>
                <i class="icn icn-right fa fa-lg fa-shopping-cart"></i>
            </button>
        </router-link>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'App',
    data () {
        return {
            countCart: 0
        }
    },
    mounted () {
        this.getLocalCartCount()
    },
    computed: {
        ...mapGetters({
            authenticated: 'auth/authenticated',
            user: 'auth/admin',
            permissions: 'auth/permissions',
            token: 'auth/token',
            cart: 'cart/countCustomer',
        })
    },
    methods: {
        ...mapActions({
            getCount: 'cart/getCountCustomer',
        }),
        getLocalCartCount () {
            const token = 'Bearer '.concat(this.$cookies.get('token'))
            this.getCount(token)
        },
    },
    watch: {
        cart (props) {
            this.countCart = props
        },
    }
}
</script>