<template>
    <div id="App">
        <button :class="'btn btn-main ' + (isFull ? 'btn-full' : '')" style="margin-left: 0; margin-right: 10px;" @click="onButtonCustomer">
            {{ title ? title : 'Scan Restaurant QR'}} <i :class="'icn ' + (icon ? icon : 'fa fa-lg fa-qrcode')" />
        </button>

        <FormCustomer
            :data.sync="selectedCustomer"
            :enablePopup="openCreateCustomer"
            :onChange="(data) => onChangeCustomer(data)"
        />
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import FormCustomer from './FormCustomer'

const customer = {
    id: '',
    customer_id: '',
    image: '',
    name: '',
    email: '',
    phone: '',
    about: '',
    status: ''
}

export default {
    name: 'App',
    data () {
        return {
            openCreateCustomer: false,
            selectedCustomer: {...customer},
        }
    },
    mounted () {
        const customerData = this.$cookies.get('customer')
        this.selectedCustomer = customerData ? customerData : customer
    },
    components: {
        FormCustomer,
    },
    props: {
        isFull: {
            type: Boolean,
            required: false
        },
        title: {
            type: String,
            required: false
        },
        icon: {
            type: String,
            required: false
        },
        onChange: {
            type: Function,
            required: false
        }
    },
    computed: {
        ...mapGetters({
            user: 'auth/user',
            customer: 'customer/data'
        })
    },
    methods: {
        ...mapActions({
            setCustomer: 'customer/setData'
        }),
        onButtonCustomer () {
            this.openCreateCustomer = !this.openCreateCustomer
        },
        onChangeCustomer (data) {
            this.selectedCustomer = data
            this.setCustomer(this.selectedCustomer)
            this.onChange(data)
        },
    }
}
</script>