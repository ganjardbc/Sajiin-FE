<template>
    <div id="App" class="card-full-popup bg-main">
        <div class="post-middle-absolute">
            <div class="display-flex center" style="padding-bottom: 20px;">
                <i class="fa fa-2x fa-cog fa-spin" style="font-size: 48pt; color: #fff;" />
            </div>
            <div style="text-align: center;">
                <div class="fonts fonts-16 semibold white">
                    Entering Shop 
                </div>
                <div class="fonts fonts-11 white">
                    {{ visibleTitle }}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import { mapActions } from 'vuex'

const customer = {
    id: "",
    customer_id: "",
    image: "",
    name: "",
    email: "",
    phone: "",
    about: "",
    status: ""
}

export default {
    name: 'App',
    data () {
        return {
            visibleLoader: false,
            visibleTitle: 'connecting to server ..',
            token: ''
        }
    },
    mounted () {
        this.token = this.$route.params.token
        console.log('generateCustomertoken', this.token)
        this.getData()
    },
    methods: {
        ...mapActions({
            setCookieAuth: 'auth/setCookieCustomerAuth',
            getAdmin: 'auth/getAdmin'
        }),
        async setCustomer (visibleToken) {
            this.visibleTitle = 'regestring dummy customer ..'

            const time = new Date().getTime()
            let response = null
            let payload = {
                ...customer,
                customer_id: 'CC-' + time,
                email: time + '@email.com',
                name: time.toString(),
                phone: time.toString(),
                status: 'inactive',
                about: 'Dummy customer'
            }

            const token = 'Bearer '.concat(visibleToken)
            const url = '/api/customer/post'

            const rest = await axios.post(url, payload, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                response = rest.data.data 
            } else {
                response = null 
            }

            return response
        },
        async getData () {
            this.visibleLoader = true
            this.visibleTitle = 'wait a minute ..'
            const response = await this.getAdmin(this.token)
            if (response) {
                const data = response.data.data
                const customer = await this.setCustomer(this.token)
                const payload = {...data, token: this.token, customer: customer}
                this.visibleLoader = false
                this.visibleTitle = 'proceed success.'
                this.setCookieAuth(payload)
                this.$router.push({ name: 'customer-main' })

                console.log('getData', payload)
            } else {
                this.visibleLoader = false
                this.visibleTitle = 'there is an error, please try again.'
                alert('response', response)
            }
        }
    }
}
</script>