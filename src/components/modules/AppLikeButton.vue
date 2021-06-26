<template>
    <button 
        id="AppLikeButton"
        :class="isBigButton ? 'btn btn-icon btn-white' : 'btn btn-small-icon btn-white'" 
        @click="(status) ? setStatusWishelist('delete') : setStatusWishelist('save')">
        <i 
            v-if="visibleLoader" 
            class="fa fa-lg fa-spinner fa-spin"></i>
        <i 
            v-else
            :class="(status) ? 'fa fa-lg fa-heart' : 'far fa-lg fa-heart'" 
            :style="'font-size: 18px; ' + (status && 'color: red;')"></i>
    </button>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import axios from 'axios'

export default {
    name: 'AppLikeButton',
    data() {
        return {
            id: null,
            status: false,
            visibleLoader: false,
            payloadWishelist: {
                token: '',
                owner_id: 0,
                user_id: 0,
                product_id: 0
            },
            dataUser: null,
            selectedTable: null
        }
    },
    mounted() {
        this.dataUser = this.$cookies.get('user')
        this.selectedTable = this.$cookies.get('table')

        const token = 'Bearer '.concat(this.$cookies.get('token'))
        const user = this.$cookies.get('admin')
        this.payloadWishelist = {
            ...this.payloadWishelist,
            token: token,
            owner_id: this.dataUser ? this.dataUser.id : 0,
            user_id: this.dataUser ? this.dataUser.id : 0,
        }
        this.id = this.productID
        this.getStatusWisheList(this.id, this.payloadWishelist.owner_id)
    },
    props: {
        isBigButton: {
            type: Boolean,
            required: false
        },
        productID: {
            required: true
        }
    },
    computed: {
        ...mapGetters({
            user: 'auth/user',
            // status: 'wishelist/status'
        })
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
        setToastWishelist () {
            const stt = this.status
            if (!stt) {
                this.makeToast('Product added to wishelist')
            } else {
                this.makeToast('Product removed from wishelist')
            }
        },
        setStatusWishelist (type) {
            if (this.dataUser) {
                if (type === 'save') {
                    this.postStatus({
                        ...this.payloadWishelist,
                        product_id: this.id
                    })
                    this.setToastWishelist()
                } else {
                    this.deleteStatus({
                        ...this.payloadWishelist,
                        product_id: this.id
                    })
                    this.setToastWishelist()
                }
            } else {
                this.makeToast('you have to login as customer')
            }
        },
        getStatusWisheList (prodID, ownerID) {
            this.getStatus({
                ...this.payloadWishelist,
                owner_id: ownerID,
                product_id: prodID
            })
        },
        async deleteStatus (data) {
            this.visibleLoader = true
            const payload = {
                owner_id: data.owner_id,
                user_id: data.user_id,
                product_id: data.product_id
            }
            return await axios.post('/api/wishelist/delete', payload, { headers: { Authorization: data.token } })
            .then((rest) => {
                if (rest && rest.status === 200) {
                    this.status = false
                } else {
                    this.status = true
                }
                this.visibleLoader = false
            })
            .catch(() => {
                this.status = true
                this.visibleLoader = false
            })
        },
        async postStatus (data) {
            this.visibleLoader = true
            const payload = {
                owner_id: data.owner_id,
                user_id: data.user_id,
                product_id: data.product_id
            }
            return await axios.post('/api/wishelist/post', payload, { headers: { Authorization: data.token } })
            .then((rest) => {
                if (rest && rest.status === 200) {
                    this.status = true
                } else {
                    this.status = false
                }
                this.visibleLoader = false
            })
            .catch(() => {
                this.status = false
                this.visibleLoader = false
            })
        },
        async getStatus (data) {
            this.visibleLoader = true
            const payload = {
                owner_id: data.owner_id,
                user_id: data.user_id,
                product_id: data.product_id
            }
            const rest = await axios.post('/api/wishelist/checkWisheList', payload, { headers: { Authorization: data.token } })
            if (rest) {
                if (rest && rest.status === 200) {
                    const data = rest.data.status
                    if (data === 'choosed') {
                        this.status = true
                    } else {
                        this.status = false
                    }
                } else {
                    this.status = false
                }
                this.visibleLoader = false
            } else {
                this.status = false
                this.visibleLoader = false
            }
        },
    }
}
</script>