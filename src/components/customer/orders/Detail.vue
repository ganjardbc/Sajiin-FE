<template>
    <div id="App">
        <AppMobileLayout :title="'Order Detail'">
            <AppLoader v-if="visibleLoader" style="margin-top: 20px;" />
            <FormOrder v-else :data.sync="formOrder" />
        </AppMobileLayout>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
import axios from 'axios'
import AppLoader from '../../modules/AppLoader'
import AppMobileLayout from '../../modules/AppMobileLayout'
import FormOrder from '../../modules/FormOrder'

export default {
    name: 'App',
    data () {
        return {
            visibleLoaderCheck: false,
            visibleLoader: false,
            selectedVisitor: null,
            formOrder: null,
            dataVisitor: null
        }
    },
    mounted () {
        this.getDataOrder()
    },
    components: {
        AppLoader,
        AppMobileLayout,
        FormOrder
    },
    methods: {
        ...mapActions({
            setToast: 'toast/setToast'
        }),
        makeToast (title) {
            const payload = {
                visible: true,
                title: title
            }
            this.setToast(payload)
        },
        onChangeMenu (index) {
            console.log('onChange', index)
        },
        getRefresh () {
            this.getDataOrder()
        },
        async getDataOrder () {
            this.visibleLoader = true 

            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const payload = {
                limit: 1000,
                offset: 0,
                order_id: this.$route.params.id
            }
            
            const rest = await axios.post('/api/order/getByID', payload, { headers: { Authorization: token } })

            console.log('getDataOrder', rest)

            if (rest && rest.status === 200) {
                const data = rest.data.data
                this.formOrder = data
                this.visibleLoader = false 
            } else {
                this.visibleLoader = false
            }
        },
    }
}
</script>