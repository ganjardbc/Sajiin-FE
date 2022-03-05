<template>
    <div id="Login" class="post-top" style="padding-left: 10px; padding-right: 10px;">
        <div class="card card-login border-radius box-shadow bg-white" style="margin: auto;">
            <form action="#" @submit.prevent="submit" style="width: 100%; padding: 15px 0;">
                <div class="image image-all" style="
                    width: 200px;
                    padding-bottom: 30%;
                    margin: auto;
                    margin-bottom: 30px;
                    background-color: rgba(0,0,0,0)
                ">
                    <img :src="logo" alt="HNF" class="post-center" style="width: 100%;">
                </div>
                
                <div style="width: 100%; margin-bottom: 10px;">
                    <input type="email" placeholder="email" class="field field-sekunder" name="email" id="email" required :readonly="visibleLoader" v-model="form.email">
                </div>

                <div style="width: 100%; margin-bottom: 30px;">
                    <input type="password" placeholder="password" class="field field-sekunder" name="password" id="password" required :readonly="visibleLoader" v-model="form.password">
                </div>

                <div v-if="visibleError" class="content normal" style="color: red; text-align: center; margin-bottom: 15px;">
                    {{ textError }}
                </div>

                <div style="margin-bottom: 10px;">
                    <button :class="visibleLoader ? 'btn btn-grey' : 'btn btn-main'" style="width: 100%;" :type="visibleLoader ? 'button' : 'submit'" :disabled="visibleLoader">
                        {{visibleLoader ? 'Please Wait..' : 'Login' }}
                    </button>
                </div>

                <div class="display-flex center" style="margin-bottom: 20px; margin-top: 20px;">
                    <div class="fonts fonts-11 black">Or</div>
                </div>
                
                <div style="margin-bottom: 10px;" type="center">
                    <router-link :to="{name: 'visitor-shop'}" class="btn btn-primary btn-div" type="button">
                        Login as Visitor
                    </router-link>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import logo from '@/assets/img/logo.png'
import AppWrapper from '../modules/AppWrapper'
import AppButton from '../modules/AppButton'
import AppForm from '../modules/AppForm'
import AppText from '../modules/AppText'

export default {
    name: "Login",
    components: {
        AppWrapper,
        AppButton,
        AppText,
        AppForm
    },

    data () {
        return {
            visibleLoader: false,
            visibleError: false,
            textError: 'error',
            logo: logo,
            form: {
                email: '',
                password: '',
                remember: false
            }
        }
    },

    methods: {
        ...mapActions({
            setCookieAuth: 'auth/setCookieAuth',
            signIn: 'auth/signIn',
            getCount: 'cart/getCount',
            getCountOrder: 'order/getCount'
        }),

        async submit () {
            this.visibleLoader = true
            this.visibleError = false
            const rest = await this.signIn(this.form)

            if (rest.data.status === 'ok') {
                const data = rest.data.data 

                this.visibleLoader = false

                this.setCookieAuth(data)

                const token = 'Bearer '.concat(data.token)
                this.getCount(token)
                this.getCountOrder(token)

                // if (data.user.role_name === 'customer') {
                //     this.$cookies.remove('shop')
                //     this.$router.replace({ name: 'customer-main' })
                // } else {
                //     this.$router.replace({ name: 'dashboard' })
                // }

                this.$router.replace({ name: 'dashboard' })

                if (data) {
                    const payload = {
                        id: data.user.id,
                        name: data.user.name,
                        email: data.user.email,
                        token: data.token
                    }
                    this.$socket.emit('admin', payload)
                }
            } else {
                this.visibleLoader = false
                this.visibleError = true
                this.textError = rest.data.message
            }

            // console.log('rest', rest)
        }
    },

    beforeCreate: function () {
        if (this.$cookies.get('token')) 
        {
            // const user = this.$cookies.get('user')
            // if (user.role_name === 'customer') {
            //     this.$router.replace({ name: 'customer-main' })
            // } else {
            //     this.$router.replace({ name: 'dashboard' })
            // }

            this.$router.replace({ name: 'dashboard' })
        }
    }
}

</script>
