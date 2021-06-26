<template>
    <div id="Login" class="main-screen" style="padding-top: 50px;">
        <div class="card card-login border-full border-radius" style="margin: auto;">
            <form action="#" @submit.prevent="submit" style="width: 100%;">
                <div class="image image-all" style="
                    width: 200px;
                    padding-bottom: 30%;
                    margin: auto;
                    margin-bottom: 30px;
                    background-color: rgba(0,0,0,0)
                ">
                    <img :src="logo" alt="HNF" class="post-center" style="width: 100%;">
                </div>
                
                <div class="display-flex space-between" style="margin-bottom: 20px;">
                    <h3 style="margin-top: 8px;">Sign-In</h3>
                    <router-link :to="{name: 'register'}" class="btn btn-main-reverse" style="padding-left: 0; padding-right: 0">
                        Create account ?
                    </router-link>
                </div>
                
                <div style="width: 100%; margin-bottom: 10px;">
                    <input type="email" placeholder="email" class="field field-sekunder" name="email" id="email" required :readonly="visibleLoader" v-model="form.email">
                </div>

                <div style="width: 100%; margin-bottom: 30px;">
                    <input type="password" placeholder="password" class="field field-sekunder" name="password" id="password" required :readonly="visibleLoader" v-model="form.password">
                </div>
                
                <!-- <div style="width: 100%; margin-bottom: 30px;">
                    <input class="form-check-input" type="checkbox" name="remember" id="remember" v-model="form.remember">
                    <label class="form-check-label" for="remember">
                        Remember Me
                    </label>
                </div> -->

                <div v-if="visibleError" class="content normal" style="color: red; text-align: center; margin-bottom: 15px;">
                    {{ textError }}
                </div>

                <div style="margin-bottom: 10px;">
                    <button :class="visibleLoader ? 'btn btn-grey' : 'btn btn-main'" style="width: 100%;" :type="visibleLoader ? 'button' : 'submit'" :disabled="visibleLoader">
                        {{visibleLoader ? 'Please Wait..' : 'Check Account' }}
                    </button>
                </div>
                
                <div style="margin-bottom: 10px;" type="center">
                    <router-link :to="{name: 'register'}" class="btn btn-white" style="padding-left: 0; padding-right: 0">
                        Forgot Password
                    </router-link>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
// import axios from 'axios'
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
                console.log('token', data.token)
                console.log('data', data)

                this.setCookieAuth(data)

                const token = 'Bearer '.concat(data.token)
                this.getCount(token)
                this.getCountOrder(token)

                if (data.user.role_name === 'customer') {
                    this.$router.push({ name: 'customer-home' })
                } else {
                    this.$router.push({ name: 'dashboard' })
                }
                // window.location = this.initUrl + '/home'

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
}

</script>
