<template>
    <div id="register" class="post-top" style="padding-left: 10px; padding-right: 10px;">
        <div class="card card-login border-radius box-shadow bg-white" style="margin: auto;">
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
                    <h3 style="margin-top: 8px;">Register</h3>
                    <router-link :to="{name: 'login'}" class="btn btn-main-reverse" style="padding-left: 0; padding-right: 0">
                        Login to your account ?
                    </router-link>
                </div>

                <div style="width: 100%; margin-bottom: 10px;">
                    <input type="test" placeholder="Full name" class="field field-sekunder" name="name" id="name" required :readonly="visibleLoader" v-model="form.name">
                    <div v-if="textError.name && visibleError" class="content normal" style="color: red; margin-bottom: 5px;">
                        {{ textError.name && textError.name[0] }}
                    </div>
                </div>

                <div style="width: 100%; margin-bottom: 10px;">
                    <input type="email" placeholder="email" class="field field-sekunder" name="email" id="email" required :readonly="visibleLoader" v-model="form.email">
                    <div v-if="textError.email && visibleError" class="content normal" style="color: red; margin-bottom: 5px;">
                        {{ textError.email && textError.email[0] }}
                    </div>
                </div>

                <div style="width: 100%; margin-bottom: 30px;">
                    <input type="password" placeholder="password" class="field field-sekunder" name="password" id="password" required :readonly="visibleLoader" v-model="form.password">
                    <div v-if="textError.password && visibleError" class="content normal" style="color: red; margin-bottom: 5px;">
                        {{ textError.password && textError.password[0] }}
                    </div>
                </div>

                <div style="margin-bottom: 20px;" type="center">
                    <button :class="visibleLoader ? 'btn btn-grey' : 'btn btn-main'" style="width: 100%;" :type="visibleLoader ? 'button' : 'submit'" :disabled="visibleLoader">
                        {{visibleLoader ? 'Please Wait..' : 'Register' }}
                    </button>
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
    name: 'register',
    components: {
        AppWrapper,
        AppButton,
        AppText,
        AppForm
    },
    data () {
        return {
            logo: logo,
            visibleLoader: false,
            visibleError: false,
            textError: 'error',
            form: {
                name: '',
                email: '',
                password: ''
            }
        }
    },
    methods: {
        ...mapActions({
            register: 'auth/register'
        }),

        async submit () {
            this.visibleLoader = true
            const rest = await this.register(this.form)
            if (rest.data.status === 'ok') {
                this.$router.push({ name: 'login' })
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
            const user = this.$cookies.get('user')
            if (user.role_name === 'customer') {
                this.$router.replace({ name: 'customer-main' })
            } else {
                this.$router.replace({ name: 'dashboard' })
            }
        }
    }
}

</script>
